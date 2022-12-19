<template>
    <div>
      <p>Кабінет користувача</p>
      <table>
        <tr>
          <td>Фото:</td>
          <td>
            <ImageForm v-if="user.main_image" style="width: 100%" :data="user.main_image"></ImageForm>
          </td>
        </tr>
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
          <td>Логін:</td>
          <td>{{user.login}}</td>
        </tr>
        <tr>
          <td>Ім'я:</td>
          <td>{{user.firstname}}</td>
        </tr>
        <tr>
          <td>Прізвище:</td>
          <td>{{user.lastname}}</td>
        </tr>
        <tr>
          <td>По батькові:</td>
          <td>{{user.fathername}}</td>
        </tr>
        <tr>
          <td>Місто:</td>
          <td>{{user.town}}</td>
        </tr>
        <tr>
          <td>Дата народження:</td>
          <td>{{dateB}}</td>
        </tr>
        <hr/>
      </table>
      <p>Галерея</p>
      <div class="container">
      <div v-for="img in user.images" :key="img._id">
        <ImageForm @click="getImage(img._id)" class="imgF" :data="img"></ImageForm>
      </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
const keys = require('../../../config/keys');
import ImageForm from '@/components/img/ImageForm.vue';
export default {
  name: 'UserComponent',
  props: {
    id: String
  },
  data() {
    return {
      jwt:"",
      user: [],
      dateB: "",
      pass: "",
      pass2: "",
      msgs: [],
      file: '',
      main_img: []
    }
  },
  methods: {
    save: async function () {        
        var params = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          fathername: this.user.fathername,
          dateBirth: this.dateB,
          login: this.user.login,
          town: this.user.town
        };
        await axios.put(keys.localURI+'/api/auth/updateUser',params,{headers: { Authorization: this.jwt }})
        .then((res) => {
          const token = res.data.token;
          this.user = res.data.user;
          localStorage.setItem('jwt-token', token);
        });
        this.changeMod = false
      },
      savePass: async function () {
        this.msgs = []
        var params = {
          password: this.pass,
          password2: this.pass2
        };
        await axios.put(keys.localURI+'/api/auth/updatePassword',params,{headers: { Authorization: this.jwt }})
        .then((res) => {
          const token = res.data.token;
          this.user = res.data.user;
          this.changePasswordMod = false
          localStorage.setItem('jwt-token', token);
          this.msgs.push("Пароль успішно змінено");
        }).catch(error => {
        if (error.response) {
          console.log(error)
          if(error.response.status == 425)
            {
              this.msgs.push("Паролі не співпадають")
            }
        }
      });
      },
      uploadImage(e){
        this.file = e.target.files[0];
      },
      send: async function () {
        let formData = new FormData();
        formData.append('file', this.file);
        await axios.put(keys.localURI+'/api/auth/uploadUserPhoto',formData,{headers: { Authorization: this.jwt }})
        .then(function () {
          location.reload()
        })
        .catch(function (response) {
        //handle error
        console.log(response);
        });
      },
      getImage(id){
        this.$router.push("/image/"+id)
      }
    },
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/auth/getUserById/'+this.id
      ).then(
        res => {
          this.user = res.data.user
          this.dateB = res.data.dateB
          this.main_img = res.data.main_img
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
<style scoped>
.container
{
  display: flex;
  flex-wrap: wrap;
}
.container>div
{
  flex-grow: 1;
  width: 33%;
  margin: auto 0;
}

.imgF{
  width: 100%;  
}

</style>
  