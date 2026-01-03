const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//create a token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const SALT_LENGTH = 12;

/*--------SIGNUP CONTROLLER--------*/
const signUp = async (req, res) => {
  //deconstruct username and passowrd from User model
  const { username, email, password } = req.body;

  try {
    // checks to see if a username is already in the database
    const userExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (userExists || emailExists)
      return res
        .status(400)
        .json({ message: "Username or Email already taken" });
    //creates a user with a hashedpassword
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //runs the createToken function and passes in user._id
    const token = createToken(user.id);
    console.log(token);
    res.json({ message: "User Created and logged in", token, user });
  } catch (error) {
    return res.status(400).json({ message: "Error with signup", error });
  }
};

/*--------LOGIN CONTROLLER--------*/
const login = async (req, res) => {
  //deconstruct username and passowrd from User model
  const { username, email, password } = req.body;

  try {
    //check that username exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Username does not exist" });
    //check that password matches db hashed password
    const matchPasswords = bcrypt.compareSync(password, user.password);
    if (!matchPasswords)
      return res.status(400).json({ message: "Password is incorrect" });
    //give it a token
    const token = createToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { signUp, login };
