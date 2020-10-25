const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        isHomePage: true,
        titel: ''
    })
})
router.post('/superUser', async (req, res) => {
    req.session.superUser = true;
    res.redirect('/');
})
router.get('/out', async (req, res) =>{
    req.session.destroy(() => {
        res.redirect('/');
    })
})

router.get('/delivery', (req, res) => {
    res.render('delivery', {
        isDelivery: true
    })
})
router.get('/aboutUs', (req, res) => {
    res.render('aboutUs', {
        isAboutUs: true
    })
})

router.get('/contacts', (req, res) => {
    res.render('contacts', {
        isContacts: true
    })
})

router.get('/sizes', (req, res) => {
    res.render('sizes', {
        isSizes: true
    })
})

module.exports = router;