var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Link = mongoose.model('Link');
var User = mongoose.model('User');
var Theme = mongoose.model('Theme');

module.exports = (req, res) => {
    var payload = {
        profile: req.user.active_profile,
        links: null,
        user: req.user,
        theme: null
    };
    Link.find({
        parent: req.user.active_profile._id
    }, async (err, links) => {
        if(payload.profile.theme) payload.theme = await Theme.findOne({_id: payload.profile.theme || ''});
        if(err) return res.send(err);
        payload.links = links || [];
        res.send(payload);
    });
}