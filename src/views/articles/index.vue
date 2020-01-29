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
        <el-radio-group>
          <el-radio>全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio>待审核</el-radio>
          <el-radio>审核通过</el-radio>
          <el-radio>审核失败</el-radio>
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
        <el-select  placeholder="请选择">
          <el-option></el-option>
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
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
.searchCard {
  .searchTool {
    padding: 20px 0;
    margin-left: 30px;
  }
}
</style>
