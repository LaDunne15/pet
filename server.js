const express = require('express');
const serveStatic = require("serve-static");
const fileUpload = require('express-fileupload');
const path = require('path');
const formidable = require('formidable');
require('dotenv/config');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const keys = require('./config/keys');
//mongoose.connect("mongodb+srv://test_user:test_pass@cluster0.mxosg.mongodb.net/empty_db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
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
const imageRoutes = require('./routes/image')
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
/*
app.post("/addUser", function(req, res){
  const user  = new User({
    name: req.body.name,
    age: req.body.age
  });
  user.save(function(err){
    if(err) return console.log(err);
  });
  res.status(201).json(user);
});
app.get("/getUsers", async function(req, res){
  const users = await User.find({});
  res.status(200).json({
    users
  });
})
app.get("/getUser/:id", async function(req, res){
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    user
  });
})
app.delete("/removeUser/:id", async function(req, res){
  const id = req.params.id;
  User.findByIdAndDelete(id, function(err, doc){
    if(err) return console.log(err);
});
res.status(200).json({
  "msg":"Користувач видалений"
});
})
app.put("/updateUser/:id", async function(req,res){
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  await User.findByIdAndUpdate(id, { name,age })
  res.status(200).json({
    "msg":"Змінено"
  })
})
*/

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
var os = require('os');
app.listen(port,() => {
    console.log(`Production Express server running at localhost:${port}`);
});