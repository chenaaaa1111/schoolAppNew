<template>
  <div class="myClasses">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- <Students :source="routename" :otherClassId="otherClassId"></Students> -->
            <!-- 访问信息 -->
            <Visitor></Visitor>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <mainNavBar></mainNavBar>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  import PageTop from './components/PageTop.vue';
  import Visitor from "./components/Visitor.vue";
  // import Students from './components/Students.vue';
  import mainNavBar from './components/mainNavBar.vue';
  export default{
    name: 'otherClassHomepage',
    components: {
      PageTop,
      Visitor,
      // Students,
      mainNavBar
    },
    data() {
      return {
        routename: '',
        otherClassId:'' //别人的班级id
      }
    },
    created(){
      this.routename = this.$route.name;
      console.log('routerQuery',this.$route.query )
      console.log(this.routename, '本页面routename')
      this.otherClassId=this.$route.query.id;
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
