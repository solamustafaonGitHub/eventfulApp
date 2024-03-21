const Joi = require('joi');

// Function to generate a random 5-digit code
function generateCouponCode() {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const eventsSchema = Joi.object({
    eventTitle: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,300}$/).required(),
    eventVenue: Joi.string().required().min(10).max(1000),
    eventAddress: Joi.string().required().min(10).max(1000),
    eventStartDate: Joi.date().required(),
    eventStartTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    eventEndDate: Joi.date().required(),
    eventEndTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    eventImage: Joi.string().uri().optional().default('https://www.google.com').required(),
    eventDescription: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,1000}$/).required(),
    ticketName: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,300}$/).required(),
    ticketAvailableQty: Joi.number().required(),
    ticketPrice: Joi.string().required().default('Free Ticket'),
    showTicketsremaining: Joi.date().optional(),
    showOrganizerDetails: Joi.date().optional(),
    ticketActivateComments: Joi.string().required(),
    eventlistingPrivacy: Joi.string().required().default('Public Event').default(['Public Event','Private Event']),
    eventCategory: Joi.string().required().default('Other').default(['Arts & Entertainments', 'Charities & Non-Profit', 'Health & Wellness', 'Outdoor & Recreational', 'Business & Networking', 'Religion & Spirituality', 'Community & Culture', 'Family & Education', 'Science & Technology', 'Fashion & Beauty', 'Home & Lifestyle', 'Sports & Fitness', 'Film, Media & Entertainment', 'Music & Audio', 'Government & Politics', 'Travel & Outdoor', 'Hobbies & Special Interest', 'Other']),
    eventFeesSettings: Joi.string().required().default('Pass On').default(['Pass On', 'Absorb Fees']),
    eventAcceptTerms: Joi.string().required(),
    createdAt: Joi.date().default(Date.now),
    lastUpdatedAt: Joi.date().default(Date.now)
});

//Create a schema for updating an Event
const updateEventsSchema = Joi.object({
    eventTitle: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,300}$/).required(),
    eventVenue: Joi.string().required().min(10).max(1000),
    eventAddress: Joi.string().required().min(10).max(1000),
    eventStartDate: Joi.date().required(),
    eventStartTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    eventEndDate: Joi.date().required(),
    eventEndTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    eventImage: Joi.string().uri().optional().default('https://www.google.com').required(),
    eventDescription: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,1000}$/).required(),
    ticketName: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|`~\\/]{3,300}$/).required(),
    ticketAvailableQty: Joi.number().required(),
    ticketPrice: Joi.string().required().default('Free Ticket'),
    showTicketsremaining: Joi.date().optional(),
    showOrganizerDetails: Joi.date().optional(),
    ticketActivateComments: Joi.string().required(),
    eventlistingPrivacy: Joi.string().required().default('Public Event').default(['Public Event','Private Event']),
    eventCategory: Joi.string().required().default('Other').default(['Arts & Entertainments', 'Charities & Non-Profit', 'Health & Wellness', 'Outdoor & Recreational', 'Business & Networking', 'Religion & Spirituality', 'Community & Culture', 'Family & Education', 'Science & Technology', 'Fashion & Beauty', 'Home & Lifestyle', 'Sports & Fitness', 'Film, Media & Entertainment', 'Music & Audio', 'Government & Politics', 'Travel & Outdoor', 'Hobbies & Special Interest', 'Other']),
    eventFeesSettings: Joi.string().required().default('Pass On').default(['Pass On', 'Absorb Fees']),
    eventAcceptTerms: Joi.string().required(),
    lastUpdatedAt: Joi.date().default(Date.now)
});

//create a function (parse it as a Middleware) to validate the 'Event' Object
async function addEventValidationMW(req, res, next){
    const eventsPayLoad = req.body;
    try {
        await eventsSchema.validateAsync(eventsPayLoad);
        next();
        } catch (error) {
    next({
        message: error.details[0].message, status:406
    });
    }
}
//create a function (parse it as a Middleware) to validate the Event when updating
async function updateEventValidationMW(req, res, next) {
    const eventsPayLoad = req.body;
    try {
    await updateEventsSchema.validateAsync(eventsPayLoad);
    next();
    } catch (error) {
    next({
    message: error.details[0].message, status:406
    });
    }
}
//Export the functions
module.exports = {
    addEventValidationMW, 
    updateEventValidationMW
}