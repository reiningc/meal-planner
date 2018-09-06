var mongoose = require("mongoose");

var mealSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: String,
    recipe: String,
    comments: [
        {
            type = mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Meal", mealSchema);