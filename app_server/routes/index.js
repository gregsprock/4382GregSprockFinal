var express = require('express');
var router = express.Router();
const ctrlVatsim = require('../controllers/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'West Texas Weather' });
});

// /* doing departures the client-side (Angular) way */
// router.get('/departures', function(req, res, next) {
//   res.render('departures', { title: 'ZAB Depatures' });
// });

/* doing arrivals the server-side (Express and Pug) way */
router.get('/weather', ctrlVatsim.vatsimArrivals);
router.post('/weather', ctrlVatsim.vatsimAirportSelection);

router.post('/selectedCity', ctrlVatsim.selectMyCity);


module.exports = router;
