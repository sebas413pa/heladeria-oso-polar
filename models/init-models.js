var DataTypes = require("sequelize").DataTypes;
var _clientes = require("./clientes");
var _detalleventa = require("./detalleventa");
var _productos = require("./productos");
var _sabores = require("./sabores");
var _ventas = require("./ventas");

function initModels(sequelize) {
  var clientes = _clientes(sequelize, DataTypes);
  var detalleventa = _detalleventa(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var sabores = _sabores(sequelize, DataTypes);
  var ventas = _ventas(sequelize, DataTypes);

  ventas.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(ventas, { as: "venta", foreignKey: "id_cliente"});
  detalleventa.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(detalleventa, { as: "detalleventa", foreignKey: "id_producto"});
  productos.belongsTo(sabores, { as: "id_sabor_sabore", foreignKey: "id_sabor"});
  sabores.hasMany(productos, { as: "productos", foreignKey: "id_sabor"});
  detalleventa.belongsTo(ventas, { as: "id_venta_venta", foreignKey: "id_venta"});
  ventas.hasMany(detalleventa, { as: "detalleventa", foreignKey: "id_venta"});

  return {
    clientes,
    detalleventa,
    productos,
    sabores,
    ventas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
