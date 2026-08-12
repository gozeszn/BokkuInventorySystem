const { default: mongoose } = require("mongoose");
const User = require("../Models/user");
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, PhoneNumber, gender, HasAdminAcess, role } =
      req.body;
      console.log('request body:', req.body);
    //check all fields are provided

    if (!name || !email || !password || !PhoneNumber || !gender) {
      return res.status(401).json({ message: "Please return all the required fields" });
    }
    //check for email
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(201).json({ message: "this Email exists" });
    }

    //checks for Phone number
    const UserPhoneNumber = await User.findOne({
      PhoneNumber: req.body.PhoneNumber
    });
    if (UserPhoneNumber) {
      return res.status(400).json({ message: "Phone number has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name,
      email,
      password: passwordHash,
      PhoneNumber,
      gender,
      HasAdminAcess,
      role: role || "user" //default role is user
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password. Enter Valid Password" });
    }

    //generate jwt
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { userId: user._id , //these constitute the Payload
       email: user.email ,
       name: user.name ,
       role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(201).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
