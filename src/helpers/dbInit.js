const sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DB_PASS);
const db = new sequelize.Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: 3307,
  dialect: 'mysql'
});


module.exports = db;