const express = require("express");
const controller = require("../controllers/auth")
const passport = require('passport')
const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/getUser', passport.authenticate('jwt', {session: false}), controller.getUser);
router.get('/hello', passport.authenticate('jwt', {session: false}), controller.hello);




module.exports = router;