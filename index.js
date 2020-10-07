const express = require('express');
const exphbs = require('express-handlebars');

PORT = 3000;

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')

//app.set('hbs', hbs.engine);
//app.use()
//app.use('enigne', 'hbs');


app.get('/', (req, res) => {
    res.render('home', {
        cont: "Zdes bil ebal"
    })
})





app.listen(PORT, (err) => {
    if (err) throw err
    else { 
        console.log(`Server runnig on port: ${PORT}`);
    }
})

