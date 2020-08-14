var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    avatar_url: String,
    headline: String,
    caption: String,
    social: [{
        icon: String,
        link: String,
        alt: String,
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

ProfileSchema.virtual('permissions').get(function() {
    if(this.members) return this.members.push(this.parent);
    return [this.parent];
});

module.exports = mongoose.model('Profile', ProfileSchema);