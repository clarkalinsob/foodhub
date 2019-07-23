const {
    AuthenticationError
} = require('apollo-server');

const Food = require('../../models/Food');
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getFoods() {
            try {
                const foods = await Food.find().sort({
                    createdAt: -1
                });
                return foods
            } catch (err) {
                throw new Error(err);
            }
        },

        async getFood(_, {
            foodId
        }) {
            try {
                const food = await Food.findById(foodId);

                if (food) {
                    return food
                } else throw new Error('Food not found')
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createFood(_, {
            body
        }, context) {
            const user = checkAuth(context);
            console.log(user);

            const newFood = new Food({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const food = await newFood.save();

            return food;
        },

        async deleteFood(_, {
            foodId
        }, context) {
            const user = checkAuth(context);

            try {
                const food = await Food.findById(foodId);

                if (user.username == food.username) {
                    await food.delete();
                    return 'Food deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}