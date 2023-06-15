const express = require('express');
const app = express();
const User = require('./user');


app.get('/register', (req, res) => {
    res.render("register")
});


app.get('/secret', (req, res) => {
    res.send("This is a secret! hey")
});

app.listen(3000, () => {
    console.log('Serving your app')
});