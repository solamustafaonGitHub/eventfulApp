const mongoose = require('mongoose')
const CONFIG = require('../config/config')


function connectToDB(){
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB Connection is Successful!')
    })
    mongoose.connection.on('error', (err)=>{
        console.log('MongoDB Connection Error', err)
    })
}
module.exports= connectToDB;