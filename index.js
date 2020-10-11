const express = require('express');
const exphbs = require('express-handlebars');


//Routers
const homePageRouter = require('./routers/home');

PORT = 3000;

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.use(express.static('public'));

//use routers
app.use('/', homePageRouter);

app.listen(PORT, (err) => {
    if (err) throw err
    else { 
        console.log(`Server runnig on port: ${PORT}`);
    }
})

