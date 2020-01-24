<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">评论内容</template>
    </my-bread>
    <!-- 表格 -->
    <el-table :data="list">
      <!-- 列 -->
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <el-table-column :formatter="CommentState" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="object">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="Opcomment(object.row)">{{ object.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
</el-table-column>
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
      list: [] // 评论数据
    }
  },
  computed: {},
  watch: {},
  created () {
    // 请求评论列表数据
    this.Getcomment()
  },
  mounted () {},
  methods: {
    // 请求评论列表数据
    async Getcomment () {
      const result = await this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      })
      // console.log(result.data)
      this.list = result.data.results
    },
    // 评论状态
    CommentState (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论
    async Opcomment (row) {
      // console.log(row)
      let msg = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您确定要${msg}评论吗?`)
      await this.$axios({
        method: 'put',
        url: 'comments/status',
        params: {
          article_id: row.id.toString()
        },
        data: {
          allow_comment: !row.comment_status
        }
      })
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      // 重新请求数据
      this.Getcomment()
    }
  }
}
</script>

<style scoped lang="less">
</style>
