<template>
  <el-card class="banner-card">
    <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="headPage" @click.native="backMyHome()">我的主页</el-breadcrumb-item>
      <el-breadcrumb-item class="currentPage">{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="top-box">
        <span class="top-title">
          {{title}}
          <!-- <el-badge :value="messageLists.total" :max="99" class="item">
                  {{title}}
          </el-badge>-->
        </span>
      </el-col>
    </el-row>
    <el-row class="question" v-for="(item,index) in messageLists" :key="index">
      <el-col class="title">
        <el-button class="titleName" @click="msgDetails(item)" type="text">{{item.title}}</el-button>
      </el-col>
      <el-col>
        <el-row>
          <el-col :span="14" class="time">{{item.create_time}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </el-card>
</template>
      <script>
import request from "@/api/request.js";
export default {
  props: {
    source: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    messageLists: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data() {
    return {
      total: ""
    };
  },
  mounted() {
    console.log(this.messageLists, "adsdsaddssdsadasdas");
  },
  methods: {
    backMyHome() {
      //面包屑 点击回到我的主页
      var self = this;
      var tab = "main";
      self.$emit("changeTab", tab);
    },
    msgDetails(item) {
      //点击消息 --进入消息通知详情页面
      let query = {};
      query.widgetName = "消息通知";
      query.fromname = "我的主页";
      query.fromwhere = "teamMyHomepage";
      query.spaceModule = "team"; //班级空间名
      query.id = item.id; //消息id
      this.$router.push({
        name: "readmessage",
        query: query
      });
    }
  }
};
</script>
      <style media="screen" lang="scss">
.item {
  .is-fixed {
    right: -3px !important;
    top: 14px !important;
  }
}
</style>
      <style lang="scss">
.banner-card {
  margin-bottom: 12px;
  .top-box {
    position: relative;
    text-align: center;
    margin-bottom: 35px;
    .top-title {
      display: inline-block;
      width: 200px;
      height: 50px;
      border: 1px solid #034692;
      border-radius: 25px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
    }
    .el-button {
      float: right;
      font-size: 12px;
      .more {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-left: 10px;
        position: relative;
        top: -3px;
      }
    }
  }
  .question {
    margin-top: 10px;
    .title {
      padding: 4px 0px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .titleName {
        span {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(30, 30, 30, 1);
        }
      }
    }
    .time {
      margin-bottom: 10px;
      // height: 44px;
      font-size: 14px;
      color: #999999;
      display: flex;
      align-items: center;
    }
  }
}
</style>
<style>
.headPage {
  cursor: pointer !important;
}
.headPage:hover .el-breadcrumb__inner {
  color: #034692 !important;
}
.currentPage .el-breadcrumb__inner {
  color: #034692 !important;
}
</style>
      