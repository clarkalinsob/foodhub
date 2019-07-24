const { AuthenticationError, UserInputError } = require("apollo-server");

const Food = require("../../models/Food");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        createComment: async (_, { foodId, body }, context) => {
            const { username } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not empty"
                    }
                });
            }

            const food = await Food.findById(foodId);

            if (food) {
                food.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await food.save();
                return food;
            } else throw new UserInputError("Food not found");
        },

        deleteComment: async (_, { foodId, commentId }, context) => {
            const { username } = checkAuth(context);

            const food = await Food.findById(foodId);

            if (food) {
                const commentIndex = food.comments.findIndex(
                    comment => comment.id === commentId
                );

                if (food.comments[commentIndex].username === username) {
                    food.comments.splice(commentIndex, 1);
                    await food.save();
                    return food;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } else {
                throw new UserInputError("Food not found");
            }
        },

        likeFood: async (_, { foodId }, context) => {
            const { username } = checkAuth(context);

            const food = await Food.findById(foodId);

            if (food) {
                if (food.likes.find(like => like.username === username)) {
                    food.likes = food.likes.filter(
                        like => like.username !== username
                    );
                } else {
                    food.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }

                await food.save();
                return food;
            } else {
                throw new UserInputError("Food not found");
            }
        }
    }
};
