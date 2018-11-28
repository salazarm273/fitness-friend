<template>
<div>
    <div class="alert alert-success">
        Account will go here!
        features:
        edit bio/info
        logout.
    </div>
</div>
</template>

<style lang="scss">

</style>

<script>
import * as api from '@/services/api_access';

export default {
    data(){
        return {
            users: []
        }
    },
    created(){
        api.GetUsers()
        .then(x=> this.users = x)
    },
    methods: {
        refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
        },
        userId: ()=> api.userId
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
