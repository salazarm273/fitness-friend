<template>
<div>
<form class="activity-form" @submit.prevent="onSubmit"> 
      
      <p>
        <label for="activity">Activity</label>
        <select id="activity" v-model="activity">
          <option v-for="a in activities" :key="a.name">{{a.name}}</option>
        </select>
      </p>
      
      <p>
        <label for="duration">Duration (in hours)</label>
        <input id="duration" v-model.number="duration" placeholder="duration">
      </p>

      <p>
        <label for="review">Date (MM-DD-YYYY)</label>      
        <input id="date" v-model="date">
      </p>

      <input type="checkbox" id="checkbox" v-model="set">
      <label for="checkbox">Set as status</label>
      
      <p>
        <input type="submit" value="Submit">  
      </p>  
  
    
    </form>
</div>
</template>

<script>
//import * as m from 'server\fitworld\model.js';
export default {
    name: "ActivityAdder",
    data(){
        return {
            activity: null,
            duration: null,
            date: null,
            set: false
        }
    },
    methods: {
        //activities: ()=> m.activities,
        
        onSubmit() {
        let newActivity = {
        name: this.name,
        duration: this.duration,
        date: this.date,
        set: this.set
      }
      this.$emit('activity-added', newActivity)
      this.name = null
      this.duration = null
      this.date = null
      this.set = false
    }
    },
    computed:{
        
    }
}
</script>
