// Third-party assets & dependancies
var express = require('express');
var mongoose = require('mongoose');

var ProfileController = express();

// Routing
//ProfileController.all('/', require('./'));

// From here on out, require authentication
ProfileController.use(require('../../middleware/auth'));

ProfileController.post('/links', require('./links'));
ProfileController.post('/links/create', require('../Link/create'));

module.exports = ProfileController;
