const router = require('express').Router();

const passport = require('passport');
const carsRouter = require('./cars');


router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send(
        req.session.user
            ? `Hello ${req.session.user.username}!`
            : 'Hello World!'
    );
});

router.get('/login', passport.authenticate('github'), (req, res) => {
    //#swagger.tags=['Authentication']
});

router.get('/logout', (req, res, next) => {
    //#swagger.tags=['Authentication']
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.use('/cars', carsRouter);

module.exports = router;