const {Router} = require('express');
const Catalog = require('../models/Catalog');
const su = require('../middleware/superUser');
const router = Router();

const cartToArray = async (cart) => {
    let cartArray = [];
    for (key in cart) {
        let candidate = await Catalog.findById(key);
        cartArray.push({
            id: key,
            name: candidate.name,
            count: cart[key],
        })
    }
    return cartArray;
}

router.get('/', async (req, res) => {
    try {
        if (!req.session.cart) {
            req.session.cart = {};
        }
        const cartArray = await cartToArray(req.session.cart);
        res.render('cart', {
            isCart: true,
            cartArray,
        })
    } catch (error) {
        console.log(error);
    }
    
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

router.delete('/substr/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (req.session.cart) {
            const cart = req.session.cart;
                if (id in cart) {
                    if (cart[id] === 1) {
                        delete cart[id];
                    } else {
                        cart[id] -= 1;
                    }
                    req.session.cart = cart;
                }   
        }             
        res.json(await cartToArray(req.session.cart));
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;