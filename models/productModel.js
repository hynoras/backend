const { Sequelize, DataTypes } = require("sequelize");
const Category = require("./categoryModel");

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const Product = sequelize.define("Product", {
    prodId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prodName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    prodDesc: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    prodPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: false,
    },
    prodQuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    prodImg: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
  }, {
    tableName: "Product",
    timestamps: false
  });

    Product.hasMany(Category, { foreignKey: 'prodId' });
    Category.belongsTo(Product, { foreignKey: 'prodId' });

module.exports = Product;