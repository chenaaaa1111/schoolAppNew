<template>
  <div class="readNews">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal">
          <li class="homeEntry" @click="goHome" :class="spaceNav[navIndex].styles">
            <img :src="spaceNav[navIndex].icon" />
            {{spaceNav[navIndex].spacename}}
          </li>
          <el-menu-item class="brandTitle" index="writenews" disabled>通知公告</el-menu-item>
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
            </el-row>
          </div>
          <div class="news-box">
            <el-row class="news-row">
              <el-col :span="24" class="newsTitle">{{noticeDetails.title}}</el-col>
              <el-col :span="24" class="news-content">
                <p>{{noticeDetails.content}}</p>
              </el-col>
              <el-col :span="24" class="news-date">{{noticeDetails.create_time}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from '@/api/request.js';
export default {
  name: "readmessage",
  data() {
    return {
      fit: "cover",
      userInfo: {},
      spaceNav: {
        // 顶部导航栏显示信息,按需加载
        classes: {
          icon: require("../../../assets/main/classes.png"),
          spacename: "班级空间",
          styles: "classesColor"
        },
        grade: {
          icon: require("../../../assets/main/grade.png"),
          spacename: "年级空间",
          styles: "gradeColor"
        },
        team: {
          icon: require("../../../assets/main/team.png"),
          spacename: "社团空间",
          styles: "teamColor"
        },
        special: {
          icon: require("../../../assets/main/special.png"),
          spacename: "专题空间",
          styles: "specialColor"
        },
        topic: {
          icon: require("../../../assets/main/topic.png"),
          spacename: "课题空间",
          styles: "topicColor"
        },
        teaching: {
          icon: require("../../../assets/main/teaching.png"),
          spacename: "教研空间",
          styles: "teachingColor"
        }
      },
      navIndex: "classes",
      title: "",
      widgetName: "",
      noticeDetails: {} //通知公告详情
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let params = this.$route.query;
    if (Object.keys(params).length > 0) {
      this.title = params.widgetName;
      this.navIndex = params.spacename;
    }
    let prams = {
      id: params.id,
    }
    var self = this;
    request.post('/roomapi/Users/detailsNotice', prams,function(res){
      if(res.code ==0){
        self.noticeDetails = res.data;
      }
    })
  },
  methods: {

    goHome() {
      this.$router.push({
        name: "home"
      });
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: this.fromwhere
      // })
    }
  }
};
</script>
<style lang="scss" scoped>
.page-header {
  background: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999999;
  .nav-col {
    padding: 0px 10px;
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
        color: #e27755;
      }
      .gradeColor {
        color: #e8a33d;
      }
      .teamColor {
        color: #4db65b;
      }
      .specialColor {
        color: #328b8c;
      }
      .topicColor {
        color: #4f88c5;
      }
      .teachingColor {
        color: #4f88c5;
      }
      .el-menu-item {
        font-size: 22px;
        color: #5b728c;
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
        content: "";
        display: block;
        width: 100%;
        height: 4px;
        background: #409eff;
        position: absolute;
        bottom: 6px;
        border-radius: 2px;
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
}
</style>
<style lang="scss" scoped>
.readNews {
  height: 100%;
  overflow: auto;
  background-color: #93dbf1;
  .read-box {
    margin-top: 20px;
    .read-col {
      padding: 0px 10px;
      margin-bottom: 0.4rem;
      .news-result {
        padding: 0px 40px;
        p {
          margin-top: 20px;
        }
        p:first-child {
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }
        p:first-child + p {
          font-size: 20px;
          color: #333;
          span:first-child {
            color: #cc2121;
          }
        }
        p:last-child {
          font-size: 20px;
          color: #999;
        }
      }
      .el-card__body {
        padding: 40px 80px;
      }
      .news-box {
        padding: 0px 40px;
        .news-row {
          .news-edit {
            display: block;
            width: 152px;
            cursor: pointer;
            margin-bottom: 0.4rem;
            img {
              display: block;
              width: 100%;
            }
          }
          .news-cover {
            img {
              display: block;
              width: 100%;
            }
          }
          .newsTitle {
            font-size: 24px;
            color: #1e1e1e;
            font-weight: 600;
            margin-top: 0.4rem;
          }
          .news-type {
            font-size: 20px;
            color: #666;
            margin-top: 0.2rem;
            span:nth-child(1) {
              margin-right: 1rem;
            }
          }
          .user-info {
            display: flex;
            align-items: center;
            font-size: 18px;
            color: #1e1e1e;
            font-weight: 600;
            margin-top: 0.2rem;
            .el-avatar {
              margin-right: 10px;
            }
          }
          .news-content {
            margin-top: 0.2rem;
            font-size: 18px;
            color: #1e1e1e;
            font-weight: 600;
            line-height: 0.4rem;
            img {
              display: block;
              width: 100%;
              margin: 0.2rem 0;
            }
          }
          .news-date {
            font-size: 18px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
