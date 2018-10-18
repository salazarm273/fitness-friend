const activities = require('./activities')
//gonna need a thing for foods

class fitWorld{
    constructor(){
        this.users =[];
    }
    getAllUsers(){
        return this.users;
    }
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
}

class User{
    constructor(name, id, pass, email, bio, weight, wUnits, height, hUnits, goalCalories, goalWeight){
        this.name = name;
        this.id = id;
        this.pass = () => pass;
        this.email = email;
        this.bio = bio;
        //how to keep private but still access?
        this.weight = () => weight; //going to be set to -1 if the user doesn't put it in form
        this.wUnits = wUnits;
        this.height = () => height;
        this.hUnits = hUnits;
        this.gCals = () => goalCalories;
        this.gWeight = () => goalWeight;
        this.activitiesLog = [];
        this.foodLog = [];
        this.weightLog = [{weight: weight, date: new Date()}]; //make hidden?
        this.friendsISee = [];
        this.friendsSeeMe = [];
        this.status= "";
    }

    setGoalWeight(weight){
        gWeight=weight;
    }

    //adds activity to log and sets status
    //opt1: gets activity by index in activities array
    logActivity(activity, duration, date, set){
        if(this.weight() >= 180){
            this.activitiesLog.push({ name: activities[activity].name, 
                calories: activities[activity].cal180 * duration * 2, duration: duration, date: new Date(date)});
        }else{
            if(this.weight() >= 155 || this.weight() <= 0){
                this.activitiesLog.push({ name: activities[activity].name, 
                    calories: activities[activity].cal155 * duration * 2, duration: duration, date: new Date(date)});
            }else{
                this.activitiesLog.push({ name: activities[activity].name, 
                    calories: activities[activity].cal125 * duration * 2, duration: duration, date: new Date(date)});
            }
        }
        if(set){
            this.status= "${this.name} just accomplished ${activities[activity].name} for ${duration} hours!";
        }
        return this.activitiesLog[this.activitiesLog.length - 1];
    }

    //opt2: gets activity by name in activities array
    logActivityName(activity, duration, date, set){
        let index= -1;
        for(var i=0; i< activities.length; i++){
            if(activities[i].name==activity){
                index=i;
                break;
            }
        }
        if(index< 0) { throw new Error("No activity found with such name")}
        if(this.weight >= 180){
            this.activitiesLog.push({ name: activities[index].name, 
                calories: activities[indexy].cal180 * duration * 2, duration: duration, date: new Date(date)});
        }else{
            if(this.weight >= 155 || this.weight <= 0){
                this.activitiesLog.push({ name: activities[index].name, 
                    calories: activities[index].cal155 * duration * 2, duration: duration, date: new Date(date)});
            }else{
                this.activitiesLog.push({ name: activities[index].name, 
                    calories: activities[index].cal125 * duration * 2, duration: duration, date: new Date(date)});
            }
        }
        if(set){
            this.status= "${this.name} just accomplished ${activities[index].name} for ${duration} hours!";
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
        return {activities: temp, caloresBurned: calBurned};  
    }

    //Returns activities between two dates, first date must be earlier, inclusive
    getActivitiesRange(date1, date2){
        let temp=[];
        let start = new Date(date1);
        let end = new Date(date2);
        let calBurned = 0;
        for(var i=0; i< this.activitiesLog.length; i++){
            if(this.activitiesLog[i].date >= start && this.activitiesLog[i].date <=date2){
                temp.push(this.activitiesLog[i]);
                calBurned += this.activitiesLog[i].calories;
            }
        }
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
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
        return {activities: temp, caloresBurned: calBurned};
    }

    /*    
    logFoodNotInSystem({name, servings, calories, date}){
        this.foodLog = this.foodLog + {name, calories, date};
        //add it to the foods thing
    }

    logFoodFromSystem({food, servings, date}){
        this.foodLog = this.foodLog + {food.name, food.calories * servings, date};

    }
    */

    logWeight({newWeight, time}){
        if(newWeight < 0) { throw new Error("Users cannot submit negative weights.")};
        weightLog.push({weight: newWeight, date: new Date(time)});
        
        //if a user already has a negative weight, it's because they didn't enter one when registering
        //I want the website to not be so focused on weight, and be more focused on just doing things
        if(this.weight() < 0){
            this.weight = () => newWeight;
            return {success: false, message : "Good job on setting your first weight!"};
        }
        let success = (this.gWeight() >= newWeight);
        let diff = weightLog[this.weightLog.length - 2] - weightLog[this.weightLog.length - 1];
        this.weight = () => newWeight;
            if(diff > 0){
                if(success)
                return {success: success, message : "Way to go! You lost " + diff + " "+ this.wUnits +" and reached your goal!"};
                else
                return {success: success, message : "Way to go! You lost " + diff + " "+ this.wUnits +"!"};
            }else{
                if(success)
                    return {success: success, message : "You gained " + diff + " "+ this.wUnits +" but you're still under your goal weight, so go you!"};
                else
                    return {success: success, message : "You gained " + diff + " "+ this.wUnits +" but don't worry, you can still meet your goal if you try!"}; 
            }
    }

    //friends status'

    //friends latest activities

    //set status

    //add weight

    //getDatesActivities

    //getDatesFood

    //hide friend's posts

    //hide from friend

}

module.exports = {
    fitWorld, User
}