const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

// Route to create a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Could not add recipe" });
  }
});

// Route to fetch all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Could not fetch recipes" });
  }
});

module.exports = router;
