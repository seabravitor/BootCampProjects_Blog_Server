const User = require('../models/UserModels');
const argon2 = require('argon2'); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require('jsonwebtoken');
const validator = require('validator');
const jwt_secret = process.env.JWT_SECRET;

const admin = async (req, res) => {
	try {
		const user = await User.find({}); //PASS ONLY THE VALIDATED EMAIL
		res.send(user);
	} catch (error) {
		res.send({ message: error });
		console.log('====  error  ====>', error);
	}
};

const register = async (req, res) => {
	const { email, password, password2 } = req.body;
	if (!email || !password || !password2)
		return res.json({ ok: false, message: 'All fields are required' });
	if (password !== password2)
		return res.json({ ok: false, message: 'passwords must match' });
	if (!validator.isEmail(email))
		return res.json({ ok: false, message: 'please provide a valid email' });
	try {
		const user = await User.findOne({ email });
		if (user) return res.json({ ok: false, message: 'email already in use' });
		// 1234
		// osiduv0w8hv08jew0vheohv
		const hash = await argon2.hash(password);
		console.log('hash ==>', hash);
		const newUser = {
			email,
			password: hash,
		};
		await User.create(newUser);
		res.json({ ok: true, message: 'successfully registered' });
	} catch (error) {
		res.json({ ok: false, error });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.json({ ok: false, message: 'All field are required' });
	if (!validator.isEmail(email))
		return res.json({ ok: false, message: 'invalid data provided' });
	try {
		const user = await User.findOne({ email });
		if (!user) return res.json({ ok: false, message: 'invalid data provided' });
		const match = await argon2.verify(user.password, password);
		if (match) {
			const token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: '1h' }); //{expiresIn:'365d'}
			res.json({ ok: true, message: 'welcome back', token, email });
		} else return res.json({ ok: false, message: 'invalid data provided' });
	} catch (error) {
		res.json({ ok: false, error });
	}
};

const verify_token = (req, res) => {
	console.log(req.headers.authorization);
	const token = req.headers.authorization;
	jwt.verify(token, jwt_secret, (err, succ) => {
		err
			? res.json({ ok: false, message: 'something went wrong' })
			: res.json({ ok: true, succ });
	});
};

module.exports = { register, login, verify_token };
