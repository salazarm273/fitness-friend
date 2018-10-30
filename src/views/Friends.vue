<template>
<div>
     <div class="row">
        <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Friend List</h5>
                     <ul class="list-group list-group-flush">
                        <li v-for="c in myCaptions" class="list-group-item">{{c}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">What have you been up to?</h5>
                    <p class="card-text">This will be a basic text input form, with the button settng this input as this user's status</p>
                    <a href="#" class="btn btn-primary">Set as Status</a>
                </div>
            </div>
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Friend Feed</h5>
                    <p class="card-text">Will show the status of their friends, maybe only 10 or 20 at a time with the button showing more?</p>
                    <a href="#" class="btn btn-primary">See More</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
 
 <style lang="scss">
 
 </style>
 
 <script>
 import { GetState, FlipPicture } from '@/services/api_access';
 export default {
     data: function(){
         return {
             state: {
                 picture: ""
             }
         }
     },
     created: function(){
         GetState()
         .then(x=> this.state = x)
     },
     methods: {
         flipPicture: function(){
             FlipPicture()
             .then(x=> getState())
             .then(x=> this.state = x)
         }
     }
 }
 </script>
 