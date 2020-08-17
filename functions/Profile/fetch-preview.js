var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Link = mongoose.model('Link');
var User = mongoose.model('User');

module.exports = (req, res) => {
    var payload = {
        profile: req.user.active_profile,
        links: null,
        user: req.user
    };
    Link.find({
        parent: req.user.active_profile._id
    }, (err, links) => {
        if(err) return res.send(err);
        payload.links = links || [];
        res.send(payload);
    });
}