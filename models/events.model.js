const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define The 'Events' Schema 
const eventsSchema = new Schema({
    eventTitle: {type:String, required:false},
    eventVenue: {type:String, required:false},
    eventAddress: {type:String, required:true},
    eventStartDate: {type:Date, required:false},
    eventStartTime: {type: String, required: false, validate:/^([01]\d|2[0-3]):([0-5]\d)$/}, 
    eventEndDate: {type:Date, required:false},
    eventEndTime: {type: String, required: false, validate:/^([01]\d|2[0-3]):([0-5]\d)$/},
    eventImage: { type: String, required: false, validate:{validator: function(v) {return /^(ftp|http|https):\/\/[^ "]+$/.test(v)}, message:'Please provide a valid URL for the event image'}},
    eventDescription: {type:String, required:false},
    ticketName: {type:String, required:false},
    ticketAvailableQty: {type:Number, required:false},
    ticketPrice: {type:String, required:true, default:'Free Ticket'},
    showTicketsremaining: {type:String, required:false},
    showOrganizerDetails: {type:String, required:false},
    ticketActivateComments: {type:String, required:false},
    eventlistingPrivacy: {type:String, required:false, default:'Public Event', enum:['Public Event','Private Event']},
    eventCategory: {type:String, required:true, default:'Arts & Entertainments',
        enum:['Arts & Entertainments', 'Charities & Non-Profit', 'Health & Wellness', 'Outdoor & Recreational', 'Business & Networking', 'Religion & Spirituality', 'Community & Culture', 'Family & Education', 'Science & Technology', 'Fashion & Beauty', 'Home & Lifestyle', 'Sports & Fitness', 'Film, Media & Entertainment', 'Music & Audio', 'Government & Politics', 'Travel & Outdoor', 'Hobbies & Special Interest', 'Other']},
    eventFeesSettings: {type:String, required:false, default:'Pass On', enum:['Pass On', 'Absorb Fees']},
    eventAcceptTerms: {type:String, required:false},
    createdAt: {type:Date, default:Date.now},
    lastUpdatedAt: {type:Date, default:Date.now},
});
//export the model. The first argument is the collection name in the database. The collecton name will be ('Events') in the DB.
const eventsModel = mongoose.model('events', eventsSchema);
module.exports = eventsModel;