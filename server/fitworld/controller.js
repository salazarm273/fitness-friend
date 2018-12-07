const express = require('express');
const {fitWorld, User, Challenge} = require ('./model');


const fitworld= new fitWorld();

const app=express.Router();

//main url, sends info on all users in fitworld
app.get("/", function(req, res){
    res.send(fitworld.users);
});

//returns the options for activities
app.get("/activityOpts", (req, res) => {
    res.send(fitworld.availableActivities);
})

//adds user uisng fb
app.post("/addUser", (req, res) => {
        //const user = new User(req.body.name, fitworld.users.length, req.body.pass, req.body.email, req.body.bio, req.body.weight,
        //    req.body.wUnits, req.body.height, req.body.hUnits, req.body.gender, req.body.age, req.body.goalCalories, req.body.goalWeight);
        //fitworld.users.push(user);
        const user = fitworld.loginfb(req.body.name, req.body.fbid, req.body.access_token)
    res.send(user);
});

//adds user uisng info
app.post("/addUserOldWay", (req, res) => {
    const user = new User(req.body.name, fitworld.users.length, null, true, req.body.pass, req.body.email, req.body.bio, req.body.weight,
        req.body.wUnits, req.body.height, req.body.hUnits, req.body.gender, req.body.age, req.body.goalCalories, req.body.goalWeight);
    fitworld.users.push(user);
    //const user = fitworld.loginfb(req.body.name, req.body.fbid, req.body.access_token)
    res.send(user);
});

//adds relevant user info to profile
app.post("/addUserInfo", (req, res) => {
    fitworld.users[req.body.userId].addUserInfo(req.body.bio, req.body.weight,
    req.body.wUnits, req.body.height, req.body.hUnits, req.body.gender, req.body.age, 
    req.body.goalCalories, req.body.goalWeight);
    //fitworld.users.push(user);
    //const user = fitworld.loginfb(req.body.name, req.body.fbid, req.body.access_token)
res.send(fitworld.users[req.body.userId]);
});

//retrieves user by id
app.post("/user", (req, res) => {
    res.send(fitworld.users[req.body.userId]);
});

//retrieves user(s) by name 
app.post("/userNames", (req, res) => {
    res.send(fitworld.getUsersByNames(req.body.name));
})

//checks if users are friends 
app.post("/areFriends", (req, res) => {
    res.send(fitworld.users[req.body.userId].isFriend(req.body.user2));
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
    res.send(fitworld.users[req.body.userId].getActivitiesAll());
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

//Logs weight
app.post("/logWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].logWeight(req.body.weight, req.body.date));
});

//Gets difference to goal weight
app.post("/weightLeft", (req, res) =>{
    res.send(fitworld.users[req.body.userId].weightLeft());
});

//deletes most recently added weight
app.post("/deleteWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].deleteWeight());
});

//shows weight log and total progress
app.post("/allWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].allWeight());
});

//shows latest week of weight logs
app.post("/weekWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWeightsWeek());
});

//shows weight logs for the month
app.post("/monthWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWeightsMonth());
});

//shows weight logs for the year
app.post("/yearWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWeightsYear());
});

//show weight logs in a date range, earlier date first
app.post("/weightRange", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWeightsRange(req.body.date1,req.body.date2));
});

//show weight logs in between two weights, with smaller weight first
app.post("/weightBetween", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWeightsBetween(req.body.weight1,req.body.weight2));
});

//gets goal weight
app.post("/weightGoal", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getGoalW());
});

//gets the units of weight for user
app.post("/weightUnits", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getWUnits());
});

//logs a food that is not in the food array already
app.post("/logFood", (req, res) =>{
    res.send(fitworld.users[req.body.userId].logFood(req.body.name, req.body.servings, req.body.calories, req.body.date, req.body.add));
});

//logs a food from the food array by index
app.post("/logFoodIndex", (req, res) =>{
    res.send(fitworld.users[req.body.userId].logFoodSystemIndex(req.body.index, req.body.servings, req.body.date));
});

