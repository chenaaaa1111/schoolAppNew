<template>
  <div class="readNews">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal">
            <li class="homeEntry" @click="goHome">
              <img src="../../../assets/main/teaching.png" />教研空间
            </li>
            <el-menu-item class="brandTitle" index="writenews" disabled>{{widgetName}}</el-menu-item>
            <li class="nav-user">
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
            </li>

        </el-menu>
      </el-col>
    </el-row>
    <el-row class="read-box" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="read-col">
        <el-card>
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="24">
                <el-page-header :title="'返回'+title" @back="goBack"></el-page-header>
              </el-col>
              <el-col :span="24" class="news-result" v-if="widgetName == '审核中'">
                <p class="process">正在审核中</p>
                <p class="processContent">管理员审核通过后，文章就发布成功，请你耐心等待</p>
                <p class="processContent">上传审核时间：<span>{{articleDetails.create_time}}</span></p>
              </el-col>
              <el-col :span="24" class="news-result" v-if="widgetName == '审核未通过'">
                <p class="process">审核未通过</p>
                <p class="processContent">很抱歉你的文章审核未通过,请你仔细查阅编辑后再发布</p>
                <p class="processContent">上传审核时间：<span>{{articleDetails.create_time}}</span></p>
              </el-col>
              <el-col :span="24" class="news-result" v-if="widgetName == '消息通知'">
                <p class="process">您发布的“{{newsDetails.title}}”已被管理员删除</p>
                <p class="deleteCause"><span class="title">删除原因：</span>{{newsDetails.why}}</p>
                <p class="processContent">上传审核时间：<span>{{newsDetails.create_time}}</span></p>
              </el-col>
            </el-row>
          </div>
          <div class="news-box" v-if="widgetName == '审核中' || widgetName == '审核未通过'">
            <el-row class="news-row">
              <el-col :span="24" class="news-edit">
                <img v-if="widgetName == '审核未通过'||widgetName == '审核中'" src="../../../assets/images/classes/editnews.png" @click="reEdit"/>
                <img src="../../../assets/images/classes/delete.png" @click="deleteArt"/>
              </el-col>
              <el-col class="news-cover">
                <img :src="coverBg"/>
              </el-col>
            </el-row>
            <el-row class="news-row">
              <el-col :span="24" class="newsTitle" >{{articleDetails.title}}</el-col>
              <el-col :span="24" class="news-type">
                <span>发布教研组: {{articleDetails.c_name}}</span>
              </el-col>
              <el-col :span="24" class="user-info">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="articleDetails.avatar"></el-avatar>
                <span>{{articleDetails.name}}</span>
              </el-col>
              <el-col :span="24" class="news-content" v-html="articleDetails.content">
              </el-col>
              <el-col :span="24" class="news-date">发布于{{articleDetails.create_time}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'teachingReadmessage',
    data() {
      return{
        baseUrl: 'http://school.i2f2f.com',//图片域名
        fit: 'cover',
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')), //用户信息
        coverBg: '', //封面图
        // url: require('../../../assets/images/user.png'),
        articleDetails: '',//文章信息
        fromwhere: '',//从什么模块过了
        title: '',
        widgetName: '',
        newsDetails: '' //消息通知详情
      }
    },
    created(){
      this.baseUrl = this.$store.state.serverUrl;
      this.fromwhere = this.$route.query.fromwhere;
      this.widgetName = this.$route.query.widgetName;
      this.title = this.$route.query.fromname;
    },
    mounted() {
      if(this.$route.query.widgetName == '审核中' || this.$route.query.widgetName == '审核未通过'){
        this.getArticleDetails();
      }
      if(this.$route.query.widgetName == '消息通知'){
        this.getNewsDetails();
      }
    },
    methods: {
      getArticleDetails(){ //参数  文章id  获取文章详情
        var data = {
          id: String(this.$route.query.id)
        }
        var _this = this;
        request.post('/roomapi/Teaching/TeachingDetails', data, function(res){
          if(res.code == 0) {
            _this.articleDetails = res.data;
            _this.coverBg =  _this.articleDetails.image;
          }
          console.log( _this.articleDetails,'获取文章详情返回数据')
        }) 
      },
      getNewsDetails(){   //消息通知进来 获取消息通知详情 消息id
        var data = {
          id: String(this.$route.query.id)
        }
        var _this = this;
        request.post('/roomapi/Users/detailsMessage', data, function(res){
          if(res.code == 0) {
            if(res.data){
              _this.newsDetails = res.data;
              console.log( _this.newsDetails,'获取消息通知详情返回数据')
            }
          }
        }) 
      },
      // 审核未通过点击编辑 跳转到编辑页面 并携带信息过去 isEdit==true
      reEdit() {
        let query = this.$route.query;
        query.isEdit = true;
        this.$router.push({
          name: 'write',
          query: query
        })
      },
      // 点击删除后 回到我的主页
      deleteArt(){
        var vm = this;
        vm.$confirm('删除后，你将不再看到该新闻的信息，是否确认删除？', '删除提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//删除文章
          let id = vm.$route.query.id;
          request.post('/roomapi/Teaching/delete', { id: id }, (res) => {
            if(res.code == 0){
              vm.$message({
                duration: 1000,
                offset: 190,
                type: 'success',
                message: res.message
              });
              setTimeout(function(){
                vm.$router.push({
                  name: vm.fromwhere
                })
              },2000)
            }
          })
        }).catch(() => {
          vm.$message({
            duration: 1000,
            offset: 190,
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goHome() {
        this.$router.push({
          name: 'home'
        })
      },
      goBack() { //回到我的主页的同时 判断渲染右边页面的组件
        this.$router.push({
          name: this.fromwhere
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    .nav-col{
      padding: 0px 10px;
      .el-menu-head{
        .menu-release{
          float: right;
          .el-button{
            font-size: 22px;
            font-weight: 500;
          }
        }
        .brandTitle{
          cursor: default;
          color: #333;
          opacity: 1;
        }
        .homeEntry{
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;
          color: #E27755;
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
<style lang="scss" scoped>
  .readNews{
    height: 100%;
    overflow: auto;
    background-color: #93DBF1;
    .read-box{
      margin-top: 20px;
      .read-col{
        padding: 0px 10px;
        margin-bottom: 0.4rem;
        .news-result{
          padding: 0px 40px;
          p{
            margin-top: 20px;
          }
          .process{
            font-size: 24px;
            color: #333;
            font-weight: bold;
          }
          .processContent{
            font-size: 20px;
            font-weight:400;
            color:rgba(136,136,136,1);
          }
          .deleteCause{
            font-size: 20px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:#333333;
            line-height:14px;
            .title{
              color:rgba(204,33,33,1);
            }
          }
        }
        .el-card__body{
          padding: 40px 80px;
        }
        .news-box{
          padding: 0px 40px;
          .news-row{
            .news-edit{
              display: block;
              cursor: pointer;
              margin-bottom: 0.4rem;
              img{
                margin-right: 11px;
                width: 152px;
              }
            }
            .news-cover{
              img{
                display: block;
                width: 100%;
              }
            }
            .newsTitle{
              font-size :24px;
              color: #1E1E1E;
              font-weight: 600;
              margin-top: 0.4rem;
            }
            .news-type{
              font-size: 20px;
              color: #666;
              margin-top: 0.2rem;
              span:nth-child(1) {
                margin-right: 1rem;
              }
            }
            .user-info{
              display: flex;
              align-items: center;
              font-size: 18px;
              color: #1E1E1E;
              font-weight: 600;
              margin-top: 0.2rem;
              .el-avatar{
                margin-right: 10px;
              }
            }
            .news-content{
              margin-top: 0.2rem;
              font-size: 18px;
              color: #1E1E1E;
              font-weight: 600;
              line-height: 0.4rem;
              img{
                display: block;
                width: 100%;
                margin: 0.2rem 0;
              }
            }
            .news-date{
              font-size: 18px;
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
