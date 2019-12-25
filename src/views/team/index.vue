<template>
  <div class="space">
    <el-backtop target=".space"></el-backtop>
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu :default-active="activeIndex" class="el-menu-head" mode="horizontal" router
            @select="handleSelect">
            <li class="homeEntry" @click="goHome">
              <img src="../../assets/main/team.png"/>社团空间
            </li>
            <el-menu-item index="mainTeamHomepage">社团主页</el-menu-item>
            <el-menu-item index="myTeamHomepage">我的社团</el-menu-item>
            <el-menu-item index="teamMyHomepage">我的主页</el-menu-item>
            <li class="el-menu-item menu-search hidden-sm-and-down">
              <el-input type="text"  v-model="spaceKeyWord" placeholder="搜索相关内容" @keyup.enter.native="search">  <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="search">
              </i>
            </el-input>
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
  import Vue from 'vue'
  export default{
    components: {
    },
    data() {
      return {
        spaceKeyWord: '', //搜索关键字
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        fit: 'cover',
        activeIndex: 'mainTeamHomepage'
      }
    },
    watch: {
      $route(to,from) {
        // 如果路由加载的非[校园主页,我的班级,我的主页]其中之一则取消导航栏选中项
        let routers = ['mainTeamHomepage', 'myTeamHomepage', 'teamMyHomepage', 'otherTeamMyPage']
        if(routers.indexOf(to.name) == -1) {
          this.activeIndex = to.name
        }
        console.log(this.activeIndex, '当前页面名称-------------------')
      }
    },
    created(){
      //创建事件总线
      var eventLister=new Vue();
      this.$root.eventLister=eventLister;
    },
    mounted() {
      this.activeIndex = this.$route.name;
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
        this.spaceKeyWord = '';
        this.activeIndex = val;
        console.log(val, '导航栏切换路由名称');
      },
       //搜索相关内容
      search(){
        console.log(this.spaceKeyWord,'输入的值是什么');
        // this.$store.commit('setSpaceKeyWord',this.spaceKeyWord);
        this.$root.eventLister.$emit('seachInfo',this.spaceKeyWord);
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
          color: #4DB65B;
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
