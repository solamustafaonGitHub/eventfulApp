const express = require('express')
const eventPltfUsersModel = require('../models/eventusers.model')
const eventsModel = require('../models/events.model')
const {addEventUserValidationMW, updateEventUserValidationMW} = require('../validators/eventusers.validators')
const {addEventValidationMW , updateEventValidationMW} = require('../validators/events.validators')
const eventUserController = require('../controllers/eventusers.controller')

const viewsRouter = express.Router()  ;

//Define a route to render the home.ejs template
viewsRouter.get('/', (req,res) =>{
  res.render('home')
})

// Define a route to render the display the 'Register' a NewUser Page/Pop-up Page
viewsRouter.get('/views/registerusers', (req,res) =>{
  res.render('registerusers')
})

//Define a Route that will 'Register a new 'Event User'
viewsRouter.post('/views/registerusers', addEventUserValidationMW, async(req,res) =>{
    try{
      const newEventUser = new eventPltfUsersModel({
        eventPltUsername: req.body.eventPltUsername,
        eventPltUserEmail: req.body.eventPltUserEmail,
        eventPltUserPassword: req.body.eventPltUserPassword
      })
      await newEventUser.save();
      res.render('successfullyregeventuser')
    }
    catch(err){
      console.error(err)
      res.render('unsuccessfulregeventuser', {errorMessage:'User Registration Failed. Its Possible User Info Already Exists. The Same User Info Information Cannot Be Saved Twice!!!'})
    }
  })

// Define a route to render the display the 'loginuser' page
viewsRouter.get('/views/loginuser', (req, res) =>{
  res.render('loginuser')
})

//Define a Route that will (POST) Login a user
viewsRouter.post('/views/loginuser', async (req, res) => {
    try {
      const {eventPltUserEmail, eventPltUserPassword} = req.body;
      const eventUser = await eventPltfUsersModel.findOne({eventPltUserEmail});
      if (eventUser && eventUser.eventPltUserPassword === eventPltUserPassword) {
        res.render('dashboard');
      } else {
        res.render('unsuccessfuluserlogin', {errorMessage:'Invalid Email or Password'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An Error Occurred During Login');
    }
  });

  // ===================================EVENTS==================================
  //Define a Route that will view All 'Events'
  viewsRouter.get('/views/events', (req, res) => {
    res.render('events');
  });

  //Define a Route hat will GET the 'createEvent' Page
  viewsRouter.get('/views/registerevents', (req, res) => {
    res.render('registerevents');
  })

  //Define a Route that will '(POST)Create An Event'
  viewsRouter.post('/views/registerevents', addEventValidationMW, async(req,res) =>{
    try{
      const newEvent = new eventsModel({
        eventTitle: req.body.eventTitle,
        eventVenue: req.body.eventVenue,
        eventAddress: req.body.eventAddress,
        eventStartDate: req.body.eventStartDate,
        eventStartTime: req.body.eventStartTime,
        eventEndDate: req.body.eventEndDate,
        eventEndTime: req.body.eventEndTime,
        eventImage: req.body.eventImage,
        eventDescription: req.body.eventDescription,
        ticketName: req.body.ticketName,
        ticketAvailableQty: req.body.ticketAvailableQty,
        ticketPrice: req.body.ticketPrice,
        showTicketsremaining: req.body.showTicketsremaining,
        showOrganizerDetails: req.body.organizerDetails,
        ticketActivateComments: req.body.ticketActivateComments,
        eventListingPrivacy: req.body.evenListingPrivacy,
        eventCategory: req.body.eventCategory,
        eventFeesSettings: req.body.eventFeesSettings,
        eventAcceptTerms: req.body.eventCreateTerms
      })
      await newEvent.save();
      res.render('dashboard')
    }
    catch(err){
      console.error(err)
      res.status(500).send('Event Info Information cannot be saved')
    }
  })

module.exports = viewsRouter;