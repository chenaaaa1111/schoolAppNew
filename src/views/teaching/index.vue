<template>
  <div class="space">
    <el-backtop target=".space"></el-backtop>
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu :default-active="activeIndex" class="el-menu-head" mode="horizontal" router
            @select="handleSelect">
            <li class="homeEntry" @click="goHome">
              <img src="../../assets/main/teaching.png" />教研空间
            </li>
            <el-menu-item index="teachingHomepage">教研主页</el-menu-item>
            <el-menu-item index="myTeachGroupHomepage">我的教研组</el-menu-item>
            <el-menu-item index="myTeachingHomepage">我的主页</el-menu-item>
            <li class="el-menu-item menu-search hidden-sm-and-down">
              <el-input type="text" suffix-icon="el-icon-search" v-model="keyword" placeholder="搜索相关内容" @keyup.enter.native="search"></el-input>
            </li>
            <li class="nav-user">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <el-avatar shape="circle" :size="48" :fit="fit" :src="userInfo.avatar"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-s-cooperation" @click.native="toUserInfo">资料与账号</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-close" @click.native="loginout">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </li>
        </el-menu>
      </el-col>
    </el-row>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default{
    components: {
    },
    data() {
      return {
        fit: 'cover',
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        activeIndex: 'teachingHomepage',
        keyword: '', //搜索关键字
      }
    },
    watch: {
      $route(to,from) {
        // 如果路由加载的非[校园主页,我的班级,我的主页]其中之一则取消导航栏选中项
        let routers = ['teachingHomepage', 'myTeachGroupHomepage', 'myTeachingHomepage','otherTeachingHomepage','otherHomepage']
        if(routers.indexOf(to.name) == -1) {
          this.activeIndex = to.name
        }
      }
    },
    mounted() {
      this.activeIndex = this.$route.name;
      // this.userInfo=this.$store.state.userInfo;
    },
    created(){
      //创建事件总线
      var eventLister=new Vue();
      this.$root.eventLister=eventLister;
    },
    methods: {
      toUserInfo() { //点击资料与账号 进入修改信息页面
        this.$router.push({
          name: 'userBaseInfo'
        });
      },
      loginout() {
        sessionStorage.setItem('Authorization', '');//清空token
        this.$router.push('/login');
      },
      goHome() {
        this.$router.push({ // 回到空间选择页面
          name: 'home'
        })
      },
      handleSelect(val) { // 导航栏切换路由
        this.keyword = '';
        this.activeIndex = val;
        console.log(val, '导航栏切换路由名称');
      },
      //搜索相关内容
      search(){
        console.log(this.keyword,'输入的值是什么');
        this.$root.eventLister.$emit('seachInfo',this.keyword);
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
    .nav-col{
      padding: 0px 10px;
      .el-menu-head{
        .homeEntry{
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;
          color: #4F88C5;
          img{
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }
        .el-menu-item{
          font-size: 22px;
          color: #5B728C;
          padding: 0px;
          margin-right: 35px;
          height: 100px;
          line-height: 106px;
        }
        .is-active{
          border-bottom: 0;
          color: #333;
        }
        .is-active::after{
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background: #409EFF;
          position: absolute;
          bottom: 6px;
          border-radius: 2px;;
        }
        .nav-user{
          float: right;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }


    }
  }
</style>
