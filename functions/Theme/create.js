var mongoose = require('mongoose');

var Theme = mongoose.model('Theme');

module.exports = (req, res) => {
    if(!req.body.label) return res.status(400).send('Theme label required');
    new Theme({
        label: req.body.label,
        colors: req.body.colors || null,
        custom_css: req.body.custom_css || null,
        parent: req.user._id
    }).save((err, link) => {
        if(err) return res.send(err);
        return res.send(link);
    });
}