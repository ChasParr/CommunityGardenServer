const models = require('../models');

const Room = models.Room;

const roomPage = (req, res) => {
  //Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    Room.RoomModel.findPublic( (err, docs) => {
    console.log(docs);
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('rooms', { csrfToken: req.csrfToken(), rooms: docs });
  });
};

const gardenPage = (req, res) => {
    Room.RoomModel.findByName(req.value, (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred' });
        }
        return res.render('garden', { csrfToken: req.csrfToken(), room: docs });
    });
};

const joinRoom = (request, response) => {
    const req = request;
    const res = response;
    console.log(req.body);
    return Room.RoomModel.findByName(req.body.room, (err, room) => {
        req.session.roomData = Room.RoomModel.toAPI(room);
        console.log(req.session.roomData);
        return res.json({ redirect: '/garden' });
    });
};

const getRooms = (request, response) => {
    const req = request;
    const res = response;
    
    return Room.RoomModel.findPublic((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.json({ rooms: docs });
    });
};

const makeRoom = (req, res) => {
    if (!req.body.roomName) {
        return res.status(400).json({ error: 'Name required' });
    }
    const roomData = {
        roomName: req.body.roomName,
        owner: req.session.account._id,
        ownerName: req.session.account.username
    }
    const newRoom = new Room.RoomModel(roomData);
    
    const roomPromise = newRoom.save();
    
    roomPromise.then(() => res.json({ redirect: '/roomList' }));
    
    roomPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Room already exists.' });
        }

        return res.status(400).json({ error: 'An error occurred' });
    });
    return roomPromise;
};

module.exports.getRooms = getRooms;
module.exports.roomPage = roomPage;
module.exports.joinRoom = joinRoom;
module.exports.gardenPage = gardenPage;
module.exports.makeRoom = makeRoom;