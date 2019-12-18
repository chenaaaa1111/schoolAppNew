<template>
  <div class="readNews">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal">
            <li class="homeEntry" @click="goHome" :class="spaceNav[navIndex]['styles']">
              <img :src="spaceNav[navIndex].icon" />{{spaceNav[navIndex].spacename}}
            </li>
            <el-menu-item class="brandTitle" index="writenews" disabled>文章详情</el-menu-item>
            <li class="nav-user">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                      <el-avatar shape="circle" :size="48" :fit="fit" :src="url"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="el-menu-item menu-release">
                <el-button plan v-if="navIndex!=='teaching'">发布</el-button>
                <el-button plan v-if="navIndex == 'teaching'&&userInfo.level ==2">写文章</el-button>
            </li>

        </el-menu>
      </el-col>
    </el-row>
    <el-row class="read-box" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="read-col">
        <el-card>
          <div slot="header" class="clearfix">
            <el-page-header @back="goback" :title="'返回'+title" ></el-page-header>
          </div>
          <div class="news-box">
            <el-row class="news-row">
              <el-col class="news-cover">
                <img src="../../../assets/images/readNews/cover.png"/>
              </el-col>
            </el-row>
            <el-row class="news-row">
              <el-col :span="24" class="newsTitle" v-if="navIndex=='teaching'">{{newsDetail.title}}</el-col>
              <el-col :span="24" class="news-type">
                <!-- <span>发布主页: 班级主页</span>
                <span>发布栏目: 影评</span> -->
              </el-col>
              <el-col :span="24" class="user-info" v-if="navIndex=='teaching'">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="url"></el-avatar>
                <span>{{newsDetail.name}}</span>
              </el-col>
              <el-col :span="24" class="news-content">
                <p>
                    {{newsDetail.content}}
                </p>
                <!-- <img src="../../../assets/images/readNews/cover.png"/> -->
              </el-col>
              <el-col :span="24" class="news-date">
                发布于{{newsDetail.create_time}}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js'
  export default{
    name: 'readnews',
    data() {
      return {
        newsDetail:{},
        userInfo: {},
        url: '',
        fit: 'cover',
        spaceNav: { // 顶部导航栏显示信息,按需加载
          'classes': {
            icon: require('../../../assets/main/classes.png'),
            spacename: '班级空间',
            styles: 'classesColor'
          },
          'grade': {
            icon: require('../../../assets/main/grade.png'),
            spacename: '年级空间',
            styles: 'gradeColor'
          },
          'team': {
            icon: require('../../../assets/main/team.png'),
            spacename: '社团空间',
            styles: 'teamColor'
          },
          'special': {
            icon: require('../../../assets/main/special.png'),
            spacename: '专题空间',
            styles: 'specialColor'
          },
          'topic': {
            icon: require('../../../assets/main/topic.png'),
            spacename: '课题空间',
            styles: 'topicColor'
          },
          'teaching': {
            icon: require('../../../assets/main/teaching.png'),
            spacename: '教研空间',
            styles: 'teachingColor'
          }
        },
        title: '主页',
        navIndex: 'classes',
        widgetName: '',
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),//只有level:2才能发布教研空间文章 1学生2老师
      }
    },
    mounted() {
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      // this.userInfo=this.$store.state.userInfo;
      this.url=this.userInfo.avatar;//头像
      console.log(this.$route.query, '阅读新闻页面接收传值')
      let params = this.$route.query
      
      if(Object.keys(params).length > 0) {
        // this.title = params.fromname;
        this.navIndex = params.spacename;
        this.title = params.widgetName
      }
      var self=this;
      if(this.navIndex == 'teaching'){ //如果是教研空间 的文章详情
        request.post('/roomapi/Teaching/TeachingDetails',{id:params.id},function(res){
          console.log('教研空间我的主页进来的文章详情',res.data);
          self.newsDetail=res.data;
        })
      }else{
        request.post('/roomapi/Users/detailsNews',{id:params.id},function(res){
          console.log('新闻详情',res);
          self.newsDetail=res.data;
        })
      }
    },
    methods: {
      goHome() {
        this.$router.push({
          name: 'home'
        })
      },
      goback() {
        this.$router.go(-1)
        // this.$router.push({
        //   name: this.fromwhere,
        //   query: {
        //     widgetName: this.title,
        //     fromwhere: this.parents,
        //     spacename: this.navIndex
        //   }
        // })
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
          // color: #E27755;
          img{
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }
        .classesColor{
          color: #E27755;
        }
        .gradeColor{
          color: #E8A33D;
        }
        .teamColor{
          color: #4DB65B;
        }
        .specialColor{
          color: #328B8C;
        }
        .topicColor{
          color: #4F88C5;
        }
        .teachingColor{
          color: #4F88C5;
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
        .el-card__body{
          padding: 40px 80px;
        }
        .news-box{
          padding: 0px 40px;
          .news-row{
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
