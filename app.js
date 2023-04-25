const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./User');
const { sequelize } = require('./database');
const fs = require('fs');
const path = require('path');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

const seedDatabase = async () => {
  try {
    const seedFilePath = path.join(__dirname, 'seed.sql');
    const seedSql = fs.readFileSync(seedFilePath, 'utf8');
    await sequelize.query(seedSql);
    console.log('Database seeded');
  } catch (error) {
    console.error('Error seeding database', error);
  }
};

sequelize
  .sync()
  .then(() => {
    console.log('Database sync complete');
    seedDatabase();
  })
  .catch((error) => {
    console.error('Error syncing database', error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
