const { AuthenticationError, UserInputError } = require("apollo-server");

const Meal = require("../../models/Meal");
const Food = require("../../models/Food");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        createMealComment: async (_, { mealId, body }, context) => {
            const { displayName, email } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not empty"
                    }
                });
            }

            const meal = await Meal.findById(mealId);

            if (meal) {
                meal.comments.unshift({
                    body,
                    displayName,
                    email,
                    createdAt: new Date().toISOString()
                });
                await meal.save();
                return meal;
            } else throw new UserInputError("Meal not found");
        },

        deleteMealComment: async (_, { mealId, commentId }, context) => {
            const { email } = checkAuth(context);

            const meal = await Meal.findById(mealId);

            if (meal) {
                const commentIndex = meal.comments.findIndex(
                    comment => comment.id === commentId
                );

                if (meal.comments[commentIndex].email === email) {
                    meal.comments.splice(commentIndex, 1);
                    await meal.save();
                    return meal;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } else {
                throw new UserInputError("Meal not found");
            }
        },

        createFoodComment: async (_, { foodId, body }, context) => {
            const { displayName, email } = checkAuth(context);

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
                    displayName,
                    email,
                    createdAt: new Date().toISOString()
                });
                await food.save();
                return food;
            } else throw new UserInputError("Food not found");
        },

        deleteFoodComment: async (_, { foodId, commentId }, context) => {
            const { email } = checkAuth(context);

            const food = await Food.findById(foodId);

            if (food) {
                const commentIndex = food.comments.findIndex(
                    comment => comment.id === commentId
                );

                if (food.comments[commentIndex].email === email) {
                    food.comments.splice(commentIndex, 1);
                    await food.save();
                    return food;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } else {
                throw new UserInputError("Food not found");
            }
        }
    }
};
