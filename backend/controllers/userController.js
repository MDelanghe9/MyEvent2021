import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Party from "../models/partyModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("$9$Mot de passe ou Pseudo erronée$9$");
  }
});

//@description     Register new user
//@route           POST /api/users/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {

  const { name, email} = req.body.user;
  var imageUrl = req.body.user.imageUrl;
  if (imageUrl == "") {
    //set image par default
    imageUrl = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  }
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(201).json("Email est deja utiliser so je le co juste");
  }else{
    //j'enregistre l'utilisateur
    const user = await User.create({
      name,
      email,
      imageUrl,
    });
    res.status(201).json({
      response:"Utilisateur cree",
      name,
      email,
      imageUrl,
    });
  }
});

/* old register

//@description     Register new user
//@route           POST /api/users/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("$9$Cette adresse e-mail est déjà utilisée$9$");
  }
  const userExists2 = await User.findOne({ name });
  if (userExists2) {
    res.status(404);
    throw new Error("$9$Pseudo déjà utilisée$9$");
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("$9$Utilisateur inconnue$9$");
    }
  }
  throw new Error("$9$Email pas au format email$9$");
});
*/

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Utilisateur inconnue");
  }
});

// @desc    GET all user in databasse
// @route   GET /api/users/all
const getAllUser = asyncHandler(async (req, res) => {
  const filter = {};
  const users = await User.find(filter);
  if (users) {
    res.json({
      users
    });
  } else {
    res.status({
      error: "pas d'utilisateur trouver",
    });
  }
});
export { authUser, updateUserProfile, registerUser, getAllUser };