<template>
<div>
    <div v-if="!editing">
    <h1 class="accountHeader"> Hello, {{myInfo.name}}!</h1>
    <h1 class="accountHeader"> Welcome to Your Account!</h1>
    <br>
    <a @click.prevent="editInfo" class="btn btn-primary">Edit My Info</a>
    <br>
    <br>
    <p>Id: {{myInfo.id}}</p>
    <p>Bio: {{myInfo.bio}}</p>
    <p>Gender: {{myInfo.gender}}</p>
    <p>Age: {{myInfo.age}}</p>
    <p>Weight units: {{myInfo.wUnits}}</p>
    <p>Height units: {{myInfo.hUnits}}</p>
    <p>Challenges won: <span v-if="myInfo.challengesWon.length == 0">none</span></p> 
    <ul v-if="myInfo.challengesWon != []" class="list-group list-group-flush">
        <li v-for="c in myInfo.challengesWon" :key="c.contest" class="list-group-item">
        <h5>{{c.contest}}</h5>
        </li>
    </ul>
    </div>
    
    <div v-if="editing">
    <h1 class="accountHeader"> Hello, {{myInfo.name}}!</h1>
    <h1 class="accountHeader"> Your Account!</h1>
    <br>
    <a @click.prevent="noEdit" class="btn btn-primary">Cancel</a>
    <br>
    <br>
    <form class="AccountForm" @submit.prevent="onSubmitEdit">
        <p>
        <label for="bio">Bio:</label>
        <input id="bio" v-model="newBio" placeholder="Write a brief message to tell everyone about yourself">
      </p>

     <p> 
    <input type="radio" id="lbs" value="pounds" v-model="newWUnits">
    <label for="lbs">Pounds</label>
    <br>
    <input type="radio" id="kg" value="kilograms" v-model="newWUnits">
    <label for="kg">Kilograms</label>
    <br>
    </p>

     <p> 
    <input type="radio" id="ft" value="feet" v-model="newHUnits">
    <label for="ft">Feet</label>
    <br>
    <input type="radio" id="m" value="meters" v-model="newHUnits">
    <label for="m">Meters</label>
    <br>
    </p>
     
     <p> 
    <input type="radio" id="female" value="female" v-model="newGender">
    <label for="female">Female</label>
    <br>
    <input type="radio" id="male" value="male" v-model="newGender">
    <label for="male">Male</label>
    <br>
    <input type="radio" id="non" value="na" v-model="newGender">
    <label for="non">Don't factor gender into anything</label>
    <br>
    </p>

      <p>
    <label for="age">Age:</label>
	<input v-model.number="newAge" id="age" name="age">
    </p>

        <p>
        <input type="submit" value="Save Changes">  
        </p>
    </form>

    </div>


</div>
</template>

<style lang="scss">

</style>

<script>
 import * as api from '@/services/api_access';
 // eslint-disable-next-line
 let loopTimer = null;
 export default {
     data(){
         return {

                 users: [],
                 editing: false,
                 myInfo: {},
                 newBio: null,
                 newWUnits: null,
                 newHUnits: null,
                 newGender: null,
                 newAge: null,
                 userReady: api.userReady,
                 userId: api.userId
         }
     },
     created(){
        loopTimer = setInterval(this.refresh, 1000)
        api.GetUsers()
        .then(x=> this.users = x)
        api.SeeMe()
        .then(x=> this.myInfo = x)
     },
     methods: {
         editInfo(){
             this.editing =true;
         },
         noEdit(){
             this.editing = false;
         },
         onSubmitEdit(){
            api.AddUserInfo(this.newBio, this.myInfo.weight, this.newWUnits, this.myInfo.height,
            this.newHUnits, this.newGender, this.newAge, this.myInfo.gCals, this.myInfo.gWeight)
            .then(()=> this.newBio = null)
            .then(()=> this.newWUnits = null)
            .then(()=> this.newHUnits = null)
            .then(()=> this.newGender = null)
            .then(()=> this.newAge = null)
            .then(()=> this.editing = false)
         },
          refresh(){
             api.SeeMe()
             .then(x=> this.myInfo = x)
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
         }
     }
 }
 </script> 