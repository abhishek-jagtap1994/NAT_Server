import Sequelize from 'sequelize'
import config from '../config.js'

// 实例化sequelize
export const sequelize = new Sequelize(config)

export const Role  = sequelize.import('../roles/roles.model')

export const Permission = sequelize.require('../roles/permission.model');

const RoleActivity = sequelize.require('./roleactivity.js');


Role.belongsToMany(Permission, { through: RoleActivity, foreignKey: 'role_id' });

Permission.belongsToMany(Role, { through: RoleActivity, foreignKey: 'activity_id' });
