const Event = require("../models/event.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {



    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  // Create a new Date object to get the current date
const currentDate = new Date();

// Get the year, month, and day components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');


    const newpath = __dirname + "/files/" 
    console.log(newpath);
    const file = req.files.file;
    const filename = file.name;
   
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
         console.log(err);
         console.log(newpath);
      }
    });


    const newpath2 = __dirname + "/files/" 
    console.log(newpath2);
    const venuefile = req.files.venuefile;
    const venuefileName = venuefile.name;
   
venuefile.mv(`${newpath2}${venuefileName}`, (err) => {
      if (err) {
         console.log(err);
         console.log(newpath2);
      }

    });


    const newpath3 = __dirname + "/files/" 
    console.log(newpath3);
    const coursefile = req.files.coursefile;
    const coursefileName = coursefile.name;
        
coursefile.mv(`${newpath3}${coursefileName}`, (err) => {
      if (err) {
         console.log(err);
         console.log(newpath3);
      }

    });


const application = req.body.biodata;
 const resumeName = JSON.parse(application) ;

 //const AppliedFor = resumeName.mailerState.apply;

    // Create a Tutorial
   
    let post =   {
        ev_created_date: `${year}-${month}-${day}`, 
        ev_thumbnail: `${filename}`,
        ev_venue_image: `${venuefileName}`,
        ev_course_file: `${coursefileName}`,
        ev_cme: resumeName.mailerState.ev_cme,
        ev_cat: resumeName.mailerState.ev_cat,
        ev_title: resumeName.mailerState.ev_title,
        ev_link: resumeName.mailerState.ev_link,
        ev_time: resumeName.mailerState.ev_time,
        ev_duration: resumeName.mailerState.ev_duration,
        ev_venue_address: resumeName.mailerState.ev_venue_address,
        ev_fees: resumeName.mailerState.ev_fees
    
    };
    // Save Tutorial in the database
    Event.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else
      
      Event.getAll(post.ev_title, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        else 
        res.send({status: "success",
        result:data});
        console.log({status: "success",
        result:data});
      });
      
    //   res.send({status: "success",
    //   result2:"data"} ); 
    //   console.log({status: "success",
    //   result:data});
    });



  };

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Event.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send({status: "success",
      result:data});
    //   console.log({status: "success",
    //   result:data});
    });
  };
  

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Event.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log("post",req.body);
  
    Event.updateById(
      req.params.id,
      new Tutorial(req.body.mailerState),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send({
            status: "success",
            result:data
           });
      }
    );
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Event.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else 

      
      Event.getAll(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        else 
        res.send({status: "success",
        result:data});
        // console.log({status: "success",
        // result:data});
      });
    });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};