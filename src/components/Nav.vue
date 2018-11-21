<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link> 
      </li>
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/about">About</router-link>
      </li>
      <li v-if="!userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/join">Signup/Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/news">News</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Friend Feed</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Activity Log</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Food Log</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Calorie Report</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Challenges</router-link>
      </li>
      <li v-if="userReady()" class="nav-item">
        <router-link class="nav-link" exact-active-class="active" to="/friends">Notifications</router-link>
      </li>
    </ul>
</nav>


</template>

<script>
 import * as api from '@/services/api_access';
 let loopTimer = null;
 export default {
     data(){
         return {
            users: []

          }
     },
     created(){
         loopTimer = setInterval(this.refresh, 1000)
     },
     methods: {
          refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
        },
         userId: ()=> api.userId,
         userReady: ()=> api.userReady
     }
 }
 </script> 