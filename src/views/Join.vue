<template>
<div>
    <div class="col-md-4 col">
    <div v-if="userId === null && userReady == false" class="card">
    <h3 class="card-header"> Welcome!</h3>
    <br>
    <a @click.prevent="loginfb" class="btn btn-lg btn-primary">
        Continue with Facebook
    </a>
    <br>
    <a  class="btn btn-lg btn-primary">
        Continue with Google
    </a>
    </div>
    <div v-if="userId !== null && userReady == false" class="card">
        <h3 class="card-header">
            Tell us a little more about yourself!
        </h3>
        <form class="add-user-info" @submit.prevent="onSubmit">
      <p>
        <label for="bio">Bio:</label>
        <input id="bio" v-model="bio" placeholder="Write a brief message to tell everyone about yourself">
      </p>
      
    <p>
    <label for="weight">Weight:</label>
	<input v-model.number="weight" id="weight" name="weight">
    </p>

     <p> 
    <input type="radio" id="lbs" value="pounds" v-model="wUnits">
    <label for="lbs">Pounds</label>
    <br>
    <input type="radio" id="kg" value="kilograms" v-model="wUnits">
    <label for="kg">Kilograms</label>
    <br>
    </p>

    <p>
    <label for="height">Height:</label>
	<input v-model="height" id="height" name="height">
    </p>

     <p> 
    <input type="radio" id="ft" value="feet" v-model="hUnits">
    <label for="ft">Feet</label>
    <br>
    <input type="radio" id="m" value="meters" v-model="hUnits">
    <label for="m">Meters</label>
    <br>
    </p>
     
     <p> 
    <input type="radio" id="female" value="female" v-model="gender">
    <label for="female">Female</label>
    <br>
    <input type="radio" id="male" value="male" v-model="gender">
    <label for="male">Male</label>
    <br>
    <input type="radio" id="non" value="na" v-model="gender">
    <label for="non">Don't factor gender into anything</label>
    <br>
    </p>

      <p>
    <label for="age">Age:</label>
	<input v-model.number="age" id="age" name="age">
    </p>

    <p>
    <label for="gCal">What's your personal goal amount of calories consumed per day? (Feel free to leave this section blank)</label>
	<input v-model.number="gCals" id="weight" name="weight">
    </p>

    <p>
    <label for="gWeight">What's your goal weight? (If you don't have one, leave this section blank)</label>
	<input  v-model.number="gWeight" id="gWeight" name="gWeight">
    </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    </div>
    
    </div>
    <div v-if="userReady" class="card">
        <h3 class="card-header"> Welcome!</h3>
    <br>
    <p>
        You've successfully logged on!
    </p>
       
    </div>
</div>
</template>

<style lang="scss">
 .card-header{
     text-align: center;
 }
</style>

<script>
 import * as api from '@/services/api_access';
 import * as fb from '@/services/facebook';
 //let loopTimer = null;
 export default {
     data(){
         return {

                 users: [],
                 bio: null,
                 weight: null,
                 wUnits: null,
                 height: null,
                 hUnits: null,
                 gender: null,
                 age: null,
                 gCals: null, 
                 gWeight: null,
                 userReady: api.userReady,
                 userId: api.userId

         }
     },
     created(){
        // loopTimer = setInterval(this.refresh, 1000)
        api.GetUsers()
             .then(x=> this.users = x)
     },
     methods: {
         loginfb() {
             fb.FBLogin(()=> this.refresh())
         },
          refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
         },
         onSubmit() {
             api.AddUserInfo(this.bio,this.weight,this.wUnits,this.height,
             this.hUnits,this.gender,this.age,this.gCals, this.gWeight)
             .then(()=> this.refresh())
         },
         //userId: ()=> api.userId,
         //userReady: ()=> api.userReady
     }
 }
 </script> 