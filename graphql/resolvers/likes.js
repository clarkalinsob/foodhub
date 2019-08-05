const { AuthenticationError, UserInputError } = require("apollo-server");

const Food = require("../../models/Food");
const Meal = require("../../models/Meal");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        likeFood: async (_, { foodId }, context) => {
            const { displayName, email } = checkAuth(context);

            const food = await Food.findById(foodId);

            if (food) {
                if (food.likes.find(like => like.email === email)) {
                    food.likes = food.likes.filter(
                        like => like.email !== email
                    );
                } else {
                    food.likes.push({
                        displayName,
                        email,
                        createdAt: new Date().toISOString()
                    });
                }

                await food.save();
                return food;
            } else {
                throw new UserInputError("Food not found");
            }
        },

        likeMeal: async (_, { mealId }, context) => {
            const { displayName, email } = checkAuth(context);

            const meal = await Meal.findById(mealId);

            if (meal) {
                if (meal.likes.find(like => like.email === email)) {
                    meal.likes = meal.likes.filter(
                        like => like.email !== email
                    );
                } else {
                    meal.likes.push({
                        displayName,
                        email,
                        createdAt: new Date().toISOString()
                    });
                }

                await meal.save();
                return meal;
            } else {
                throw new UserInputError("Meal not found");
            }
        }
    }
};
