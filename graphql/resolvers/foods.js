const Food = require('../../models/Food');

module.exports = {
    Query: {
        async getFoods() {
            try {
                const foods = await Food.find();
                return foods
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}