const activities = require('./activities')
const foods = require("./foods")
const news = require("./news")

class fitWorld{
    constructor(){
        this.users =[];
        this.challenges = [];
        this.availableActivities = activities;
    }
    
    //logs in with fb
    loginfb(name, fbid, access_token){
        let user = this.users.find(x=> x.fbid == fbid);
        if(!user){
            user = new User(name, this.users.length, fbid, false,null,null,null,null,null,null,null,null,null,-1,-1);
            this.users.push(user);
        }
        user.access_token = access_token;
        //console.log("here2. User is "+JSON.stringify(user));
        return user;
    }


    //shows all users
    getAllUsers(){
        return this.users;
    }

    getActivityOpts(){
        return this.activities;
    }

    //shows all users with name
    getUsersByNames(name){
        let temp= [];
        for(var i = 0; i < this.users.length; i++)
        {
            if(this.users[i].name == name){
                temp.push(this.users[i]);
            }
        }
        return temp;
    }

    //shows all challenges
    getAllChallenge(){
        return this.challenges;
    }

    //sends friend request from user1 to user2
    addFriends(user1,user2){
        this.users[user2].friendRequests.push({name: this.users[user1].name, id: this.users[user1].id, bio: this.users[user1].bio });
        return true;
    }

    //Approves Friend Request
    approveFriend(user1,user2){
        let changed= false;
        let friend1=this.users[user1];
        for(var i = 0; i< friend1.friendRequests.length; i++){
            if(friend1.friendRequests[i].id == user2){
                friend1.friends.push({name: friend1.friendRequests[i].name, id:friend1.friendRequests[i].id, bio: friend1.friendRequests[i].bio});
                friend1.friendRequests.splice(i,1);
                changed=true;
            }
        }

        this.users[user2].friends.push({name: friend1.name, id: friend1.id, bio: friend1.bio});
        return changed;
    }

    //hides user1's statuses from user2, at the request of user1
    hideFromUser(user1,user2){
        this.users[user1].friendsDontShow.push({name: this.users[user2].name, id: user2});
        return true;
    }

    //unhides user1's statuses from user2, at the request of user1
    unhideFromUser(user1,user2){
        let changed=false;
        for(var i=0;i<this.users[user1].friendsDontShow.length;i++){
            if(this.users[user1].friendsDontShow[i].id == user2){
                this.users[user1].friendsDontShow.splice(i,1);
                changed=true;
                break;
            }
        }
        return changed;
    }

    //stops user1 from seeing user2's status. at the request of user1
    dontShowUser(user1,user2){
        this.users[user1].friendsDontSee.push({name: this.users[user2].name, id: user2});
        return true;
    }

    //unstops user1 from seeing user2's status. at the request of user1
    undontShowUser(user1,user2){
        let changed=false;
        for(var i=0;i<this.users[user1].friendsDontSee.length;i++){
            if(this.users[user1].friendsDontSee[i].id == user2){
                this.users[user1].friendsDontSee.splice(i,1);
                changed=true;
                break;
            }
        }
        return changed;
    }

    //unfriends users
    unfriend(user1,user2){
        let k= false;
        let j=false;
        for(var i=0; i < this.users[user1].friends.length; i++){
            if(this.users[user1].friends[i].id == user2){
                this.users[user1].friends.splice(i,1);
                k=true;
            }
        }
        for(i=0; i < this.users[user2].friends.length; i++){
            if(this.users[user2].friends[i].id == user1){
                this.users[user2].friends.splice(i,1);
                j=true;
            }
        }
        return (k && j);
    }

