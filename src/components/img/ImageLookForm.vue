<template>
    <div>
    <ImageForm style="width:100%;" :data="img"></ImageForm>
    <RouterLink v-if="img.author" :to="'/user/'+img.author._id">Автор: {{ img.author.login }}</RouterLink>
    <p v-if="img.likes">{{ img.likes.length }} лайків</p>
    <button v-if="!like" @click="setlike()">Лайк</button>
    <button v-if="like" @click="setlike()">Нелайк</button>
    <p>Дата завантаження: {{ dateD }}</p>
    </div>
</template>
<script>
import axios from 'axios'
const keys = require('../../../config/keys');
import ImageForm from '@/components/img/ImageForm.vue';
export default {
    name: 'ImageLookForm',
    props: {
    id: String
    },
    data() {
        return {
            img:{
                author:{}
            },
            dateD:"",
            like:false,
            jwt:""
        }
    },
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/image/getImage/'+this.id,
                {headers: { Authorization: this.jwt }}).then(
        res => {
          this.img = res.data.img
          this.dateD = res.data.dateD
          this.like = res.data.like
        }
      )
    }
    },
    methods:{
        setlike(){
            var params = {
                id: this.img._id
            };
            axios.put(keys.localURI+'/api/auth/like',params,
                {headers: { Authorization: this.jwt }}
            ).then(
                () => {
                    this.$router.go()
                }
            )
        }
    },
    components: {ImageForm}
}
</script>