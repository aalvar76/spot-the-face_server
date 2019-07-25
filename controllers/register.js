const handleRegister = (req, res, db, bcrypt) =>{
	const {name, email} = req.body.queryResult.parameters;
	const saltRounds = 10;
	let hash = bcrypt.hashSync('kkkk', saltRounds);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users')
			.returning('*')
			.insert({
				name: name, 
				email: loginEmail[0], 
				joined: new Date()})
			.then(user =>{
				res.json({
				    payload: name,
				    //data: speechResponse,
				    fulfillmentText: name,
				    speech: name,
				    displayText: name,
				    source: "webhook-echo-sample"
				  });
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Unable to register"));
}

module.exports ={
	handleRegister: handleRegister
}