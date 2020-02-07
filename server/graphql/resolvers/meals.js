const { AuthenticationError, UserInputError } = require('apollo-server')

const Meal = require('../../models/Meal')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Query: {
    getMeals: async () => {
      try {
        const meals = await Meal.find().sort({ createdAt: -1 })
        return meals
      } catch (err) {
        throw new Error(err)
      }
    },

    getMeal: async (_, { mealId }) => {
      try {
        const meal = await Meal.findById(mealId)

        if (meal) {
          return meal
        } else throw new Error('Meal not found')
      } catch (err) {
        throw new Error(err)
      }
    }
  },

  Mutation: {
    createMeal: async (_, { body }, context) => {
      const { id, displayName, email } = checkAuth(context)

      if (body.trim() === '') throw new Error('Meal body must not be empty')

      const newMeal = new Meal({
        createdAt: new Date().toISOString(),
        body,
        displayName,
        email,
        _user: id
      })

      const meal = await newMeal.save()

      return meal
    },

    deleteMeal: async (_, { mealId }, context) => {
      const { email } = checkAuth(context)

      try {
        const meal = await Meal.findById(mealId)

        if (email == meal.email) {
          await meal.delete()
          return 'Meal deleted successfully'
        } else throw new AuthenticationError('Action not allowed')
      } catch (err) {
        throw new Error(err)
      }
    },

    createMealDate: async (_, { mealId, mealDate: { date, menu } }, context) => {
      const parsedMenu = JSON.parse(menu)
      const { id, displayName, email } = checkAuth(context)

      if (date.trim() === '') throw new Error('Date must not be empty')

      if (parsedMenu.length > 0) {
        const meal = await Meal.findById(mealId)

        if (meal) {
          meal.mealDates.push({
            date,
            displayName,
            email,
            menu: parsedMenu,
            _user: id,
            createdAt: new Date().toISOString()
          })

          await meal.save()
          return meal
        } else throw new UserInputError('Meal not found')
      } else throw new Error('Menu must not be empty')
    },

    deleteMealDate: async (_, { mealId, mealDateId }, context) => {
      const { email } = checkAuth(context)

      const meal = await Meal.findById(mealId)

      if (meal) {
        const mealDateIndex = meal.mealDates.findIndex(mealDate => mealDate.id === mealDateId)

        if (meal.mealDates[mealDateIndex].email === email) {
          meal.mealDates.splice(mealDateIndex, 1)
          await meal.save()
          return meal
        } else throw new AuthenticationError('Action not allowed')
      } else throw new UserInputError('Meal not found')
    },

    createMealDateOrder: async (
      _,
      { mealId, mealDateId, mealDateOrder: { date, foodName, mealTime } },
      context
    ) => {
      const { id, displayName, email } = checkAuth(context)

      if (date.trim() === '') throw new Error('Date must not be empty')
      if (foodName.trim() === '') throw new Error('Food name must not be empty')
      if (mealTime.trim() === '') throw new Error('Meal time must not be empty')

      const meal = await Meal.findById(mealId)

      const mDate = meal.mealDates.find(mealDate => mealDate.id === mealDateId)

      const order = mDate.orders.find(order => order.email === email)

      if (order) {
        order.foodName = foodName
        order.mealTime = mealTime

        await meal.save()
        return meal
      } else {
        mDate.orders.unshift({
          date,
          displayName,
          email,
          foodName,
          mealTime,
          _user: id,
          createdAt: new Date().toISOString()
        })

        await meal.save()
        return meal
      }
    }
  }
}
