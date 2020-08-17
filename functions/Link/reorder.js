var mongoose = require('mongoose');

var Link = mongoose.model('Link');

module.exports = (req, res) => {
    if(!req.user.active_profile) return res.status(400).send('You need an active profile to do this');
    if(!req.body.target) return res.status(400).send('Target required');
    if(req.body.new_index === null) return res.status(400).send('New index required');
    if(req.body.old_index === null) return res.status(400).send('Old index required');
    Link.findOne({order: req.body.new_index, parent: req.user.active_profile._id}, (err, link) => {
        if(err) return res.send(err);
        link.order = req.body.old_index;
        link.save((err, link) => {
            if(err) return res.send(err);
            Link.findOne({_id: req.body.target}, (err, link) => {
                if(err) return res.send(err);
                link.order = req.body.new_index;
                link.save((err, link) => {
                    if(err) return res.send(err);
                    Link.find({parent:req.user.active_profile._id})
                        .exec((err, links) => {
                            if(err) return res.send(err);
                            return res.send(links);
                        });
                });
            });
        });
    });
}