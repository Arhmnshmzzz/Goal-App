const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalControlles");

const { protect } = require("../middleware/authMiddleware");

//pointing towards the routes

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").delete(protect, deleteGoals).put(protect, updateGoals);

//below is another way of creationg the routes
// router.get("/", getGoals);

// router.post("/", setGoals);

// router.put("/:id", updateGoals);

// router.delete("/:id", deleteGoals);

module.exports = router;
