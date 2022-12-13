const {Schema, model} = require('mongoose');

const schema = new Schema({
    img:
    {
      data: Buffer,
      contentType: String
    }
});

module.exports = model('images', schema);