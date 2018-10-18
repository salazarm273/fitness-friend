const express = require('express');
const {fitWorld, User} = require ('./model');


const fitworld= new fitWorld();

const app=express.Router();

//main url, sends info on all users in fitworld
app.get("/", function(req, res){
    res.send(fitworld.users);
});

//adds user
app.post("/addUser", (req, res) => {
        const user = new User(req.body.name, fitworld.users.length, req.body.pass, req.body.email, req.body.bio, req.body.weight,
            req.body.wUnits, req.body.height, req.body.hUnits, req.body.goalCalories, req.body.goalWeight);
        fitworld.users.push(user);
    res.send(user);
});

//retrieves user by id
app.post("/user", (req, res) => {
    res.send(fitworld.users[req.body.userId]);
});

//retrieves user(s) by name 
app.post("/userNames", (req, res) => {
    res.send(fitworld.getUsersByNames(req.body.name));
})

//adds activity by index
app.post("/logActivity", (req, res) => {
    let x = fitworld.users[req.body.userId].logActivity(req.body.index, req.body.duration, req.body.date, req.body.set);
    res.send(x);
});

//adds activity by name
app.post("/logActivityName", (req, res) => {
    let x = fitworld.users[req.body.userId].logActivityName(req.body.activity, req.body.duration, req.body.date, req.body.set);
    res.send(x);
});

//Shows Week's activities
app.post("/activitiesWeek", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesWeek());
});

//Show activities in between date range
app.post("/activitiesRange", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesRange(req.body.date1, req.body.date2));
});

//Shows Day's activities
app.post("/activitiesDay", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesDay());
});

//Shows Month's activities
app.post("/activitiesMonth", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesMonth());
});

//Shows Year's activities
app.post("/activitiesYear", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesYear());
});

//Shows specific actiivity info
app.post("/activityShow", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivity(req.body.index));
});

//Shows list of all activities of same name
app.post("/activitiesName", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesName(req.body.name));
});

//Shows list of all activities above certain calories burned amount
app.post("/activitiesCal", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesCal(req.body.cals));
});

//Shows list of all activities above a certain duration
app.post("/activitiesDuration", (req, res) => {
    res.send(fitworld.users[req.body.userId].getActivitiesDur(req.body.dur));
});

//Shows all activities
app.post("/allActivities", (req, res) => {
    res.send(fitworld.users[req.body.userId].activitiesLog);
})


app.get("/friends/:id", function(req, res){
    res.send(fitworld.users[req.params.id].friends());
})

app.post('/addWeight', (req, res) => {
    var userId = req.header("userId");
    let newCard = game.submitCaption(playerId, req.body.text )
    res.send(newCard);
})

app.get("/goalWeight/:id", function(req, res){
    res.send(fitworld.users[req.params.id].gWeight());
})

module.exports = app;