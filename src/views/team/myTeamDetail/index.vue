<template>
  <div class="myClasses">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <Visitor></Visitor>
            <!-- <Students :teamId="teamId"></Students> -->
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
  import Visitor from "./components/Visitor.vue";
  // import Students from './components/Students.vue';
  import mainNavBar from './components/mainNavBar.vue';
  export default{
    name: 'classHomepage',
    components: {
      PageTop,
      Visitor,
      // Students,
      mainNavBar
    },
    data() {
      return {
        teamId: '', //社团id
      }
    },
    created(){
      this.teamId = this.$route.query.c_id;
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
