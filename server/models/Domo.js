const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;

const DomoSchema = new mongoose.Schema({
    
  type: {
    type: String,
    required: true,
    trim: true,
  },

  water: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: true,
  },
    
  age: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  room: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Room',
  },
    
  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  type: doc.type,
  water: doc.water,
  age: doc.age,
  owner: doc.owner
});

DomoSchema.statics.findByRoom = (roomName, callback) => {
  const search = {
    room: roomName,
  };
  return DomoModel.find(search).select('type water age owner').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
