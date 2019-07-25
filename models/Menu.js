const { model, Schema } = require("mongoose");

const menuSchema = new Schema({
    createdAt: String,
    body: String,
    username: String,
    meals: [
        {
            createdAt: String,
            date: String,
            foodName: String,
            _food: {
                type: Schema.Types.ObjectId,
                ref: "foods"
            },
            username: String,
            _user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    likes: [
        {
            createdAt: String,
            username: String
        }
    ],
    comments: [
        {
            createdAt: String,
            body: String,
            username: String
        }
    ],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Menu", menuSchema);
