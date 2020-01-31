<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
     <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
         <img :src="item ? item : defaultImg" alt="">
     </div>
     <!-- 对话框 -->
     <el-dialog :visible="dialogVisible" @close="CloseDialog">
       <!-- 放置上传图片组件 -->
       <S-image @SelectImg="CoverImg"></S-image>
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
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1 // 定义索引
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 接收值
    CoverImg (img) {
      // props是只读的 不能修改
      // 接收数据之后 发现 list为props数据 要想修改 => 再次传递
      this.$emit('CoverOneImg', img, this.selectIndex)
      // 关闭对话框
      this.CloseDialog()
    },
    openDialog (index) {
      this.selectIndex = index
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
