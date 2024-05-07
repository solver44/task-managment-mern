import taskModel from "../models/task.js";
import userModel from "../models/user.js";
import auth from "../utils/auth.js";

const registerUser = async (req, res) => {
  const { name, email, mobile, address, status, role, desc, password } =
    req.body;

  try {
    if (!name || !email || !password || !status || !role) {
      return res
        .status(403)
        .json({ message: "Please fill in all the required fields." });
    }

    const hashedPassword = await auth.hashPassword(password);
    const preUser = await userModel.findOne({ email: email });
    if (preUser) {
      return res.status(400).send({ message: `This email is already exists.` });
    }
    const newUser = new userModel({
      name,
      status,
      address,
      role,
      email,
      mobile,
      desc,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await userModel.find();
    const allUser = [];
    const totalUsers = await userModel.countDocuments();
    const activeUsers = await userModel.countDocuments({
      status: "Active",
    });
    const inactiveUsers = await userModel.countDocuments({
      status: "InActive",
    });

    for (let i = 0; i < userData.length; i++) {
      const userId = userData[i]._id;
      const taskCount = await taskModel.countDocuments({ assignedTo: userId });
      userData[i].taskCount = taskCount;
      allUser.push({ ...userData[i].toObject(), taskCount });
    }

    res
      .status(200)
      .json({ userData: allUser, totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userIndividual = await userModel.findById(id);

    if (!userIndividual) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(userIndividual);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    // const hashedPassword = await Auth.hashPassword(password);

    req.body.password = await auth.hashPassword(req.body.password);
    const updateduser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updateduser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

export default {
  registerUser,
  getUserData,
  getIndividualUser,
  deleteUser,
  updateUserData,
};
