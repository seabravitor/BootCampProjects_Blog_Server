const express = require('express'),
	app = express(),
	mongoose = require('mongoose');
(bodyParser = require('body-parser')), (cors = require('cors'));
require('dotenv').config();

app.options('*', cors());
app.get('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//connecting to mongo and checking if DB is running
async function connecting() {
	try {
		await mongoose.connect(process.env.MONGO, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log('Connected to the DB');
	} catch (error) {
		console.log(
			'ERROR: Seems like your DB is not running, please start it up !!!'
		);
	}
}
connecting();
mongoose.set('useCreateIndex', true);

// routes
app.use('/posts', require('./routes/PostRoute'));
app.use('/users', require('./routes/UserRoute'));

app.listen(process.env.PORT || 3000, () =>
	console.log(`listening on port 3001`)
);
