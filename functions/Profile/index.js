// Third-party assets & dependancies
var express = require('express');
var mongoose = require('mongoose');

var ProfileController = express();

// Routing
//ProfileController.all('/', require('./'));

ProfileController.post('/fetch', require('./fetch'));

// From here on out, require authentication
ProfileController.use(require('../../middleware/auth'));

ProfileController.post('/fetch-preview', require('./fetch-preview'));

ProfileController.post('/activate-theme', require('./activate-theme'));

ProfileController.post('/update', require('./update'));

ProfileController.post('/links', require('./links'));

module.exports = ProfileController;
