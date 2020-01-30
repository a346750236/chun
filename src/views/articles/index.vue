<template>
  <!-- 卡片 -->
  <el-card class="searchCard">
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">文章列表</template>
    </my-bread>
    <!-- 行 -->
    <el-row class="searchTool">
      <!-- 列 -->
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <!--
              0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        -->
        <!-- 单选框组 -->
         <!-- 第一种 @change="changeCondition"方法，第二种watch监听方法 -->
        <el-radio-group v-model="FormData.status">
          <!-- 全部为5  判断是不是全部 如果是就传入null -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 行 -->
    <el-row class="searchTool">
      <!-- 列 -->
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
        -->
        <!-- 第一种 @change="changeCondition"方法，第二种watch监听方法 -->
        <el-select v-model="FormData.channel_id">
          <el-option v-for="item in channel" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 行 -->
    <el-row class="searchTool">
      <!-- 列 -->
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <!-- 时间选择器 -->
         <!-- 第一种 @change="changeCondition"方法，第二种watch监听方法 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="FormData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class="totle">
      <span>共找到{{ page.total }}条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左边部分 -->
      <el-col :span="14">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <!-- 过滤器不仅可以在插值表达式中使用  还可以在v-bind中使用 -->
            <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <span class="date">2019-12-24 09:15:42</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右边部分 -->
      <el-col class="right" :span="2">
        <span>
          <i
          @click="toModify(item.id)"
          class="el-icon-edit"></i>修改
        </span>
        <span>
          <i
          @click="delArticle(item.id)"
           class="el-icon-delete">删除</i>
        </span>
      </el-col>
    </el-row>
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
  </el-card>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {},
  data () {
    return {
      channel: [], // 频道列表
      list: [], // 文章列表
      defaultImg: require('../../assets/img/404.png'),
      FormData: {
        status: 5, // 默认为全部
        channel_id: null, // 默认为null
        dateRange: [] // 时间是个数组
      },
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 文章列表最低10条
        total: 0
      }
    }
  },
  computed: {},
  watch: {
    FormData: {
      handler () {
        // 直接调用函数
        this.changeCondition()
      },
      deep: true // 深度检测  ,不管有多少层，只要有一个数据变化，就会触发FormData中的一个函数handler
    }
  },
  created () {
    // 频道列表
    this.Getchannel()
    // 文章列表
    this.GetArticles()
  },
  mounted () {},
  filters: {
    // 处理显示状态
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 去修改页面
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除数据
    async delArticle (id) {
      // 所有已发布的文章是不可以删除的  只有草稿才可以删除
      await this.$confirm('您是否要删除这个文章吗?')
      //   调用删除接口
      await this.$axios({
        url: `articles/${id.toString()}`,
        method: 'delete'
      })
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 最新状态
      this.getConditionArticle()
    },
    // 页码切换
    changePage (newPage) {
      this.page.currentPage = newPage
      // 最新状态
      this.getConditionArticle()
    },
    // 改变条件
    changeCondition () {
      this.page.currentPage = 1 // 强制将当前的页码回到第一页
      // 最新状态
      this.getConditionArticle()
    },
    // 复用代码进行封装
    getConditionArticle () {
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.FormData.status === 5 ? null : this.FormData.status, // 不传为全部 5代表全部
        channel_id: this.FormData.channel_id, // 频道
        begin_pubdate: this.FormData.dateRange.length
          ? this.FormData.dateRange[0]
          : null, // 起始时间
        end_pubdate:
          this.FormData.dateRange.length > 1 ? this.FormData.dateRange[1] : null // 截止时间
      }
      // 调用文章列表
      this.GetArticles(params)
    },
    // 获取频道
    async Getchannel () {
      const result = await this.$axios({
        url: '/channels'
      })
      this.channel = result.data.channels
    },
    // 文章列表
    async GetArticles (params) {
      const result = await this.$axios({
        url: '/articles',
        method: 'GET',
        params
      })
      this.list = result.data.results // 文章列表
      this.page.total = result.data.total_count // 文章总数
    }
  }
}
</script>

<style scoped lang="less">
.searchCard {
  .searchTool {
    padding: 20px 0;
    margin-left: 30px;
  }
}
.totle {
  margin: 35px 0;
  height: 35px;
  border-bottom: 1px dashed #ccc;
}
.article-item {
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f5;
  img {
    width: 180px;
    height: 120px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .info {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag {
      max-width: 100px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    span {
      cursor: pointer;
    }
  }
}
</style>
