const { model, Schema } = require("mongoose");

const foodSchema = new Schema({
    createdAt: String,
    body: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Food", foodSchema);
