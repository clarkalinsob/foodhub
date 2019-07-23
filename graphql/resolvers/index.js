const foodsResolvers = require('./foods')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...foodsResolvers.Query,
        // ...usersResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}