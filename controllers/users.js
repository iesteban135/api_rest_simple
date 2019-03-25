const User = require('../models/users').User;

/**
 * Express endpoint for GET on users/:userid acces point route.
 * @param {Request} req 
 * @param {Response} res
 */
const getUserREST = (req, res) => {
    getUser({ _id: req.params.userId })
        .then(user =>
            res.status(user ? 200 : 400).send(user ? { user } : { message: 'The specified user does not exist' }))
        .catch(error => res.status(500).send({ message: `Error while trying to get the specified user. ${error}` }));
};

const getUser = query =>
    new Promise((resolve, reject) =>
        User.findOne(query)
        .then(user => resolve(user ? user : null))
        .catch(error => reject(error))
    );

/**
 * Express endpoint for GET on /users acces point route.
 * @param {Request} req 
 * @param {Response} res
 */
const getUsersREST = (req, res) => {
    getUsers()
        .then(users =>
            res.status(users ? 200 : 400).send(users ? { users } : { message: 'Can´t find any users.' }))
        .catch(error =>
            res.status(500).send({ message: `Failed while trying to get the users. ${error}` }));
};
const getUsers = () =>
    new Promise((resolve, reject) =>
        User.find({})
        .then(users => resolve(users ? users : null))
        .catch(error => reject(error))
    );

/**
 * Express endpoint for POST on /users acces point route.
 * @param {Request} req 
 * @param {Response} res
 */
const createUserREST = (req, res) => {
    postUser(req.body)
        .then(user => {
            res.status(200).send({ message: 'Userss succesfully posted', user });
        }, error => {
            res.status(500).send({ message: error });
        });
    };
const postUser = userData =>
    new Promise((resolve, reject) => {
        if (!userData.name ||
            !userData.birthdate) {
            reject(new Error('Missing fields'));
        }
        const user = new User(userData);
        user.save()
            .then(userStored => resolve(userStored))
            .catch(error => reject(error));
    });

/**
 * Express endpoint for PUT on /users/:userid access point route.
 * @param {Request} req 
 * @param {Response} res
 */
const putUserREST = (req, res) => {
    putUser(req.params.userId, req.body)
        .then(user => {
            res.status(200).send({ message: 'User succesfully updated', user });
        }, error => {
            res.status(500).send({ message: `Error while trying to update the specified user. ${error}` });
        });
    };
const putUser =  (userId, userData) =>
    new Promise((resolve, reject) => {
        User.findOneAndUpdate(userId, userData, { new: true })
            .then(user => resolve(user))
            .catch(error => reject(error));
    });

/**
 * Express endpoint for DELETE on /users/:userid access point route.
 * @param {Request} req 
 * @param {Response} res
 */
const deleteUserByIdREST = (req, res) => {
    deleteUserById(req.params.userId )
      .then(result =>
        res.status(result ? 200 : 400).send(result ? { message: 'User deleted.' } : { message: 'User not found.' }))
      .catch(error =>
        res.status(500).send({ message: `Failed while trying to delete the user. ${error}` }));
  };
const deleteUserById = (userId) =>
    new Promise((resolve, reject) => {
        User.findOneAndDelete(userId)
            .then(result => resolve(result))
            .catch(error => reject(error));
    });

module.exports = {
    getUsersREST,
    getUserREST,
    createUserREST,
    putUserREST,
    deleteUserByIdREST
};