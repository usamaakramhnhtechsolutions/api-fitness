const express = require("express");
const { getMeals, addMeal, updateMeal, deleteMeal } = require("../controllers/mealController");

const router = express.Router();

// API Routes
router.get("/", getMeals);        // Fetch all meals
router.post("/", addMeal);        // Add a new meal
router.put("/:id", updateMeal);   // Update a meal
router.delete("/:id", deleteMeal);// Delete a meal

module.exports = router;
