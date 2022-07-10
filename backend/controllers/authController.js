import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Register user
export async function registerUser(req, res) {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    // Check for existing user
    const userExists = await User.findOne({ username });

    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    // All good
    // const hashedPassword = await argon2.hash(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const newUser = new User({ username, password: hashedPassword });
    // await newUser.save();

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered in successfully",
        accessToken: generateToken(newUser._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid User Data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Login user
export async function loginUser(req, res) {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Incorrect username or password" });

    // // Username found
    // const passwordValid = await argon2.verify(user.password, password);
    // if (!passwordValid)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Incorrect username or password" });

    // res.status(200).json({
    //   success: true,
    //   message: "User logged in successfully",
    //   accessToken: generateToken(user._id),
    // });

    if (user && (await user.comparePassword(password))) {
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken: generateToken(user._id),
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
  } catch (error) {
    // next(error);
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Check if user is logged in
export async function isLoggedIn(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
