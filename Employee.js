const { Sequelize, sequelize } = require('./database');

const Employee = sequelize.define('Employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'last_name',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'updated_at'
  },
}, {
  underscored: true,
});

module.exports = Employee;