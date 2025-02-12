import mongoose,{model}  from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      "type": "string",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);