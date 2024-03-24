const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config');
const connectToDB = require('./db/mongodb');
const path = require('path');   

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100});

const morgan = require('morgan');
const cors = require('cors');
const logger = require('./loggingFunctionality/logger');

const viewsRouter = require('./routes/views.route')
const eventUsersRouter = require('./routes/eventusers.route');
const eventsRouter = require('./routes/events.route');

const app = express();

connectToDB();

//Body Parser MW
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//View Engine Setup
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//logger MW
app.use(morgan('dev'));

//CORS MW (Front-end is hosted on a different domain. 
//CORS handling allows requests from the front-end to be accepted by the server)
app.use(cors());

//Helmet MW (Helmet helps you secure your Express apps by setting various HTTP headers. 
//It's not a silver bullet, but it can help!)
app.use(helmet());

//Rate Limiter MW (Rate limiting is a way to limit the number of requests that can be made to a server. This can be used to mitigate a DDoS attack)
//From the above, windowMs=15 minutes and max=100 requests means that a user can only make 100 requests in 15 minutes.
app.use(limiter);


app.use('/', viewsRouter);

app.use('/eventUsers', eventUsersRouter)
app.use('/events', eventsRouter)

app.use('/views/registerusers', viewsRouter);
app.use('/views/loginuser', viewsRouter);

app.use('/views/registerevents', viewsRouter);
app.use('/views/events', viewsRouter);


//MW that will handle errors
app.use((err, req, res, next) => {
    logger.error(err.message);
    const errorStatus = err.status || 500;
    res.status(errorStatus).send(err.message);
    //res.send('<h1 style="color:red;">Requested Url was not found</h1>')
    next();
});
    
//Start the server
app.listen(CONFIG.PORT, () =>{
    logger.info(`Server is running on port http://localhost:${CONFIG.PORT}`)
});