<template>
  <div class="myClasses">
    <PageTop :teamId="teamId"></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <Students :source="routename" :teamId="teamId"></Students>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
              <mainNavBar :teamId="teamId"></mainNavBar>         
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  import PageTop from './components/PageTop.vue';
  import Students from './components/Students.vue';
  import mainNavBar from './components/mainNavBar.vue';
  export default{
    name: 'classHomepage',
    components: {
      PageTop,
      Students,
      mainNavBar
    },
    data() {
      return {
        routename: '',
        teamId:''
      }
    },
    created(){
      this.routename = this.$route.name
      console.log('routerQuery',this.$route.query )
      console.log(this.routename, '本页面routename')
      this.teamId=this.$route.query.id;
    },
    mounted() {
    
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
