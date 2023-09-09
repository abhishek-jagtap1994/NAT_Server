const sql = require("./db");

// constructor
const Banner = function(tutorial) {
//   this.title = tutorial.title;
//   this.description = tutorial.description;
//   this.published = tutorial.published;

  this.banner_act =  tutorial.banner_act , // replace {{name}} with Adebola
  this.banner_uploaded = tutorial.banner_uploaded ,// replace {{company}} with My Company
  this.banner_path = tutorial.banner_path // replace {{company}} with My Company
  };
 
// Convert the array of values to a comma-separated string
 
Banner.create = (newTutorial, result) => {
  sql.query("INSERT INTO banner SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else{
        result(null, { id: res.insertId, ...newTutorial });

    }

     
 
   
});
}



// Banner.permissions = (activityValues, result) => {
//     sql.query("INSERT INTO permissions SET ?", activityValues, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }
  
     
//       //console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
//       result(null, { id: res.insertId, ...newTutorial });
//     });
//   };

Banner.findById = (id, result) => {
  sql.query(`SELECT * FROM banner WHERE banner_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Role: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Banner.getAll = (name, result) => {
  // let query = "SELECT * FROM roles";
  let query = " SELECT banner.*  FROM banner "
 
  sql.query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }

   // console.log("roles: ", res);
    result(null, res);
  });
};

Banner.getAllPublished = result => {
  sql.query("SELECT * FROM banner  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roles: ", res);
    result(null, res);
  });
};

Banner.updateById = (id, tutorial, result) => {
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

Banner.remove = (id, result) => {
  sql.query("DELETE FROM banner WHERE banner_id  = ?", id, (err, res) => {
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

Banner.removeAll = result => {
  sql.query("DELETE FROM banner", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contact`);
    result(null, res);
  });
};

module.exports = Banner;