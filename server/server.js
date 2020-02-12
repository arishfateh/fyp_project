const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

///////////

const attractionpoint = require("./routes/api/attractionpoints");
const city = require("./routes/api/city");

const route = require("./routes/api/routes");

//////


const dealers = require("./routes/api/dealers");

const property = require("./routes/api/propertys");

const itinerarys = require("./routes/api/itinerary");

const users = require("./routes/api/users");

const app = express();

// Body parser Middleware
// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );
// app.use(bodyParser.json());

app.use(bodyParser.json({ extended: false, limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb' }));
//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo Db
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("MongoDb Connected");
    })
    .catch(err => {
        console.log(err);
    });

//Passport middleware
app.use(passport.initialize());

// //Passport Config
require('./config/passport')(passport);

app.use(cors());

/////////////
app.use("/attractionpoint", attractionpoint);
app.use("/city", city);
app.use("/route", route);
///////
// //use routes
app.use("/dealers", dealers);
app.use("/property", property);

app.use("/itinerary", itinerarys);

app.use("/users", users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
