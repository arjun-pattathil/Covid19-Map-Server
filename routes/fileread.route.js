const Router = require('express').Router()
    , FileReadController = require('../controllers/fileread.controller');

Router.get('/Countries', FileReadController.getCountries);
Router.put('/deathCases', FileReadController.deathCases);
Router.put('/confirmedCases', FileReadController.confirmedCases);

module.exports = Router;