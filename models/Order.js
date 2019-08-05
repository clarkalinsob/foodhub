const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
    date: String,
    displayName: String,
    email: String,
    foodName: String,
    mealName: String,
    mealTime: String,
    _meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
    },
    _food: {
        type: Schema.Types.ObjectId,
        ref: "foods"
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: String
});

module.exports = model("Meal", orderSchema);
