const express = require('express');
const app = express();
const { connectToDatabase } = require('./configs');
const { User } = require('./models');
const userRoute = require('./routes/userRoute.js');
const cors = require('cors');
const path = require('path');

connectToDatabase();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static('public'));


app.use('/', userRoute);

app.listen(3000, () => {
    console.log('Serving your app')
});