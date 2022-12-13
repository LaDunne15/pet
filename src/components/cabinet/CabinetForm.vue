<template>
    <div>
      <p>Кабінет користувача</p>
      {{user}}
      <table>
        <tr>
          <td>ID:</td>
          <td>{{user._id}}</td>
        </tr>
        <tr>
          <td>Пошта:</td>
          <td>{{user.email}}</td>
        </tr>
        <hr/>
        <tr>
          <td>Ім'я:</td>
          <td v-if="!changeMod">{{user.firstname}}</td>
          <td v-if="changeMod"><input type="text" v-model="user.firstname"></td>
        </tr>
        <tr>
          <td>Прізвище:</td>
          <td v-if="!changeMod">{{user.lastname}}</td>
          <td v-if="changeMod"><input type="text" v-model="user.lastname"></td>
        </tr>
        <tr>
          <td>По батькові:</td>
          <td v-if="!changeMod">{{user.fathername}}</td>
          <td v-if="changeMod"><input type="text" v-model="user.fathername"></td>
        </tr>
        <tr>
          <td>Дата народження:</td>
          <td v-if="!changeMod">{{dateB}}</td>
          <td v-if="changeMod"><input type="date" v-model="dateB" max="2010-01-01" min="1910-01-01" default="2000-01-01" required>
      </td>
        </tr>
        <tr>
          <td><button v-if="changeMod" @click="changeMod=false">Cкасувати</button></td>
          <td><button v-if="!changeMod" @click="changeMod=true">Змінити</button>
          <button v-if="changeMod" @click="save">Зберегти</button></td>
        </tr>
        <hr/>
        <tr>
          <td>Пароль:</td>
          <td>*****</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button>Змінити</button>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
<script>
//import store from '../state/state'
import axios from 'axios'
const keys = require('../../../config/keys');
  export default {
    name: 'CabinetComponent',
    props: {
      id: String
    },
    data() {
      return {
        jwt:"",
        user: [],
        changeMod: false,
        dateB: ""
      }
    },
    methods: {
      save: async function () {        
        var params = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          fathername: this.user.fathername,
          dateBirth: this.dateB
        };
        await axios.put(keys.localURI+'/api/auth/updateUser',params,{headers: { Authorization: this.jwt }})
        .then((res) => {
          const token = res.data.token;
          this.user = res.data.user;
          localStorage.setItem('jwt-token', token);
        });
        this.changeMod = false
      }
    },
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/auth/getUser',
          {headers: { Authorization: this.jwt }}
      ).then(
        res => {
          this.user = res.data.user
          this.dateB = res.data.dateB
        }
      )
    }
    else
    {
      console.log("Не авторизовано");
    }
    }
  }
  </script>
  <style scoped>
  </style>
  