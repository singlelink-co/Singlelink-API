var mongoose = require('mongoose');

const Profile = mongoose.model('Profile');

module.exports = async function(req, res) {
    if(!req.body.handle) return res.status(400).send('To create a profile, please provide a handle');

    new Profile({
        handle: req.body.handle,
        parent: req.user._id,
        image_url: req.body.image_url || null,
        headline: req.body.headline || null,
        subtitle: req.body.subtitle || null
    }).save((err, profile) => {
        if(err) return res.send(err);
        if(!profile) return res.status(400).send('Failed to create profile');
        req.user.active_profile = profile._id;
        req.user.save((err, user) => {
            return res.send(profile);
        });
    });
}