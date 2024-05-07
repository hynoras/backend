const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb",{
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
      },
      retry: {
        max: 5 // Maximum number of retries
      }
});

const saltRounds = 8;

const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "User",
    timestamps: false
  });
  

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

module.exports = User;
