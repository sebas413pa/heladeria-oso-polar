const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    id_sabor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sabores',
        key: 'id_sabor'
      }
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_producto" },
        ]
      },
      {
        name: "id_sabor",
        using: "BTREE",
        fields: [
          { name: "id_sabor" },
        ]
      },
    ]
  });
};
