const api_root = "http://localhost:3000/fitworld";
export let userId = null;
export let userReady = false;

export function GetUsers(){
    return myFetch(api_root + "/")
           .then(function(response) {
                 return response;
            })
}

export function Loginfb(name, fbid, access_token){
    console.log("here 1")
    return myFetch(api_root + `/addUser`, { name, fbid, access_token })
    .then(x=> {
         userId = x.id
       
    }
        );
    //.then(() => console.log("userid is now "+userId));
}

export function AddUserInfo(b, w, wu, h, hu, g, a, gc, gw){
    return myFetch(api_root + `/addUserInfo`, { userId: userId, bio: b, weight: w, wUnits: wu, height: h, 
             hUnits: hu, gender: g, age: a, goalCalories: gc, 
             goalWeight: gw })
            .then(()=> {userReady = true}); 
}

export function AddUser(n, p, e, b, w, wu, h, hu, g, a, gc, gw){
    return myFetch(api_root + `/addUser`, { name: n, pass: p,
             email: e, bio: b, weight: w, wUnits: wu, height: h, 
             hUnits: hu, gender: g, age: a, goalCalories: gc, 
             goalWeight: gw })
             .then(x=> userId = x.id); 
}

export function User(id){
    return myFetch(api_root + `/user`, {userId: id})
           .then(function(response) {
                 return response;
            })
}

