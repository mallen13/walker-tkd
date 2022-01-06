//imports, setup, vars
const express = require('express');
const { createPayment,giveCredentials } = require('./scripts/routeHandler.js');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const app = express();
require('dotenv').config();
const port = 8675;

//setup rate limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes (first #)
    max: 40 // limit each IP to 40 requests per windowMs
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(limiter);

//request credentials
app.get('/api/status', (req,res) => res.send('API is working. :)'));

//request credentials
app.get('/square-credentials', (req,res) => giveCredentials(req,res));

//create new payment
app.post('/create-payment', (req,res) => createPayment(req,res));

//listen
app.listen(port, () => { console.log(`App listening at http://localhost:${port}`)});

// app.listen()
