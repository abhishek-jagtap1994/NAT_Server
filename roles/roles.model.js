// const { DataTypes } = require('sequelize');
// const Permission = require('./permission.model');
//  //module.exports = model;
// const db = require('../_helpers/db')
// function model(db) {
//     const attributes = {
//         role_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,

//         },
//         role_name: { type: DataTypes.STRING, allowNull: false },
//         role_description: { type: DataTypes.STRING, allowNull: false },
//         role_type: { type: DataTypes.STRING, allowNull: false },
//          activity_id: { type: DataTypes.STRING, allowNull: false },
//          role_status: {
//             type: DataTypes.STRING,
//             defaultValue: "1",
//           },
//      };

//     const options = {
//         defaultScope: {
//             // exclude hash by default
//             attributes: { exclude: [] }
//         },
//         scopes: {
//             // include hash with this scope
//             withHash: { attributes: {}, }
//         }
//     };

//     const Role =  db.define('Role', attributes,  
//     {

//         // don't add the timestamp attributes (updatedAt, createdAt)
//         timestamps: false,
      
//         // If don't want createdAt
//         createdAt: false,
      
//         // If don't want updatedAt
//         updatedAt: false,
        
      
//         // your other configuration here
//         id:false
//       }
//     );


//      Role.hasOne(Permission, { as: 'permission', foreignKey: 'role_id' });
//       Permission.belongsTo(Role, { foreignKey: 'main' });
  
//       module.exports = Role ;

// }




const { DataTypes } = require('sequelize');
const sequelize = require('../_helpers/db.config');
 const Permission = require('./permission.model')
 const RoleActivity = require('./roleactivity.js')
const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    role_name: { type: DataTypes.STRING, allowNull: false },
    role_description: { type: DataTypes.STRING, allowNull: false },
    role_type: { type: DataTypes.STRING, allowNull: false },
     activity_id: { type:  DataTypes.STRING, allowNull: false  },
     role_status: {
        type: DataTypes.STRING,
        defaultValue: "1",
      },
 },
    
    );


 
 // Associations

 //Role.hasOne(Permission); // A HasOne B
 Role.hasOne(Permission );
 Permission.belongsTo(Role );

module.exports = Role;

// Employee.hasOne(Setting);
// Setting.belongsTo(Employee);