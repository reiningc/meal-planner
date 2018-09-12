var mongoose = require("mongoose");

var PlanSchema = new mongoose.Schema({
    name: String,
    meals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Plan", PlanSchema);