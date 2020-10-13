const {Schema, model} = require('mongoose');

const Catalog = new Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: Number,
        required: true,
        default: 1
    },
    imgURL: [{
        type: String
    }],
    price: Number,
    description: String
})

module.exports = model('Catalog', Catalog);



/* About groups
  value="1">Байкерская атрибутика
  value="2">Кожанные аксессуары
  value="3">Сумки и подсумки
  value="4">Картины и элементы декора
*/