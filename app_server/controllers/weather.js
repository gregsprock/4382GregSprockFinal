const request = require('request');
let port_to_use = process.env.PORT || "3000";
// let host_to_use = process.env.post || "localhost";
let server_to_use = 'http://localhost:' + port_to_use;
const apiOptions = {
  server: server_to_use,
};

const Cities = [
  "Amarillo",
  "Lubbock",
  "Midland",
  "Abilene",
  "San Angelo",
];

let selectedCity = "Amarillo";

const renderCitiesPage = (req, res, responseBody) => {
  console.log(responseBody);
  console.log("THAT WAS RESPONSEBODY");
  console.log("GOING"),
  res.render('cities',
    { 
      cities: responseBody,
      userCity: req.body.selectedCity,
      citiesList: Cities,
    }
  );
}
const selectMyCity = (req, res) => {
  const myCity = req.body.selectedCity;
  console.log("SELECTEDCITY:  " + myCity);

  const path = `/api/${myCity}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      // console.log(body);
      console.log("BODY PRINT");
      renderCitiesPage(req, res, body);
    },//this passes the info into the page
  );

}
//post method
const vatsimAirportSelection = (req, res) => {
  //this helps with the dropdown
  // console.log(req.body);
  selectedCity = req.body.selectedCity;
  console.log(`SELECTED AIRPORTS vatsimAirportSelection: ${selectedCity}`);
  vatsimArrivals(req, res);
}

const renderArrivalsPage = (req, res, responseBody) => {
  let message = null;
  //is the response an array ?
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  res.render('cities',
    {
      citiesList: Cities,
      cities: responseBody,
    }
  );
};

const vatsimArrivals = (req, res) => {
  // /arrived/:airport/:howMany/:offset
  console.log(`SELECTED AIRPORTS vatsimArrivals: ${selectedCity}`);
  const path = `/api/${selectedCity}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      renderArrivalsPage(req, res, body);
    },//this passes the info into the page


  );
};

//this helps render the page
module.exports = {
  vatsimArrivals,
  vatsimAirportSelection,
  selectMyCity
};