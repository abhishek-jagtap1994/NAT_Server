const { DataTypes } = require('sequelize');
const db = require('../_helpers/db.config');

const RoleActivity = db.define('RoleActivity', {
  // No need for specific fields in this model
});

module.exports = RoleActivity;