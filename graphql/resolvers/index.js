const menusResolvers = require("./menus");
const foodsResolvers = require("./foods");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
    Food: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Menu: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        // ...usersResolvers.Query
        ...menusResolvers.Query,
        ...foodsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...menusResolvers.Mutation,
        ...foodsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
};
