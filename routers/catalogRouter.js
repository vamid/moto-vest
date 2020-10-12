const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.render('catalog', {
        isCatalog: true
    })
})
router.get('/biker_paraphernalia', async (req, res) => {
    res.render('catalog', {
        isBikerParaph: true,
        cont: 'Biker'
    })
})
router.get('/bags', async (req, res) => {
    res.render('catalog', {
        isBags: true,
        cont: 'Bags'
    })
})
router.get('/art', async (req, res) => {
    res.render('catalog', {
        isArt: true,
        cont: 'Bags'
    })
})
router.get('/leather_accessories', async (req, res) => {
    res.render('catalog', {
        isLeatherAcc: true,
        cont: 'Leather Accessories'
    })
})


//Catalog ADD
router.get('/add', async (req, res) => {
    res.render('catalogAdd', {
        isCatalogAdd: true
    })
})
router.post('/add', async (req, res) => {
    if (req.file) {
        res.redirect('/catalog');
    } else {
        res.redirect('/')
    }
})

module.exports = router;