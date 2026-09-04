import mongoose, { Schema } from "mongoose";

const featureSchema = new Schema({
  slug: {
    type: String,
    default: "features",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const aboutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reqiured: true,
  },
  features: [featureSchema],
});

export const Features = mongoose.model("About", aboutSchema);
