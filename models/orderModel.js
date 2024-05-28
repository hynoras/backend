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

const PurchaseOrder = sequelize.define("PurchaseOrder", {
    ordId: {
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
    custName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    custPhoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    shippingMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    shippingAddr: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    ordDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
    },
  }, {
    tableName: "PurchaseOrder",
    timestamps: false
  });

module.exports = PurchaseOrder;