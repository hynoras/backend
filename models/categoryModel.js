const { Sequelize, DataTypes } = require("sequelize");
const Product = require("./productModel");

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const Category = sequelize.define("Category", {
    catId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    prodId: {
      type: DataTypes.INTEGER,        
      references: {
        model: Product,
        key: 'prodId',
    },
      primaryKey: true,
    },
  }, {
    tableName: "Category",
    timestamps: false
  });

  Product.hasMany(Category, { foreignKey: 'prodId' });

module.exports = Category;