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
});

//Sends Friend Request
app.post("/addFriends", (req, res) =>{
    res.send(fitworld.addFriends(req.body.user1,req.body.user2));
});

//Views Friend Requests
app.post("/friendRequests", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFriendRequests());
});

//Approves Friend Request
app.post("/approveFriend", (req, res) =>{
    res.send(fitworld.approveFriend(req.body.user1,req.body.user2));
});

//Deletes Friend Requests
app.post("/rejectFriend", (req, res) =>{
    res.send(fitworld.users[req.body.user1].rejectFriend(req.body.user2));
});

//Hides user's statuses from showing to friend
app.post("/hideFromFriend", (req, res) =>{
    res.send(fitworld.hideFromUser(req.body.user1,req.body.user2));
});

//Unhides user's statuses from showing to friend
app.post("/unhideFromFriend", (req, res) =>{
    res.send(fitworld.unhideFromUser(req.body.user1,req.body.user2));
});

//Hides statuses from a friend that a user doesnt want to see
app.post("/dontSeeFriend", (req, res) =>{
    res.send(fitworld.dontShowUser(req.body.user1,req.body.user2));
});

//Unhides statuses from a friend that a user doesnt want to see
app.post("/undontSeeFriend", (req, res) =>{
    res.send(fitworld.undontShowUser(req.body.user1,req.body.user2));
});

//Unfriends user
app.post("/unfriend", (req, res) =>{
    res.send(fitworld.unfriend(req.body.user1,req.body.user2));
});

//Shows Friends
app.post("/seeFriends", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFriends());
});

//Shows Friends status'
app.post("/friendFeed", (req, res) =>{
    res.send(fitworld.friendFeed(req.body.userId));
});

//Sets Status
app.post("/newStatus", (req, res) =>{
    res.send(fitworld.users[req.body.userId].setStatus(req.body.status));
});

//Get user's own status
app.post("/myStatus", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getStatus());
});








app.post('/addWeight', (req, res) => {
    var userId = req.header("userId");
    let newCard = game.submitCaption(playerId, req.body.text )
    res.send(newCard);
})

app.get("/goalWeight/:id", function(req, res){
    res.send(fitworld.users[req.params.id].gWeight());
})

module.exports = app;