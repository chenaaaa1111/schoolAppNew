<template>
  <div class="myClasses">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card>
          <mainNavBar></mainNavBar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import PageTop from './components/PageTop.vue'
  import mainNavBar from './components/mainNavBar.vue'
  export default{
    name: 'classHomepage',
    components: {
      PageTop,
      mainNavBar
    },
    data() {
      return {
        routename: ''
      }
    },
    mounted() {
      this.routename = this.$route.name
      console.log(this.routename, '本页面routename')
    },
    methods:{

    }
  }
</script>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
