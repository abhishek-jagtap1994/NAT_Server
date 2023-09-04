// routes





// router.post('/authenticate', authenticateSchema, authenticate);
// router.post('/insert', registerSchema, insert);
// router.get('/', authorize(), getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);


module.exports = app => {
    const roles = require("../controllers/roles.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/insert", roles.create);
  
    // Retrieve all roles
    router.get("/", roles.findAll);
  
    // Retrieve all published roles
    router.get("/published", roles.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", roles.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", roles.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", roles.delete);
  
    // Delete all roles
    router.delete("/", roles.deleteAll);
  
   app.use('/roles', router);
  };