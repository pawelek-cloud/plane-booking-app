const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');

// connection to mongodb-registration

const connectionString = 'mongodb+srv://pawelnowak1:WCa0rdpJPQjqrzQJ@cluster0.g6ebl.mongodb.net/nodeauth?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(client => {
	console.log("Connected to database")
}).catch(error => console.error(error))

const user = require('../models/user');
const seatShortDistance = require('../models/seatSchemaShortDistance')
const seatReturnShortDistance = require("../models/seatSchemaReturnShortDistance");
const seatMiddleDistance = require('../models/seatSchemaMiddleDistance')
const seatReturnMiddleDistance = require("../models/seatSchemaReturnMiddleDistance");
const seatLongDistance = require('../models/seatSchemaLongDistance')
const seatReturnLongDistance = require("../models/seatSchemaReturnLongDistance");

const bcrypt = require('bcryptjs');
const saltRound = 10;
let arrivalPlace;
let oneOrTwoWay;

// session

router.use(session({
	secret: 'key',
	resave: true,
	saveUninitialized: true
}));

/* GET home page. */
router.get('/', function (req, res, next) {
	req.session.destroy(); //destroy session
	res.render('index');
});


/* GET home page. */
router.get('/registration', function (req, res, next) {
	arrivalPlace = req.query.arrivalPlace;
	oneOrTwoWay = req.query.twoOrOne;
	res.render('registration');
});

/* GET login page. */
router.get('/login', function (req, res, next) {
	req.session.destroy();
	res.render('login', {
		title: 'Logowanie'
	});
});

router.post('/login', function (req, res, next) {
	const {
		email,
		password
	} = req.body;
	let errors = [];
	if (errors.length > 0) {
		res.render("login", {
			title: 'Logowanie',
			errors,
			email,
			password
		})
	}
	user.findOne({
		email: req.body.email
	}).then(user => {
		if (!user) {
			errors.push({
				msg: "Niepoprawny adres email"
			});
			res.render("login", {
				title: 'Logowanie',
				errors,
				email,
				password
			})
		}
	}).catch(err => console.log(err))

	user.findOne({
		email: req.body.email
	}).exec().then(result => {
		if (bcrypt.compareSync(req.body.password, result.password) === false) {
			errors.push({
				msg: "Niepoprawne hasło"
			});
			res.render("login", {
				title: 'Logowanie',
				errors,
				email,
				password
			})
		}
	}).catch(err => console.log(err))

	user.findOne({
		email: req.body.email
	}).exec().then(result => {
		if (bcrypt.compareSync(req.body.password, result.password)) {
			req.session.cust_log = "true";
			req.session.email = result.email;
			res.redirect('home');
		}
	}).catch(err => console.log(err))
})

router.get('/register', function (req, res) {
	req.session.destroy(); //destroy session
	res.render('register', {
		title: 'Zaloguj się'
	})
});

router.post('/register', (req, res) => {
	const {
		email,
		password
	} = req.body;
	let errors = [];

	if (password.length < 6) {
		errors.push({
			msg: 'Hasło powinno zawierać co najmniej 6 znaków.'
		})
	}
	if (errors.length > 0) {
		res.render('register', {
			title: 'Zaloguj się',
			errors,
			email,
			password
		})
	} else {
		user.findOne({
				email: req.body.email
			})
			.then(user => {
				if (user) {
					errors.push({
						msg: 'Email już zarejestrowany. Podaj inny email'
					});
					res.render('register', {
						title: 'Zaloguj się',
						errors,
						email,
						password
					})
				}
			}).catch(err => console.log(err))


	}
	bcrypt.genSalt(saltRound, function (err, salt) {
		bcrypt.hash(req.body.password, salt, function (err, hash) {

			const user1 = new user({
				email: req.body.email,
				password: hash
			});
			user1.save().then(result => {
				res.redirect('/login');
			}).catch(err => console.log(err))
		})
	})
});

