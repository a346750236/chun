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
        <el-select v-model="FormData.channel_id">
          <el-option
          v-for="item in channel"
           :key="item.id"
            :value="item.id"
            :label="item.name">
            </el-option>
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
         <el-date-picker
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
      <span>共找到1000条符合条件的内容</span>
    </el-row>
     <!-- 循环的模板 -->
     <el-row v-for="item in 100" :key="item.id" class="article-item" type="flex" justify="space-between">
       <!-- 左边部分 -->
       <el-col :span="14">
         <el-row type="flex">
         <img src="../../assets/img/404.png" alt="">
         <div class='info'>
                <span>年少不听李宗盛，听懂己是不惑年。</span>
                <el-tag class='tag'>标签一</el-tag>
                <span class='date'>2019-12-24 09:15:42</span>
              </div>
      </el-row>
       </el-col>
       <!-- 右边部分 -->
       <el-col class="right" :span="2">
         <span>
           <i class="el-icon-edit"></i>修改
         </span>
         <span>
           <i class="el-icon-delete">删除</i>
         </span>
       </el-col>
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
      FormData: {
        status: 5, // 默认为全部
        channel_id: null, // 默认为null
        dateRange: [] // 时间是个数组
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 频道列表
    this.Getchannel()
  },
  mounted () {},
  methods: {
    // 获取频道
    async Getchannel () {
      const result = await this.$axios({
        url: '/channels'
      })
      this.channel = result.data.channels
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
.totle{
   margin:35px 0;
   height: 35px;
   border-bottom: 1px dashed #ccc;
}
.article-item{
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f5;
  img{
    width: 180px;
    height: 120px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .info{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag{
      max-width: 100px;
    }
    .date{
      color: #999;
      font-size: 12px;
    }
  }
  .right{
    span{
      cursor: pointer;
    }
  }
}
</style>
