<template>
  <div class="showmore">
    <el-row type="flex" justify="center" style="background: #FFF;">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="more-content">
        <el-menu :default-active="activeIndex" class="el-menu-head" mode="horizontal">
          <li class="homeEntry" @click="goHome" :class="spaceNav[navIndex]?spaceNav[navIndex].styles:''">
            <img :src="spaceNav[navIndex]?spaceNav[navIndex].icon:''" />{{spaceNav[navIndex]?spaceNav[navIndex].spacename:''}}
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
    <el-row type="flex" justify="center" class="more-container">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="more-box">
        <el-card>
          <div slot="header" class="clearfix">
            <el-page-header @back="goBack" :title="'返回'+title"></el-page-header>
          </div>
          <div class="card-content">
            <el-row v-if="noticeList.length == 0">
              <el-col>暂无内容~</el-col>
            </el-row>
            <el-row class="more-list" v-for ="(item,index) in noticeList" :key="index">
              <el-col :span="24" class="news-title">
                {{item.title}}
                <!-- <span class="news-type">(栏目: 影评)</span> -->
              </el-col>
              <!-- <el-col :span="24" class="news-author">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="url"></el-avatar>
                <span class="author">{{userInfo.name}}</span>
                <span class="author-class">{{userInfo.grade}}{{userInfo.class}}班</span>
              </el-col> -->
              <el-col :span="24" class="news-text">
                  {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}
                </el-col>
              <!-- <el-col :span="24" class="news-trigger">
                <el-button type="text" @click="readDetails(item.id)">阅读全文<i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </el-col> -->
              <el-col :span="24" class="news-date">
                {{item.create_time}}
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from "@/api/request.js";
  export default {
    name: 'newsmore',
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        page: 1,
        psize: 20,
        fit: 'cover',
        noticeList: [],
        spaceNav: { // 顶部导航栏显示信息,按需加载
          classes: {
            icon: require('../../../assets/main/classes.png'),
            spacename: '班级空间',
            styles: 'classesColor'
          },
          grade: {
            icon: require('../../../assets/main/grade.png'),
            spacename: '年级空间',
            styles: 'gradeColor'
          },
          team: {
            icon: require('../../../assets/main/team.png'),
            spacename: '社团空间',
            styles: 'teamColor'
          },
          special: {
            icon: require('../../../assets/main/special.png'),
            spacename: '专题空间',
            styles: 'specialColor'
          },
          topic: {
            icon: require('../../../assets/main/topic.png'),
            spacename: '课题空间',
            styles: 'topicColor'
          },
          teaching: {
            icon: require('../../../assets/main/teaching.png'),
            spacename: '教研空间',
            styles: 'teachingColor'
          }
        },
        // url: require('../../../assets/images/user.png'), // 用户头像
        activeIndex: '', // 没什么卵用,摆设
        fromwhere: 'home', // 记录从哪个路由跳转过来的,返回事件跳转路由
        navIndex: 'classes', // 从哪个空间过来的,用来改变导航栏图标和颜色
        widgetName: '', // '学校新闻动态'
        title: '空间主页', // 显示要返回到哪个模块的文字描述
      }
    },
    created() {

    },
    mounted() {
      /**
       * 路由跳转传值:
       *    根据路由跳转过来的query参数来显示对应风格的顶部导航栏,
       *    获取返回时候的跳转路由以及返回按钮显示的文字
       */
      let params = this.$route.query
      console.log(params, '通知公告更多页面接收到传值')
      if (Object.keys(params).length > 0) {
        this.fromwhere = params.fromwhere
        this.navIndex = params.spacename
        this.widgetName = params.widgetName
        this.setTitle(this.fromwhere);
        this.getNoticeList();
      }
    },
    methods: {
      getNoticeList() {
        var self = this;
        let param = {
          sid: self.userInfo.s_id,//校区id
          page: self.page,
          psize: self.psize
        }
        request.post("/roomapi/Users/NoticeList", param, function (res) {
          if(res.code == 0) {
            if(res.data.model.length>0) {
              self.noticeList = res.data.model;
            }
            console.log(self.noticeList, '获得更多通知公告列表')
          }
        })
      },
      setTitle(str) { // 设置返回按钮显示的文字
        switch (str) {
          case 'classes':
            this.title = '班级主页';
            break;
          case 'campusHomepage':
            this.title = '校园主页';
            break;
          case 'gradeHomepage':
            this.title = '年级主页';
            break;
          case 'mainTeamHomepage':
            this.title = '社团主页';
            break;
          case 'specialMainHomepage':
            this.title = '首页';
            break;
          case 'topicHomepage':
            this.title = '课题主页';
            break;
          case 'teachingHomepage':
            this.title = '教研主页';
            break;
            case 'myHomepage':
            this.title = '我的主页';
            break;
          default:
            this.title = '空间主页'
        }
      },
      goHome() { // 回到首页面(空间选择页面)
        this.$router.push({
          name: 'home'
        })
      },
      goBack() { // 回到跳转过来时的页面
        this.$router.push({
          name: this.fromwhere
        })
      },
      readDetails(id) { // 去新闻详情
        console.log('跳转新闻')
        this.$router.push({
          name: 'readnotice',
          query: {
            widgetName: '通知公告',
            spacename: this.navIndex,
            id:id
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .showmore {
    height: 100%;
    overflow: auto;
    background-color: #93DBF1;

    .more-content {
      .el-menu-head {
        .menu-release {
          float: right;

          .el-button {
            font-size: 22px;
            font-weight: 500;
          }
        }

        .brandTitle {
          cursor: default;
          color: #333;
          opacity: 1;
        }

        .homeEntry {
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;

          // color: #E27755;
          img {
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }

        .classesColor {
          color: #E27755;
        }

        .gradeColor {
          color: #E8A33D;
        }

        .teamColor {
          color: #4DB65B;
        }

        .specialColor {
          color: #328B8C;
        }

        .topicColor {
          color: #4F88C5;
        }

        .teachingColor {
          color: #4F88C5;
        }

        .el-menu-item {
          font-size: 22px;
          color: #5B728C;
          padding: 0px;
          margin-right: 35px;
          height: 100px;
          line-height: 106px;
        }

        .is-active {
          border-bottom: 0;
          color: #333;
        }

        .is-active::after {
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background: #409EFF;
          position: absolute;
          bottom: 6px;
          border-radius: 2px;
          ;
        }

        .nav-user {
          float: right;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }
    }

    .more-container {
      margin-top: 30px;
      padding: 0px 10px;

      .more-list:last-child {
        .el-divider {
          display: none;
        }
      }

      .more-list {
        .news-title {
          font-size: 24px;
          font-weight: bold;
          color: #1E1E1E;

          .news-type {
            color: #999;
            font-weight: 500;
            margin-left: 0.5rem;
          }
        }

        .news-author {
          display: flex;
          align-items: center;
          font-size: 18px;
          margin-top: 0.2rem;

          .el-avatar {
            float: left;
            margin-right: 0.15rem;
          }

          .author {
            color: #1E1E1E;
            margin-right: 0.4rem;
          }

          .author-class {
            color: #999;
          }
        }

        .news-text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-top: 0.2rem;
          font-size: 18px;
          color: #1E1E1E;
          line-height: 0.38rem;
        }

        .news-trigger {
          text-align: right;
        }

        .news-date {
          font-size: 18px;
          color: 999;
        }
      }
    }
  }
</style>
