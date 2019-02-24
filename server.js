//start with typing "npm i" into the terminal to make sure that all 
//dependancies are updated
//then, to run this server type "npm start" into the terminal

const express = require('express');
const path = require('path');
//body-parser is what allows us to identify parts of the body by their name
const bodyParser = require('body-parser');

//CORS package for providing a Connect/Express middleware
var cors = require('cors');

//this code lets us access mongodb as a Client
const mongoClient = require('mongodb').MongoClient;
//this determins which DB we'll be accessing
//let url = 'mongodb://localhost:27017/';
//this is the URL for the nodechef server I created
let url = "mongodb://ifeelusers-6133:HQJbSCVKH1mDIm65jVFLehl3XXIUjU@db-ifeelusers-6133.nodechef.com:5409/ifeelusers";


const app = express();

app.use(cors());
//this will make sure we go to 'public' to launch our app
app.use(express.static('public'));

//this code is to initialize the bodyParser
app.use(bodyParser.urlencoded(
	{ extended: true }
));
app.use(bodyParser.json());

//GET call from client to server
//We connect to the client we defined for mongo, spesifically to IFeelUsers
//then we call ALL information there for users with _id = :id and place it in 'result'
//then we use the response (res) to send the result just like we did with a locally defined object 
app.get('/get/:id', (req, res) => {
	let newId = req.params.id;
	console.log(newId);
	mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) { throw err };
		var dbObject = db.db("ifeelusers");
		var myquery = {};
		//this code allows me to make the field I'm looking for and it's value as variables
		//for some unknown reason I cannot get the value of newId to be taken into myquery without eval
		//The eval() function evaluates or executes an argument.
		//If the argument is an expression, eval() evaluates the expression. If the argument is one or more JavaScript statements, 
		//eval() executes the statements. 
		var searchFieldName = "FirstName";
		myquery[searchFieldName] = eval(newId);
		dbObject.collection("users").findOne(myquery, function(err, result) {
			if (err) {throw err};
			res.send(result);
		db.close();
		});
	});
});


//GET call from client to server
//We connect to the client we defined for mongo, spesifically to IFeelUsers
//then we call ALL information there for records with _id = :id and place it in 'result'
//then we use the response (res) to send the result just like we did with a locally defined object 
app.get('/fetch/:id', (req, res) => {
	let newId = req.params.id;
	//console.log(newId);
	mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) { throw err };
		var dbObject = db.db("ifeelusers");
		dbObject.collection("records").find({UserId: newId}).toArray(function(err, result) {
			if (err) { throw err };
			console.log(result);
			res.send(result);
			db.close();
		});
	});
});

//this activates the server to listen at localhost with the port available OR port 3000
let port = process.env.PORT || 4000;

app.listen(port, function () {
	console.log('Server listening on port', port)
})