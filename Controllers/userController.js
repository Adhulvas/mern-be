const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../Model/userModel');


const userSignup = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExist = await User.findOne({ email});
    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }


    const matchedPassword = await bcrypt.compare(password, userExist.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports={userLogin,userSignup}

