const { AuthenticationError } = require("apollo-server");

const Food = require("../../models/Food");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Query: {
        async getFoods() {
            try {
                const foods = await Food.find().sort({
                    createdAt: -1
                });
                return foods;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getFood(_, { foodId }) {
            try {
                const food = await Food.findById(foodId);

                if (food) {
                    return food;
                } else throw new Error("Food not found");
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createFood(_, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === "") {
                throw new Error("Food body must not be empty");
            }

            const newFood = new Food({
                createdAt: new Date().toISOString(),
                body,
                displayName: user.displayName,
                _user: user.id
            });

            const food = await newFood.save();

            return food;
        },

        async deleteFood(_, { foodId }, context) {
            const user = checkAuth(context);

            try {
                const food = await Food.findById(foodId);

                if (user.displayName == food.displayName) {
                    await food.delete();
                    return "Food deleted successfully";
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};
