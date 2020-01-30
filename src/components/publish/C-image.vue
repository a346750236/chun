<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
     <div v-for="(item,index) in list" :key="index" class="cover-item">
         <img src="../../assets/img/pic_bg.png" alt="">
     </div>
  </div>
</template>

<script>
export default {
  name: 'CoverImage',
  components: {},
  props: ['list'],
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 50px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
