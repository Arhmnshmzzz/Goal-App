const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
//@desc Get goals
//@route /api/goals
//@access Private

// const { error } = require("console");
// const { errorHandler } = require("../middleware/errorMiddleware");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

//@desc set goals
//@route /api/goals
//@access Private

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc update goals
//@route /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);

    throw new Error("Goal not Found");
  }

  // const user = await UserActivation.findById(req.user.id);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Logged in user matches the Goals
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc delete goals
//@route /api/goals
//@access Private

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);

    throw new Error("Goal not Found");
  }
  // const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Logged in user matches the Goals
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  // await goal.remove();

  //Myway of deleting
  const deleteGoals = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
