const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  console.dir(controllers.Account);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getRooms', mid.requiresLogin, controllers.Room.getRooms);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/rooms', mid.requiresLogin, controllers.Room.roomPage);
  app.post('/newRoom', mid.requiresLogin, controllers.Room.makeRoom);
  app.get('/changePass', mid.requiresLogin, controllers.Account.changePassPage);
  app.post('/changePass', mid.requiresLogin, controllers.Account.changePass);
  app.post('/joinRoom', mid.requiresLogin, controllers.Room.joinRoom);
  app.get('/garden', mid.requiresLogin, controllers.Room.gardenPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
