<template>
    <div>
      <p>Кабінет користувача</p>
      {{user}}
      <table>
        <tr>
          <td>
            ID:
          </td>
          <td>
            {{user._id}}
          </td>
        </tr>
        <tr>
          <td>
            Пошта:
          </td>
          <td>
            {{user.email}}
          </td>
        </tr>
        <hr/>
        <tr v-if="!changeMod">
          <td>Ім'я</td>
          <td>{{user.firstname}}</td>
        </tr>
        <tr v-if="changeMod">
          <td>Ім'я</td>
          <td><input type="text" v-model="user.firstname"></td>
        </tr>
        <tr v-if="!changeMod">
          <td>Прізвище</td>
          <td>{{user.lastname}}</td>
        </tr>
        <tr v-if="changeMod">
          <td>Прізвище</td>
          <td><input type="text" v-model="user.lastname"></td>
        </tr>
        <tr v-if="!changeMod">
          <td>По батькові</td>
          <td>{{user.fathername}}</td>
        </tr>
        <tr v-if="changeMod">
          <td>По батькові</td>
          <td><input type="text" v-model="user.fathername"></td>
        </tr>
        <tr>
          <td></td>
          <td><button v-if="!changeMod" @click="changeMod=true">Змінити</button>
          <button v-if="changeMod" @click="save">Зберегти</button></td>
        </tr>
        <hr/>
        <tr>
          <td>
            Пароль:
          </td>
          <td>
            *****
          </td>
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
        isChangeFirstname: false,
        isChangeLastname: false,
        isChangeFathername: false,
        changeMod: false
      }
    },
    methods: {
      save: async function () {        
        var params = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          fathername: this.user.fathername
        };
        await axios.put(keys.localURI+'/api/auth/updateUser',params,{headers: { Authorization: this.jwt }})
        .then((res) => {
          const token = res.data.token;
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
          this.user = res.data
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
  