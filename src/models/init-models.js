var DataTypes = require("sequelize").DataTypes;
var _photos = require("./photos");
var _plants = require("./plants");
var _users = require("./users");

function initModels(sequelize) {
  var photos = _photos(sequelize, DataTypes);
  var plants = _plants(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  photos.belongsTo(plants, { as: "plant", foreignKey: "plant_id"});
  plants.hasMany(photos, { as: "photos", foreignKey: "plant_id"});

  return {
    photos,
    plants,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
