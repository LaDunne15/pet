<template>
  <div>
    <RouterLink v-if="!jwt" to="/auth">Увійти або зареєструватися</RouterLink>
    {{jwt}}
  </div>
</template>

<script>
//import store from '../state/state'
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
  }
}
</script>
<style scoped>
</style>
