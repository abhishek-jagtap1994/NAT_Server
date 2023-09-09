require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
 const fileupload = require("express-fileupload");
// api routes
app.use('/users', require('./users/users.controller'));
app.use(fileupload());
app.use(express.static("files"));
//app.use('/roles', require('./app/routes/roles.routes.js'));

//app.use('/roles', require('./roles/roles.controller'));
// require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/banner.routes")(app);
require("./app/routes/event.routes")(app);

//app.use('/banners', require('./app/routes/banner.routes'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
