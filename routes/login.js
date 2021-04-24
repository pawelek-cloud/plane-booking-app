const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');

// connection to mongodb

const connectionString = 'mongodb+srv://pawelnowak:Pasibrzuch123@cluster0.g6ebl.mongodb.net/nodeauth?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(client => {
	console.log("Connected to database")
}).catch(error => console.error(error))

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const saltRound = 10;
let arrivalPlace;

// session

router.use(session({
	secret: 'key',
	resave: true,
	saveUninitialized: true
}));
let ssn;
/* GET home page. */
router.get('/', function (req, res, next) {
	req.session.destroy(); //destroy session
	res.render('index');
});


/* GET home page. */
router.get('/registration', function (req, res, next) {
	arrivalPlace = req.query.arrivalPlace;
	res.render('registration');
});

/* GET login page. */
router.get('/login', function (req, res, next) {
	req.session.destroy(); //destroy session
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
	if (req.session.cust_log == "true" && arrivalPlace === "Londyn") {
		res.render('shortDistancePlane', {
			title: 'Wybierz miejsce'
		});
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Dubaj") {
		res.render('middleDistancePlane', {
			title: 'Wybierz miejsce'
		});
	}
	if (req.session.cust_log == "true" && arrivalPlace === "Rio de Janeiro") {
		res.render('longDistancePlane', {
			title: 'Wybierz miejsce'
		});
	}
	if (req.session.cust_log != "true") {
		res.render('shortDistancePlane',{title:"Próbka"});
	}
});


module.exports = router;