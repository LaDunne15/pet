<template>
    <div>
        <div class="back"><button v-on:click="back">&#8592;Назад</button></div>
        <div class="addEnt">  
            <span>Редагувати користувача</span>
            <span>Ім'я:</span>
            <input type="text" v-model="user.name" placeholder="Введіть Ім'я" required>
            <span>Вік:</span>
            <input type="number" v-model="user.age" placeholder="Введіть вік" required>
            <button type="button" v-on:click="edit">Змінити</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
const keys = require('../../config/keys');
export default {
    name: 'EditUser',
    props: {
    id: String
    },
    data() {
    return {
        user:[]
    }
    },
    methods: {
        edit: async function() {
            var params = {
                name: this.user.name,
                age: this.user.age
            };
            await axios.put(keys.localURI+'/updateUser/'+this.id,params)
            .then(() => {
                router.push('/list')
            });
        },
        back: function() {
            router.go(-1)
        }
    },
    mounted() {
    axios.get(keys.localURI+'/getUser/'+this.id)
    .then(response => (this.user = response.data.user));
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
