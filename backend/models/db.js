const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: true,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const Image = sequelize.define("Image", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
  },
  detection: {
    type: DataTypes.JSON,
  },
});

const Admin = sequelize.define("Admin", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized.");
});

exports.Image = Image;
exports.Admin = Admin;
exports.testConnection = testConnection;
