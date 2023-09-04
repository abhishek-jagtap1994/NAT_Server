const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
//   this.title = tutorial.title;
//   this.description = tutorial.description;
//   this.published = tutorial.published;

  this.name =  tutorial.name , // replace {{name}} with Adebola
  this.email = tutorial.email ,// replace {{company}} with My Company
  this.phone = tutorial.phone, // replace {{company}} with My Company
  this.message = tutorial.message  
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO contact SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM contact WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (name, result) => {
  let query = "SELECT * FROM contact";

//   if (name) {
//     query += ` WHERE name LIKE '%${name}%'`;
//   }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM contact WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    // `UPDATE contact SET name= '${name}',   email= '${email}' ,  phone= '${phone}'  ,  message= '${message}'
    "UPDATE contact SET name = ?, email = ?, phone = ?, message = ?  WHERE id = ?",
    [tutorial.name, tutorial.email, tutorial.phone, tutorial.message, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM contact WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contact with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM contact", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contact`);
    result(null, res);
  });
};

module.exports = Tutorial;