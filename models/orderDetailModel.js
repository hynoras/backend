const { Sequelize, DataTypes } = require('sequelize');
const Product = require('./productModel');
const PurchaseOrder = require('./orderModel');

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const OrderDetail = sequelize.define('OrderDetail', {
  ordId: {
    type: DataTypes.INTEGER,
    references: {
      model: PurchaseOrder,
      key: 'ordId',
    },
    primaryKey: true,
  },
  prodId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'prodId',
    },
    primaryKey: true,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  totalQuan: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "OrderDetail",
  timestamps: false,
});

PurchaseOrder.belongsToMany(Product, { through: OrderDetail, foreignKey: 'ordId' });
Product.belongsToMany(PurchaseOrder, { through: OrderDetail, foreignKey: 'prodId' });

module.exports = OrderDetail;
