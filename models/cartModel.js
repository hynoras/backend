const { Sequelize, DataTypes } = require("sequelize");
const User = require("./userModel");

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const Cart = sequelize.define("Cart", {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'userId',
        },
    },
  }, {
    tableName: "Cart",
    timestamps: false
  });

module.exports = Cart;