    //shows a user all of their friends' status
    //(unless they dont want to see that friend or that friend doesn't want to show them)
    friendFeed(userId){
        let temp= [];
        let viewer = this.users[userId];
        for(var i=0; i<viewer.friends.length;i++){
            let friend=this.users[viewer.friends[i].id];
            let hidden=false;
            //checks if the user wants to see this friend's posts
            for(var j=0; j<viewer.friendsDontSee.length;j++){
                if(viewer.friendsDontSee[j].id==friend.id){
                    hidden=true;
                    break;
                }
            }
            //checks if the friend wants to be seen by this user
            for(var k=0; k<friend.friendsDontShow.length; k++){
                if(friend.friendsDontShow[k].id==viewer.id){
                    hidden=true;
                    break;
                }
            }

            //don't include status if friend hasn't set any status yet
            if(friend.status.status == "none"){
                hidden=true;
            }

            if(!hidden){
                temp.push(friend.status);
            }
        }
        if(temp.length >= 2){
            temp= this.dateSort(temp);
        }
        
        return temp;
    }


    //checks for winners to a challenge
    checkWinners(chalId){
        let contest = this.challenges[chalId];
        for(var i = 0; i<contest.contestants.length; i++){
            let player = this.users[contest.contestants[i].id];
            if(this.won(player,contest))
            {
                player.challengesWon.push({contest: contest.title});
                player.challengeNotifications.push({message: "You won the "+contest.title+ " challenge! Great job!"});
                contest.winners.push(player);
            }else{
                if(contest.end < new Date()){
                    player.challengeNotifications.push({message: "You lost the "+contest.title+ " challenge, but I'm sure you'll do better on your next challenge!"});
                    contest.contestants.splice(i,1);
                    i--;
                }
            }
        }
        contest.setChecked(true);
        return contest.winners;
    }

    //checks if a specifc user has met the criteria to win
    won(player, contest){
        let count = 0;
        for(var i=0; i< player.activitiesLog.length; i++){
            if(player.activitiesLog[i].name == contest.activity)
                if(player.activitiesLog[i].date >= contest.start && 
                    player.activitiesLog[i].date <= contest.end){
                        count++;
                }
            }
        if(count >= contest.frequency){
            return true;
        }
        return false;
    }

    //add user to a challenge
    joinChallenge(userId, chalId){
        let contest = this.challenges[chalId];
        let contestant = {name: this.users[userId].name, id: userId};
        let alreadyAdded = false;
        for(let i =0;i<contest.contestants.length;i++){
            if(contest.contestants[i].id == userId){
                alreadyAdded = true;
            }
        }
        if(!alreadyAdded){
            contest.contestants.push(contestant);
            this.users[userId].challengeNotifications.push({message: "You joined the "+contest.tittle+ " challenge! Good luck!"})
        }
        return contest.contestants;
    }

    //sorts elements by date
    dateSort(array){
        for(var i=0;i<array.length-1;i++){
            let latest=i;
            for(var j=i+1;j<array.length;j++){
                if(array[j].date > array[latest].date){
                    let temp=array[latest];
                    array[latest]=array[j];
                    array[j]=temp;
                }
            }
        }
        return array;
    }
    //returns available food options
    getFoodOpts(){
        return foods;
    }

    //returns news articles
    getNews(){
        return news;
    }

    //returns info on a news article
    getNewsInfo(index){
        return news[index];
    }

}

class User{
    constructor(name, id, fbid, isSetup, pass, email, bio, weight, wUnits, height, hUnits, gender, age, goalCalories, goalWeight){
        this.name = name;
        this.id = id;
        this.fbid = fbid;
        this.isSetup = isSetup;
        this.pass = () => pass;
        this.email = email;
        this.bio = bio;
        this.weight = () => weight; //going to be set to -1 if the user doesn't wish to track weight
        this.wUnits = wUnits;
        this.height = () => height;
        this.hUnits = hUnits;
        this.gender = gender;
        this.age = age;
        this.gCals = goalCalories;
        this.gWeight = goalWeight;
        this.activitiesLog = [];
        this.foodLog = [];
        this.weightLog = [];
        this.friends = [];
        this.friendRequests = [];
        this.friendsDontSee = [];
        this.friendsDontShow = [];
        this.status= {status: "none", date: "none"};
        this.challengesWon = [];
        this.challengeNotifications = [];
        this.myFoodOpts = ["Cheese Pizza"];
    }

