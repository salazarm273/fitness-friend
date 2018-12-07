<template>
<div>
    <div class="row">
       <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        {{ title }}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5>Eaten: {{calReport.eaten}} &nbsp; Burned: {{calReport.burned}} <span v-if="calReport.goal > 0">&nbsp; Goal: {{calReport.goal}}</span></h5>
                        </li>
                        <div v-if="calReport.goal > 0">
                        <li v-if="calReport.remaining > 0" class="list-group-item">Cumulatively, you're {{calReport.remaining}} calories under your goal. Remember to eat healthily and get plenty of nutrients.</li>
                        <li v-else class="list-group-item">Cumulatively, you're {{calReport.remaining}} calories over your goal, but don't worry and keep trying.</li>
                        </div>
                    </ul>
                <a @click.prevent="todayReport" class="btn btn-primary">Today's Calorie Report</a>
                <a @click.prevent="weekReport" class="btn btn-primary">This Week's Calorie Report</a>
                <a @click.prevent="monthReport" class="btn btn-primary">This Month's Calorie Report</a>
                <a @click.prevent="yearReport" class="btn btn-primary">This Year's Calorie Report</a>
                <a v-if="!showMore" @click.prevent="showMeMore" class="btn btn-primary">Show More Options</a>
                <a v-if="showMore" @click.prevent="showMeLess" class="btn btn-primary">Show Less Options</a>
                <form v-if="showMore" class="reportSubForm" @submit.prevent="onSubmitDate">
                    <p>
                        <input id="searchDate" v-model="searchDate" placeholder="MM-DD-YYYY">
                    </p>
                    <p>
                        <input type="submit" value="Report For This Day">  
                    </p>
                </form>

                <form v-if="showMore" class="reportSubForm" @submit.prevent="onSubmitDates">
                    <p>
                        <input id="date1" v-model="date1" placeholder="MM-DD-YYYY">
                        &nbsp;
                        <input id="date2" v-model="date2" placeholder="MM-DD-YYYY">
                    </p>
                <p>
                    <input type="submit" value="Report Between These Dates">  
                </p>
                </form>

            </div>
        </div>

        <div class="col-md-6">
            <div v-if="calToday.goal > 0" class="card info">
                    <h5 class="card-header">Today, you have</h5>
                    <p class="target">{{calToday.remaining}}</p>
                    <p class="belowTarget">calories remaining out of your</p>
                    <p class="target">{{calToday.goal}}</p>
                    <p class="belowTarget">calories goal</p>
            </div>
            <div v-else class="card">
                <h5 class="card-header">You have no goal calories set, and that's okay!</h5>
                <img src="../../panadaPullUp.jpg">
            </div>
            <br>
            <form class="report-Form" @submit.prevent="onSubmitNewGoal">
                    <p>
                        <input v-model="newGoal" placeholder="Daily Calories Goal">
                    </p>
                    <p>
                        <input type="submit" value="Set New Goal">  
                    </p>
            </form>
            <a v-if="calToday.goal > 0" @click.prevent="noMoreGoal" class="btn btn-primary">Have No Goal Calorie Amount</a>
            
        </div>

        

    </div>
</div>
</template>

<style lang="scss">
.btn-primary{
        margin-top: 10px;
    }
.target{
    font-weight: bold;
    font-size: 250%;
}
.info{
    text-align: center;
    font-size: 150%;
}
.reportSubForm{
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid black;
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
            title: null,
            calReport: {},
            showMore: false,
            date1: null,
            date2: null,
            searchDate: null,
            newGoal: null,
            calToday: {}
        }
    },
    created(){
        api.CaloriesDay()
        .then(x=> this.calToday = x)
        this.weekReport()
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        todayReport(){
            api.CaloriesDay()
            .then(x=> this.calReport = x)
            .then(()=> this.title = "Calorie Report for Today")
        },
        weekReport(){
            api.CaloriesWeek()
            .then(x=> this.calReport = x)
            .then(()=> this.title = "Aggregate Calorie Report for This Week")
        },
        monthReport(){
            api.CaloriesMonth()
            .then(x=> this.calReport = x)
            .then(()=> this.title = "Aggregate Calorie Report for This Month")
        },
        yearReport(){
            api.CaloriesYear()
            .then(x=> this.calReport = x)
            .then(()=> this.title = "Aggregate Calorie Report for This Year")
        },
        refresh(){
            api.CaloriesDay()
            .then(x=> this.calToday = x)
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
        onSubmitDate() {
            api.CaloriesRange(this.searchDate, this.searchDate)
            .then(x=> this.calReport = x)
            .then(()=> this.title = "Calorie Report for "+ this.searchDate)
        },
        onSubmitDates() {
            api.CaloriesRange(this.date1, this.date2)
            .then(x=> this.calReport = x)
            .then(()=> this.title = "From " + this.date1 + " to " + this.date2 )
        },
        
        onSubmitNewGoal() {
            api.SetGoalCal(this.newGoal)
            .then(()=> this.newGoal = null)
            this.weekReport()
        },
        noMoreGoal() {
            api.SetGoalCal(0)
            this.weekReport()
        }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
