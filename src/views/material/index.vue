<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">素材管理</template>
    </my-bread>
    <!-- 切换组件 -->
    <el-tabs v-model="activeName" @tab-click="changTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!-- 两个标签 -->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
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
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
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
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前默认显示第一页
        pageSize: 12 // 每条显示8个
      }
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
    // 切换分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.AllgetList()
    },
    // 切换标签组件
    changTab () {
      // 切换标签组件一定要让他回到第一页
      this.page.currentPage = 1
      // 重新获取数据
      this.AllgetList()
    },
    // 获取全部素材
    AllgetList () {
      // all 全部 collect 是收藏   this.activeName === 'collect'  得到是布尔值fasle
      this.$axios({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        // 获取总条数
        this.page.total = result.data.total_count
      })
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 240px;
    height: 240px;
    margin: 20px 30px;
    position: relative;
    img {
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
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