    addUserInfo(bio, weight, wUnits, height, hUnits, gender, age, goalCalories, goalWeight){
        this.isSetup = true;
        this.bio = bio;
        //weight is set to -1 if the user doesn't wish to track weight
        if(weight > 0){
            this.weight = () => weight;
        }else{
            this.weight = () => 0;
        }         
        this.wUnits = wUnits;
        this.height = () => height;
        this.hUnits = hUnits;
        this.gender = gender;
        this.age = age;
        if(goalCalories>0){
            this.gCals = () => goalCalories;
        }else{
            this.gCals = () => 0;
        }
        if(goalWeight > 0){
            this.gWeight =  goalWeight;
        }else{
            this.gWeight =  0;
        }
        if(weight<=0){
            this.weightLog = [];
        }else{
            let d = new Date();
            this.weightLog = [{weight: weight, date: new Date(), month: d.getMonth() +1, day: d.getDate(), year: d.getFullYear()}];
        }
        return this;
    }
    
    hasGoalWeight(){
        if(this.gWeight == 0){
            return false;
        }else{
            return true;
        }
    }
    
    setGoalWeight(weight){
        this.gWeight= weight;
        return {value: this.gWeight};
    }

    //adds activity to log and sets status
    //opt1: gets activity by index in activities array
    logActivity(activity, duration, date, set){
        let da=new Date(date);
        if(this.weight() >= 180){
            this.activitiesLog.push({ name: activities[activity].name, 
                calories: activities[activity].cal180 * duration * 2, duration: duration, date: new Date(date), 
                month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()});
        }else{
            if(this.weight() >= 155 || this.weight() <= 0){
                this.activitiesLog.push({ name: activities[activity].name, 
                    calories: activities[activity].cal155 * duration * 2, duration: duration, date: new Date(date), 
                    month: da.getMonth()  + 1, day: da.getDate(), year: da.getFullYear()});
            }else{
                this.activitiesLog.push({ name: activities[activity].name, 
                    calories: activities[activity].cal125 * duration * 2, duration: duration, date: new Date(date), 
                    month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()});
            }
        }
        if(set){
            this.status= {status: this.name +" just accomplished "+ activities[activity].name +" for "
            + duration + " hours!", date: new Date(date), month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()};
        }
        return this.activitiesLog[this.activitiesLog.length - 1];
    }

    //opt2: gets activity by name in activities array
    logActivityName(activity, duration, date, set){
        let index= -1;
        let da = new Date(date);
        for(var i=0; i< activities.length; i++){
            if(activities[i].name==activity){
                index=i;
                break;
            }
        }
        if(index< 0) { throw new Error("No activity found with such name")}
        if(this.weight >= 180){
            this.activitiesLog.push({ name: activities[index].name, 
                calories: activities[index].cal180 * duration * 2, duration: duration, date: new Date(date), 
                month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()});
        }else{
            if(this.weight >= 155 || this.weight <= 0){
                this.activitiesLog.push({ name: activities[index].name, 
                    calories: activities[index].cal155 * duration * 2, duration: duration, 
                    date: new Date(date), month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()});
            }else{
                this.activitiesLog.push({ name: activities[index].name, 
                    calories: activities[index].cal125 * duration * 2, duration: duration, 
                    date: new Date(date), month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()});
            }
        }
        if(set){
            this.status= {status: this.name + " just accomplished " + activities[index].name + " for " 
            + duration + " hours!", date: new Date(date), month: da.getMonth() + 1, day: da.getDate(), year: da.getFullYear()};
        }
        return this.activitiesLog[this.activitiesLog.length - 1];
    }

