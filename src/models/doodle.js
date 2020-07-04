'use strict';

const mongoose = require('mongoose');

const doodleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,   
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  created: { 
    type: Date, 
    default: Date.now, 
  },
});

module.exports = mongoose.model('Doodle', doodleSchema);
