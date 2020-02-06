const usersResolvers = require("./users");
const mealsResolvers = require("./meals");
const foodsResolvers = require("./foods");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
    Food: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Meal: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...usersResolvers.Query,
        ...mealsResolvers.Query,
        ...foodsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...mealsResolvers.Mutation,
        ...foodsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
};
