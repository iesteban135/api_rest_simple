const users = require('../controllers/users');

exports.assignRoutes = function (app) {

    app.post('/users', users.createUserREST);
    app.get('/users', users.getUsersREST);
    app.get('/users/:userId', users.getUserREST);
    app.delete('/users/:userId', users.deleteUserByIdREST);
    app.put('/users/:userId', users.putUserREST);

}