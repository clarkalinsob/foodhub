const { model, Schema } = require("mongoose");

const foodSchema = new Schema({
    createdAt: String,
    body: String,
    displayName: String,
    comments: [
        {
            body: String,
            displayName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            displayName: String,
            createdAt: String
        }
    ],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Food", foodSchema);
