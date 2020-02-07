const { model, Schema } = require('mongoose')

const mealSchema = new Schema({
  body: String,
  displayName: String,
  email: String,
  mealDates: [
    {
      date: String,
      displayName: String,
      email: String,
      menu: [
        {
          body: String,
          _food: {
            type: Schema.Types.ObjectId,
            ref: 'foods'
          }
        }
      ],
      orders: [
        {
          date: String,
          displayName: String,
          email: String,
          foodName: String,
          mealTime: String,
          _food: {
            type: Schema.Types.ObjectId,
            ref: 'foods'
          },
          _user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          createdAt: String
        }
      ],
      _user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      createdAt: String
    }
  ],
  likes: [
    {
      displayName: String,
      email: String,
      createdAt: String
    }
  ],
  comments: [
    {
      body: String,
      displayName: String,
      email: String,
      createdAt: String
    }
  ],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: String
})

module.exports = model('Meal', mealSchema)
