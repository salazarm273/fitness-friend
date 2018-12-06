<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link  class="nav-link" exact-active-class="active" to="/">Home</router-link> 
      </li>
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/about">About</router-link>
      </li>
      <li v-if="!userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/join">Signup/Login</router-link>
      </li>
      <li v-if="userReady"  class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/news">News</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Friend Feed</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/activities">Activity Log</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/foodlog">Food Log</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/cals">Calorie Report</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/weight">Weight Log</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/challenges">Challenges</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/notifications">Notifications</router-link>
      </li>
      <li v-if="userReady" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/account">Account</router-link>
      </li>
    </ul>
</nav>


</template>

<script>
import * as api from '@/services/api_access';
 // eslint-disable-next-line
 let loopTimer = null;
 export default {
     data(){
         return {
            users: [],
            userReady: api.userReady,
            userId: api.userId
          }

     },
     created(){
         loopTimer = setInterval(this.refresh, 1000)
     },
     methods: {
          refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             .then(()=> this.userReady = api.userReady)
             .then(()=> this.userId = api.userId)
        },
         //userId: ()=> api.userId,
         //userReady: ()=> api.userReady
     }
 }
 </script> 