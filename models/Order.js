const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
    createdAt: String,
    displayName: String,
    meals: [
        {
            createdAt: String,
            date: String,
            foodName: String,
            _food: {
                type: Schema.Types.ObjectId,
                ref: "foods"
            },
            mealTime: String
        }
    ],
    menuName: String,
    _menu: {
        type: Schema.Types.ObjectId,
        ref: "menus"
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = model("Menu", orderSchema);
