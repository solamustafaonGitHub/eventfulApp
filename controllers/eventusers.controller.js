const eventPltfUsersModel = require('../models/eventusers.model');

//Function To Get All 'Event Users'
function getAllEventUsers(req, res) {
    eventPltfUsersModel.find()
    .then((eventUsers) => {
        res.json(eventUsers);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
}

//Function To Get a 'Event User' By Id
function getEventUserById(req, res) {
    const eventUserId = req.params.id;
    eventPltfUsersModel.findById(eventUserId)
    .then((eventUser) => {
        res.status(200).send(eventUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
}

//Function to Add an 'Event User'
function addEventUser(req, res) {
    const eventUser = req.body;
    eventUser.lastUpdatedAt = new Date();
    eventPltfUsersModel.create(eventUser)
    .then((createdEventUser) => {
        res.status(201).json(createdEventUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    });
}

//Function To Update an 'Event User' by Id
function updateEventUserById(req, res) {
    //request handling logic
    const eventUserId = req.params.id;
    const eventUser = req.body;
    //Last Updated Date/Timestamp
    eventUser.lastUpdatedAt = new Date();
    //Database Interaction
    eventPltfUsersModel.findByIdAndUpdate(eventUserId, eventUser, {new:true})
    .then((newEventUser) => {
        res.status(200).send(newEventUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
};

//Function to delete an Event User by Id
function deleteEventUserById(req, res) {
    const eventUserId = req.params.id;
    eventPltfUsersModel.findByIdAndDelete(eventUserId)
    .then((eventUser) => {
        res.status(200).send(eventUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
};

//Export the functions
module.exports = {
    getAllEventUsers, 
    getEventUserById,
    addEventUser,
    updateEventUserById,
    deleteEventUserById
}