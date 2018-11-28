<template>
<div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        Recent Food Entries
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="f in FoodsDisplay.foods" :key="f.name"
                            class="list-group-item">
                            <h5>{{f.name}}</h5>
                            <span class="badge badge-success">
                                {{ f.calories }}
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
            FoodsDisplay: {},
            userReady: api.userReady,
            userId: api.userId,
            showMore: false,
            date1: null,
            date2: null,
            searchName: null,
            searchDuration: null,
            searchCals: null
        }
    },
    created(){
        api.ShowFoodWeek()
        .then(x=> this.FoodsDisplay = x)
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
        },
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
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
         }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
