const express = require("express");
const controller = require("../controllers/image")
const passport = require('passport')
const router = express.Router();


router.get('/image2', controller.getImages);
router.get("/getImage/:id",passport.authenticate('jwt', {session: false}), controller.getImageById);
router.put("/updateImage/:id", controller.updateImage);
router.delete("/removeImage/:id", controller.deleteImage);
router.post('/upload', controller.upload)

module.exports = router;