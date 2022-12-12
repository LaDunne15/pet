<template>
    <div>
      кабінет
      {{jwt}}
    </div>
  </template>
  
<script>
//import store from '../state/state'
import axios from 'axios'
const keys = require('../../config/keys');
  export default {
    name: 'MailComponent',
    props: {
      id: String
    },
    data() {
      return {
        jwt:""
        //state:""
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
          console.log(res)
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
  