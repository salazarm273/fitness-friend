<template>
<div>
    <div class="col-md-4 col">
    <div v-if="userId() == null" class="card">
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
    <div v-else>
        <h3 class="card-header">
            Tell us a little more about yourself!
        </h3>
    </div>
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
         loginfb() {
             fb.FBLogin()
         },
          refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
        },
         userId: ()=> api.userId
     }
 }
 </script> 