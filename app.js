const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config');
const connectToDB = require('./db/mongodb');
const path = require('path');   

const app = express();

connectToDB();

const viewsRouter = require('./routes/views.route')
const eventUsersRouter = require('./routes/eventusers.route');
const eventsRouter = require('./routes/events.route');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//View Engine Setup
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewsRouter);

app.use('/eventUsers', eventUsersRouter)
app.use('/events', eventsRouter)

app.use('/views/registerusers', viewsRouter);
app.use('/views/loginuser', viewsRouter);

app.use('/views/registerevents', viewsRouter);
app.use('/views/events', viewsRouter);

//Error Handling
app.use((err, req, res,next) => {
console.log(err.message);
const errorStatus = err.status
res.status(errorStatus).send(err.message);
//res.send('<h1 style="color:red;">Requested Url was not found</h1>')
next();
});
    
//Start the server
app.listen(CONFIG.PORT, () =>{
    console.log(`Server is running on port http://localhost:${CONFIG.PORT}`)
});