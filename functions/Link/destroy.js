var mongoose = require('mongoose');

var Link = mongoose.model('Link');

module.exports = (req, res) => {
    if(!req.body.target) return res.status(400).send('Target required');
    Link.findOneAndDelete({
        _id: req.body.target
    }, (err) => {
        if(err) return res.send(err);
        Link.find({
            parent: req.user.active_profile
        }, (err, links) => {
            if(err) return res.send(err);
            res.send(links);
        });
    })
}