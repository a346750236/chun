<template>
  <el-tabs v-model="activeName">
    <el-tab-pane class="item-tab" label="素材库" name="material">
      <el-card class="item-card" v-for="item in list" :key="item.id">
        <img @click="clickImg(item.url)" :src="item.url" alt />
      </el-card>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
        <!-- 放置一个上传组件 -->
        <el-upload :http-request="uploadImg" :show-file-list="false" class="upload" action="ql">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
  <!-- 分页组件 -->
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      activeName: 'material',
      list: [], // 接收素材列表
      //   分页信息
      page: {
        total: 0, // 总条数
        pageSize: 12, // 每页条数
        currentPage: 1 // 默认第一页
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getAllImg()
  },
  mounted () {},
  methods: {
    // 上传图片
    async uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file) // 上传append添加到formData数据中
      let result = await this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      })
      this.$emit('SelectImg', result.data.url)
    },
    //   传递给C-image
    clickImg (url) {
      this.$emit('SelectImg', url)
    },
    //   分页切换
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //   获取图片
    async getAllImg () {
      const result = await this.$axios({
        url: '/user/images',
        params: {
          collect: false, // false 为全部
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results // 赋值图片信息
      this.page.total = result.data.total_count // 赋值总页数
    }
  }
}
</script>

<style scoped lang="less">
.item-tab {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item-card {
    margin: 30px 20px;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
    }
  }
}
.upload{
    display: flex;
    justify-content: center;
    i{
        font-size: 50px;
        display: block;
        margin: 20px auto;
        padding: 60px;
        border: 1px dashed #ccc;
    }
}
</style>
