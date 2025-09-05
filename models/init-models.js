var DataTypes = require("sequelize").DataTypes;
var _DetalleVenta = require("./DetalleVenta");
var _Ventas = require("./Ventas");
var _clientes = require("./clientes");
var _productos = require("./productos");
var _sabores = require("./sabores");

function initModels(sequelize) {
  var DetalleVenta = _DetalleVenta(sequelize, DataTypes);
  var Ventas = _Ventas(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var sabores = _sabores(sequelize, DataTypes);

  Ventas.belongsTo(Clientes, { as: "id_cliente_Cliente", foreignKey: "id_cliente"});
  Clientes.hasMany(Ventas, { as: "Venta", foreignKey: "id_cliente"});
  DetalleVenta.belongsTo(Productos, { as: "id_producto_Producto", foreignKey: "id_producto"});
  Productos.hasMany(DetalleVenta, { as: "DetalleVenta", foreignKey: "id_producto"});
  productos.belongsTo(Sabores, { as: "id_sabor_Sabore", foreignKey: "id_sabor"});
  Sabores.hasMany(productos, { as: "productos", foreignKey: "id_sabor"});
  DetalleVenta.belongsTo(Ventas, { as: "id_venta_Venta", foreignKey: "id_venta"});
  Ventas.hasMany(DetalleVenta, { as: "DetalleVenta", foreignKey: "id_venta"});

  return {
    DetalleVenta,
    Ventas,
    clientes,
    productos,
    sabores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
