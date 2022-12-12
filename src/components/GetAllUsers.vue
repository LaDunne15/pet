<template>
    <div>
        <div v-for="user in users" :key="user._id" class="user">
            <p>id: {{user._id}}</p>
            <p>Імя: {{user.name}}</p>
            <p>Вік: {{user.age}}р</p>
            <div>
            <button type="button" v-on:click="send(user._id)">Вибрати</button>
            <button type="button" v-on:click="remove(user._id)">Видалити</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
const keys = require('../../config/keys');
export default {
    name: 'GetAllUsers',
    data() {
    return {
        users:[]
    }
},
methods: {
    send: function(id){
        router.push({ name: 'editUser', params: { id } })
    },
    
    remove: async function(id){
        await axios.delete(keys.localURI+'/removeUser/'+id).
        then(response => {
            axios.get(keys.localURI+'/getUsers')
            .then(response => {
                this.users = response.data.users
            });
            alert(response.data.msg);
        });
        
    }
}
,
mounted() {
    axios.get(keys.localURI+'/getUsers')
    .then(response => (this.users = response.data.users));
}
}
</script>

<style scoped>
.user
{
    border: 5px dashed rgb(190, 190, 182);
    margin-bottom: 15px;
    border-radius: 15px;
    max-width: 500px;
    margin: 0 auto 15px auto;
}
.user>p{
    margin-left: 15px;
}
.user>div{
    float: right;
    transform: translate(-15px,-25px);
}
.user>div>button{
    border-radius: 10px;
    font-size: 12px;
    height: 25px;
}
.user>div>button:last-child{
    background: repeating-linear-gradient(
    -45deg,
    rgb(202, 5, 5),
    rgb(170, 6, 6) 10px,
    rgb(202, 5, 5) 10px,
    rgb(170, 6, 6) 20px
    );
}
.user>div>button:first-child{
    background: repeating-linear-gradient(
    -45deg,
    #133d54,
    #15455f 10px,
    #133d54 10px,
    #15455f 20px
    );
}

</style>