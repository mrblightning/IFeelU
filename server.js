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
    let username1 = req.body.username;
    let password1 = req.body.password;
    let UserId1 = req.body.UserId;
    console.log("/fetch");

    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) { throw err };
        let dbObject = db.db("ifeelusers");

        let myquery = {};
        //there are 2 options to locate a user.
        //1. using the userName and password from the login page
        if (username1 !== undefined && password1 !== undefined) {
            let searchFieldName1 = "userName";
            let searchFieldName2 = "password";
            myquery[searchFieldName1] = username1;
            myquery[searchFieldName2] = password1;
        }
        //2. using the _id / UserId from the sessionStorage. this search comes from MyCotext.js
        else {
            if (UserId1 !== undefined) {
                let searchFieldName1 = "UserId";
                myquery[searchFieldName1] = UserId1;
            }
        }
        dbObject.collection("users").findOne(myquery, function (err, result) {
            if (err) { throw err };
            if (result != null) {
                console.log(result);
                res.send(result);
            }
        });
    });
});

//GET call from client to server
//We connect to the client we defined for mongo, spesifically to IFeelUsers
//then we call ALL information there for records with UserId = :id and place it in 'result'
//then we use the response (res) to send the results back to the client
//Not that this function is for the RECORDS while the one above is for the USER 
app.get('/fetch/:id', (req, res) => {
    let newId = req.params.id;
    //console.log(newId);
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) { throw err };
        let dbObject = db.db("ifeelusers");
        dbObject.collection("records").find({ UserId: newId }).toArray(function (err, result) {
            if (err) { throw err };
            //console.log(result);
            res.send(result);
            db.close();
        });
    });
});

//PUT call from client to server - updates user tracking information in place UserId
app.put('/get', (req, res) => {
    let UserId1 = req.body.UserId;
    let GeneralFeeling = req.body.GeneralFeeling;
    let Appetite = req.body.Appetite;
    let Nausea = req.body.Nausea;
    let BowelMovements = req.body.BowelMovements;
    let Motivation = req.body.Motivation;
    let Pain = req.body.Pain;
    let Dizziness = req.body.Dizziness;
    let Exhaustion = req.body.Exhaustion;
    let updateSucceed = false;

    console.log("1 document at ID " + UserId1 + " need to be updated");

    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) { throw err; }
        let dbObject = db.db("ifeelusers");
        let myquery = {};
        let searchFieldName1 = "UserId";
        myquery[searchFieldName1] = UserId1;
        let newvalues = {
            $set: {
                TrackingGeneralFeeling: GeneralFeeling,
                TrackingAppetite: Appetite,
                TrackingNausea: Nausea,
                TrackingBowelMovements: BowelMovements,
                TrackingMotivation: Motivation,
                TrackingPain: Pain,
                TrackingDizziness: Dizziness,
                TrackingExhaustion: Exhaustion
            }
        };
        dbObject.collection("users").updateOne(myquery, newvalues, function (err, res) {
            if (err) { throw err; }
            console.log("1 document at UserId " + UserId1 + " updated " + res.result.nModified);
            updateSucceed = true;
            db.close();
        });
    });
    if (updateSucceed) {
        //we use res.send because otherwise the function on the client will get no success condition
        res.send('succesfully updated User');
    } else {
        res.send('couldn\'t find UserId');
    }
})

//PUT call from client to server - create user records
app.put('/set', (req, res) => {
    let UserId1 = req.body.UserId;
    let TrackGeneralFeeling = req.body.TrackGeneralFeeling;
    let TrackAppetite = req.body.TrackAppetite;
    let TrackNausea = req.body.TrackNausea;
    let TrackBowelMovements = req.body.TrackBowelMovements;
    let TrackMotivation = req.body.TrackMotivation;
    let TrackPain = req.body.TrackPain;
    let TrackDizziness = req.body.TrackDizziness;
    let TrackExhaustion = req.body.TrackExhaustion;
    let GeneralFeeling = req.body.GeneralFeeling;
    let Appetite = req.body.Appetite;
    let Nausea = req.body.Nausea;
    let BowelMovements = req.body.BowelMovements;
    let Motivation = req.body.Motivation;
    let Pain = req.body.Pain;
    let Dizziness = req.body.Dizziness;
    let Exhaustion = req.body.Exhaustion;
    let FirstName1 = req.body.FirstName;
    let LastName1 = req.body.LastName;
    let check1 = req.body.check;
    let date1 = req.body.currentDate;
    let time1 = req.body.currentTime;
    let conditions = req.body.conditions;
    let treatments = req.body.treatments;
    let updateSucceed = false;

    if (TrackGeneralFeeling) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "GeneralFeeling",
                UserId: UserId1,
                state: GeneralFeeling,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated GeneralFeeling record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackAppetite) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Appetite",
                UserId: UserId1,
                state: Appetite,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Appetite record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackNausea) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Nausea",
                UserId: UserId1,
                state: Nausea,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Nausea record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackBowelMovements) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "BowelMovements",
                UserId: UserId1,
                state: BowelMovements,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated BowelMovements record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackMotivation) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Motivation",
                UserId: UserId1,
                state: Motivation,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Motivation record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackPain) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Pain",
                UserId: UserId1,
                state: Pain,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Pain record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackDizziness) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Dizziness",
                UserId: UserId1,
                state: Dizziness,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Dizziness record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackExhaustion) {
        //we need to create a record of GeneralFeeling for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let newRecord = {
                FirstName: FirstName1,
                LastName: LastName1,
                check: check1,
                date: date1,
                time: time1,
                RecordTracking: "Exhaustion",
                UserId: UserId1,
                state: Exhaustion,
                ExtraText: '',
                conditions: conditions,
                treatments: treatments
            };
            dbObject.collection("records").insertOne(newRecord, function (err, res) {
                if (err) { throw err; }
                console.log("1 document at UserId " + UserId1 + " inserted " + res.insertedCount);
                updateSucceed = true;
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Exhaustion record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
})

