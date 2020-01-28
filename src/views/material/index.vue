<template>
    <el-card>
   <!-- 面包屑 -->
    <my-bread slot="header">
       <template slot="title">素材管理</template>
    </my-bread>
    <!-- 切换组件 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">
         <!-- 全部素材 -->
         <div class="img-list">
           <el-card class="img-card" v-for="item in list"
            :key="item.id"
            >
            <img :src=item.url alt="">
            <!-- 两个标签 -->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i  class="el-icon-star-on"></i>
              <i  class="el-icon-delete-solid"></i>
            </el-row>
            </el-card>
         </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collection">456</el-tab-pane>
    </el-tabs>
    </el-card>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {},
  data () {
    return {
      // 控制切换素材
      activeName: 'all',
      // 全部素材
      list: []
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取全部素材
    this.AllgetList()
  },
  mounted () {},
  methods: {
    // 获取全部素材
    AllgetList () {
      this.$axios({
        url: '/user/images',
        method: 'GET',
        params: { collect: false }
      }).then(result => {
        this.list = result.data.results
      })
    }
  }
}
</script>

<style scoped lang="less">
 .img-list{
   display: flex;
   flex-wrap: wrap;
   .img-card{
     width: 240px;
     height: 240px;
     margin: 20px 30px;
     position: relative;
     img{
       width: 100%;
       height: 100%;
     }
       .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      i{
        cursor:pointer
      }
    }
   }
 }

</style>
