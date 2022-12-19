const express = require("express");
const controller = require("../controllers/auth")
const passport = require('passport')
const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/getUser', passport.authenticate('jwt', {session: false}), controller.getUser);
router.put('/updateUser', passport.authenticate('jwt', {session: false}), controller.updateUser);
router.put('/updatePassword', passport.authenticate('jwt', {session: false}), controller.updatePassword);
router.put('/uploadUserPhoto', passport.authenticate('jwt', {session: false}), controller.uploadUserPhoto);
router.put('/like', passport.authenticate('jwt', {session: false}), controller.likeImage);
router.get('/getUsers', controller.getUsers);
router.get('/getUserById/:id', controller.getUserById);




module.exports = router;