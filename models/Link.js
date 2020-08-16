var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: '#',
        required: true
    },
    style: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    order: Number
});

module.exports = mongoose.model('Link', LinkSchema);