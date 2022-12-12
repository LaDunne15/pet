const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: String,
    desc: String,
    img:
    {
      data: Buffer,
      contentType: String
    }
});

module.exports = model('images', schema);