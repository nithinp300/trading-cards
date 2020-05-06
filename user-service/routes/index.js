const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('This is the user service for Yu-Gi-Oh! Deck');
});

module.exports = routes;