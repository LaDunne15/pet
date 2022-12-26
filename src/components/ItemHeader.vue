<template>
  <div>
    <nav class="menu">
        <RouterLink to="/" class="menu-el">Головна</RouterLink>
        <RouterLink v-if="jwt" to="/msgs" class="menu-el">Повідомлення</RouterLink>
        <RouterLink v-if="jwt" to="/cabinet" class="menu-el">Кабінет</RouterLink>
        <RouterLink v-if="jwt" to="/search" class="menu-el">Пошук</RouterLink>
        <!--<RouterLink to="/about" class="menu-el">Фото</RouterLink>-->
        <a v-if="jwt" @click="logout"><RouterLink to="/" class="menu-el">Вийти</RouterLink></a>
        <RouterLink v-if="!jwt" to="/auth" class="menu-el">Увійти чи зареєструватись</RouterLink>
      </nav>
  </div>
</template>

<script>
//import store from '../state/state'
export default {
  name: 'ItemHeader',
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
  },
  methods: {
    logout: function () {        
        localStorage.removeItem('jwt-token');
        location.reload();
    }
  }
}
</script>

<style scoped>
.menu{
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: stretch;
  background-color: rgb(148,65,47);
  padding: 10px 100px 10px 100px;
}
.menu-el{
  font-size: 20px;
  display: block;
  text-align: center;
  margin: 5px;
  border-radius: 5px;
  flex-grow: 1;
  background-color: rgb(184, 87, 68);
  text-decoration:none;
  border: 2px solid rgb(126, 61, 49);
  color:white  
}
.menu-el:first-child{
  flex-grow: 1.5;
}
.menu-el:hover{
  background: repeating-linear-gradient(
  -45deg,
  rgb(184, 87, 68),
  rgb(184, 87, 68) 10px,
  rgb(204, 97, 76) 10px,
  rgb(204, 97, 76) 20px
);
}



.content {
  border-radius: 15px;
  background-color: rgb(206, 206, 198);
  padding: 15px;
  min-height: 600px;
  margin: 20px auto;
  max-width: 600px;
}

.footer{
  display: block;
  background-color: #133d54;
  bottom: 0px;
  min-height: 100px;
  text-align: center;
  font-size: 30px;
  padding-top: 20px;
  color: azure;
}
</style>
