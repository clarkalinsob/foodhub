const { AuthenticationError, UserInputError } = require("apollo-server");

const Menu = require("../../models/Menu");
const Food = require("../../models/Food");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Mutation: {
        createMenuComment: async (_, { menuId, body }, context) => {
            const { displayName, email } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not empty"
                    }
                });
            }

            const menu = await Menu.findById(menuId);

            if (menu) {
                menu.comments.unshift({
                    body,
                    displayName,
                    email,
                    createdAt: new Date().toISOString()
                });
                await menu.save();
                return menu;
            } else throw new UserInputError("Menu not found");
        },

        deleteMenuComment: async (_, { menuId, commentId }, context) => {
            const { email } = checkAuth(context);

            const menu = await Menu.findById(menuId);

            if (menu) {
                const commentIndex = menu.comments.findIndex(
                    comment => comment.id === commentId
                );

                if (menu.comments[commentIndex].email === email) {
                    menu.comments.splice(commentIndex, 1);
                    await menu.save();
                    return menu;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } else {
                throw new UserInputError("Menu not found");
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
