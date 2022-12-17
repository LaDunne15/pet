<template>
    <img v-if="data.data" :src="'data:'+data.contentType+';base64,'+data.data">
</template>
<script>
export default {
    name: 'ImageForm',
    props: [ 'data' ]
}
</script>
  