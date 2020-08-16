var mongoose = require('mongoose');

var Link = mongoose.model('Link');

module.exports = (req, res) => {
    if(!req.user.active_profile) return res.status(400).send('You need an active profile to do this');
    if(!req.body.label) return res.status(400).send('Link label required');
    if(!req.body.url) return res.status(400).send('Link URL required');
    Link.countDocuments({parent: req.user.active_profile._id}, (err, count) => {
        if(err) return res.send(err);
        if(!count) count = 0;
        new Link({
            label: req.body.label,
            url: req.body.url,
            parent: req.user.active_profile._id,
            order: count
        }).save((err, link) => {
            if(err) return res.send(err);
            return res.send(link);
        });
    });
}