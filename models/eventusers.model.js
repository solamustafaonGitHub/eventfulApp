const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define The 'eventPlatformUsers' Schema 
const eventPltformUsersSchema = new Schema({
    eventPltUsername: {type:String, required:true, unique:[true, 'Username Must Be Unique']},
    eventPltUserEmail: {type:String, required:true, unique:[true, 'Customer Email Must Be Unique']},
    eventPltUserPassword: {type:String, required:true},
    createdAt: {type:Date, default:Date.now},
    lastUpdatedAt: {type:Date, default:Date.now}
});
//export the model. The first argument is the collection name in the database. The collecton name will be 'eventUsers' in the DB)
const eventPltfUsersModel = mongoose.model('eventUsers', eventPltformUsersSchema);
module.exports = eventPltfUsersModel;