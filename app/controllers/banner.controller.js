const Banner = require("../models/banner.model.js");

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
  // const application = req.body.biodata;
   

//console.log( AppliedFor );
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        // res.json({ message: "File upload failed", code: 200,   status: "fail" });
         console.log(err);
         console.log(newpath);
      }
  //     res.json({ message: "File Uploaded", code: 200 ,      status: "success",
  // });
    });
    // Create a Tutorial
   
    let post =   {
        banner_act: '1', 
        banner_uploaded: `${year}-${month}-${day}`, 
          banner_path: `${filename}` };
    // Save Tutorial in the database
    Banner.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Banner."
        });
      else
      
      Banner.getAll(post.banner_path, (err, data) => {
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
  
    Banner.getAll(name, (err, data) => {
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
    Banner.findById(req.params.id, (err, data) => {
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
  
    Banner.updateById(
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
    Banner.remove(req.params.id, (err, data) => {
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

      
          Banner.getAll(req.params.id, (err, data) => {
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
    });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};