<template>
    <div>
        <div class="back"><button v-on:click="back">&#8592;Назад</button></div>
        <div class="addEnt">  
            <span>Редагувати дані фото</span>
            
            <img v-if="photo.img.data" class="image" :src="'data:'+photo.img.contentType+';base64,'+photo.img.data">
            <span>Назва:</span>
            <input type="text" v-model="photo.name" placeholder="Введіть Ім'я" required>
            <span>Опис:</span>
            <input type="text" v-model="photo.desc" placeholder="Введіть опис" required>
            <button type="button" v-on:click="edit">Змінити</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
const keys = require('../../config/keys');
export default {
    name: 'EditPhoto',
    props: {
    id: String
    },
    data() {
    return {
        photo:{
            img:[]
        }
    }
    },
    methods: {
        edit: async function() {
            var params = {
                name: this.photo.name,
                desc: this.photo.desc
            };
            await axios.put(keys.localURI+'/api/image/updateImage/'+this.id,params)
            .then(() => {
                router.push('/about')
            });
        },
        back: function() {
            router.go(-1)
        }
    },
    mounted() {
    axios.get(keys.localURI+'/api/image/getImage/'+this.id)
    .then(response => (this.photo = response.data.img));
    }
}
</script>
<style scoped>
.back{
    position: absolute;
}
.back>button{
    position: relative;
    left: -50%;
    width: 65px;
    height: 65px;
    border-radius: 65px;
    background: repeating-linear-gradient(
    -45deg,
    rgb(156, 156, 1),
    rgb(136, 136, 2) 10px,
    rgb(156, 156, 1) 10px,
    rgb(136, 136, 2) 20px
    );
}
</style>
