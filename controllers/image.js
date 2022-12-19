const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Image = require('../models/image');
const User = require('../models/user');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs');
const path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage, limits: { fieldSize: 2 * 1024 * 1024 } });

module.exports.getImages = async function(req, res) {
    const imgs = await Image.find({}).lean();
    res.status(200).json({
      imgs
    });
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
module.exports.getImageById = async function(req, res){
    var like = false
    const authHeader = req.headers.authorization;
    const id = req.params.id;
    const img = await Image.findById(id).populate('author').lean();
    if (!img.likes)
    {
        img.likes=[]
    }
    const dateD = formatDate(img.upload_date)
    if (authHeader) {
        const token = await authHeader.split(' ')[1];

        var userEmail = await jwt.verify(token, keys.jwt).email;

        const user =  await User.findOne({email: userEmail});
        like = await img.likes.some(function (i) {
            return i.equals(user._id);
        });
        res.status(200).json({
            img,dateD,like
        });
    }

    
}

module.exports.updateImage = async function(req,res){
    const id = req.params.id;
    await Image.findByIdAndUpdate(id, {})
    res.status(200).json({
      "msg":"Змінено"
    })
}

module.exports.deleteImage = async function(req, res){
    const id = req.params.id;
    Image.findByIdAndDelete(id, function(err, doc){
      if(err) return console.log(err);
  });
  res.status(200).json({
    "msg":"Зображення видалено"
  });
}

module.exports.upload = async function (req, res) {
    
    const directory = `${__dirname}/uploads`;
    if (!fs.existsSync(directory)){
      fs.mkdirSync(directory);
  }
    if (!req.files) {
        return res.status(500).send({
            msg: "file is not found"
        })
    }
    const myFile = req.files.file;
  
    myFile.mv(`${__dirname}/uploads/${myFile.name}`, function(err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                msg: "Error occured"
            });
        }
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
  
            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                });
            }
        });
        var obj = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + myFile.name)),
                contentType: 'image/png'
        }
        Image.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            } else {
  
                res.status(201).json({
                    msg: "Image created"
                });
            }
        });
    });
  
}

module.exports.hello = async function (req, res) {
    res.status(201).json({
        "msg":"Hello!"
    })
}