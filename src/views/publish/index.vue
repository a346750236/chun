<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">发布文章</template>
    </my-bread>
    <!-- 页面结构 -->
    <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:80px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <!-- 富文本 -->
        <quill-editor
          v-model="formData.content"
          type="textarea"
          :rows="4"
          style="height:300px;margin-left:50px"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:100px;">
        <!-- 单选组 -->
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置一个封面组件  父组件  => 子组件 props -->
      <C-image :list="formData.cover.images"></C-image>
      <!-- 下拉框 -->
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- @事件名="方法" => 有默认参数 => 方法()  => 方法()=> 一个参数也没有 -->
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
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
      channel: [],
      // 校验数据
      formData: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 存储的图片的地址
        },
        channel_id: null // 频道id
      },
      // 校验
      rules: {
        // 校验规则对象 min  max
        title: [
          { required: true, message: '标题内容不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题长度需要在5到30字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  computed: {},
  watch: {
    $route: function (to, from) {
      // 修改文章
      if (Object.keys(to.params).length) {
      } else {
        // 发布文章
        this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          },
          channel_id: null // 频道id
        }
      }
    },
    'formData.cover.type': function () {
      //  this指向组件实例
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 单图模式
      }
    }
  },
  created () {
    // 获取频道数据
    this.Getchannel()
    // 获取ID 判断有没有ID  有ID就是修改 没有ID就是发布
    let { arId } = this.$route.params // 回去动态路由参数 arID已经是字符串了
    arId && this.getArticleById(arId) // 获取文章数据
  },
  mounted () {},
  methods: {
    // 获取文章详情内容
    async getArticleById (arId) {
      const result = await this.$axios({
        url: `/articles/${arId}`,
        method: 'GET'
      })
      this.formData = result.data
    },
    // 发布或者修改文章
    async publishArticle (draft) {
      await this.$refs.myForm.validate(async isok => {
        if (isok) {
          let { arId } = this.$route.params
          await this.$axios({
            url: arId ? `/articles/${arId}` : `/articles`,
            method: arId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          })
          // 新增成功 => 应该去内容列表
          this.$router.push('/home/articles') // 回到内容列表
        }
      })
    },
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
