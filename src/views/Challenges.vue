<template>
<div>
    <div class="row">
       <div class="col-md-4">
            <div class="card">
                <h5 class="card-header">
                    Current/Upcoming Challenges
                </h5>
                <ul class="Current list-group list-group-flush">
                    <li v-for="c in challenges" :key="c.id"
                    v-if="c.end >= today" class="list-group-item">
                    <h5>{{c.tittle}}</h5>
                    
                    <p> {{c.description}} </p>
                    <p> Perform {{c.activity}} at least {{c.frequency}} times between {{c.start}} and {{c.end}}</p>
                    <p> Contestants: <span v-if="c.contestants.length > 0">
                        <span v-for="p in c.contestants" :key="p.id">{{p.name}}<span v-if="p.id == userId"> (that's you!)</span>,  </span> 
                        and anyone else who joins in time!
                        </span>
                        <span v-if="c.contestants.length <= 0">
                            None
                        </span>
                    </p>
                    <a @click.prevent="joinChallenge(c.id)" class="btn btn-primary">Join</a>
                    </li>
                </ul> 
            </div>
        </div>

       <div class="col-md-4">
            <div class="card">
                <h5 class="card-header">
                    Old Challenges
                </h5>
                <ul class="Current list-group list-group-flush">
                    <li v-for="c in challenges" :key="c.id"
                    v-if="c.end < today" class="list-group-item">
                    <h5>{{c.tittle}}</h5>
                    <p> {{c.description}}</p>
                    <p> Perform {{c.activity}} at least {{c.frequency}} times between {{c.start}} and {{c.end}}</p>
                    <p v-if="c.checked"> Winners: <span v-if="c.winners.length > 0">
                        <span v-for="w in c.winners" :key="w.id">{{w.name}}<span v-if="w.id = userId"> (that's you!)</span>, </span> 
                        great job everyone!
                        </span>
                        <span v-if="c.winners.length <= 0">
                            None
                        </span>
                    </p>
                    <p v-if="!c.checked">
                        <a @click.prevent="checkWinners(c.id)" class="btn btn-primary">Check for Winners</a>
                    </p>
                    </li>
                </ul> 
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <h5 class="card-header">
                    Create a Challenge
                </h5>
                
                <form class="challengesForm" @submit.prevent="onSubmitChallenge">
                    <p>
                    <label for="name">Title</label>
                    <br>
                    <input id="name" v-model="name">
                    </p>

                    <p>
                    <label for="des">Description</label>
                    <br>
                    <textarea id="des" v-model="des"></textarea>
                    </p>

                    <p>
                    <label for="activity">Activity</label>
                    <br>
                    <select id="activity" v-model="activity">
                    <option v-for="a in activities" :key = "a.name" >{{ a.name }}</option>
                    </select>
                    </p>

                    <p>
                    <label for="sDate">Start Date</label>
                    <br>
                    <input id="sDate" v-model="sDate" placeholder="MM-DD-YYYY">
                    </p>

                    <p>
                    <label for="eDate">End Date</label>
                    <br>
                    <input id="eDate" v-model="eDate" placeholder="MM-DD-YYYY">
                    </p>

                    <p>
                    <label for="freq">Amount of Times</label>
                    <br>
                    <input id="freq" v-model.number="freq" type="number">
                    </p>
                    <p>
                    <input type="submit" value="Create Challenge">  
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
            today: null,
            challenges: [],
            activities: null,
            name: null,
            des: null,
            activity: null,
            sDate: null,
            eDate: null,
            freq: null,
            userReady: api.userReady,
            userId: api.userId

         }
     },
     created(){
        api.GetAvailableActivities()
        .then(x=> this.activities = x)
        api.GetChallenges()
        .then(x=> this.challenges = x)
        api.GetToday()
        .then(x=> this.today = x)
        api.GetUsers()
        .then(x=> this.users = x)
        loopTimer = setInterval(this.refresh, 1000)
     },
     methods: {
          refresh(){
            api.GetChallenges()
            .then(x=> this.challenges = x)
            api.GetToday()
            .then((x)=> this.today = x)
            api.GetUsers()
            .then(x=> this.users = x)
            .then(()=> this.userReady = api.userReady)
            .then(()=> this.userId = api.userId)
         },
         joinChallenge(id){
             api.JoinChallenge(id)
             .then(()=> this.name = null)
         },
         checkWinners(id){
            api.CheckWinners(id)
         },
         onSubmitChallenge(){
            api.CreateChallenge(this.name, this.des, this.sDate, this.eDate, this.activity, this.freq)
            .then(()=> this.name = null)
            .then(()=> this.des = null)
            .then(()=> this.sDate = null)
            .then(()=> this.eDate = null)
            .then(()=> this.activity = null)
            .then(()=> this.freq = null)
         }
     }
 }
 </script> 
