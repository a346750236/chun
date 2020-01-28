<template>
    <el-card>
   <!-- 面包屑 -->
    <my-bread slot="header">
       <template slot="title">素材管理</template>
    </my-bread>
    <!-- 切换组件 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">123</el-tab-pane>
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
      activeName: 'collection'
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
