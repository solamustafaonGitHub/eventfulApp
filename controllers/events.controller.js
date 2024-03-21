const eventsModel = require('../models/events.model');

//Function To Get All 'Events'
function getAllEvents(req, res) {
    eventsModel.find()
    .then((event) => {
        res.json(event);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
}

//Function To Get an 'Event' By Id
function getEventById(req, res) {
    const eventId = req.params.id;
    eventsModel.findById(eventId)
    .then((event) => {
        res.status(200).send(event);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
}

//Function to Create an 'Event'
function createEvent(req, res) {
    const event = req.body;
    event.lastUpdatedAt = new Date();
    eventsModel.create(event)
    .then((createdEvent) => {
        res.status(201).json(createdEvent);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    });
}

//Function To Update an 'Event' by Id
function updateEventById(req, res) {
    //request handling logic
    const eventId = req.params.id;
    const event = req.body;
    //Last Updated Date/Timestamp
    event.lastUpdatedAt = new Date();
    //Database Interaction
    eventsModel.findByIdAndUpdate(eventId, event, {new:true})
    .then((newEvent) => {
        res.status(200).send(newEvent);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
};

//Function to delete an Event User by Id
function deleteEventById(req, res) {
    const eventId = req.params.id;
    eventsModel.findByIdAndDelete(eventId)
    .then((event) => {
        res.status(200).send(event);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
};

//Export The Functions
module.exports = {
getAllEvents,
getEventById,
createEvent,
updateEventById,
deleteEventById
}