const { Sequelize, DataTypes } = require('sequelize');
const Cart = require('./cartModel');
const Product = require('./productModel');

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const CartDetail = sequelize.define('CartDetail', {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'cartId',
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
  currPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  currQuan: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalQuan: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "CartDetail",
  timestamps: false,
});

Cart.belongsToMany(Product, { through: CartDetail, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartDetail, foreignKey: 'prodId' });

module.exports = CartDetail;
