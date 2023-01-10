const bcrypt = require("bcryptjs");
const User = require("../models/userschema");

//regiter a user
const register = async (req, res) => {
  const { name, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  // let UserModel = new User();
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const newUser = new User({
    name: name,
    password: hashedPassword,
    email: email,
  });

  try {
    await newUser.save();
  } catch (err) {
    res.json({ error: "Signup Failed", errorDetail: err });
  }

  res.status(201).json({ newUser });
};

//login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successful", user: existingUser });
};

//get all users
const getAllUsers = async (req, res) => {
  let allusers;
  try {
    allusers = await User.find({});
  } catch (error) {
    return console.log(error);
  }
  if (!allusers) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ allusers });
};

//get a single user by id
const getUserById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }
  res.json({ user: user });
};

//updating the user info
const updateUser = async (req, res) => {
  const { name, password } = req.body;
  const uid = req.params.id;
  let result;
  try {
    result = await User.findByIdAndUpdate(uid, {
      name,
      password,
    });
  } catch (err) {
    res.status(400).json({ message: "Failed" });
    return;
  }

  res.json({ message: "User Info Updated Successfully" });
};

exports.getUserById = getUserById;
exports.register = register;
exports.login = login;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
