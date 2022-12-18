<script>
import axios from 'axios'
const keys = require('../../../config/keys');
import ImageForm from '@/components/img/ImageForm.vue';
export default {
  name: 'CabinetComponent',
  props: {
    id: String
  },
  data() {
    return {
      jwt:"",
      users: []
    }
  },
  methods: {
    gotouser: async function (id) {
        console.log(id);
    }
    },
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/auth/getUsers'
      ).then(
        res => {
          this.users = res.data.users
        }
      )
    }
    else
    {
      console.log("Не авторизовано");
    }
    },
    components: {ImageForm}
}
</script>
<template>
    <div>
        <div v-for="user in users" :key="user._id" style="margin-bottom: 10px;">
            <ImageForm v-if="user.main_image" style="width:100px" :data="user.main_image"></ImageForm>
            <p>{{user.login}} ({{user.firstname}} {{user.lastname}})</p>
            <p>{{user.town}}</p>
            <button @click="gotouser(user._id)">Перейти до користувача</button>
        </div>
    </div>
</template>