    //Shows Current Week's activities and calories burned this week
    getActivitiesWeek(){
        let temp = [];
        let today = new Date();
        let calBurned = 0;
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].date >= lastWeek && this.activitiesLog[i].date <=today){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};  
    }

    //Returns activities between two dates, first date must be earlier, inclusive
    getActivitiesRange(date1, date2){
        let temp=[];
        let start = new Date(date1);
        let end = new Date(date2);
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].date >= start && this.activitiesLog[i].date <=end){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }

    //Shows Day's activities
    getActivitiesDay(){
        let temp = [];
        let today = new Date();
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            let then = this.activitiesLog[i].date;
            if(then.getFullYear() == today.getFullYear() && then.getMonth() == today.getMonth() && 
            then.getDate() == today.getDate()){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }

    //Shows Month's activities
    getActivitiesMonth(){
        let temp = [];
        let today = new Date();
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            let then = this.activitiesLog[i].date;
            if(then.getFullYear() == today.getFullYear() && then.getMonth() == today.getMonth()){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }

    //Shows Year's activities
    getActivitiesYear(){
        let temp = [];
        let today = new Date();
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            let then = this.activitiesLog[i].date;
            if(then.getFullYear() == today.getFullYear()){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }

    //Shows all activities
    getActivitiesAll(){
        let temp = [];
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            temp.push(this.activitiesLog[i]);
            calBurned += this.activitiesLog[i].calories;
        }
        return {activities: temp, caloriesBurned: calBurned};
    }
    //Shows specific actiivity info
    getActivity(index){
        return this.activitiesLog[index];
    }

    //Shows list of all activities of same name
    getActivitiesName(name){
        let temp = [];
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].name == name){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }


    //Shows list of all activities above certain calories burned amount
    getActivitiesCal(cal){
        let temp = [];
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].calories >= cal){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }

    //Shows list of all activities above a certain duration
    getActivitiesDur(dur){
        let temp = [];
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].duration >= dur){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloriesBurned: calBurned};
    }


    //Views Friend Requests
    getFriendRequests(){
        return this.friendRequests;
    }

    //Deletes Friend Requests
    rejectFriend(id){
        let changed= false;
        for(var i = 0; i<this.friendRequests.length; i++){
            let x= this.friendRequests[i];
            if(x.id == id){
                this.friendRequests.splice(i,1);
                changed=true;
            }
        }
        return changed;
    }

    //Shows Friends
    getFriends(){
        return this.friends;
    }

    //Checks if user is a friend
    isFriend(id){
        for(let i= 0; i<this.friends.length;i++){
            if(this.friends[i].id == id){
                return true;
            }
        }
        return false;
    }

    //Sets status
    setStatus(newStatus){
        let d = new Date();
        this.status= {status: this.name +" says: "+newStatus, date: d, 
        month: d.getMonth() + 1, day: d.getDate(), year: d.getFullYear()};
        return this.status;
    }

    //Gets status
    getStatus(){
        return this.status;
    }

    //logs weight
    logWeight(newWeight, time){
        let date= new Date();
        if(time != undefined){
            date= new Date(time);
        }
        if(newWeight < 0) { throw new Error("Users cannot submit negative weights.")};
        if(this.weightLog.length >= 1){
            if(date < this.weightLog[this.weightLog.length - 1].date) { throw new Error(
            "Users cannot submit older weights than the latest on record. Focus on the future.")};
        }
        this.weightLog.push({weight: newWeight, date: date,
            month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear()});
        
        //if a user already has a negative weight, it's because they didn't enter one when registering
        if(this.weight() <= 0){
            this.weight = () => newWeight;
            if(newWeight< this.gWeight){
                return {success: true, message : "Good job on setting your first weight! "+
                "You're already below your goal weight!"};
            }else{
                return {success: false, message : "Good job on setting your first weight!"};
            }
            
        }

        let success = (this.gWeight >= newWeight);
        let diff = this.weightLog[this.weightLog.length - 2].weight - this.weightLog[this.weightLog.length - 1].weight;
        this.weight = () => newWeight;
            if(diff > 0){
                if(success)
                return {success: success, message : "Way to go! You lost " + diff + " "+ this.wUnits +" and reached your goal!"};
                else
                return {success: success, message : "Way to go! You lost " + diff + " "+ this.wUnits +"!"};
            }else{
                diff=-diff;
                if(success)
                    return {success: success, message : "You gained " + diff + " "+ this.wUnits +" but you're still under your goal weight, so go you!"};
                else
                    return {success: success, message : "You gained " + diff + " "+ this.wUnits +" but don't worry, you can still meet your goal if you try!"}; 
            }
    }

    //deletes most recently added weight
    deleteWeight(){
        //If they only have one weight logged, they're current weight is set to zero
        if(this.weightLog.length == 1){
            this.weight = () => -1;
        }else{
            this.weight = () => this.weightLog[this.weightLog.length - 1].weight;
        }
        return this.weightLog.splice(this.weightLog.length -1,1);

    }

    //shows weight log and total progress
    allWeight(){
        let progress = 0;
        if(this.weightLog.length >= 2){
            progress = this.weightLog[this.weightLog.length-1].weight - this.weightLog[0].weight;
        }
        return {weights: this.weightLog, progress: progress};
    }


    //shows latest week of weight logs
    getWeightsWeek(){
        let temp = [];
        let today = new Date();
        let progress = 0;
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        for(var i=0; i< this.weightLog.length; i++){
            if(this.weightLog[i].date >= lastWeek && this.weightLog[i].date <=today){
                temp.push(this.weightLog[i]);
            }
        }
        if(temp.length >= 2){
            progress = temp[temp.length - 1].weight - temp[0].weight;
        }
        return {weights: temp, progress: progress};  
    }

    //shows weight logs for the month
    getWeightsMonth(){
        let temp = [];
        let today = new Date();
        let progress = 0;
        for(var i=0; i< this.weightLog.length; i++){
            let then= this.weightLog[i].date;
            if(then.getFullYear() == today.getFullYear() && then.getMonth() == today.getMonth()){
                temp.push(this.weightLog[i]);
            }
        }
        if(temp.length >= 2){
            progress = temp[temp.length - 1].weight - temp[0].weight;
        }
        return {weights: temp, progress: progress};  
    }


    //shows weight logs for the year
    getWeightsYear(){
        let temp = [];
        let today = new Date();
        let progress = 0;
        for(var i=0; i< this.weightLog.length; i++){
            let then= this.weightLog[i].date;
            if(then.getFullYear() == today.getFullYear()){
                temp.push(this.weightLog[i]);
            }
        }
        if(temp.length >= 2){
            progress = temp[temp.length - 1].weight - temp[0].weight;
        }
        return {weights: temp, progress: progress};  
    }

    //show weight logs in a date range
    getWeightsRange(date1, date2){
        let temp = [];
        let progress = 0;
        let start = new Date(date1);
        let end = new Date(date2);
        for(var i=0; i< this.weightLog.length; i++){
            if(this.weightLog[i].date >= start && this.weightLog[i].date <=end){
                temp.push(this.weightLog[i]);
            }
        }
        if(temp.length >= 2){
            progress =temp[temp.length - 1].weight -temp[0].weight;
        }
        return {weights: temp, progress: progress};  
    }

    //show weight logs in between two weights, with smaller weight first
    getWeightsBetween(weight1, weight2){
        let temp = [];
        let progress = 0;
        for(var i=0; i< this.weightLog.length; i++){
            if(this.weightLog[i].weight >= weight1 && this.weightLog[i].weight <=weight2){
                temp.push(this.weightLog[i]);
            }
        }
        if(temp.length >= 2){
            progress = temp[temp.length - 1].weight - temp[0].weight;
        }
        return {weights: temp, progress: progress};  
    }

    weightLeft(){
        if(this.hasGoalWeight() && this.weight()>0){
            let x = this.weight();
            let temp = x - this.gWeight;
            if(temp < 1){
                return{suceeded: true, left: temp + " "+ this.wUnits};
            }else{
                return{suceeded: false, left: temp + " "+ this.wUnits};
            }
        }else{
            return{suceeded: false, left: 0 + " "+ this.wUnits};
        }
    }

    //returns the available options for the given search
    filterfood(search){
        let temp = [];
        for(let i=0;i<this.myFoodOpts.length;i++){
            let search2 = search.toLowerCase();
            if(this.myFoodOpts[i].toLowerCase().includes(search2)){
                temp.push(this.myFoodOpts[i]);
            }
        }
        return temp;
    }

    //add food to user's personal search history
    addsearchedfood(food){
        for(let i=0;i<this.myFoodOpts.length;i++){
            let food2 = food.toLowerCase();
            if(this.myFoodOpts[i].toLowerCase() == (food2)){
                return false;
            }
        }
        this.myFoodOpts.push(food);
        return this.myFoodOpts;
    }

    //logs a food that is not in the food array already
    logFood(name, servings, caloriesPerServing, date, add){
        if(date==undefined){
            date= new Date();
        }else{
            date= new Date(date);
        }
        let newFood = {name: name, calories: servings*caloriesPerServing, date: date,
             month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear()};
        this.foodLog.push(newFood);

        //item will be added to the food array unless add is set to false
        if(add != false){
            foods.push({name: name, calories: caloriesPerServing});
        }
        this.dateSort(this.foodLog);
        return newFood;
    }

    //logs a food from the food array by index
    logFoodSystemIndex(index, servings, date){
        if(date==undefined){
            date= new Date();
        }else{
            date= new Date(date);
        }
        let newFood= {name: foods[index].name, calories: foods[index].calories * servings, date: date,
            month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear()};
        this.foodLog.push(newFood);
        this.dateSort(this.foodLog);
        return newFood;
    }

    //logs a food from the food array by name
    logFoodName(name, servings, date){
        if(date==undefined){
            date= new Date();
        }else{
            date= new Date(date);
        }
        let index= -1;
        for(var i=0; i< foods.length; i++){
            if(foods[i].name==name){
                index=i;
                break;
            }
        }
        if(index< 0) { throw new Error("No food found with such name")}
        let newFood= {name: foods[index].name, calories: foods[index].calories * servings, date: date,
            month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear()};
        this.foodLog.push(newFood);
        this.dateSort(this.foodLog);
        return newFood;
    }

    //deletes most recent food log
    deleteFood(){
        if(this.foodLog.length == 0){
            return {};
        }
        return this.foodLog.splice(0,1);

    }

    //shows full food diary and all calories consumed
    getFoodAll(){
        let total = 0;
            for(var i = 0; i< this.foodLog.length; i++){
                total += this.foodLog[i].calories;
            }
        return {foods: this.foodLog, calories: total};
    }

    //shows food diary for day
    getFoodDay(){
        let temp = [];
        let total = 0;
        let today= new Date();
        for(var i = 0; i< this.foodLog.length; i++){
            let then = this.foodLog[i].date;
            if(then.getFullYear() == today.getFullYear() && then.getMonth() == today.getMonth() && 
            then.getDate() == today.getDate()){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //shows food diary for week
    getFoodWeek(){
        let temp = [];
        let total = 0;
        let today= new Date();
        let lastWeek=new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
        for(var i = 0; i< this.foodLog.length; i++){
            if(this.foodLog[i].date >= lastWeek && this.foodLog[i].date <= today){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //shows food diary for month
    getFoodMonth(){
        let temp = [];
        let total = 0;
        let today= new Date();
        for(var i = 0; i< this.foodLog.length; i++){
            let then = this.foodLog[i].date;
            if(then.getFullYear() == today.getFullYear() && then.getMonth() == today.getMonth()){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //shows food diary for year
    getFoodYear(){
        let temp = [];
        let total = 0;
        let today= new Date();
        for(var i = 0; i< this.foodLog.length; i++){
            let then = this.foodLog[i].date;
            if(then.getFullYear() == today.getFullYear()){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //shows food diary for date range
    getFoodRange(date1,date2){
        let temp = [];
        let total = 0;
        let start= new Date(date1);
        let end=new Date(date2);
        for(var i = 0; i< this.foodLog.length; i++){
            if(this.foodLog[i].date >= start && this.foodLog[i].date <= end){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //shows all logs for a food by name
    getFoodName(name){
        let temp = [];
        let total = 0;
        for(var i = 0; i< this.foodLog.length; i++){
            if(this.foodLog[i].name == name){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }
    

    //shows all food logs between certain amounts of calories, lower amount first
    getFoodBetween(cal1,cal2){
        let temp = [];
        let total = 0;
        for(var i = 0; i< this.foodLog.length; i++){
            if(this.foodLog[i].calories >= cal1 && this.foodLog[i].calories <= cal2){
                temp.push(this.foodLog[i]);
                total += this.foodLog[i].calories;
            }
        }
        return {foods: temp, calories: total};
    }

    //returns goal weight
    getGoalW(){
        return {value: this.gWeight};
    }

    //returns weight units
    getWUnits(){
        return {units: this.wUnits};
    }


    //changes goal calories
    setGoalC(newGoal){
        this.gCals = () => newGoal;
        return {goal: this.gCals()};
    }

    //Shows aggregate calorie status for the day
    getReportDay(){
        let goal = this.gCals();
        let eaten = this.getFoodDay().calories;
        let burned = this.getActivitiesDay().caloriesBurned;
        let calRemaining = goal - eaten + burned;
        return {eaten: eaten, burned: burned, goal: goal, 
            remaining: calRemaining};
    }
    
    //Shows aggregate calorie status for the week
    getReportWeek(){
        let goal = this.gCals() * 7;
        let eaten = this.getFoodWeek().calories;
        let burned = this.getActivitiesWeek().caloriesBurned;
        let calRemaining = goal - eaten + burned;
        return {eaten: eaten, burned: burned, goal: goal, 
            remaining: calRemaining};
    }


    //Shows aggregate calorie status for the month
    getReportMonth(){
        let goal = this.gCals() * 30;
        let eaten = this.getFoodMonth().calories;
        let burned = this.getActivitiesMonth().caloriesBurned;
        let calRemaining = goal - eaten + burned;
        return {eaten: eaten, burned: burned, goal: goal, 
            remaining: calRemaining};
    }



    //Shows aggregate calorie status for the year
    getReportYear(){
        let goal = this.gCals() * 365;
        let eaten = this.getFoodYear().calories;
        let burned = this.getActivitiesYear().caloriesBurned;
        let calRemaining = goal - eaten + burned;
        return {eaten: eaten, burned: burned, goal: goal, 
            remaining: calRemaining};
    }

    //Shows aggregate calorie status for a date range
    getReportRange(date1,date2){
        let d1= new Date(date1);
        let d2 = new Date(date2);
        let days = (d2.getTime() - d1.getTime()) / (1000*60*60*24)
        let goal = this.gCals() * days;
        let eaten = this.getFoodRange(date1,date2).calories;
        let burned = this.getActivitiesRange(date1,date2).caloriesBurned;
        let calRemaining = goal - eaten + burned;
        return {eaten: eaten, burned: burned, goal: goal, 
            remaining: calRemaining};
    }

    //gets a user's challenge notifications
    getChallengeNews(){
        return this.challengeNotifications;
    }

    //deletes a challenge notification
    deleteChallengeNews(index){
        return this.challengeNotifications.splice(index,1);
    }

    //sorts elements by date
    dateSort(array){
        for(var i=0;i<array.length-1;i++){
            let latest=i;
            for(var j=i+1;j<array.length;j++){
                if(array[j].date > array[latest].date){
                    let temp=array[latest];
                    array[latest]=array[j];
                    array[j]=temp;
                }
            }
        }
        return array;
    }

}

//a challege users could join. Fow now, the challenges are formatted so that a user must perform 
//an activity of a certain name a certain number of times within the timeframe and log it to win.
class Challenge{
    constructor(tittle, id, descrip, start, end, activity, frequency){
        this.tittle= tittle;
        this.id = id;
        this.description = descrip;
        let s = new Date(start);
        this.start = s;
        this.sMonth = s.getMonth() + 1;
        this.sDay = s.getDate();
        this.sYear= s.getFullYear();
        let e=new Date(end);
        this.end = e;
        this.eMonth = e.getMonth() + 1;
        this.eDay = e.getDate();
        this.eYear = e.getFullYear();
        this.contestants = [];
        this.winners = [];
        this.activity = activity;
        this.frequency = frequency;
        this.checked = false;
    }

    //sets whether this challenge has been checked for winners
    setChecked(c){
        this.checked = c;
    }

}

module.exports = {
    fitWorld, User, Challenge, activities
}