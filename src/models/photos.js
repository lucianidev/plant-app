const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('photos', {
    idphoto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    plant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plants',
        key: 'idplant'
      }
    }
  }, {
    sequelize,
    tableName: 'photos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idphoto" },
        ]
      },
      {
        name: "plant_id_idx",
        using: "BTREE",
        fields: [
          { name: "plant_id" },
        ]
      },
    ]
  });
};
