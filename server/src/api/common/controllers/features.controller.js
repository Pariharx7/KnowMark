import { asyncHandler, ApiResponse } from "../utils/index.js";
import { Features } from "../models/index.js";

const addFeatures = asyncHandler(async (req, res) => {
  const { name, description, features } = req.body;
  const data = await Features.create({
    name,
    description,
    features,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Features Added Successfully", data));
});

const getFeatures = asyncHandler(async (req, res) => {
  const data = await Features.findOne({});

  return res.status(200).json({
    data,
  });
});

const editFeatures = asyncHandler(async (req, res) => {
  const { name, description, features } = req.body;

  const featureData = await Features.findOne({});

  if (name) featureData.name = name;
  if (description) featureData.description = description;
  if (features) featureData.features = features;

  await featureData.save();

  return res.status(200).json(
    new ApiResponse(200, "Features updated successfully", {
      name: featureData?.name,
      description: featureData?.description,
      features: featureData?.features,
    })
  );
});

export { getFeatures, addFeatures, editFeatures };
