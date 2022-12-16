const {Schema, model} = require('mongoose');

const schema = new Schema({
    data: {
      type: Buffer
    },
    contentType: {
      type:String
    },
    upload_date: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('images', schema);