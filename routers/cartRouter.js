const {Router} = require('express');
const Cart = require('../models/Cart');
const Catalog = require('../models/Catalog');
const router = Router();

router.get('/', (req, res) => {
    if (!req.session.cart) {
        //const cart = new Cart();
        req.session.cart = {};
    }
    const cart = req.session.cart;
    res.render('cart', {
        isCart: true,
        cart,
    })
})

router.post('/add', async (req, res) => {
    try {
        const product = await Catalog.findById(req.body.id);
        const id = req.body.id;
        if (!req.session.cart) {
            if (product) {req.session.cart = { [id]: 1 } };
        } else {
            const cart = req.session.cart;
            if (product) {
                //const idx = cart.findIndex(c => {c. === id})
                if (id in cart) {
                    //if in cart already exists product
                    cart[id] += 1;
                    req.session.cart = cart;
                } else {
                    req.session.cart[id] = 1;
                }   
            }             
        }
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;