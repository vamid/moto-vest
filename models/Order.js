const {Schema, model, Types} = require('mongoose');
const Catalog = require('../models/Catalog');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('mongoose');

const Order = new Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    cart: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Catalog',
            required: true,
        },
        count: {
            type: Number,
            default: 1,
            required: true
        }
    }],
    price: {
        type: Number,
        default: 0,
    },
    buyerName: String,
    buyerPhone: String,
    buyerAddress: String,
})

Order.methods.getPrice = async function () {
    await this.populate('cart.id').execPopulate();
    let price = 0;
    for (let j = 0; j < this.cart.length; j++) {
        price += this.cart[j].count * this.cart[j].id.price;                
    }
    this.price = price;
    return price;
  }

autoIncrement.initialize(mongoose.connection);
Order.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'number',
    startAt: 100,
    incrementBy: 1
});
module.exports = model('Order', Order);