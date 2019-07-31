const { model, Schema } = require("mongoose");

const menuSchema = new Schema({
    createdAt: String,
    body: String,
    displayName: String,
    email: String,
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
            email: String,
            _user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    likes: [
        {
            displayName: String,
            email: String,
            createdAt: String
        }
    ],
    comments: [
        {
            body: String,
            displayName: String,
            email: String,
            createdAt: String
        }
    ],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Menu", menuSchema);
