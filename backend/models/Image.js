const { DataTypes } = require('sequelize');
const {Sequelize} = require('sequelize');

const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize('labor_hf', 'benedek', 'benedek', {
    host: DB_HOST,
    dialect: 'mysql',
  });

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


const Image = sequelize.define('Image', {
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING
  },
  detection: {
    type: DataTypes.JSON
  }
});

sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized.");
});

exports.Image = Image;