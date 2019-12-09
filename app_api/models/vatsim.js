const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const weatherSchema = new Schema({
	city: String,
	time: String,
	summary: String,
	rain: String,
	temp: String,
	wind: String
});

// mongoose.model('Client', clientSchema);
mongoose.model('Weather', weatherSchema);

//const Client = mongoose.model('Client', clientSchema);