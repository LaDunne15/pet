<script setup>
import { RouterView } from 'vue-router'
import ItemFooter from '@/components/ItemFooter.vue'
import ItemHeader from '@/components/ItemHeader.vue'

</script>
<template>
  <div>
  <ItemHeader class="header"></ItemHeader>
  <RouterView class="content"/>
  <ItemFooter class="footer"></ItemFooter>
  </div>
</template>
<style scoped>
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
