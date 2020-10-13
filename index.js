const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//middleware
const fileUpLoadMiddleware = require('./middleware/fileUpLoad');
//Routers
const homePageRouter = require('./routers/homeRouter');
const catalogRouter = require('./routers/catalogRouter');

PORT = 3000;
mongURL = "mongodb+srv://moto-vest:7zymZeU4Q5hd4W74@zerocluster.ig2q0.mongodb.net/moto-vest";

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.use(express.static('public'));

//middleware use

app.use(fileUpLoadMiddleware.array('img', 5));


//use routers
app.use('/', homePageRouter);
app.use('/catalog', catalogRouter);

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