//logs a food from the food array by name
app.post("/logFoodName", (req, res) =>{
    res.send(fitworld.users[req.body.userId].logFoodName(req.body.name, req.body.servings, req.body.date));
});

//deletes most recent food log
app.post("/deleteFood", (req, res) =>{
    res.send(fitworld.users[req.body.userId].deleteFood());
});

//shows full food diary and all calories consumed
app.post("/foodDiary", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodAll());
});

//shows food diary for day
app.post("/foodDiaryDay", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodDay());
});

//shows food diary for week
app.post("/foodDiaryWeek", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodWeek());
});

//shows food diary for month
app.post("/foodDiaryMonth", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodMonth());
});

//shows food diary for year
app.post("/foodDiaryYear", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodYear());
});

//shows food diary for date range
app.post("/foodDiaryRange", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodRange(req.body.date1,req.body.date2));
});

//shows all logs for a food by name
app.post("/foodDiaryName", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodName(req.body.name));
});

//shows all food logs between certain amounts of calories, lower amount first
app.post("/foodDiaryBetween", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getFoodBetween(req.body.cal1,req.body.cal2));
});

//shows all available food items
app.get("/foodOpts", (req, res) =>{
    res.send(fitworld.getFoodOpts());
});


//checks if user has goal weight
app.post("/hasWeightGoal", (req, res) =>{
    res.send(fitworld.users[req.body.userId].hasGoalWeight());
});

//changes goal weight
app.post("/newGoalWeight", (req, res) =>{
    res.send(fitworld.users[req.body.userId].setGoalWeight(req.body.goal));
});


//changes goal calories
app.post("/newGoalCal", (req, res) =>{
    res.send(fitworld.users[req.body.userId].setGoalC(req.body.goal));
});

 //Shows aggregate calorie status for the day
 app.post("/caloriesDay", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getReportDay());
});

//Shows aggregate calorie status for the week
app.post("/caloriesWeek", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getReportWeek());
});

//Shows aggregate calorie status for the month
app.post("/caloriesMonth", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getReportMonth());
});

//Shows aggregate calorie status for the year
app.post("/caloriesYear", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getReportYear());
});

//Shows aggregate calorie status for a date range
app.post("/caloriesRange", (req, res) =>{
    res.send(fitworld.users[req.body.userId].getReportRange(req.body.date1,
        req.body.date2));
});

//adds challenge
app.post("/addChallenge", (req, res) => {
    const challenge = new Challenge(req.body.name, fitworld.challenges.length, 
        req.body.descrip, req.body.start, req.body.end, req.body.activity,
        req.body.frequency);
    fitworld.challenges.push(challenge);
        res.send(challenge);
});

//shows all challenges
app.get("/challenges", (req, res) => {
    res.send(fitworld.challenges);
});

//checks for challenge winners
app.post("/challengeDone", (req, res) => {
    res.send(fitworld.checkWinners(req.body.id));
});

//adds a user to a challenge
app.post("/challengeJoin", (req, res) => {
    res.send(fitworld.joinChallenge(req.body.userId, req.body.chalId));
});

//gets a user's challenge notifications
app.post("/challengeNews", (req, res) => {
    res.send(fitworld.users[req.body.userId].getChallengeNews());
});

//deletes a challenge notification
app.post("/challengeNewsDelete", (req, res) => {
    res.send(fitworld.users[req.body.userId].deleteChallengeNews(req.body.index));
});

//returns all news articles
app.get("/getNews", (req, res) =>{
    res.send(fitworld.getNews());
});

//returns info on a specific news articles
app.post("/getNewsInfo", (req, res) =>{
    res.send(fitworld.getNewsInfo(req.body.index));
});

//returns the current date
app.get("/getToday", (req, res) =>{
    res.send(new Date());
});

module.exports = app;