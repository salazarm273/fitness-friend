<template>
<div>
    <div class="row">
       <div class="col-md-4">
            <div class="card">
                    <h5 class="card-header">
                        {{ title }}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="w in weightsDisplay.weights" :key="w.date"
                            class="list-group-item">
                            <h5>{{w.month}}/{{w.day}}/{{w.year}}   {{w.weight}} {{wUnits}}</h5>
                        </li>
                        <li class="list-group-item">Net Weight Change: {{weightsDisplay.progress}} {{wUnits}}</li>
                    </ul>
                <a @click.prevent="weekWeights" class="btn btn-primary">Show Week's Weights</a>
                <a @click.prevent="monthWeights" class="btn btn-primary">Show This Month's Weights</a>
                <a @click.prevent="yearWeights" class="btn btn-primary">Show This Year's Weights</a>
                <a v-if="!showMore" @click.prevent="showMeMore" class="btn btn-primary">Show More Options</a>
                <a v-if="showMore" @click.prevent="showMeLess" class="btn btn-primary">Show Less Options</a>
                <a v-if="showMore" @click.prevent="allWeights" class="btn btn-primary">Show All Weights Ever</a>

                <form v-if="showMore" class="weightsSubForm" @submit.prevent="onSubmitDates">
                    <p>
                        <input id="date1" v-model="date1" placeholder="MM-DD-YYYY">
                        <input id="date2" v-model="date2" placeholder="MM-DD-YYYY">
                    </p>
                <p>
                    <input type="submit" value="Show Weights Between These Dates">  
                </p>
                </form>

                <form v-if="showMore" class="weightsSubForm" @submit.prevent="onSubmitWeightRange">
                    <p>
                        <input id="w" v-model="w1" placeholder="Low Weight">
                        <input id="w" v-model="w2" placeholder="High Weight">
                    </p>
                    <p>
                        <input type="submit" value="Show Weights Between These Weights">  
                    </p>
                </form>

                <a v-if="showMore" @click.prevent="deleteWeight" class="btn btn-danger">Delete Lastest Weight</a>
            </div>
        </div>

        <div class="col-md-4">
            <div v-if="hasGoal" class="card">
                    <h5 class="card-header">Goal Weight</h5>
                    <p class="target">{{gWeight}}</p>
                    <p v-if="weightLeft.suceeded" class="belowtarget congrats"> Congratulations! You've met your goal weight!</p>
                    <p v-if="!weightLeft.suceeded" class="belowtarget"> Only {{weightLeft.left}} more to go!</p>
            </div>
            <div v-else class="card">
                <h5 class="card-header">You have no goal weight set, and that's okay!</h5>
                <img src="../../weightCat.jpg">
            </div>
            <br>
            <form class="weights-Form" @submit.prevent="onSubmitNewGoal">
                    <p>
                        <input v-model="newGoal" placeholder="New Goal Weight">
                    </p>
                    <p>
                        <input type="submit" value="Set New Goal">  
                    </p>
            </form>
        <a v-if="hasGoal" @click.prevent="noMoreGoal" class="btn btn-primary">Have No Goal Weight</a>
            
        </div>

        <div class="col-md-4">
            <div class="card">
                <h5 class="card-header">Log New Weight</h5>
                <p class="note">
                    Note: It's not good to focus too much on the past, 
                    so you can't log a weight with an earlier date than what you've already logged.
                    Just focus on the future: I believe in you!
                </p>

                <form class="weight-form" @submit.prevent="onSubmitWeight">
                    
                    <p>
                    <label for="weight">Weight &nbsp; </label>
                    <input id="weight" v-model="weight">
                    </p>
                    
                    <p>
                    <label for="date">Date &nbsp; </label>
                    <input id="date" v-model="date" placeholder="MM-DD-YYYY">
                    </p>
                    
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
.btn-primary{
        margin-top: 10px;
}
.weightsSubForm{
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid black;
}
.weight-form{
        margin-top: 15px;
        margin-left: 10px;
        margin-right: 10px;
}
.note{
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
}
.target{
    text-align: center;
    font-weight: bold;
    font-size: 250%;
}
.belowtarget{
    text-align: center;
    font-size: 150%;
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
            weightsDisplay: {},
            showMore: false,
            date1: null,
            date2: null,
            w1: null,
            w2: null,
            weight: null,
            date: null,
            hasGoal: false,
            gWeight: 0,
            weightLeft: {},
            newGoal: null,
            wUnits: null
        }
    },
    created(){
        api.GetWeightUnits()
        .then(x=> this.wUnits = x.units)
        api.WeekWeight()
        .then(x=> this.weightsDisplay = x)
        .then(()=> this.title = "This Week")

        this.refresh()

        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        weekWeights(){
            api.WeekWeight()
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "This Week")
        },
        monthWeights(){
            api.MonthWeight()
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "This Month")
        },
        yearWeights(){
            api.YearWeight()
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "This Year")
        },
        allWeights(){
            api.AllWeight()
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "All Weights Ever")
        },
        refresh(){
            api.GetGoalWeight()
            .then(x=> this.gWeight = x.value)
            api.WeightLeft()
            .then(x=> this.weightLeft = x)
            api.GetUsers()
            .then(x=> this.users = x)
            .then(()=> this.userReady = api.userReady)
            .then(()=> this.userId = api.userId)
            api.HasGoalWeight()
            .then(x=> this.hasGoal = x)
        },
        hasGoalWeight(){
            api.HasGoalWeight()
            .then(x=> this.hasGoal = x)
        },
        showMeMore(){
            this.showMore = true;
        },
        showMeLess(){
            this.showMore = false;
        },
        deleteWeight(){
            api.DeleteWeight()
            .then((x)=> this.FoodsDisplay = { weight: x.weight, date: x.date })
            .then(()=> this.title = "Latest Weight Deleted:")
            .then(()=> this.refresh)
        },
        onSubmitWeight() {
            api.LogWeight(this.weight, this.date)
            .then(()=> this.weight = null)
            .then(()=> this.date = null)
            .then(()=> this.weekWeights())
            .then(()=> this.refresh())
         },
         onSubmitDates() {
            api.RangeWeight(this.date1, this.date2)
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "From " + this.date1 + " to " + this.date2 )
         },
         onSubmitWeightRange() {
            api.WeightBetweenWeights(this.w1, this.w2)
            .then(x=> this.weightsDisplay = x)
            .then(()=> this.title = "From " + this.w1 + " to " + this.w2 + " " +this.wUnits)
         },
         onSubmitNewGoal() {
            api.SetGoalWeight(this.newGoal)
            .then(x=> this.gWeight = x.value)
            .then(()=> this.newGoal = null)
            .then(()=> this.refresh())
         },
         noMoreGoal() {
            api.SetGoalWeight(0)
            .then(x=> this.gWeight = x.value)
         }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
