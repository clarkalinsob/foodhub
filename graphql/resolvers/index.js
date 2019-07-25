const menuResolvers = require("./menus");
const foodsResolvers = require("./foods");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
    Food: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        // ...usersResolvers.Query
        ...menuResolvers.Query,
        ...foodsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...menuResolvers.Mutation,
        ...foodsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
};
