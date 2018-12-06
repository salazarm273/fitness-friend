<template>
<div>
    <div class="row">
        <div v-if="!chosen" class="col-md-12">
            <h3>News Articles</h3>
                <ul class="list-group list-group-flush">
                    <li v-for="(n,index) in newsDisplay" :key="index"
                        class="list-group-item">
                        <h4 class="titles" @click.prevent="pickArticle(index)">{{n.title}}</h4>
                        <br>
                        <br>
                        <h6>{{ n.description }}</h6>
                        <br>
                        <br>
                    </li>
                </ul>


        </div>
        <div v-else class="col-md-12">
            <br>
            <img :src=articleInfo.pic alt="title picture">
            <br>
            <br>
            <h3> {{articleInfo.title}}</h3>
            <h6> by {{articleInfo.author}}</h6>
            <br>
            <ul class="list-group list-group-flush">
            <li v-for="s in articleInfo.story" :key="s"
                class="list-group-item">
                <p>{{s}}</p>
                <br>
            </li>
            </ul>
        <a @click.prevent="goBack" class="btn btn-primary">Back to Articles</a>
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
    .titles{
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
            newsDisplay: [],
            userReady: api.userReady,
            userId: api.userId,
            chosen: false,
            articleInfo: null,
            articlePic: null
        }
    },
    created(){
        this.getNews()
        loopTimer = setInterval(this.refresh, 1000);
    },
    methods: {
        getNews(){
            api.GetNews()
            .then(x=> this.newsDisplay = x)
        },
        pickArticle(i) {
            api.GetArticleInfo(i)
            .then((x)=> this.articleInfo = x)
            .then(()=> this.articlePic= this.articleInfo.pic)
            .then(()=> this.chosen = true)
         },
         refresh(){
             api.GetUsers()
             .then(x=> this.users = x)
             this.getNews()
        },
        goBack(){
            this.chosen = false;
        }
    },
    computed: {
        
    },
    components: {
        
    }
}
</script>
