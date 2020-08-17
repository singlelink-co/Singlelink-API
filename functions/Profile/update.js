var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');

module.exports = (req, res) => {
    if(req.body.headline) req.user.active_profile.headline = req.body.headline;
    if(req.body.subtitle) req.user.active_profile.subtitle = req.body.subtitle;
    if(req.body.handle) req.user.active_profile.handle = req.body.handle;
    if(req.body.visibility) req.user.active_profile.visibility = req.body.visibility;
    req.user.active_profile.custom_css = req.body.custom_css || '';

    req.user.active_profile.save((err, profile) => {
        if(err) return res.send(err);
        res.send(profile);
    })
}