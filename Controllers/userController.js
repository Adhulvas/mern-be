const USER = require('../Model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const userSignup = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, password, mobile } = req.body;
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new USER({
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
    console.log(req.body);

    const user = await USER.findOne({ name: req.body.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_PASSWORD,
      { expiresIn: '1m' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports={userLogin,userSignup}

