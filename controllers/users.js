const User = require('../models/users').User;

const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: 'Error while trying to get users' });
        if (!users) return res.status(404).send({ message: 'There are no users' });
        
        return res.status(200).send({ users})
    })
}

const getUserById = (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error while trying to get the specified user' });
        if (!user) return res.status(404).send({ message: 'The specified user does not exist' });

        return res.status(200).send({ user });
    });

}

const createUser =  (req, res) => {
    let userData = req.body;

    if (!userData.name ||
        !userData.birthdate) {
        res.status(422).send('Missing fields');
        return false;
    }
    const user = new User(userData);
    user.save((err, userStored) => {
        if (err) return res.status(500).send({ message: 'Error while trying to save user' });
        
        return res.status(200).send({ user: userStored, message: 'User saved successfully' });
    });
}

const putUser =  (req, res) => {
    let userId = req.params.userId;
    let userData = req.body;

    User.findByIdAndUpdate(userId, userData, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error while trying to update the specified user' });
        if (!userUpdated) return res.status(404).send({ message: 'The specified user does not exist' });

        return res.status(200).send({ user: userUpdated, message: 'User has been updated' });
    });
}

const deleteUserById = (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error while trying to get the specified user' });
        if (!user) return res.status(404).send({ message: 'The specified user does not exist' });

        user.remove(err => {
            if (err) return res.status(500).send({ message: 'Error while trying to get the specified user' });
            return res.status(200).send({ message: 'User has been deleted' });
        });
    });

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    putUser,
    deleteUserById
};