
module.exports = app => {
    const banners = require("../controllers/banner.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", banners.create);
  
    // Retrieve all banners
    router.get("/", banners.findAll);
  
    // Retrieve all published banners
    router.get("/published", banners.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", banners.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", banners.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", banners.delete);
  
    // Delete all banners
    router.delete("/", banners.deleteAll);
  
   app.use('/banners', router);
  };