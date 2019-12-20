<template>
  <div class="space">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="10">
            <div @click="goHome" class="homeEntry"><img src="../../assets/main/grade.png" /><span>年级空间</span></div>
          </el-col>
          <el-col :span="7" class="searchContent">
            <el-input type="text" style="width:100%" suffix-icon="el-icon-search" placeholder="搜索相关内容"></el-input>
          </el-col>
          <el-col :span="4" class="nav-user">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                  <el-avatar shape="circle" :size="48" :fit="fit" :src="userInfo.avatar"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>        
      </el-col>
    </el-row>
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
  </div>
</template>
<script>
  import PageTop from './components/PageTop.vue';
  import News from '../public/widget/News.vue';
  import ClassSpace from './components/ClassSpace.vue';
  import Notice from '../public/widget/Notice.vue';
  import mainNavBar from './components/mainNavBar.vue';
  export default{
    name: 'grade',
    components: {
      PageTop,
      News,
      ClassSpace,
      Notice,
      mainNavBar
    },
    data() {
      return {
        userInfo: {},//用户信息
        fit: 'cover',
        source: {
          routename: '',
          spacename: 'grade'
        },
        routename: ''
      }
    },
    mounted() {
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      this.routename = this.$route.name;
      this.source.routename = this.$route.name;
      console.log(this.routename, '本页面routename')
    },
    methods: {
      goHome() {
        this.$router.push({ // 回到空间选择页面
          name: 'home'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .space{
    height: 100%;
    overflow: auto;
    background: url('../../assets/images/classes/classesbg.png') no-repeat;
    background-size: cover;
  }
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    padding: 0px 10px;
    .homeEntry{
      height: 100px;
      display: flex;
      align-items: center;
      margin-right: 35px;
      font-size: 26px;
      color: #E8A33D;
      img{
       
        display: inline-block;
        width: 56px;
        height: 56px;
        vertical-align: middle;
        margin: 0px 10px;
      }
      span{
        cursor: pointer;
      }
    }
    .searchContent{
      height: 100px;
      display: flex;
      align-items: center;
    }
    .nav-user{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 10px;
    }
  }
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
