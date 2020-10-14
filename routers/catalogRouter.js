const {Router} = require('express');
const Catalog = require('../models/Catalog');
const router = Router();


router.get('/', async (req, res) => {
    res.render('catalogMain', {
        isCatalog: true
    })
})
router.get('/biker_paraphernalia', async (req, res) => {
    try {
        const catalog = (await Catalog.find()).filter(prod => prod.group === 1);
        res.render('catalog', {
            isBikerParaph: true,
            catalog
        })
    } catch (error) {
        console.log(error)
    }
})
router.get('/bags', async (req, res) => {
    try {
        const catalog = (await Catalog.find()).filter(prod => prod.group === 3);
        res.render('catalog', {
            isBags: true,
            catalog
        })
    } catch (error) {
        console.log(error)
    }
})
router.get('/art', async (req, res) => {
    try {
        const catalog = (await Catalog.find()).filter(prod => prod.group === 2);
        res.render('catalog', {
            isArt: true,
            catalog
        })
    } catch (error) {
        console.log(error)
    }
})
router.get('/leather_accessories', async (req, res) => {
    try {
        const catalog = (await Catalog.find()).filter(prod => prod.group === 4);
        res.render('catalog', {
            isLeatherAcc: true,
            catalog
        })
    } catch (error) {
        console.log(error)
    }
})
//Open product

router.get('/:id', async (req, res) => {
    try {
        const product = await Catalog.findById(req.params.id);
        res.render('product', {
            product
        })
    } catch (error) {
        console.log(error);
    }
})


//Catalog ADD
router.get('/add', async (req, res) => {
    res.render('catalogAdd', {
        isCatalogAdd: true
    })
})
router.post('/add', async (req, res) => {
    try {
        const new_product = new Catalog({
            name: req.body.name,
            group: req.body.group,
            imgURL: req.files.map(file => file.path),
            price: req.body.price,
            description: req.body.description
        })
        await new_product.save();
        res.redirect('/catalog');
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;