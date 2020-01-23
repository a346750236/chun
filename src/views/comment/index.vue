<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">评论内容</template>
    </my-bread>
    <!-- 表格 -->
    <el-table>
      <!-- 列 -->
      <el-table-column width="500" label="标题"></el-table-column>
      <el-table-column label="评论状态"></el-table-column>
      <el-table-column label="总评论数"></el-table-column>
      <el-table-column label="粉丝评论数"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
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
</style>
