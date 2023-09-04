const Roles = require("../models/roles.model");

// Create and Save a new Roles
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Roles
    const roles = new Roles({
  
    role_name:  req.body.role_name, // replace {{name}} with Adebola
    role_description: req.body.role_description,// replace {{company}} with My Company
    role_type: req.body.role_type, // replace {{company}} with My Company
    activity_id: req.body.activity_id, // replace {{company}} with My Company
 role_status: "1"  

    });
    //console.log(req.body.activity_id);
    //console.log(JSON.stringify(req.body.activity_id));

    // Save Tutorial in the database

    //const activityValues = req.body.activity_id.map(activity => activity.value);
    const activityValues = req.body.activity_id;

    Roles.create(roles,activityValues, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Roles."
        });
      else
      

    //  console.log(activityValues);

    //   Roles.permissions(activityValues, (err, data) => {

    //     if (err)
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while creating the Roles."
    //       });
    //     else
    //      res.send({status: "success",
    //     result2:data.id} ); 
     
    //   });

      
      
    //   Roles.getAll(roles.role_status, (err, data) => {
    //     if (err)
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while retrieving Roles."
    //       });
    //     else 
    //     res.send({status: "success",
    //     result:data});
    //     console.log({status: "success",
    //     result:data});
    //   });
      
      res.send({status: "success",
      result2:data.id} ); 
    //   console.log({status: "success",
    //   result:data});
    });



  };

// Retrieve all Roles from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Roles.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Roles."
        });
      else res.send({status: "success",
      result:data});
      // console.log({status: "success",
      // result:data});
    });
  };
  

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Roles.findById(req.params.id, (err, data) => {
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

// find all published Roles
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
  
    Roles.updateById(
      req.params.id,
      new Roles(req.body.mailerState),
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
    Roles.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Roles with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Roles with id " + req.params.id
          });
        }
      } else 

      
      Roles.getAll(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Roles."
          });
        else 
        res.send({status: "success",
        result:data});
        console.log({status: "success",
        result:data});
      });
    });
  };

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  
};