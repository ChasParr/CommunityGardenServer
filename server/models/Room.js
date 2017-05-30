const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const _ = require('underscore');

let RoomModel = {};

const convertId = mongoose.Types.ObjectId;
// const setName = (name) => _.escape(name).trim();

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  ownerName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },

  plants: {
    type: [],
  },

  users: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Account',
  },

  public: {
    type: Boolean,
    default: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

  lastStored: {
    type: Date,
    default: Date.now,
  },

});

RoomSchema.statics.toAPI = (doc) => ({
  roomName: doc.roomName,
  owner: doc.owner,
  ownerName: doc.ownerName,
  plants: doc.plants,
  lastStored: doc.lastStored,
});

RoomSchema.statics.findByName = (name, callback) => {
  const search = {
    roomName: name,
  };

  return RoomModel.findOne(search, callback);
};

RoomSchema.statics.findPublic = (callback) => {
  const search = {
    public: true,
  };
  return RoomModel.find(search).select('roomName ownerName').exec(callback);
};

RoomSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return RoomModel.find(search).select('roomName ownerName').exec(callback);
};

RoomModel = mongoose.model('Room', RoomSchema);

module.exports.RoomModel = RoomModel;
module.exports.RoomSchema = RoomSchema;
