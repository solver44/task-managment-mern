import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userModel from "./user.js";
import auth from "../utils/auth.js";

const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await userModel.findOne({ email: "admin" });
    if (!adminExists) {
      const adminPass = await auth.hashPassword("admin");
      // Create default admin user
      await userModel.create({
        name: "Admin",
        email: "admin",
        password: adminPass,
        role: "manager",
        status: "Active",
        datecreated: new Date(),
        dateUpdated: new Date(),
      });
      console.log("Default admin user created successfully.");
    } else {
      console.log("Default admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating default admin user:", error);
  }
};

mongoose
  .connect(`${process.env.dbUrl}/${process.env.dbName}`)
  .then(() => {
    createDefaultAdmin();
    console.log("mongoose connected ");
  })
  .catch((error) => {
    console.log(error);
  });

export default mongoose;
