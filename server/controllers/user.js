import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandle.js";
import sendCookie from "../utils/sendCookie.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, profileImg } = req.body;

    console.log(req.body);
    const user = await User.create({
      username,
      name: username,
      email,
      password,
      avatar: profileImg,
    });

    res.status(201).json({
      success: true,
      user,
      message: "Registered successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      if (err.errors.password)
        next(new ErrorHandler(err.errors.password.properties.message, 500));
      else if (err.errors.username)
        next(new ErrorHandler(err.errors.username.properties.message, 500));
      else if (err.errors.email)
        next(new ErrorHandler(err.errors.email.properties.message, 500));
    } else if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      next(new ErrorHandler(message, 400));
    }
    next(new ErrorHandler(err, 500));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password, isToRemember } = req.body;
    if (!username || !password)
      return next(new ErrorHandler("Please enter email and password", 400));

    const user = await User.findOne({ email: username }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
      return next(new ErrorHandler("Incorrect password", 401));

    if (isToRemember) sendCookie(user, 200, res);
    else {
      res.status(200).json({
        success: true,
        user,
        message: "login successful",
      });
    }
  } catch (error) {
    next(new ErrorHandler(err, 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "logged-out successfully",
    });
  } catch (error) {
    next(new ErrorHandler("Something went wrong", 500));
  }
};
