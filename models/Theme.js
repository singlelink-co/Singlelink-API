var mongoose = require('mongoose');

var ThemeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    global: {
      type: Boolean,
      default: false,
      required: true
    },
    colors: {
      fill: {
          primary: String,
          secondary: String
      },
      text: {
          primary: String,
          secondary: String
      }
    },
    custom_css: String
});

module.exports = mongoose.model('Theme', ThemeSchema);