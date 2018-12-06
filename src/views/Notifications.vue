<template>
<div>
    <div class="row">
       <div class="col-md-6">
            <div class="card">
                <h5 class="card-header">
                    Friends Requests
                </h5>
                <ul class="list-group list-group-flush">
                    <li v-for="f in friendRequests" :key="f.id"
                    class="list-group-item">
                    <h5>{{f.name}}</h5>
                    <p>id: {{f.id}}</p>
                <p>bio: {{f.bio}}</p>
                <a @click.prevent="approveFriend(f.id)" class="btn btn-success">Approve Friend Request</a>
                <br>
                <a @click.prevent="rejectFriend(f.id)" class="btn btn-danger">Reject Friend Request</a>
                    </li>
                </ul> 
            </div>
        </div>

        <div class="col-md-6">
            <div class="card">
                <h5 class="card-header">
                    Challenge Notifications
                </h5>
                <ul class="list-group list-group-flush">
                    <li v-for="(n,index) in challengeNotes" :key="n.message"
                    class="list-group-item">
                    <h5>{{n.message}}</h5>
                    <a @click.prevent="sawMessage(index)" class="btn btn-success">Okay!</a>
                    </li>
                </ul> 
            </div>
        </div>

        

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
            friendRequests: [],
            challengeNotes: []           

        }
    },
    created(){
        api.GetFriendRequests()
        .then(x=> this.friendRequests = x)
        api.GetChallengeNotifications()
        .then(x=> this.challengeNotes = x)
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        approveFriend(i){
            api.ApproveFriendRequest(i)
        },
        rejectFriend(i){
            api.RejectFriendRequest(i)
        },
        sawMessage(i){
            api.DeleteChallengeNotification(i)
        },
        refresh(){
            api.GetFriendRequests()
            .then(x=> this.friendRequests = x)
            api.GetChallengeNotifications()
            .then(x=> this.challengeNotes = x)
            api.GetUsers()
            .then(x=> this.users = x)
            .then(()=> this.userReady = api.userReady)
            .then(()=> this.userId = api.userId)
        }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
