const sql = require("./db");

// constructor
const Roles = function(tutorial) {
//   this.title = tutorial.title;
//   this.description = tutorial.description;
//   this.published = tutorial.published;

  this.role_name =  tutorial.role_name , // replace {{name}} with Adebola
  this.role_description = tutorial.role_description ,// replace {{company}} with My Company
  this.role_type = tutorial.role_type, // replace {{company}} with My Company
  this.role_status = tutorial.role_status  
 };
//const activityIdsString = Roles.activity_id.join(',');
 
// Convert the array of values to a comma-separated string
 
Roles.create = (newTutorial,activityValues, result) => {
  sql.query("INSERT INTO roles SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // Get the ID of the newly inserted role
    const roleId = res.insertId;

    // Construct the SQL query to insert activity values
    const activityQuery = `
      INSERT INTO permissions (main_role_id, activity_id)
      VALUES ?
    `;

    console.log(activityValues);

    // Convert activityValues into an array of arrays for bulk insert
    const activityValuePairs = activityValues.map(value => [roleId, value.value]);
    // Execute the activity values query
    sql.query(activityQuery, [activityValuePairs], (error, activityResults, fields) => {
      if (error) {
        console.error('Error inserting activity values:', error);
      } else {
        console.log('Inserted successfully:', activityResults);
      }
    //console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
});
}



// Roles.permissions = (activityValues, result) => {
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

Roles.findById = (id, result) => {
  sql.query(`SELECT * FROM roles WHERE role_id = ${id}`, (err, res) => {
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

Roles.getAll = (name, result) => {
  // let query = "SELECT * FROM roles";
  let query = " SELECT roles.*, GROUP_CONCAT(permissions.activity_id) AS activity_values  FROM roles  LEFT JOIN permissions ON roles.role_id = permissions.main_role_id  GROUP BY roles.role_id"
 
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

Roles.getAllPublished = result => {
  sql.query("SELECT * FROM roles WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roles: ", res);
    result(null, res);
  });
};

Roles.updateById = (id, tutorial, result) => {
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

Roles.remove = (id, result) => {
  sql.query("DELETE FROM roles WHERE role_id = ?", id, (err, res) => {
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

Roles.removeAll = result => {
  sql.query("DELETE FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contact`);
    result(null, res);
  });
};

module.exports = Roles;