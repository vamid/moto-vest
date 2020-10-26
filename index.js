const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const Order = require('./models/Order');
//middleware
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const csurf = require('csurf');
const fileUpLoadMiddleware = require('./middleware/fileUpLoad');
const autoIncrement = require('mongoose-auto-increment');
const variables = require('./middleware/variables');
//Routers
const homePageRouter = require('./routers/homeRouter');
const catalogRouter = require('./routers/catalogRouter');
const cartRouter = require('./routers/cartRouter');
const orderRouter = require('./routers/orderRouter');

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
    cookie: { maxAge: 1000*60*60*24*7 }
}))
app.use(csurf());
app.use(fileUpLoadMiddleware.array('img', 10));
app.use(variables);

//use routers
app.use('/', homePageRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

app.use('/catalog', catalogRouter);

const start = async function() {
    try {
        await mongoose.connect(mongURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
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

