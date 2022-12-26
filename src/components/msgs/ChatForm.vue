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
      msgs: [],
      msgs2: [],
      msg: ""
    }
  },
  methods: {
    toMsg: async function (id) {
      this.$router.push('msg/'+id)
    },
    sendmsg: async function() {
        var params = {
        text: this.msg
        };
        axios.put(keys.localURI+'/api/msgs/'+this.id,
        params,
        {headers: { Authorization: this.jwt }}
      ).then(
        () => {
          this.$router.go()
        }
      )
    },formatDate: function (date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();
        if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return year+"-"+month+"-"+day+" "+hour+":"+minutes;
}},
    mounted() {
      this.jwt = localStorage.getItem('jwt-token');
      if(this.jwt!="")
    {
      axios.get(keys.localURI+'/api/msgs/'+this.id,
      {headers: { Authorization: this.jwt }}
      ).then(
        res => {
          this.msgs = res.data.msgs
          this.msgs2 = res.data.msgs2
          this.msg = ''
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
    <table>
            <tr v-for="msg in msgs2" :key="msg._id">
                <td v-if="msg.author._id!='Mine'"><ImageForm style="width:50px" :data="msg.author.main_image"></ImageForm></td>
                <td v-if="msg.author._id=='Mine'"></td>
                <td v-if="msg.author._id!='Mine'">{{ msg.text }}</td>
                <td v-if="msg.author._id=='Mine'" style="text-align: end;">{{ msg.text }}</td>
                <td v-if="msg.author._id!='Mine'"></td>
                <td v-if="msg.author._id=='Mine'"><ImageForm style="width:50px" :data="msg.author.main_image"></ImageForm></td>
                <td>{{ formatDate(msg.date) }}</td>
            </tr>
    </table>
    <input type="text" v-model="msg"/>
    <button @click="sendmsg">Відправити</button>
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