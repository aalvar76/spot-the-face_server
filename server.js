const express = require('express');
const bodyParserr = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const entries_counter = require('./controllers/entries_counter');

//define database connection
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'aPbiciforme9898!!',
    database : 'spot_the_face'
  }
});

//express to build a server
const app = express();

app.use(cors());

app.use(bodyParserr.json());
app.get('/', (req, res)=>{
	//res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) =>{profile.showProfile(req, res, db)});

app.put('/image', (req, res)=>{ entries_counter.handleEntries(req, res, db)});

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT }`);
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
