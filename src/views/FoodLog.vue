<template>
<div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        {{ focus }}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="f in FoodsDisplay.foods" :key="f.name"
                            class="list-group-item">
                            <h5>{{f.name}}</h5>
                            <span class="badge badge-success">
                                {{ f.calories }}
                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{f.date}}</span>
                        </li>
                        <li class="list-group-item">Total Calories Eaten: {{FoodsDisplay.calories}}</li>
                    </ul>
                <a @click.prevent="todayFoods" class="btn btn-primary">Show Today's Foods</a>
                <a @click.prevent="weekFoods" class="btn btn-primary">Show Week's Foods</a>
                <a @click.prevent="monthFoods" class="btn btn-primary">Show This Month's Foods</a>
                <a @click.prevent="yearFoods" class="btn btn-primary">Show This Year's Foods</a>
                <a v-if="!showMore" @click.prevent="showMeMore" class="btn btn-primary">Show More Options</a>
                <a v-if="showMore" @click.prevent="showMeLess" class="btn btn-primary">Show Less Options</a>
                <a v-if="showMore" @click.prevent="allFoods" class="btn btn-primary">Show All Foods Ever</a>

                <form v-if="showMore" class="foodsSubForm" @submit.prevent="onSubmitDates">
                    <p>
                        <input id="date1" v-model="date1" placeholder="MM-DD-YYYY">
                        <input id="date2" v-model="date2" placeholder="MM-DD-YYYY">
                    </p>
                <p>
                    <input type="submit" value="Show Foods Eaten Between These Dates">  
                </p>
                </form>

                <form v-if="showMore" class="foodsSubForm" @submit.prevent="onSubmitCalRange">
                    <p>
                        <input id="cals" v-model="cal1" placeholder="Low Calories">
                        <input id="cals" v-model="cal2" placeholder="High Calories">
                    </p>
                    <p>
                        <input type="submit" value="Show All Foods Eaten Between These Calories">  
                    </p>
                </form>

                <a v-if="showMore" @click.prevent="deleteFood" class="btn btn-danger">Delete Lastest Food Entry</a>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card" >
                <h5 v-if="!submit2">Add a Food Item</h5>
            <form v-if="!submit2" class="food-form" @submit.prevent="onSubmitFood">

      <p>
        <label for="name">Food</label>
        <input id="name" v-model="food" placeholder="Cheese Pizza">
      </p>
      
      <p>
        <label for="servings">Servings Eaten</label>
        <input id="servings" v-model="servings" placeholder="1">
      </p>

      <p>
        <label for="cal">Calories per Serving</label>
        <input id="cal" v-model="calServings" placeholder="300">
      </p>

      <p>
        <label for="date">Date</label>      
        <input id="date" v-model="date" placeholder="MM-DD-YYYY">
      </p>

      <input type="checkbox" id="checkbox" v-model="add">
      <label for="checkbox">Add this to our database to make adding foods easy in the future</label>
      
      <p>
        <input type="submit" value="Submit">  
      </p>  
  
    
    </form>
    <a v-if="!submit2" @click.prevent="showSubmitFrom" class="btn btn-primary">Add a Food From our Database</a>
    <a v-if="submit2" @click.prevent="showSubmitInput" class="btn btn-primary">Add a Food Not Using Database</a>
    <h5 v-if="submit2">Add a Food Item From Database</h5>
    
    <form v-if="submit2" class="food-form" @submit.prevent="onSubmitFoodFrom">
        
        <p>
        <label for="foodname">Food</label>
        <select id="foodname" v-model="foodEaten">
          <option v-for="f in availableFoods" :key = "f.name" >{{ f.name }}</option>
        </select>
        </p>
        
        <p>
        <label for="amount">Servings Eaten</label>
        <input id="amount" v-model="amount" placeholder="1">
        </p>
        
        <p>
        <label for="dateEaten">Date</label>      
        <input id="dateEaten" v-model="dateEaten" placeholder="MM-DD-YYYY">
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
            availableFoods: null,
            showMore: false,
            date1: null,
            date2: null,
            cal1: null,
            cal2: null,
            food: null,
            servings: null,
            calServings: null,
            date: null,
            add: false,
            submit2: false,
            foodEaten: null,
            amount: null,
            dateEaten: null,
            focus: null
        }
    },
    created(){
        api.ShowFoodWeek()
        .then(x=> this.FoodsDisplay = x)
        .then(()=> this.focus = "This Week")
        .then(()=> this.getAvailableFoods())
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        getAvailableFoods(){
            api.GetAvailableFoods()
            .then(x=> this.availableFoods = x)
        },
        todayFoods(){
            api.ShowFoodDay()
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "Today")
        },
        weekFoods(){
            api.ShowFoodWeek()
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "This Week")
        },
        monthFoods(){
            api.ShowFoodMonth()
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "This Month")
        },
        yearFoods(){
            api.ShowFoodYear()
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "This Year")
        },
        allFoods(){
            api.ShowFoodAll()
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "All Foods Ever")
        },
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.getAvailableFoods())
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
        },
        showMeMore(){
            this.showMore = true;
        },
        showMeLess(){
            this.showMore = false;
        },
        showSubmitFrom(){
            this.submit2 = true;
        },
        showSubmitInput(){
            this.submit2 = false;
        },
        deleteFood(){
            api.DeleteFood()
            .then((x)=> this.FoodsDisplay = { foods: x, calories: 0 })
            .then(()=> this.focus = "Food Entry Deleted:")
            .then(()=> this.refresh)
        },
        onSubmitFood() {
            api.LogFood(this.food, this.servings, this.calServings, this.date, this.add)
            .then(()=> this.food = null)
            .then(()=> this.servings = null)
            .then(()=> this.calServings = null)
            .then(()=> this.date = null)
            .then(()=> this.add = null)
            .then(()=> this.weekFoods())
            .then(()=> this.refresh())
         },
         onSubmitFoodFrom() {
            api.LogFoodName(this.foodEaten, this.amount, this.dateEaten)
            .then(()=> this.foodEaten = null)
            .then(()=> this.amount = null)
            .then(()=> this.dateEaten = null)
            .then(()=> this.weekFoods())
            .then(()=> this.refresh())
         },
         onSubmitDates() {
            api.ShowFoodRange(this.date1, this.date2)
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "From " + this.date1 + " to " + this.date2 )
         },
         onSubmitCalRange() {
            api.ShowFoodBetweenCal(this.cal1, this.cal2)
            .then(x=> this.FoodsDisplay = x)
            .then(()=> this.focus = "From " + this.cal1 + " to " + this.cal2 + " calories" )
         },
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
