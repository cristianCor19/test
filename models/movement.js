import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const movementSchema = new Schema(
  {
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    lines: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Line'
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

export default model("Movement", movementSchema);
