var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Link = mongoose.model('Link');
var User = mongoose.model('User');

module.exports = (req, res) => {
    if(!req.body.handle) return res.status(400).send('Handle required to find account');
    var payload = {
        profile: null,
        links: null,
        user: null
    };
    Profile.findOne({
        handle: req.body.handle
    }, (err, profile) => {
            if(err) return res.send(err);
            if(!profile) return res.status(404).send('Profile not found');
            if(profile.visibility == 'unpublished') return res.status(404).send('Profile not found');
            payload.profile = profile;
            User.findOne({
                _id: profile.parent
            }, (err, user) => {
                if(err) return res.send(err);
                if(!user) return res.status(404).send('Profile parent not found');
                payload.user = user;
                Link.find({
                    parent: profile._id
                }, (err, links) => {
                    if(err) return res.send(err);
                    payload.links = links || [];
                    res.send(payload);
                });
            })
        });
}