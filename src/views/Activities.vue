<template>
<div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        {{ topic }}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="a in activitiesDisplay.activities" :key="a.name"
                            class="list-group-item">
                            <h5>{{a.name}}</h5>
                            <span class="badge badge-success">
                                {{ a.duration }}        
                            </span>
                             <span class="badge badge-success">
                                {{ a.calories }} 
                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{a.date}}</span>
                        </li>
                        <li class="list-group-item">Total Calories Burned: {{activitiesDisplay.caloriesBurned}}</li>
                    </ul>
                <a @click.prevent="todayActivities" class="btn btn-primary">Show Today's Activities</a>
                <a @click.prevent="weekActivities" class="btn btn-primary">Show Week's Activities</a>
                <a @click.prevent="monthActivities" class="btn btn-primary">Show This Month's Activities</a>
                <a @click.prevent="yearActivities" class="btn btn-primary">Show This Year's Activities</a>
                <a v-if="!showMore" @click.prevent="showMeMore" class="btn btn-primary">Show More Options</a>
                <a v-if="showMore" @click.prevent="showMeLess" class="btn btn-primary">Show Less Options</a>
                <a v-if="showMore" @click.prevent="allActivities" class="btn btn-primary">Show All Activities Ever</a>

                <form v-if="showMore" class="activitiesSubForm" @submit.prevent="onSubmitDateRange">
                    <p>
                        <input id="date1" v-model="date1" placeholder="MM-DD-YYYY">
                        <input id="date2" v-model="date2" placeholder="MM-DD-YYYY">
                    </p>
                <p>
                    <input type="submit" value="Show Activities Between These Dates">  
                </p>
                </form>

                <form v-if="showMore" class="activitiesSubForm" @submit.prevent="onSubmitName">
                    <select id="activity" v-model="searchName">
                        <option v-for="a in activities" :key = "a.name" >{{ a.name }}</option>
                    </select>
                <p>
                    <input type="submit" value="Show All Activities of This Type">  
                </p>
                </form>

                <form v-if="showMore" class="activitiesSubForm" @submit.prevent="onSubmitDuration">
                    <p>
                        <input id="duration" v-model="searchDuration" placeholder="Duration">
                    </p>
                    <p>
                        <input type="submit" value="Show All Activities of At Least This Duration">  
                    </p>
                </form>

                <form v-if="showMore" class="activitiesSubForm" @submit.prevent="onSubmitCal">
                    <p>
                        <input id="cals" v-model="searchCals" placeholder="Calories Burned">
                    </p>
                    <p>
                        <input type="submit" value="Show All Activities that Burned at Least This Many Calories ">  
                    </p>
                </form>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card" >
                <h5>Add an Activity</h5>
                    <form class="activity-form" @submit.prevent="onSubmitActivity">

      <p>
        <label for="activity">Activity</label>
        <select id="activity" v-model="activity">
          <option v-for="a in activities" :key = "a.name" >{{ a.name }}</option>
        </select>
      </p>
      
      <p>
        <label for="duration">Duration (in hours)</label>
        <input id="duration" v-model="duration" placeholder="use .5 for half hours">
      </p>

      <p>
        <label for="date">Date (MM-DD-YYYY)</label>      
        <input id="date" v-model="date">
      </p>

      <input type="checkbox" id="checkbox" v-model="set">
      <label for="checkbox">Set as my status</label>
      
      <p>
        <input type="submit" value="Submit">  
      </p>  
  
    
    </form>
    
    </div>
    </div>
    </div>
</div>
</template>

<style lang="scss">
    li.list-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        img {
            width: 30px; height: 30px;
            margin-right: 5px;
        }
        h5 {
            flex-grow: 1;
        }
    }
</style>

<script>
import * as api from '@/services/api_access';
// eslint-disable-next-line
let loopTimer = null;

