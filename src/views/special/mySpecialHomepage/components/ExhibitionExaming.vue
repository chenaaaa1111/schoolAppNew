<!-- 审核中 审核未通过的动态 -->
<template>
  <el-card>
    <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="backMyHome()" class="headPage">我的专题</el-breadcrumb-item>
      <el-breadcrumb-item class="currentPage">{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10">
      <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="top-box">
        <span class="top-title">{{title}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xl="6"
        :lg="6"
        :md="8"
        :sm="12"
        :xs="12"
        class="move-box"
        v-for="(item,index) in articles"
        :key="index"
      >
        <div class="move-cover">
          <div class="img-wrap">
            <img :src="item.avatar" />
          </div>
          <span class="move-btn" @click="showplay">
            <img src="../../../../assets/images/classes/play.png" />
          </span>
        </div>
        <div class="move-title">{{item.title}}</div>
        <div class="move-del" @click="goToEdit(item.id)">
          <el-button plan size="small">撤回</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
      <script>
import request from "@/api/request.js";
export default {
  props: {
    articles: {
      type: [Object, Array],
      default: () => []
    },
    title: {
      type: String,
      default: "审核中"
    },
    updateUrl: ""
  },
  data() {
    return {
      baseUrl: this.$store.state.serverUrl,
      upUrl: this.$props.upUrl
    };
  },
  mounted() {},
  methods: {
    goToEdit(id){
      this.$router.push({
        name: 'write',
          query: {
            fromname: '专题主页',
            fromwhere: 'mySpecialHomepage',
            spaceModule: 'special',
            isEdit:true,
            id:id,
            upUrl:'/roomapi/Community/addArticle',//上传的url
          }

      })
    },
    backMyHome() {
      //面包屑 点击回到我的主页
      console.log("审核 审核未通过");
      var self = this;
      var tab = "main";
      this.$emit("changeTab", tab);
    },
    changeTab(tab) {
      console.log(tab);
    },
    showplay() {
      // 打开专题详情
      this.$router.push({
        name: "showmovie",
        query: {
          fromwhere: "mySpecialHomepage"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.top-block {
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
  .article {
    // margin-top: 25px;
    .subTitle {
      font-size: 16px;
      color: #999;
      line-height: 30px;
      .el-divider--horizontal {
        margin-top: 12px;
      }
    }
    .title {
      line-height: 40px;
      font-size: 20px;
      .text {
        font-weight: bold;
        margin-right: 30px;
      }
      .classify {
        color: #666;
        margin-right: 30px;
        white-space: nowrap;
      }
      .date {
        color: #666;
        white-space: nowrap;
      }
    }
    .operation {
      text-align: right;
      .el-button {
        padding-top: 0;
        font-size: 12px;
      }
    }
    .content {
      margin: 24px 0px 0px 0px;
      padding: 0;
      .con-pic {
        display: block;
        width: 100%;
      }
      .con-text {
        line-height: 36px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .read-more {
        text-align: right;
      }
    }
    .article-date {
      font-size: 18px;
      color: #999;
      line-height: 30px;
      margin-top: 14px;
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
<style media="screen" lang="scss" scoped>
.top-box {
  width: 100%;
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
}
.move-box {
  margin-bottom: 30px;

  .move-cover {
    position: relative;
    width: 100%;
    padding-bottom: 56%;
    border-radius: 8px;
    overflow: hidden;

    .img-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .move-btn {
      display: block;
      position: absolute;
      width: 38px;
      height: 38px;
      top: 50%;
      left: 50%;
      margin: -19px 0px 0px -19px;

      img {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .move-title {
    font-size: 16px;
    color: #1e1e1eff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 22px;
    margin-top: 8px;
  }

  .move-del {
    margin-top: 8px;

    .el-button {
      display: block;
      width: 100%;
    }
  }
}
</style>
      