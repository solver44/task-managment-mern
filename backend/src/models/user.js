import mongoose from "./index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile: {
      type: Number,
      required: false,
    },
    work: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Status is Required"],
      enum: ["Active", "InActive"],
      default: "Active",
    },
    desc: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
    versionKey: false,
    timestamps: true,
  }
);
userSchema.pre("findOneAndDelete", function (next) {
  const id = this.getQuery()._id;
  mongoose
    .model("tasks")
    .deleteMany({ assignedTo: id })
    .then(() => next())
    .catch((error) => next(error));
});
const userModel = mongoose.model("users", userSchema);
userModel.collection.createIndex({ email: 1 }, { unique: true });

export default userModel;
