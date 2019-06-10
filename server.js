const express = require('express');
const bodyParserr = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const database = {
	users:[
		{
			id: '123',
			name: 'John',
			email: 'john@xmail.com',
			entries: 0,
			password: 'cookies',
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@xmail.com',
			entries: 0,
			password: 'bananas',
			joined: new Date()
		}
	],
	login:[
	{
		id: '987',
		hash: '',
		email: 'john@xmail.com'
	}]
}



app.use(bodyParserr.json());
app.get('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req, res) =>{
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}
	else{
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) =>{
	const {name, email, password} = req.body;
	database.users.push({
			id: '125',
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
	});
	res.json(database.users[database.users.length -1]);
})

app.get('/profile/:id', (req, res) =>{
	const { id } = req.params;
	let found = false;
	database.users.forEach(user =>{
		if(user.id == id){
			found = true;
			return res.json(user);
		}		
	});
	if(!found){
		res.status(404).json('No such user');
	}
})

app.put('/image', (req, res)=>{
	const { id } = req.body;
	let found = false;
	database.users.forEach(user =>{
		if(user.id == id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}		
	});
		if(!found){
		res.status(404).json('No such user');
	}
})

app.listen(3001, ()=>{
	console.log('app is running on port 3000');
})

/*
/ **> res = this is working
/signin --> POST =success/fail
/resgister --> = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

/*
Secure way of storing passwords and users
NO PLAIN TEXT NEVER EVER
bcrypt-node.js
npm install cors (to test api with front end in dev environment)
*/
