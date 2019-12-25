<template>
  <div class="space">
    <el-backtop target=".space"></el-backtop>
    <!-- 导航 -->
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="8">
            <div @click="goHome" class="homeEntry"><img src="../../../assets/main/grade.png" /><span>年级空间</span></div>
          </el-col>
          <el-col :span="8" class="searchContent">
            <el-input type="text"  v-model="spaceKeyWord" placeholder="搜索相关内容" @keyup.enter.native="search">  <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="search">
              </i>
            </el-input>
          </el-col>
          <el-col :span="4" class="nav-user">
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
          </el-col>
        </el-row>        
      </el-col>
    </el-row>
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
  </div>
</template>
<script>
  import request from '@/api/request.js';
  import PageTop from './components/PageTop.vue';
  import mainNavBar from './components/mainNavBar.vue';
   import Vue from 'vue';
  export default{
    name: 'otherGradeHomepage',
    components: {
      PageTop,
      mainNavBar
    },
    data() {
      return {
        spaceKeyWord: '', //搜索关键字
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        fit: 'cover',
      }
    },
    mounted() {
     
    },
    created(){ //创建事件总线
      var eventLister=new Vue();
      this.$root.eventLister=eventLister;
    },
    methods:{
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
      goBack() {
        this.$router.push({
          name: 'grade'
        })
      },
       //搜索相关内容
      search(){
        console.log(this.spaceKeyWord,'输入的值是什么')
        // this.$store.commit('setSpaceKeyWord',this.spaceKeyWord);
        this.$root.eventLister.$emit('seachInfo',this.spaceKeyWord)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pageTop{
    .pageContent{
      padding-left: 20px;
      margin-top: 48px;
      .top-title{
        margin: 20px 0;
        height:56px;
        font-size:40px;
        font-family:STYuanti-SC-Bold,STYuanti-SC;
        font-weight:bold;
        color:rgba(3,70,146,1);
        line-height:56px;
        letter-spacing:10px;
        text-shadow:0px 3px 3px rgba(0,0,0,0.07);
        -webkit-text-stroke:2px rgba(255,255,255,1);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        img{
          display: inline-block;
          width: 74px;
          height: 74px;
          vertical-align: middle;
          margin-right: 30px;
        }
      }
      .top-write{
        height: 56px;
        line-height: 56px;
        text-align: right;
        padding-right: 10px;
        span{
          display: inline-block;
          width: 152px;
          height: 52px;
          // background: url('../../../../assets/images/myhome/writenews.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .leftentry{
        text-align: right;
        margin-top: 20px;
        padding: 0px 10px;
        .entrybtns{
          .btnicon{
            width: 45px;
            height: 45px;
          }
          .el-button.is-circle{
            padding: 0px;
          }
        }
      }
      .department{
        padding-left: 10px;
        font-size: 24px;
        line-height: 46px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .space{
    height: 100%;
    overflow: auto;
    background: url('../../../assets/images/classes/classesbg.png') no-repeat;
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
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .nav-user{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 10px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
