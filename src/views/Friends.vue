<template>
<div>
    <div class="row">
       <div class="col-md-4">
            <div v-if="!onProfile" class="card">
                <h5 class="card-header">
                    Friends List
                </h5>
                <ul class="list-group list-group-flush">
                    <li @click.prevent="showProfile(f.id)" v-for="f in friends" :key="f.id"
                    class="list-group-item canClick">
                    <h5>{{f.name}}</h5>
                    </li>
                </ul> 
                <p class="note">Remember to check your notifications for friend requests</p>
            </div>
             <div v-if="onProfile && viewing !== null" class="card">
                <h5 class="card-header">{{viewing.name}}</h5>
                <div class="profile">
                <p>id: {{viewing.id}} age: {{viewing.age}} </p>
                <p>bio: {{viewing.bio}}</p>
                <p v-if="viewing.status.status != 'none'">status: {{viewing.status.status}}, {{viewing.status.month}}/{{viewing.status.day}}/{{viewing.status.year}}</p>
                </div>
                <a @click.prevent="unFriend" class="btn btn-danger">Unfriend User</a>
                <br>
                <a @click.prevent="backToFriends" class="btn btn-primary">Back to Friends List</a>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                    <h5 class="card-header">Friend Feed</h5>
            
            <form class="StatusForm" @submit.prevent="onSubmitStatus">
                    <p>
                        <textarea v-model="newStatus" placeholder="Tell you're friends what you're up to"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="Set New Status">  
                    </p>
            </form>
            <p v-if="myStatus.status != 'none'" class="statusMine"><strong>My Status:</strong> {{myStatus.status}}, {{myStatus.month}}/{{myStatus.day}}/{{myStatus.year}}</p>

            <ul class="list-group list-group-flush">
                <li v-for="s in friendfeed" :key="s.status"
                    class="list-group-item">
                    <h5>{{s.status}}, {{s.month}}/{{s.day}}/{{s.year}} </h5>
                </li>
            </ul>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <h5 class="card-header">Options</h5>
                <a v-if="!showAddFriend" @click.prevent="revealAddFriend" class="btn btn-primary">Find New Friend</a>
                <div v-if="showAddFriend">
                <form v-if="!seeingResults" class="friendSubForm" @submit.prevent="lookUpUsers">
                    <p>
                    <label for="searchName">Look up User by Name </label>
                    <input id="searchName" v-model="searchName" placeholder="username">
                    </p>
                    <p>
                    <input type="submit" value="Search">  
                    </p>  
                </form>
                <div v-if="seeingResults">
                    <ul class="list-group list-group-flush">
                    <li v-for="p in potentialFriends" :key="p.id"
                    class="list-group-item">
                    <h5 v-if="p.id != userId">{{p.name}}</h5>
                    <p v-if="p.id != userId">id: {{p.id}} age: {{p.age}} &nbsp;</p>
                    <p v-if="p.id != userId">bio: {{p.bio}}</p>
                    <a v-if="p.id != userId" @click.prevent="addFriendName(p.id)" class="btn btn-primary">Send Friend Request</a>
                    <br>
                    </li>
                    <a @click.prevent="sawResults" class="btn btn-primary">Search a Different Name</a>
                </ul> 
                </div>
                <form class="friendSubForm" @submit.prevent="friendById">
                    <p>
                    <label for="friendId">Already know their id?</label>
                    <input id="friendId" v-model="friendId" placeholder="user ID">
                    </p>
                    <p>
                    <input type="submit" value="Send Friend Request Directly to User">  
                    </p>  
                </form>
                <a @click.prevent="hideAddFriend" class="btn btn-primary">Close Add Friend Form</a>
                </div>


                <a v-if="!showHideForm" @click.prevent="revealHideForm" class="btn btn-primary">
                    Hide My Statuses</a>
                <div v-if="showHideForm">
                    <form class="friendSubForm" @submit.prevent="hideFromUser">
                    <p>
                    <label for="hideId">Enter the ID of the friend you want to hide statuses from. (Don't worry, they won't know)</label>
                    <input id="hideId" v-model="hideId" placeholder="user ID">
                    </p>
                    <p>
                    <input type="submit" value="Hide Statuses">  
                    </p>  
                </form>


                <form class="friendSubForm" @submit.prevent="unhideFromUser">
                    <p>
                    <label for="unhideId">No longer want to hide your statuses from someone? Just enter their ID below.</label>
                    <input id="unhideId" v-model="unhideId" placeholder="user ID">
                    </p>
                    <p>
                    <input type="submit" value="UnHide Statuses">  
                    </p>  
                </form>
                
                <a @click.prevent="hideHideForm" class="btn btn-primary">Close Hide Statuses Form</a>
                </div>


                <a v-if="!showGoAwayForm" @click.prevent="revealGoAwayForm" class="btn btn-primary">
                    Hide X's Status</a>
                
                <div v-if="showGoAwayForm">
                    <form class="friendSubForm" @submit.prevent="goAwayUser">
                    <p>
                    <label for="goAwayId">Enter the ID of the friend whose statuses you no longer want to see. (Don't worry, they won't know)</label>
                    <input id="goAwayId" v-model="goAwayId" placeholder="user ID">
                    </p>
                    <p>
                    <input type="submit" value="Hide Their Statuses">  
                    </p>  
                </form>


                <form class="friendSubForm" @submit.prevent="unGoAwayUser">
                    <p>
                    <label for="unGoAwayId">No longer want to stop seeing someone's statuses? Just enter their ID below.</label>
                    <input id="unGoAwayId" v-model="unGoAwayId" placeholder="user ID">
                    </p>
                    <p>
                    <input type="submit" value="UnHide Their Statuses">  
                    </p>  
                </form>
                <a @click.prevent="hideGoAwayForm" class="btn btn-primary">Close Hide X's Statuses Form</a>
                </div>
                
            </div>
        </div>

    </div>
