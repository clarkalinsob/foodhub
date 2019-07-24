const foodsResolvers = require("./foods");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
    Food: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...foodsResolvers.Query
        // ...usersResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...foodsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
};
