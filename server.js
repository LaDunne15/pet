const express = require('express');
const serveStatic = require("serve-static");
const fileUpload = require('express-fileupload');
const path = require('path');
const formidable = require('formidable');
require('dotenv/config');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const keys = require('./config/keys');
//mongoose.connect("***", { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log("MongoDB connected"))
.catch(error => console.log(error));
  
app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.set("view engine", "ejs");

const passport = require('passport');

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');
const msgsRoutes = require('./routes/msgs');
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/msgs', msgsRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
var os = require('os');
app.listen(port,() => {
    console.log(`Production Express server running at localhost:${port}`);
});
