const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db');

connectDB();

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogposts', require('./routes/blogposts'));

const PORT = config.get('port') || 5000;

app.listen(
    PORT,
    () => console.log(`Server running on port ${PORT}`)
);