const express = require('express');
const exphbs = require('express-handlebars');

//middleware
const fileUpLoadMiddleware = require('./middleware/fileUpLoad');
//Routers
const homePageRouter = require('./routers/homeRouter');
const catalogRouter = require('./routers/catalogRouter');

PORT = 3000;

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.use(express.static('public'));

//middleware use

app.use(fileUpLoadMiddleware.single('img'));


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

app.listen(PORT, (err) => {
    if (err) throw err
    else { 
        console.log(`Server runnig on port: ${PORT}`);
    }
})

