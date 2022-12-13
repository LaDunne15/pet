<template>
  <div>
    <RouterLink v-if="!jwt" to="/auth">Увійти або зареєструватися</RouterLink>
    Головна сторінка
  </div>
</template>

<script>
//import store from '../state/state'
export default {
  name: 'MainComponent',
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
  }
}
</script>
<style scoped>
</style>