router.get('/home', function (req, res, next) {

	if (req.session.cust_log == "true" && arrivalPlace === "Londyn" && oneOrTwoWay != "oneWay") {
		seatShortDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			seatReturnShortDistance.find({
				available: false
			}).exec().then(result => {
				const seatReturn = result.map((seat) => seat.id)
				console.log(seatReturn);
				res.render('shortDistancePlane', {
					title: 'Wybierz miejsce',
					seats: seats,
					seatReturn: seatReturn
				});
			})
		}).catch(err => console.log(err))
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Dubaj" && oneOrTwoWay != "oneWay") {
		seatMiddleDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			seatReturnMiddleDistance.find({
				available: false
			}).exec().then(result => {
				const seatReturn = result.map((seat) => seat.id)
				console.log(seatReturn);
				res.render('middleDistancePlane', {
					title: 'Wybierz miejsce',
					seats: seats,
					seatReturn: seatReturn
				});
			})
		}).catch(err => console.log(err))
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Nowy Jork" && oneOrTwoWay != "oneWay") {
		seatLongDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			seatReturnLongDistance.find({
				available: false
			}).exec().then(result => {
				const seatReturn = result.map((seat) => seat.id)
				console.log(seatReturn);
				res.render('longDistancePlane', {
					title: 'Wybierz miejsce',
					seats: seats,
					seatReturn: seatReturn
				});
			})
		}).catch(err => console.log(err))
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Londyn" && oneOrTwoWay === "oneWay") {
		seatShortDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			res.render('shortDistancePlaneOneWay', {
				title: 'Wybierz miejsce',
				seats: seats
			});

		}).catch(err => console.log(err))
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Dubaj" && oneOrTwoWay === "oneWay") {
		seatMiddleDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			res.render('middleDistancePlaneOneWay', {
				title: 'Wybierz miejsce',
				seats: seats
			});

		}).catch(err => console.log(err))
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Nowy Jork" && oneOrTwoWay === "oneWay") {
		seatLongDistance.find({
			available: false
		}).exec().then(result => {
			const seats = result.map((seat) => seat.id);
			console.log(seats)
			res.render('longDistancePlaneOneWay', {
				title: 'Wybierz miejsce',
				seats: seats
			});

		}).catch(err => console.log(err))
	}
	if (req.session.cust_log != "true") {
		req.session.destroy(); //destroy session
		res.render('index');
	}
});

// add a document to the DB collection recording the click event
router.put('/home', (req, res) => {

	console.log(req.body)

	// shortDistance

	if (req.body.class[1] == "highlight" && arrivalPlace === "Londyn") {
		console.log('Londyn')
		seatShortDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatShortDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}

	// return flights

	if (req.body.class[1] == "highlight1" && arrivalPlace === "Londyn") {
		console.log('Londyn powrót')
		seatReturnShortDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatReturnShortDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}
	// middle distance
	if (req.body.class[1] == "highlight" && arrivalPlace === "Dubaj") {
		console.log('Dubaj')
		seatMiddleDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatMiddleDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}

	// return flights

	if (req.body.class[1] == "highlight1" && arrivalPlace === "Dubaj") {
		console.log('Dubaj powrót')
		seatReturnMiddleDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatReturnMiddleDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}
	// long distance
	if (req.body.class[1] == "highlight" && arrivalPlace === "Nowy Jork") {
		console.log('Nowy Jork')
		seatLongDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatLongDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}

	// return flights

	if (req.body.class[1] == "highlight1" && arrivalPlace === "Nowy Jork") {
		console.log('Nowy Jork powrót')
		seatReturnLongDistance.findByIdAndUpdate({
				_id: req.body.id
			}, {
				available: false
			})
			.then(() => {
				seatReturnLongDistance.find({
						_id: req.body.id
					})
					.then(room => {
						res.send(room);
					});
			});
	}
});
router.get('/payment', function (req, res, next) {
	req.session.destroy();
	res.render("payment")
})


module.exports = router;