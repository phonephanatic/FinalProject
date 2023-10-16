const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from your React app's origin
  // You can add other CORS options here if needed
};

app.use(cors(corsOptions)); // Use the CORS middleware

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://laurencoleman2008:Lboogie1@cluster0.w1ll63a.mongodb.net/recipeDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define a simple schema and model for Recipes
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Define routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
