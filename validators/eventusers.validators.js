const Joi = require('joi');

const eventPltfUsersSchema = Joi.object({
    eventPltUsername: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,30}$/).required(),
    eventPltUserEmail: Joi.string().email().required(),
    eventPltUserPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,30}$/).required(),
    createdAt: Joi.date().default(Date.now()),
    lastUpdatedAt: Joi.date().default(Date.now())
})
//Create a schema for updating an Event Platform User
const updateEventPltUsersSchema = Joi.object({
    eventPltUsername: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,30}$/).required(),
    eventPltfUserEmail: Joi.string().email().required(),
    eventPltUserPassword: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,30}$/).required(),
    lastUpdatedAt: Joi.date().default(Date.now())
});

//create a function (parse it as a Middleware) to validate the Event User Object
async function addEventUserValidationMW(req, res, next) {
    const eventUserPayLoad = req.body;
    try {
        await eventPltfUsersSchema.validateAsync(eventUserPayLoad);
        next();
        } catch (error) {
    next({
        message: error.details[0].message, status:406
    });
    }
}
//create a function (parse it as a Middleware) to validate the Event Users when updating
async function updateEventUserValidationMW(req, res, next) {
    const eventUserPayLoad = req.body;
    try {
    await updateEventPltUsersSchema.validateAsync(eventUserPayLoad);
    next();
    } catch (error) {
    next({
    message: error.details[0].message, status:406
    });
    }
}
//Export the functions
module.exports = {
    addEventUserValidationMW, updateEventUserValidationMW
}