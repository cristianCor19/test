import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

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
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);