const { model, Schema } = require("mongoose");

const menuSchema = new Schema({
    createdAt: String,
    body: String,
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
            displayName: String,
            _user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    likes: [
        {
            createdAt: String,
            displayName: String
        }
    ],
    comments: [
        {
            createdAt: String,
            body: String,
            displayName: String
        }
    ],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Menu", menuSchema);
