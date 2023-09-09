
module.exports = app => {
    const events = require("../controllers/event.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", events.create);
  
    // Retrieve all events
    router.get("/", events.findAll);
  
    // Retrieve all published events
    router.get("/published", events.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", events.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", events.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", events.delete);
  
    // Delete all events
    router.delete("/", events.deleteAll);
  
   app.use('/events', router);
  };