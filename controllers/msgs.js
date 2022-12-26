const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Image = require('../models/image');
const Msgs = require('../models/message');
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

module.exports.getMsgs = async function(req, res){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const msgs = await Msgs.find({users:userId}).lean();
        await msgs.forEach(chat => {
            var l = chat.messages.length
            chat.messages = chat.messages[l-1]
        })
        res.status(200).json({
            msgs
        });
    }
}

module.exports.getMsg = async function(req, res){
    const authHeader = req.headers.authorization;
    const chatId = req.params.id;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const msgs = await Msgs.findById(chatId).populate({
            path: 'messages.author',
            populate: {
                path: 'main_image'
            }
        }).lean();
        var isIncludes = msgs.users.some(function (i) {
            return i.equals(userId);
        });
        if (isIncludes)
        {
            msgs2 = msgs.messages.map(i=>{
                a = {}
                a.author = i.author;
                if(i.author._id==userId)
                {
                    a.author._id = "Mine"
                }
                a.date =  formatDate(i.date);
                a.text = i.text;
                return a;
            })
            await res.status(200).json({
                msgs,msgs2
            });
        }
        else
        {
            res.status(501).json({
                msg: "Не дозволено"
            })
        }
    }
}

module.exports.sendMsg = async function(req, res){
    const authHeader = req.headers.authorization;
    const chatId = req.params.id;
    const text = req.body.text;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const msgs = await Msgs.findById(chatId);
        if (msgs.users.includes(userId))
        {         
            try{
                await msgs.messages.push({
                    text,
                    author:userId
                })
                await msgs.save()
                msgs2 = msgs.messages.map(i=>{
                    a = {}
                    if(i.author==userId)
                    {
                        a.author = "Mine"
                    }
                    else
                    {
                        a.author = i.author;
                    }
                    a.date =  formatDate(i.date);
                    a.text = i.text;
                    console.log(a)
                    return a;
                })
                res.status(201).json({
                    msg: "Відправлено",
                    msgs2
                })
            }
            catch (e){
                errorHandler(res, e);
            }
        }
        else
        {
            res.status(201).json({
                msg: "Не дозволено"
            })
        }
    }
}

module.exports.createMsg = async function(req, res){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        var userId = jwt.verify(token, keys.jwt).userId;
        const second_user_id = req.body.id;
        const msgs = await Msgs.find({users:[userId,second_user_id],type_chat:'dialogue'});
        console.log(msgs.length);
        if(msgs.length!=0)
        {
            res.status(201).json(msgs)
        }
        else
        {
            const msg  = new Msgs({});
            try{
                msg.users.push(userId);
                msg.users.push(second_user_id);
                await msg.save()
                res.status(201).json(msg)
            }
            catch (e){
                errorHandler(res, e);
            }
        }
        
    }
}