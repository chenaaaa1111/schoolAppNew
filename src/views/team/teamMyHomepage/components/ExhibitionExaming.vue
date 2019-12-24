<!-- 审核中 审核未通过的动态 -->
<template>
  <el-card>
    <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="backMyHome()" class="headPage">我的主页</el-breadcrumb-item>
      <el-breadcrumb-item class="currentPage">{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">{{title}}</span>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in articles" :key="index">
          <el-col :span="24" class="titleName">{{item.title}}</el-col>
          <el-col :span="24">
            <el-row class="content" :gutter="10" v-if="!item.isopen">
              <el-col :span="6">
                <img :src="item.image" alt=""/>
                <!-- <img v-if="item.image != ''" :src="setImg(item.image)" alt=""/>
                <img v-else src="../../../../assets/images/noimg.png" alt=""/> -->
              </el-col>
              <el-col :span="18">
                <div class="con-text" v-html="item.content">
                  <!-- {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}} -->
                </div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="openContent(index)">
                    阅读全文
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="content content-open" v-if="item.isopen">
              <el-col :span="24">
                <div class="con-text" v-html="item.content"></div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="closeContent(index)">
                    收起
                    <i class="el-icon-caret-top el-icon--right"></i>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="bottom">
            <el-row>
              <el-col :span="18" class="title">
                <span class="classify">(栏目: {{item.column_name}})</span>
                <span class="date">{{item.create_time}}</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini" @click="deleteArt(item.id)">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
        </el-row>
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
      upUrl: this.$props.updateUrl
    };
  },
  mounted() {},
  methods: {
    backMyHome () { //面包屑 点击回到我的主页
      var self = this;
      var tab ='main';
      self.$emit('changeTab',tab);
    },
    changeTab(tab) {
      console.log(tab);
    },
    recall(index) {
      //审核中点击撤回  跳转到编辑新闻页面 并携带信息过去 isEdit==true
      let query = {};
      query.id = id; //文章id
      query.isEdit = true;
      query.widgetName = "审核中";
      query.fromname = "我的主页";
      query.fromwhere = "teamMyHomepage";
      query.spaceModule = "classes"; //班级空间名
      this.$router.push({
        name: "write",
        query: query
      });
    },
    goToEdit(id) {
      // 审核未通过点击编辑 跳转到编辑新闻页面 并携带信息过去 isEdit==true
      let query = {};
      query.id = id; //文章id
      query.isEdit = true;
      query.widgetName = "审核未通过";
      query.fromname = "我的主页";
      query.fromwhere = "teamMyHomepage";
      query.spaceModule = "classes"; //班级空间名
      this.$router.push({
        name: "write",
        query: query
      });
      // sessionStorage.setItem('editor',JSON.stringify(item));
    },
    // 点击删除后 刷新当前列表
    deleteArt(id) {
      var vm = this;
      vm.$confirm(
        "删除后，你将不再看到该新闻的信息，是否确认删除？",
        "删除提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //删除文章
          request.post("/roomapi/Community/delete", { id: id }, res => {
            if (res.code == 0) {
              vm.$message({
                duration: 1000,
                offset: 190,
                type: "success",
                message: res.message
              });
              request.post("/roomapi/Community/audit", {}, res => {
                vm.articles = res.data.model;
              });
              // setTimeout(function(){
              //   vm.$router.push({
              //     name: vm.fromwhere
              //   })
              // },2000)
            }
          });
        })
        .catch(() => {
          vm.$message({
            duration: 1000,
            offset: 190,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setImg(src) {
      let baseSrc = ''
      if(src.indexOf('i2f2f.com') == -1) {
        baseSrc = 'http://school.i2f2f.com' + src
      } else {
        baseSrc = src
      }
      return baseSrc
    },
    openContent(index) {
      this.articles[index].isopen = true;
    },
    closeContent(index) {
      this.articles[index].isopen = false;
    }
  }
};
</script>
<style lang="scss">
.content-open {
  .con-text {
    overflow: auto;
    -webkit-line-clamp: inherit;
    img {
      display: block !important;
      width: 100%;
      margin: 10px 0px;
    }
  }
}
.content {
  .con-text {
    overflow: auto;
    -webkit-line-clamp: inherit;
    img {
      display: none;
    }
  }
}
</style>
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
    .titleName {
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      
    }
    .bottom{
      margin-top: 15px;
      .classify {
        margin-right: 30px;
        white-space: nowrap;
        font-size:10px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:14px;
      }
      .date {
        white-space: nowrap;
        font-size:9px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:13px;
      }
      
      .operation {
        text-align: right;
        .el-button {
          padding-top: 0;
          font-size: 12px;
        }
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
      img {
        display: block;
        width: 100%;
        border-radius: 8px;
      }
    }
    .content-open {
      .con-text {
        overflow: auto;
        -webkit-line-clamp: inherit;
        img {
          display: block;
          width: 100%;
        }
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
  .headPage{
   cursor: pointer!important;
  }
  .headPage:hover .el-breadcrumb__inner{
    color:#034692!important;
  }
  .currentPage .el-breadcrumb__inner{
    color:#034692!important;
  }
</style>
      