const users = require('../controllers/users');

exports.assignRoutes = function (app) {

    app.post('/users', users.createUser);
    app.get('/users', users.getUsers);
    app.get('/users/:userId', users.getUserById);
    app.delete('/users/:userId', users.deleteUserById);
    app.put('/users/:userId', users.putUser);

}