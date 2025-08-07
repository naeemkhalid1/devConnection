import mongoose, { Collection, Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profileImg: string;
}

const userModel = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profileImg: { type: String, default: "" },
  },

  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.model("User", userModel);
