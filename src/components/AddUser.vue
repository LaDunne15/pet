<template>
    <div>

        <div class="addEnt">    
            <span>Додати користувача</span>
            <span>Ім'я:</span>
            <input type="text" v-model="name" placeholder="Введіть Ім'я" required>
            <span>Вік:</span>
            <input type="number" v-model="age" placeholder="Введіть вік" required>
            <button type="button" v-on:click="send">Записати</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
const keys = require('../../config/keys');
  export default {
    name: 'AddUser',
    data() {
    return {
      name: "",
      age: 0
    }
  },
  methods: {
    send: async function (){
      var params = {
        name: this.name,
        age: this.age
      };
      await axios.post(keys.localURI+'/addUser',params)
      .then(() => {
        alert("Користувача додано")
        this.name = "";
        this.age = "";
        
      });
    
  }}
  ,
  mounted() {
    /*axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.name = response));
    */
  }
  }
</script>

<style scoped>
</style>
  