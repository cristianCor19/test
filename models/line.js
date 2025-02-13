import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const lineSchema = new Schema(
  {
    name: { type: String, required: true },
    movement: { type: Schema.Types.ObjectId, ref: "Movement", required: true },
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

export default model("Line", lineSchema);
