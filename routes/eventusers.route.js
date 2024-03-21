const express = require('express');
const eventUsersController = require('../controllers/eventusers.controller');
const {addEventUserValidationMW, updateEventUserValidationMW}= require('../validators/eventusers.validators');

const eventUsersRouter = express.Router();

eventUsersRouter.get('/', eventUsersController.getAllEventUsers);
eventUsersRouter.get('/:id', eventUsersController.getEventUserById);
eventUsersRouter.post('/', eventUsersController.addEventUser, addEventUserValidationMW);
eventUsersRouter.put('/:id', eventUsersController.updateEventUserById, updateEventUserValidationMW);
eventUsersRouter.delete('/:id', eventUsersController.deleteEventUserById);

module.exports = eventUsersRouter;