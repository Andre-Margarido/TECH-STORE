import mongoose from "mongoose";

// CATEGORY SCHEMA
export const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  slug: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    index: true,
  },
});
