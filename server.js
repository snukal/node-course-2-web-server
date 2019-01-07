const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log!')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public')); //"__dirname" the path to the projects directory

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {                        // We use '/' for the url because we need the root; req-request; res-response
    // res.send('<h1>Hello Pichui!</h1>');
    // res.send({
    //     name: 'Svilen',
    //     likes: [
    //         'Amfetamine',
    //         'Cocaine'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage: 'Hello Pichui!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {                        // We use '/' for the url because we need the root; req-request; res-response
    // res.send('About Shits!!!');
    res.render('about.hbs', {
        pageTitle : 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {                        // We use '/' for the url because we need the root; req-request; res-response
    res.render('projects.hbs', {
        pageTitle : 'Portfolio Page',
        portfolioMessage: 'GOGOGOGO Portfolio!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {                        // We use '/' for the url because we need the root; req-request; res-response
     res.send({
         errorMessage: 'Kurac!'
     });
});

app.listen(port, () => { // in the () this is the port to be listen
    console.log(`Server is up on port ${port}`);
});