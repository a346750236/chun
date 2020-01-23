<template>
<el-breadcrumb separator=">">
  <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
         <!-- 具名插槽 -->
         <slot name='title'></slot>
      </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'Mybread',
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
