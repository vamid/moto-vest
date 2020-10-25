const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('home', {
        isHomePage: true,
        titel: ''
    })
})
router.post('/superUser', async (req, res) => {
    const hash = "$2a$10$sx3BxUdH5AHflQbZeDQRdOFyAiREFyrc3c5mAftOJue./n09wWiiK";
    if (await bcrypt.compare(req.body.pswd, hash)) {
        req.session.superUser = true;
        res.redirect('/catalog');
    } else {
        res.redirect('/');
    }
    //console.log(await bcrypt.hash('1234', 10));
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