</div>
</template>

<style lang="scss">
    .btn-primary{
        margin-top: 10px;
    }
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
    .friendSubForm{
        margin-top: 5px;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid black;
    }
    .StatusForm{
        margin-top: 15px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .note{
        margin-top: 15px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .profile{
        margin-top: 15px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .statusMine{
        margin-top: 15px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 125%;
    }
    .canClick{
        cursor: pointer;
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
            onProfile: false,
            friends: [],
            viewing: null,
            myStatus: {},
            newStatus: null,
            friendfeed: [],
            searchName: null,
            friendId: null,
            showAddFriend: false,
            potentialFriends: [],
            seeingResults: false,
            potentialFriend: null,
            onPotentialProfile: false,
            showHideForm: false,
            showGoAwayForm: false,
            hideId: null,
            unhideId: null,
            goAwayId: null,
            unGoAwayId: null
        }
    },
    created(){
        this.getMyStatus();
        api.FriendFeed()
        .then((x)=> this.friendfeed = x)
        api.GetFriends()
        .then((x)=> this.friends = x)
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        showProfile(i){
            api.User(i)
            .then(x=> this.viewing = x)
            .then(()=> this.onProfile = true)
        },
        showProfilePotential(i){
            api.User(i)
            .then(x=> this.potentialFriend = x)
            .then(()=> this.onPotentialProfile)
        },
        backToFriends(){
            this.viewing = null;
            this.onProfile = false;
        },
        getMyStatus(){
            api.GetStatus()
            .then(x=> this.myStatus = x)
        },
        onSubmitStatus(){
            api.SetStatus(this.newStatus)
            .then(x=> this.myStatus = x)
        },
        unFriend(){
            api.Unfriend(this.viewing.id)
            .then(()=>this.backToFriends())
        },
        revealAddFriend(){
            this.showAddFriend = true;
        },
        hideAddFriend(){
            this.showAddFriend = false;
        },
        revealHideForm(){
            this.showHideForm = true;
        },
        hideHideForm(){
            this.showHideForm = false
        },
        revealGoAwayForm(){
            this.showGoAwayForm = true;
        },
        hideGoAwayForm(){
            this.showGoAwayForm = false;
        },
        lookUpUsers(){
            api.UserNames(this.searchName)
            .then((x)=> this.potentialFriends = x)
            .then(()=> this.searchName = null)
            .then(()=> this.seeingResults = true)
        },
        friendById(){
            api.SendFriendRequest(this.friendId)
            .then(()=> this.friendId = null)
            .then(()=> this.showAddFriend = false)
        },
        addFriendName(i){
            api.SendFriendRequest(i)
            .then(()=> this.showAddFriend = false)
            .then(()=> this.seeingResults = false)
        },
        sawResults(){
            this.seeingResults = false;
            this.potentialFriends = [];
        },
        hideFromUser(){
            api.HideFromFriend(this.hideId)
            .then(()=> this.hideId = null)
            .then(()=> this.showHideForm = false)
        },
        unhideFromUser(){
            api.UnhideFromFriend(this.unhideId)
            .then(()=> this.unhideId = null)
            .then(()=> this.showHideForm = false)
        },
        goAwayUser(){
            api.DontSeeFriend(this.goAwayId)
            .then(()=> this.goAwayId = null)
            .then(()=> this.showGoAwayForm = false)
        },
        unGoAwayUser(){
            api.UndontSeeFriend(this.unGoAwayId)
            .then(()=> this.unGoAwayId = null)
            .then(()=> this.showGoAwayForm = false)
        },
        refresh(){
            this.getMyStatus()
            api.FriendFeed()
            .then((x)=> this.friendfeed = x)
            api.GetFriends()
            .then((x)=> this.friends = x)
            
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
