<template>
<div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        Recent Activities
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="a in activitiesDisplay.activities" :key="a.name"
                            class="list-group-item">
                            <h5>{{a.name}}</h5>
                            <span class="badge badge-success">
                                {{ a.duration }}
                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{a.date}}</span>
                        </li>
                        <li class="list-group-item">Total Calories Burned: {{activitiesDisplay.caloriesBurned}}</li>
                    </ul>
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
        <label for="review">Date (MM-DD-YYYY)</label>      
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
            activitiesDisplay: this.weekActivities(),
            userReady: api.userReady,
            userId: api.userId,
            activity: null,
            duration: null,
            date: null,
            set: false,
            activities: this.getAvailableActivities() 
        }
    },
    created(){
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        getAvailableActivities(){
            api.GetAvailableActivities()
            .then(x=> this.activities = x)
        },
        weekActivities(){
            api.ActivitiesWeek()
            .then(x=> this.activitiesDisplay = x)
        },
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
             //.then(()=> this.activities = api.GetAvailableActivities())
             //.then(()=> console.log(this.activities))
        },
        addAct(newActivity) {
            api.LogActivityName(newActivity.name,newActivity.duration,newActivity.date,newActivity.set)
        },
        onSubmitActivity() {
            api.LogActivityName(this.activity, this.duration, this.date, this.set)
            .then(()=> this.activity = null)
            .then(()=> this.duration = null)
            .then(()=> this.date = null)
            .then(()=> this.set = null)
            .then(()=> this.weekActivities())
            .then(()=> this.refresh())

         }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
