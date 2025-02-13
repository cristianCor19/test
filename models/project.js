import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      default: null
    },
    movements: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movement'
      }
    ],
    numbers: {
      sumPrice: {
        value: { type: String, default: "$ 0" },
        lastValue: { type: String, default: "$ 0" },
        number: { type: Number, default: 0 },
        lastNumber: { type: Number, default: 0 },
      },
      sumBudget: {
        value: { type: String, default: "$ 0" },
        lastValue: { type: String, default: "$ 0" },
        number: { type: Number, default: 0 },
        lastNumber: { type: Number, default: 0 },
      },
      budgetUtility: {
        value: { type: String, default: "$ 0" },
        lastValue: { type: String, default: "$ 0" },
        number: { type: Number, default: 0 },
        lastNumber: { type: Number, default: 0 },
      },
      budgetMargin: {
        value: { type: String, default: "0 %" },
        lastValue: { type: String, default: "0 %" },
        number: { type: Number, default: 0 },
        lastNumber: { type: Number, default: 0 },
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model("Project", projectSchema);
