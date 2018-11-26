<template>
<div>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                    <h5 class="card-header">
                        Recent Activities
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="a in activitiesDisplay.activities" :key="a"
                            class="list-group-item">
                            <h5>{{a.name}}</h5>
                            <span class="badge badge-success">
                                {{a.duration}}
                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{a.date}}</span>
                        </li>
 
                    </ul>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card" >
                <h5>Add an Activity</h5>
                <ActivityAdder @activity-added="addAct"></ActivityAdder>            
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
import * as fb from '@/services/facebook';
import ActivityAdder from '@/components/ActivityAdder';
// eslint-disable-next-line
let loopTimer = null;

export default {
    data(){
        return {
            users: [],
            activitiesDisplay: {}
        }
    },
    created(){
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        weekActivities(){
            api.ActivitiesWeek()
            .then(x=> this.activitiesDisplay = x)
        },
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
        },
        addAct(newActivity) {
            api.LogActivityName(newActivity.name,newActivity.duration,newActivity.date,newActivity.set)
        },
        userId: ()=> api.userId
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