export default {
    data(){
        return {
            users: [],
            activitiesDisplay: {},
            userReady: api.userReady,
            userId: api.userId,
            activity: null,
            duration: null,
            date: null,
            set: false,
            activities: 
            [
        {name: "Weight Lifting", cal125: 90,cal155: 112,cal180: 133},
        {name: "Water Aerobics", cal125: 120,cal155: 149,cal180: 178},
        {name: "Walking", cal125: 180,cal155: 223,cal180: 266},
        {name: "Running (5mph)", cal125: 240,cal155: 298,cal180: 355},
        {name: "Bicycling (15mph)", cal125: 300,cal155: 372,cal180: 444},
        {name: "Calisthenics", cal125: 135,cal155: 167,cal180: 200},
        {name: "Circuit Training", cal125: 240,cal155: 298,cal180: 355},
        {name: "Rowing, Stationary", cal125: 255,cal155: 316,cal180: 377},
        {name: "High Impact Step Aerobics", cal125: 300,cal155: 372,cal180: 444},
        {name: "Skateboarding", cal125: 150,cal155: 186,cal180: 222},
        {name: "Kayaking", cal125: 150,cal155: 186,cal180: 222},
        {name: "Softball", cal125: 150,cal155: 186,cal180: 222},
        {name: "Dancing: Disco, Ballroom, Square", cal125: 165,cal155: 205,cal180: 244},
        {name: "Fencing", cal125: 180,cal155: 223,cal180: 266},
        {name: "Swimming", cal125: 180,cal155: 223,cal180: 266},
        {name: "Cross-country Hiking", cal125: 180,cal155: 223,cal180: 266},
        {name: "Running (10mph)", cal125: 495,cal155: 614,cal180: 733},
        {name: "Bicycling (>20 mph)", cal125: 495,cal155: 614,cal180: 733},
        {name: "Bicycling (16-19 mph)", cal125: 360,cal155: 446,cal180: 533},
        {name: "Running (7.5mph)", cal125: 375,cal155: 465,cal180: 55}
],
            showMore: false,
            date1: null,
            date2: null,
            searchName: null,
            searchDuration: null,
            searchCals: null,
            topic: null
        }
    },
    created(){
        api.ActivitiesWeek()
        .then(x=> this.activitiesDisplay = x)
        .then(()=> this.topic = "This Week")
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        getAvailableActivities(){
            api.GetAvailableActivities()
            .then(x=> this.activities = x)
        },
        todayActivities(){
            api.ActivitiesDay()
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "Today")
        },
        weekActivities(){
            api.ActivitiesWeek()
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "This Week")
        },
        monthActivities(){
            api.ActivitiesMonth()
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "This Month")
        },
        yearActivities(){
            api.ActivitiesYear()
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "This Year")
        },
        allActivities(){
            api.AllActivities()
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "All Activities Ever")
        },
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
             //.then(()=> this.activities = api.GetAvailableActivities())
             //.then(()=> console.log(this.activities))
        },
        showMeMore(){
            this.showMore = true;
        },
        showMeLess(){
            this.showMore = false;
        },
        onSubmitActivity() {
            api.LogActivityName(this.activity, this.duration, this.date, this.set)
            .then(()=> this.activity = null)
            .then(()=> this.duration = null)
            .then(()=> this.date = null)
            .then(()=> this.set = null)
            .then(()=> this.weekActivities())
            .then(()=> this.refresh())
         },
        onSubmitDateRange(){
            api.ActivitiesRange(this.date1, this.date2)
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "From "+ this.date1 +" to "+ this.date2)
        },
        onSubmitName(){
            api.ActivitiesName(this.searchName)
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "All "+this.searchName)
        },
        onSubmitDuration(){
            api.ActivitiesDuration(this.searchDuration)
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "All Activities at Least " +this.searchDuration +" Hours Long")
        },
        onSubmitCal(){
            api.ActivitiesCal(this.searchCals)
            .then(x=> this.activitiesDisplay = x)
            .then(()=> this.topic = "Activities that Burned at Least "+ this.searchCals +" Calories")
        }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
