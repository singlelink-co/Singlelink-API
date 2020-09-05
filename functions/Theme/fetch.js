const mongoose = require('mongoose');

const Theme = mongoose.model('Theme');

module.exports = (req, res) => {
    let payload = [];
    Theme.find({
        parent: req.user._id
    })
        .exec((err, themes) => {
            if(err) return res.send(err);
            payload = payload.concat(themes);
            Theme.find({
                global: true
            })
                .limit(3)
                .exec((err, themes) => {
                    if(err) return res.send(err);
                    payload = payload.concat(themes);
                    return res.send(payload);
                });
        });
}