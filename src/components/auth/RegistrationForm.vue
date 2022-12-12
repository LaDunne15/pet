<template>
  <div>

      <div class="addEnt">    
          <span>РЕЄСТРАЦІЯ</span>
          <span>Пошта:</span>
          <input type="email" v-model="email" placeholder="Введіть пошту" required>
          <span>Пароль:</span>
          <input type="password" v-model="pass" placeholder="Введіть пароль" required>
          <span>Повторіть пароль:</span>
          <input type="password" v-model="pass2" placeholder="Повторіть пароль" required>
          <button type="button" v-on:click="send">ЗАРЕЄСТРУВАТИСЯ</button>
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
  name: 'RegistrationForm',
  data() {
  return {
    email: "",
    pass: "",
    pass2: "",
    msgs: []
  }
},
methods: {
  send: async function (){
    this.msgs = [];
    var params = {
      email: this.email,
      password: this.pass,
      password2: this.pass2
    };
    await axios.post(keys.localURI+'/api/auth/register',params)
    .then(() => {
      this.msgs.push("Реєстрація успішна. Будь ласка, підтвердіть пошту");
    }).catch(error => {
      if (error.response) {
        if(error.response.status == 425)
          {
            this.msgs.push("Паролі не співпадають")
          }
        else if (error.response.status == 409)
        {
          this.msgs.push("Пошта вже зайнята іншим користувачемі")
        }
      }
    });
  
}}
}
</script>

<style scoped>
</style>
