const {Schema, model} = require('mongoose');

const schema = new Schema( {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    }
});
module.exports = model('users', schema);