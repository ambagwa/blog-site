const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "Login credebtials are required" });

    // Check if user already exists by email
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ error: "Email already exists" });

    // Check if user already exists by username
    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ error: "Username already exists" });

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Assign a token to the user
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (error) {
    console.error(`Signup error: ${error}`);
    res
      .status(500)
      .json({ error: `Server error dring signup: ${error.message}` });
  }
};

// Login endpoint logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User Not Found" });

    // Mach the passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (error) {
    console.error(`Login error: ${error}`);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};
