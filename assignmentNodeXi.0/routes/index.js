const express = require('express');
const router = express.Router();
const modContinent = require("../models/handleContinents");
const modCountry = require("../models/handleCountries");
const modCity = require("../models/handleCities");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Fragments of the World',
        subtitle: 'Playing with the World'
    });
});

router.get('/worldview', async function(req, res, next) {
    res.render('worldview', {
        title: 'Fragments of the World',
        subtitle: 'Start by Choosing a Continent'
    });
});

router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    res.json(continents);
});

router.get('/countries/:country', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.country}, {sort: {name: 1}});
    res.json(countries);
});
router.get('/country/:city', async function(req, res, next) {
    let cities = await modCity.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(cities);
});




module.exports = router;
