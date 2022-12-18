const {Schema, model} = require('mongoose');

const schema = new Schema( {
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'images'
    }],
    main_image: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    fathername: {
        type: String
    },
    dateBirth: {
        type: Date
    },
    town: {
        type: String
    }
});
module.exports = model('users', schema);