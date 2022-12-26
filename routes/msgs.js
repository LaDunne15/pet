const express = require("express");
const controller = require("../controllers/msgs")
const passport = require('passport')
const router = express.Router();


router.get('/',passport.authenticate('jwt', {session: false}), controller.getMsgs);
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getMsg);
router.put('/:id',passport.authenticate('jwt', {session: false}), controller.sendMsg);
router.post('/createMsg',passport.authenticate('jwt', {session: false}), controller.createMsg);

module.exports = router;