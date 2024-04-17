import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: `${process.env.DOMAIN}/images/avatar.png`,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function (payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
