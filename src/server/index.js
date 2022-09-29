const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('../routes');
const db = require('../config/database/intance');
const fileUpload = require('express-fileupload');
const app = express();
const { upload } = require('../utils/storage');
const path = require('path');
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: '*',

    methods: '*',
    allowedHeaders: '*',
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
// app.use(fileUpload());
app.use(morgan('dev'));

app.use(upload.any());
db();
app.use('/', routes);
module.exports = app;
