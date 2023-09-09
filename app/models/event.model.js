const sql = require("./db");

// constructor
const Event = function(tutorial) {
//   this.title = tutorial.title;
//   this.description = tutorial.description;
//   this.published = tutorial.published;

  this.event_act =  tutorial.event_act , // replace {{name}} with Adebola
  this.event_uploaded = tutorial.event_uploaded ,// replace {{company}} with My Company
  this.event_path = tutorial.event_path // replace {{company}} with My Company
  };
 
// Convert the array of values to a comma-separated string
 
Event.create = (newTutorial, result) => {
  sql.query("INSERT INTO events SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else{
        result(null, { id: res.insertId, ...newTutorial });

    }

     
 
   
});
}



// Event.permissions = (activityValues, result) => {
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

Event.findById = (id, result) => {
  sql.query(`SELECT * FROM events WHERE ev_id = ${id}`, (err, res) => {
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

Event.getAll = (name, result) => {
  // let query = "SELECT * FROM roles";
  let query = " SELECT events.*  FROM events "
 
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

Event.getAllPublished = result => {
  sql.query("SELECT * FROM events  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roles: ", res);
    result(null, res);
  });
};

Event.updateById = (id, tutorial, result) => {
  sql.query(
    // `UPDATE contact SET name= '${name}',   email= '${email}' ,  phone= '${phone}'  ,  message= '${message}'
    "UPDATE events SET name = ?, email = ?, phone = ?, message = ?  WHERE id = ?",
    [tutorial.ev_venue_address, tutorial.ev_title, tutorial.ev_duration, tutorial.ev_fees, id],
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

Event.remove = (id, result) => {
  sql.query("DELETE FROM events WHERE ev_id  = ?", id, (err, res) => {
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

Event.removeAll = result => {
  sql.query("DELETE FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contact`);
    result(null, res);
  });
};

module.exports = Event;