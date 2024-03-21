const express = require('express');
const eventsController = require('../controllers/events.controller');
const {addEventValidationMW, updateEventValidationMW}= require('../validators/events.validators');

const eventsRouter = express.Router();

eventsRouter.get('/', eventsController.getAllEvents);
eventsRouter.get('/:id', eventsController.getEventById);
eventsRouter.post('/', eventsController.createEvent, addEventValidationMW);
eventsRouter.put('/:id', eventsController.updateEventById, updateEventValidationMW);
eventsRouter.delete('/:id', eventsController.deleteEventById);

//export the router
module.exports = eventsRouter;
