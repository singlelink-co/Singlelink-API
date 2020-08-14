var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: '#',
        required: true
    },
    style: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
});

module.exports = mongoose.model('Link', LinkSchema);