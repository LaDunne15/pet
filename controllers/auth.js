const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Image = require('../models/image');
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

module.exports.login = async function (req, res) {
    
    const candidate = await User.findOne({email:req.body.email});

    if(candidate){

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if(passwordResult)
        {

            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3 * 60 * 60});


            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            res.status(401).json({
                message: 'Password is incorrect'
            });
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }

}

module.exports.register = async function (req, res) {
    if(req.body.password==req.body.password2){
    const candidate =  await User.findOne({email: req.body.email});
    if(candidate) {
        res.status(409).json({
            msg: 'Email occupied'
        })
    } else {
        
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user  = new User({
            email: req.body.email,
            password:  bcrypt.hashSync(password, salt)
        });

        try{
            await user.save()
            res.status(201).json(user)
        }
        catch (e){
            errorHandler(res, e);
        }
    }
    } else {
        res.status(425).json({
            msg:"Passwords are not equip"
        })
    }

}

module.exports.hello = async function (req, res) {

    res.status(201).json({
        "msg":"Hello!"
    })

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
module.exports.getUser = async function (req, res) {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const user =  await User.findById(userId).populate('images main_image').lean();
        const dateB = formatDate(user.dateBirth);
        const main_img = user.main_image;
        res.status(201).json({user,dateB,main_img});
    }
}

module.exports.updateUser = async function (req, res) {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        var userEmail = jwt.verify(token, keys.jwt).email;

        const user =  await User.findOne({email: userEmail});
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.fathername = req.body.fathername;
        user.dateBirth = req.body.dateBirth;
        user.login = req.body.login;
        user.town = req.body.town;

        try{
            await user.save()
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                fathername: user.fathername,
                birth: user.dateBirth,
                login: user.login,
                town: user.town
            }, keys.jwt, {expiresIn: 3 * 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`,
                user
            })
        }
        catch (e){
            errorHandler(res, e);
        }
    }
}

module.exports.updatePassword = async function (req,res) {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        if(req.body.password==req.body.password2){
            const token = authHeader.split(' ')[1];

            var userEmail = jwt.verify(token, keys.jwt).email;

            const user =  await User.findOne({email: userEmail}).populate('images').lean();
            const password = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(password, salt);
            try{
                await user.save()
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fathername: user.fathername,
                    birth: user.dateBirth
                }, keys.jwt, {expiresIn: 3 * 60 * 60});

                res.status(200).json({
                    token: `Bearer ${token}`,
                    user
                })
            }
            catch (e){
                errorHandler(res, e);
            }
        }
        else {
            res.status(425).json({
                msg:"Passwords are not equip"
            })
        }
    }
}

module.exports.uploadUserPhoto = async function (req,res) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
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
        myFile.mv(`${__dirname}/uploads/${myFile.name}`, async function(err) {
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
        const image  = new Image({
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + myFile.name)),
            contentType: 'image/png'
        });
        try{
            const token = authHeader.split(' ')[1];
            var userEmail = jwt.verify(token, keys.jwt).email;
            const user =  await User.findOne({email: userEmail}).populate('images');
            await image.save();
            await user.images.push(image._id);
            user.main_image = await image._id;
            await user.save();
            const token2 = jwt.sign({
                email: user.email,
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                fathername: user.fathername,
                birth: user.dateBirth
            }, keys.jwt, {expiresIn: 3 * 60 * 60});

            
            res.status(200).json({
                token: `Bearer ${token2}`,
                user
            })
        }
        catch (e){
            errorHandler(res, e);
        }
        });
    }    
}

module.exports.getUsers = async function(req, res) {
    const users = await User.find({}).populate('images main_image').lean();
    res.status(200).json({
      users
    });
}