const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('This is the Yu-Gi-Oh! Trading Cards RESTful API');
});

module.exports = routes;