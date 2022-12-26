const {Schema, model} = require('mongoose');

const schema = new Schema( {
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    messages: [
        {
            text: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            type_msg: {
                type: String,
                enum: [
                    'image',
                    'text'
                ],
                default: 'text'
            },
            reads: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    type_chat: {
        type: String,
        enum: [
            'dialogue',
            'group'
        ],
        default: 'dialogue'
    }
});
module.exports = model('msgs', schema);