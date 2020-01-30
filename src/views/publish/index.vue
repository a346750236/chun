<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">发布文章</template>
    </my-bread>
    <!-- 页面结构 -->
    <el-form style="margin-left:50px">
      <el-form-item label="标题：">
        <el-input style="width:50%"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <!-- 文本框 -->
        <el-input type="textarea" :rows="4" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="封面：">
        <!-- 单选组 -->
        <el-radio-group>
          <el-radio>单图</el-radio>
          <el-radio>三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item label="频道：">
        <el-select>
          <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      // 频道列表
      channel: []
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取频道
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
</style>