//PUT call from client to server - update text in user records
app.put('/addText', (req, res) => {
    let UserId1 = req.body.UserId;
    let TrackGeneralFeeling = req.body.TrackGeneralFeeling;
    let TrackAppetite = req.body.TrackAppetite;
    let TrackNausea = req.body.TrackNausea;
    let TrackBowelMovements = req.body.TrackBowelMovements;
    let TrackMotivation = req.body.TrackMotivation;
    let TrackPain = req.body.TrackPain;
    let TrackDizziness = req.body.TrackDizziness;
    let TrackExhaustion = req.body.TrackExhaustion;
    let GeneralFeelingText = req.body.GeneralFeelingText;
    let AppetiteText = req.body.AppetiteText;
    let NauseaText = req.body.NauseaText;
    let BowelMovementsText = req.body.BowelMovementsText;
    let MotivationText = req.body.MotivationText;
    let PainText = req.body.PainText;
    let DizzinessText = req.body.DizzinessText;
    let ExhaustionText = req.body.ExhaustionText;
    let updateSucceed = false;

    if (TrackGeneralFeeling) {
        //we need to add the GeneralFeeling text to the last GeneralFeeling record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "GeneralFeeling";
            let newvalues = { $set: { ExtraText: GeneralFeelingText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated GeneralFeeling record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackAppetite) {
        //we need to add the Appetite text to the last Appetite record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Appetite";
            let newvalues = { $set: { ExtraText: AppetiteText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Appetite record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackNausea) {
        //we need to add the Nausea text to the last Nausea record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Nausea";
            let newvalues = { $set: { ExtraText: NauseaText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Nausea record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackBowelMovements) {
        //we need to add the BowelMovements text to the last BowelMovements record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "BowelMovements";
            let newvalues = { $set: { ExtraText: BowelMovementsText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated BowelMovements record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackMotivation) {
        //we need to add the Motivation text to the last Motivation record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Motivation";
            let newvalues = { $set: { ExtraText: MotivationText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Motivation record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }
    if (TrackPain) {
        //we need to add the Pain text to the last Pain record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Pain";
            let newvalues = { $set: { ExtraText: PainText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Pain record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }   
    if (TrackDizziness) {
        //we need to add the Dizziness text to the last Dizziness record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Dizziness";
            let newvalues = { $set: { ExtraText: DizzinessText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Dizziness record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }      
    if (TrackExhaustion) {
        //we need to add the Exhaustion text to the last Exhaustion record for user UserId
        mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) { throw err; }
            let dbObject = db.db("ifeelusers");
            let myquery = {};
            let searchFieldName1 = "UserId";
            let searchFieldName2 = "RecordTracking";
            myquery[searchFieldName1] = UserId1;
            myquery[searchFieldName2] = "Exhaustion";
            let newvalues = { $set: { ExtraText: ExhaustionText } };
            dbObject.collection("records").findOneAndUpdate(myquery, newvalues, {sort: {_id:-1}}, function (err, res) {
                if (err) { throw err; }
                if (res != undefined) {
                    console.log("1 document at UserId " + UserId1 + " updated");
                    updateSucceed = true;
                }
                db.close();
            });
        });
        if (updateSucceed) {
            //we use res.send because otherwise the function on the client will get no success condition
            res.send('succesfully updated Exhaustion record');
        } else {
            res.send('couldn\'t find UserId');
        }
    }      
})


//this activates the server to listen at localhost with the port available OR port 3000
let port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Server listening on port', port)
})