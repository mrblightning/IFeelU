//Installation of Mongodb is located at: https://www.mongodb.com/download-center/community?jmp=docs
//Code examples for Mongodb taken from: https://www.w3schools.com/nodejs/nodejs_mongodb.asp
//If this is the first time you are working with MongoDB in this project you need to install it
//Open terminal and type: npm install mongodb --save
//If you have brought your code to a new server and have the package.json but not the modules
//You just need to type 'nmp i' to initialize everything 
//Before you can run any node js apps working with mongodb you HAVE to have mongo running in the background
//In order to have mongodb running you need to have it downloaded, installed and have a path for creating databases - 
//The default location is c:\data\db but you can change that to whatever you want
//Assuming you did it all as required and you installed MongoDB version 4.0 then use Command Prompt
//to CD to C:\Program Files\MongoDB\Server\4.0\bin
//enter command 'mongod'
//If all went well you should see a bunch of text and the last line should say something like:
//Waiting for connections on port 27017
//At this point MongoDB is running.

//To run a spesific js file in node open Terminal, make sure your path points to the write folder and type
//node NameOfFile.js

//Running this file is a one-time-thing just to initiate the DB with some basic Data


//this code lets us access mongodb as a Client
const mongoClient = require('mongodb').MongoClient;
//this determins which DB we'll be accessing or creating
//let url = 'mongodb://localhost:27017/';
//this is the URL for the nodechef server I created
let url = "mongodb://ifeelusers-6133:HQJbSCVKH1mDIm65jVFLehl3XXIUjU@db-ifeelusers-6133.nodechef.com:5409/ifeelusers";

//this command connects to the client we created, specifically to the DB IFeelUsers
//and inserts object myUsers into the collection users using the command insertOne.	
  mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) { throw err };
    var dbo = db.db("ifeelusers");
    var myUsers = 
      {_id: '5c6459230611ee0d144ac78b', FirstName: 'Ilana', LastName: 'Bareket', mail: 'im@gmail.com', password: '123456', conditions: 'Fibromyalgia, Complex PTSD, IBS, DSPS',
        treatments: 'Diazepam, Weed, CBD, Hydro Therapy, Yoga', TrackingGeneralFeeling: true, TrackingNausea: false, TrackingMotivation: false,
        TrackingDizziness: false, TrackingAppetite: false, TrackingBowelMovements: false, TrackingPain: true, TrackingExhaustion: false,
        TrackingTime_1: '10:00', TrackingTime_2: '19:00'};
      dbo.collection("users").insertOne(myUsers, function(err, res) {
        if (err) throw err;
        console.log("1 document added: " + res.insertedCount);
        db.close();
      });
  });

//this command connects to the client we created, specifically to the DB IFeelUsers
//and deletes ALL documents (since the first parameter, quary, is blank then there are no filters 
//and it catches all documents) in collection 'users'.	
	// mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
	// 	if (err) {throw err;}
	// 	var dbo = db.db("IFeelUsers");
	// 	dbo.collection("users").deleteMany({}, function(err, obj) {
	// 		if (err) {throw err;}
	// 	  //.n is one of the properties of the returned object obj. in this case it tells us the number of deleted documents	
	// 	  console.log(obj.result.n + " document(s) deleted");
	// 	  db.close();
	// 	});
  // });
  
//this command connects to the client we created, specifically to the DB IFeelUsers
//and allows us to use a variable to define the quary sent to findOne (or any other mongodb function).		
	// mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
	// 	if (err) {throw err;}
	// 	var dbo = db.db("IFeelUsers");
	// 	var newId = 'Ilana';
	// 	var myquery = {};
  //   //myquery["FirstName"] = eval(newId);
  //   myquery["FirstName"] = 'Ilana';
	// 	dbo.collection("users").findOne(myquery, function(err, result) {
	// 		if (err) {throw err;}
	// 		console.log("found 1 innerId with _id " + result._id);
	// 		db.close();		
	// 	});
  // });	
  
//this command connects to the client we created, specifically to the DB dishesdb
//and inserts object mydishes into the collection dishes using the command insertMany.	
  mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) { throw err };
    var dbo = db.db("ifeelusers");
    var myRecords = [
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-01', time: '10:00', RecordTracking: 'GeneralFeeling',
        state: 4, ExtraText: 'I\'m feeling great today. Excited to see what this app can do.'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-01', time: '10:00', RecordTracking: 'Pain',
        state: 3, ExtraText: 'Hi new app :)'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-01', time: '19:00', RecordTracking: 'GeneralFeeling',
        state: 3, ExtraText: 'Really tired this evening.'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-01', time: '19:00', RecordTracking: 'Pain',
        state: 4, ExtraText: 'It\'s going to rain tomorrow. My right knee is killing me'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-02', time: '10:00', RecordTracking: 'GeneralFeeling',
        state: 3, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-02', time: '10:00', RecordTracking: 'Pain',
        state: 2, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-02', time: '19:00', RecordTracking: 'GeneralFeeling',
        state: 5, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-02', time: '19:00', RecordTracking: 'Pain',
        state: 1, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-03', time: '10:00', RecordTracking: 'GeneralFeeling',
        state: 3, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-03', time: '10:00', RecordTracking: 'Pain',
        state: 2, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-03', time: '19:00', RecordTracking: 'GeneralFeeling',
        state: 5, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-03', time: '19:00', RecordTracking: 'Pain',
        state: 1, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-05', time: '10:00', RecordTracking: 'GeneralFeeling',
        state: 4, ExtraText: 'I\'m feeling great today. Excited to see what this app can do.'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-05', time: '10:00', RecordTracking: 'Pain',
        state: 3, ExtraText: 'Hi new app :)'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-10', time: '19:00', RecordTracking: 'GeneralFeeling',
        state: 3, ExtraText: 'Really tired this evening.'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-10', time: '19:00', RecordTracking: 'Pain',
        state: 4, ExtraText: 'It\'s going to rain tomorrow. My right knee is killing me'},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "1", date: '2019-01-11', time: '10:00', RecordTracking: 'GeneralFeeling',
        state: 3, ExtraText:''},
      {FirstName: 'Ilana', LastName: 'Bareket', UserId: '5c6459230611ee0d144ac78b', check: "2", date: '2019-01-12', time: '19:00', RecordTracking: 'Pain',
        state: 1, ExtraText:''},
    ];
    dbo.collection("records").insertMany(myRecords, function (err, res) {
      if (err) throw err;
      console.log("Number of documents inserted into records: " + res.insertedCount);
      db.close();
    });
  });

//this command connects to the client we created, specifically to the DB IFeelUsers
//and deletes ALL documents (since the first parameter, quary, is blank then there are no filters 
//and it catches all documents) in collection 'users'.	
	// mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
	// 	if (err) {throw err;}
	// 	var dbo = db.db("IFeelUsers");
	// 	dbo.collection("records").deleteMany({}, function(err, obj) {
	// 		if (err) {throw err;}
	// 	  //.n is one of the properties of the returned object obj. in this case it tells us the number of deleted documents	
	// 	  console.log(obj.result.n + " document(s) deleted");
	// 	  db.close();
	// 	});
  // });  