const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

//middleware
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fileUpLoadMiddleware = require('./middleware/fileUpLoad');
//Routers
const homePageRouter = require('./routers/homeRouter');
const catalogRouter = require('./routers/catalogRouter');
const cartRouter = require('./routers/cartRouter');

PORT = 3000;
mongURL = "mongodb+srv://moto-vest:7zymZeU4Q5hd4W74@zerocluster.ig2q0.mongodb.net/moto-vest";

const sessionStore = new MongoStore({
    collection: 'sessions',
    url: mongURL,
})

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      }
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/upload_img', express.static(path.join(__dirname, 'upload_img')));

//middleware use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 60*60*24*7 }
}))

app.use(fileUpLoadMiddleware.array('img', 10));


//use routers
app.use('/', homePageRouter);
app.use('/cart', cartRouter);

app.get('/delivery', (req, res) => {
    res.render('delivery', {
        isDelivery: true
    })
})
app.get('/aboutUs', (req, res) => {
    res.render('aboutUs', {
        isAboutUs: true
    })
})

app.get('/contacts', (req, res) => {
    res.render('contacts', {
        isContacts: true
    })
})

app.get('/sizes', (req, res) => {
    res.render('sizes', {
        isSizes: true
    })
})
app.use('/catalog', catalogRouter);

const start = async function() {
    try {
        await mongoose.connect(mongURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })        
        app.listen(PORT, (err) => {
                if (err) throw err
                else { 
                    console.log(`Server runnig on port: ${PORT}`);
                }
        })
    } catch (error) {
        console.log(error)
    }
}
start();

