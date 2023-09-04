// const { DataTypes } = require('sequelize');

// //module.exports = model;
// const db = require('../_helpers/db')

// function model(sequelize) {
//     const attributes = {
//         permission_id : {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,

//         },
//         main_role_id : { type: DataTypes.INTEGER, allowNull: false },
//         permission_text: { type: DataTypes.STRING, allowNull: false },
//         activity_id: { type: DataTypes.INTEGER, allowNull: false },
        
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

//     const Permission = db.define('Permission', attributes,  
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

//     Permission.associate = (models) => {
//         Permission.belongsTo(models.Role, {foreignKey: 'role_id', as: 'permission'});
//       };

//       module.exports = Permission ;

// }

 

const { DataTypes } = require('sequelize');
const sequelize = require('../_helpers/db.config');
const Role = require('./roles.model')
 const RoleActivity = require('./roleactivity.js');

const Permission = sequelize.define('Permission', {
            permission_id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
    
            },
            main_role_id : { type: DataTypes.INTEGER, allowNull: false },
            permission_text: { type: DataTypes.STRING, allowNull: false },
            activity_id: { type: DataTypes.STRING, allowNull: false },
            
         }
         
         
       
        ); 
        //  Permission.belongsTo(Role, {as: 'Role', foreignKey: 'main_role_id'});
        // Permission.associate = (models) => {
        //     Permission.belongsTo(models.Role, {foreignKey: 'main_role_id', as: 'Role'});
        //   };

module.exports = Permission ;

