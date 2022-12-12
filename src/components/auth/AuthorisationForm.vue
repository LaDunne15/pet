<template>
    <div>
  
        <div class="addEnt">    
            <span>АВТОРИЗАЦІЯ</span>
            <span>Пошта:</span>
            <input type="email" v-model="email" placeholder="Введіть пошту" required>
            <span>Пароль:</span>
            <input type="password" v-model="pass" placeholder="Введіть пароль" required>
            <a v-on:click="send"><RouterLink :to="'/'">Увійти</RouterLink></a>
        </div>
        <div v-if="(msgs.length!=0)">
          <p  v-for="msg in msgs" :key="msg">
          {{msg}}
          </p>
        </div>
    </div>
  </template>
  <script>
import axios from 'axios'
const keys = require('../../../config/keys');
  export default {
    name: 'AuthorisationForm',
    data() {
    return {
      email: "",
      pass: "",
      msgs: []
    }
  },
  methods: {
    send: async function (){
      this.msgs = [];
      var params = {
        email: this.email,
        password: this.pass
      };
      await axios.post(keys.localURI+'/api/auth/login',params)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwt-token', token);
        //this.$store.commit("savetoken",token);
        //console.log(this.$store.state.token);
        location.reload();
      }).catch(error => {
        if (error.response) {
          if(error.response.status == 404)
            {
              this.msgs.push("Користувач не знайдений")
            }
          else if (error.response.status == 401)
          {
            this.msgs.push("Невірний пароль")
          }
        }
      });
    
  }}
  }
  </script>
  
  <style scoped>
  </style>
  