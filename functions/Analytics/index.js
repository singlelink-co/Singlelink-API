// Third-party assets & dependancies
var express = require('express');

var AnalyticsController = express();

// Routing
AnalyticsController.get('/fetch', require('./fetch'));

module.exports = AnalyticsController;
