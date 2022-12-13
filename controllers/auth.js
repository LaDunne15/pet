const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    
    const candidate = await User.findOne({email:req.body.email});

    if(candidate){

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if(passwordResult)
        {

            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});


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

module.exports.getUser = async function (req, res) {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const user =  await User.findById(userId);
        res.status(201).json(user);
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
        //user.birth = req.body.birth;

        try{
            await user.save()
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                fathername: user.fathername
                //birth: user.birth
            }, keys.jwt, {expiresIn: 3 * 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        catch (e){
            errorHandler(res, e);
        }
    }
}