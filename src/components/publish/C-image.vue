<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
     <div @click="openDialog" v-for="(item,index) in list" :key="index" class="cover-item">
         <img :src="item ? item : defaultImg" alt="">
     </div>
     <!-- 对话框 -->
     <el-dialog :visible="dialogVisible" @close="CloseDialog">
       <!-- 放置上传图片组件 -->
       <S-image></S-image>
     </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CoverImage',
  components: {},
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 默认关闭
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    openDialog () {
      this.dialogVisible = true // 打开弹层
    },
    CloseDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
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
