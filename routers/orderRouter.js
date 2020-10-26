const {Router} = require('express');
const Order = require('../models/Order');
const Catalog = require('../models/Catalog');
const router = Router();

const cartToArray = async (cart) => {
    let cartArray = [];
    for (key in cart) {
        let candidate = await Catalog.findById(key);
        cartArray.push({
            id: key,
            count: cart[key],
        })
    }
    return cartArray;
}

router.get('/', async (req, res) => {
    try {
        const orders_id = req.session.orders;
        const orders = [];
        if (orders_id) {
            for (let i = 0; i < orders_id.length; i++) {
                const cand = await Order.findById(orders_id[i]);
                if (cand) {
                    orders.push(cand);
                    await orders[i].populate('cart.id').execPopulate();
                }
            }
        }
        res.render('orders', {
            isOrder: true,
            orders
        })
        
    } catch (error) {
        console.log(error);
    }
})
router.post('/add', async (req, res) => {
    try {
        const cart = await cartToArray(req.session.cart);
        const order = new Order({
            buyerName: req.body.name,
            buyerPhone: req.body.phone,
            buyerAddress: req.body.address,
            cart,
        });
        await order.getPrice();
        await order.save();
        req.session.cart = {};
        if (!req.session.orders) {
            req.session.orders = [order._id];
        } else {
            await req.session.orders.push(order._id);
        }
        res.redirect('/orders');
    } catch (error) {
        console.log(error);
    }
})
//search

router.post('/search', async (req, res) => {
    try {
        const search_order = await Order.findOne({number: parseInt(req.body.number)});
        if (search_order) {
            await search_order.populate('cart.id').execPopulate()
        }
        const csrf = await req.csrfToken();
        res.json({search_order, csrf});
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;