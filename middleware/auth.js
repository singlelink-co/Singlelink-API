// functions/middleware/auth.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var config = global.config;

var User = mongoose.model('User');

module.exports = function(req, res, next) {
    var response = res;
    if(req.query.token) req.body.token = req.query.token;
    if(!req.body.token) return res.status(400).send('Missing token');
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        if(err) return res.status(400).send(err);
        if(!decoded.email) return res.status(400).send('Unable to verify user, returning to sign in');
        User.findOne({email: decoded.email})
            .populate('active_profile')
            .exec(function(err, user) {
                if(err) res.end(err);
                req.user = user;
                next();
            });
    })
}