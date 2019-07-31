const { AuthenticationError, UserInputError } = require("apollo-server");

const Food = require("../../models/Food");
const Menu = require("../../models/Menu");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        likeFood: async (_, { foodId }, context) => {
            const { displayName, email } = checkAuth(context);

            const food = await Food.findById(foodId);

            if (food) {
                if (food.likes.find(like => like.displayName === displayName)) {
                    food.likes = food.likes.filter(
                        like => like.displayName !== displayName
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

        likeMenu: async (_, { menuId }, context) => {
            const { displayName, email } = checkAuth(context);

            const menu = await Menu.findById(menuId);

            if (menu) {
                if (menu.likes.find(like => like.displayName === displayName)) {
                    menu.likes = menu.likes.filter(
                        like => like.displayName !== displayName
                    );
                } else {
                    menu.likes.push({
                        displayName,
                        email,
                        createdAt: new Date().toISOString()
                    });
                }

                await menu.save();
                return menu;
            } else {
                throw new UserInputError("Menu not found");
            }
        }
    }
};
