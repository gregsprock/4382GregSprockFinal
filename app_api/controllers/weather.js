const mongoose = require('mongoose');
// const Client = mongoose.model('Client');
const Weather = mongoose.model('Weather');

const city = (req, res) => {
  console.log(req);
  console.log("CITIES");
  Weather.find({
    city: req.params.city,
  },
    (err, docs) => {
      //send records back
      if(!err){
          res.send(docs);
          console.log("LETS TEST" + docs);
          console.log("LETS TEST");
          // res.render('city',{test: docs});
      }else{
          res.send(err);
          console.log(err);
      }
    }
  );
  //callback
  // (err, docs) => {

  //   let records = [];

  //   docs.forEach((document) => {
  //     if (!isOlderThanADay(vatsimTimeLogonToDate(document.time_logon))) {
  //       records.push(document);
  //     }
  //   });
  //   //send records back
  //   if (!err) {
  //     res.send(records);
  //   } else {
  //     res.send(err);
  //     console.log(err);
  //   }
  // }
};

module.exports = {
  city,
};