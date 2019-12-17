<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 学校新闻动态 -->
            <News :source="source"></News>
            <!-- 班级空间-侧边栏 -->
            <ClassSpace :source="routename"></ClassSpace>
            <!-- 通知公告 -->
            <Notice :source="source"></Notice>
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
  import PageTop from './components/PageTop.vue'
  import News from '../../public/widget/News.vue'
  import ClassSpace from './components/ClassSpace.vue'
  import Notice from '../../public/widget/Notice.vue'
  import mainNavBar from './components/mainNavBar.vue'
  export default{
    name: 'campusHomepages',
    components: {
      PageTop,
      News,
      ClassSpace,
      Notice,
       mainNavBar
    },
    data() {
      return {
        userInfo:{},
        classId:'',
        source: {
          routename: '',
          spacename: 'classes'
        }
      }
    },
    mounted() {
      console.log("sss",this.$router)
      this.routename = this.$route.name
      this.source.routename = this.$route.name
      console.log(this.routename, '本页面routename');
 
     let userInfo= this.getUserInfo();
    },
    methods: {
      getUserInfo(){
        var userInfo={}
        this.userInfo=JSON.parse(sessionStorage.getItem('userInfo')); 
        console.log('user***',userInfo)
        return userInfo;
      }
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