export function SeeMe(){
    return myFetch(api_root + `/user`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function UserNames(n){
    return myFetch(api_root + `/userNames`, {name: n})
           .then(function(response) {
                 return response;
            })
}


export function GetAvailableActivities(){
    return myFetch(api_root + `/activityOpts`)
           .then(function(response) {
                 return response;
            })
}

export function LogActivity(i, d, da, s){
    return myFetch(api_root + `/logActivity`, 
    {userId: userId, index: i, duration: d, date: da, set: s})
           .then(function(response) {
                 return response;
            })
}

export function LogActivityName(a, d, da, s){
    return myFetch(api_root + `/logActivityName`, 
    {userId: userId, activity: a, duration: d, date: da, set: s})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesRange(d1, d2){
    return myFetch(api_root + `/activitiesRange`, 
    {userId: userId, date1: d1, date2: d2})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesWeek(){
    return myFetch(api_root + `/activitiesWeek`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesDay(){
    return myFetch(api_root + `/activitiesDay`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesMonth(){
    return myFetch(api_root + `/activitiesMonth`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesYear(){
    return myFetch(api_root + `/activitiesYear`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ActivityShow(i){
    return myFetch(api_root + `/activityShow`, {userId: userId, index: i})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesName(n){
    return myFetch(api_root + `/activitiesName`, {userId: userId, name: n})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesCal(c){
    return myFetch(api_root + `/activitiesCal`, {userId: userId, cals: c})
           .then(function(response) {
                 return response;
            })
}

export function ActivitiesDuration(d){
    return myFetch(api_root + `/activitiesDuration`, {userId: userId, dur: d})
           .then(function(response) {
                 return response;
            })
}

export function AllActivities(){
    return myFetch(api_root + `/allActivities`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function LogFood(n, s, c, d, a){
    return myFetch(api_root + `/logFood`, {userId: userId, name: n, servings: s, calories: c, date: d, add: a})
           .then(function(response) {
                 return response;
            })
}

export function LogFoodName(n, s, d){
    return myFetch(api_root + `/logFoodName`, {userId: userId, name: n, servings: s, date: d})
           .then(function(response) {
                 return response;
            })
}

export function DeleteFood(){
    return myFetch(api_root + `/deleteFood`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodAll(){
    return myFetch(api_root + `/foodDiary`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodDay(){
    return myFetch(api_root + `/foodDiaryDay`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodWeek(){
    return myFetch(api_root + `/foodDiaryWeek`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodMonth(){
    return myFetch(api_root + `/foodDiaryMonth`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodYear(){
    return myFetch(api_root + `/foodDiaryYear`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodRange(d1,d2){
    return myFetch(api_root + `/foodDiaryRange`, {userId: userId, date1: d1, date2: d2})
           .then(function(response) {
                 return response;
            })
}

export function ShowFoodBetweenCal(c1, c2){
    return myFetch(api_root + `/foodDiaryBetween`, {userId: userId, cal1: c1, cal2:c2})
           .then(function(response) {
                 return response;
            })
}

export function GetAvailableFoods(){
    return myFetch(api_root + `/foodOpts`)
           .then(function(response) {
                 return response;
            })
}

export function LogWeight(w, d){
    return myFetch(api_root + `/logWeight`, {userId: userId, weight: w, date:d})
           .then(function(response) {
                 return response;
            })
}

export function DeleteWeight(){
    return myFetch(api_root + `/deleteWeight`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function WeekWeight(){
    return myFetch(api_root + `/weekWeight`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function MonthWeight(){
    return myFetch(api_root + `/monthWeight`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function YearWeight(){
    return myFetch(api_root + `/yearWeight`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function AllWeight(){
    return myFetch(api_root + `/allWeight`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function RangeWeight(d1,d2){
    return myFetch(api_root + `/weightRange`, {userId: userId, date1: d1, date2:d2})
           .then(function(response) {
                 return response;
            })
}

export function WeightBetweenWeights(w1,w2){
    return myFetch(api_root + `/weightBetween`, {userId: userId, weight1: w1, weight2:w2})
           .then(function(response) {
                 return response;
            })
}

export function WeightLeft(){
    return myFetch(api_root + `/weightLeft`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function GetGoalWeight(){
    return myFetch(api_root + `/weightGoal`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function SetGoalWeight(g){
    return myFetch(api_root + `/newGoalWeight`, {userId: userId, goal: g})
           .then(function(response) {
                 return response;
            })
}

export function HasGoalWeight(){
    return myFetch(api_root + `/hasWeightGoal`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function GetWeightUnits(){
    return myFetch(api_root + `/weightUnits`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function SetGoalCal(c){
    return myFetch(api_root + `/newGoalCal`, {userId: userId, goal: c})
           .then(function(response) {
                 return response;
            })
}

export function CaloriesDay(){
    return myFetch(api_root + `/caloriesDay`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function CaloriesWeek(){
    return myFetch(api_root + `/caloriesWeek`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function CaloriesMonth(){
    return myFetch(api_root + `/caloriesMonth`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function CaloriesYear(){
    return myFetch(api_root + `/caloriesYear`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function CaloriesRange(d1,d2){
    return myFetch(api_root + `/caloriesRange`, {userId: userId, date1:d1, date2:d2})
           .then(function(response) {
                 return response;
            })
}

export function GetNews(){
    return myFetch(api_root + `/getNews`)
           .then(function(response) {
                 return response;
            })
}

export function GetArticleInfo(i){
    return myFetch(api_root + `/getNewsInfo`, {index: i})
           .then(function(response) {
                 return response;
            })
}

export function SendFriendRequest(u){
    return myFetch(api_root + `/addFriends`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function GetFriendRequests(){
    return myFetch(api_root + `/friendRequests`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function ApproveFriendRequest(u){
    return myFetch(api_root + `/approveFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function RejectFriendRequest(u){
    return myFetch(api_root + `/rejectFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function HideFromFriend(u){
    return myFetch(api_root + `/hideFromFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function UnhideFromFriend(u){
    return myFetch(api_root + `/unhideFromFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}


export function DontSeeFriend(u){
    return myFetch(api_root + `/dontSeeFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function UndontSeeFriend(u){
    return myFetch(api_root + `/undontSeeFriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function Unfriend(u){
    return myFetch(api_root + `/unfriend`, {user1: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function GetFriends(){
    return myFetch(api_root + `/seeFriends`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function AreFriends(u){
    return myFetch(api_root + `/areFriends`, {userId: userId, user2: u})
           .then(function(response) {
                 return response;
            })
}

export function FriendFeed(){
    return myFetch(api_root + `/friendFeed`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}

export function SetStatus(s){
    return myFetch(api_root + `/newStatus`, {userId: userId, status: s})
           .then(function(response) {
                 return response;
            })
}

export function GetStatus(){
    return myFetch(api_root + `/myStatus`, {userId: userId})
           .then(function(response) {
                 return response;
            })
}





function myFetch(url = ``, data = null) {
    let options = {
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              userId: userId
          }
    };

    if(data){
        options = { 
          ...options,
          method:  "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              ...options.headers,
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        };
    }
    //console.log("url is "+url);
    //console.log("options is "+JSON.stringify(options));
    //console.log("data is "+ JSON.stringify(data));
    return fetch(url, options)
    .then(response =>{
      return response.json()
    }); // parses response to JSON
}