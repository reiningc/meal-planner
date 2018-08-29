var mongoose = require("mongoose");

var mealSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: String,
    recipe: String
});

module.exports = mongoose.model("Meal", mealSchema);