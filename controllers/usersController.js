// let users = require('../data/users');

// // Get all users
// exports.getUsers = (req, res) => {
//   res.json(users);
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Get user by ID
// exports.getUserById = (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   res.json(user);
// };

// // Create user
// exports.createUser = (req, res) => {
//   const { name, email } = req.body;
//   const newUser = {
//     id: users[users.length - 1].id + 1 ,
//     name,
//     email
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// };

// // Update user
// exports.updateUser = (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   user.name = req.body.name || user.name;
//   user.email = req.body.email || user.email;
//   res.json(user);
// };

// // Delete user
// exports.deleteUser = (req, res) => {
//   users = users.filter(u => u.id !== parseInt(req.params.id));
//   res.json({ message: 'User deleted' });
// };

const User = require('../model/user');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};