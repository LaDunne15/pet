<script>
import axios from 'axios'
const keys = require('../../../config/keys');
import ImageForm from '@/components/img/ImageForm.vue';
export default {
  name: 'MsgsComponent',
  props: {
    id: String
  },
  data() {
    return {
      jwt:"",
      msgs: []
    }
  },
  methods: {
    toMsg: async function (id) {
      this.$router.push('msg/'+id)
    },
    },
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/msgs/',
      {headers: { Authorization: this.jwt }}
      ).then(
        res => {
          this.msgs = res.data.msgs
        }
      )
    }
    else
    {
      console.log("Не авторизовано");
    }
    },
    // eslint-disable-next-line
    components: {ImageForm}
}
</script>
<template>
  <div>
    <div v-for="msg in msgs" :key="msg._id">
      {{ msg }}
      <button @click="toMsg(msg._id)">Перейти до повідомлення</button>
    </div>
  </div>
</template>
<style scoped>
.user
{
  display: block;
  border: 2px solid gray;
  margin-bottom: 10px;
}
</style>