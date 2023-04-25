const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('./Employee');
const User = require('./User');
const authMiddleware = require('./authMiddleware'); 

router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const employee = await Employee.create({ firstName, lastName, email, age });
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error });
  }
});

// router.post('/register-user', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.create({ email, password });
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(400).json({ message: 'Error registering user', error });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', user });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
});

router.get('/employees', authMiddleware, async (req, res) => {
try {
  const employees = await Employee.findAll();
  res.json(employees);
} catch (error) {
  console.error('Error fetching employees:', error);
  res.status(500).json({ message: 'Internal server error' });
}
});

router.put('/employees/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age } = req.body;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update({ firstName, lastName, email, age });

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error });
  }
});

router.delete('/employees/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employee', error });
  }
});

module.exports = router;
