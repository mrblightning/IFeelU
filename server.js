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

//POST call from client to server
//We connect to the client we defined for mongo, spesifically to IFeelUsers
//then we call FIRST information there for records with username = req.body.username
//and password = req.body.password. We place the information we find into 'result'
//then we use the response (res) to send the result just like we did with a locally defined object 
app.post('/fetch', (req, res) => {
    var username1 = req.body.username;
    var password1 = req.body.password;
    console.log("/fetch");

    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) { throw err };
		var dbObject = db.db("ifeelusers");

        var myquery = {};
        var searchFieldName1 = "userName";
        var searchFieldName2 = "passWord";
        myquery[searchFieldName1] = username1;
        myquery[searchFieldName2] = password1;
        console.log(username1);
        console.log(password1);
        console.log("myquery: " + myquery);
        dbObject.collection("users").findOne(myquery, function (err, result) {
            if (err) { throw err };
            if (result != null) {
                res.send(result);
            }
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
			//console.log(result);
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