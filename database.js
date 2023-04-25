const Sequelize = require('sequelize');

const sequelize = new Sequelize('employee_registration', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = {
  sequelize,
  Sequelize,
};
