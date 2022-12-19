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
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }]

});

module.exports = model('images', schema);