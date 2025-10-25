import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      enum: ["javascript", "python"], // Only allow supported languages
    },
    code: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

export default mongoose.model("Code", codeSchema);
