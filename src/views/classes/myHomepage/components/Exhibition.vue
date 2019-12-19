<template>
  <el-card>
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">班级动态</span>
        <el-button type="text" @click="viewAll">
          查看全部
          <img class="more" src="../../../../assets/images/classes/more.png" />
        </el-button>
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
import Vue from "vue";
export default {
  props: {},
  data: function() {
    return {
      flag: "", //删除操作的标识
      articles: [],
      serverUrl: this.$store.state.serverUrl
    };
  },
  mounted() {
    this.getGenaras();
    console.log(this.$store.state.serverUrl, "baseurl是");
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
    },
    viewAll() {
      //查看全部
      var tab = "allClassDynamics";
      this.$emit("changeTab", tab);
    },
    deleteArt(id) {
      //班级动态 删除文章
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
          request.post("/roomapi/Room_Class/delete", { id: id }, res => {
            if (res.code == 0) {
              vm.$message({
                duration: 1000,
                offset: 190,
                type: "success",
                message: res.message
              });
              vm.getGenaras();
              vm.flag = 1;
              vm.$root.eventLister.$emit("changeNumEvent", vm.flag);
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
    getGenaras: function() {
      console.log(this.$store.state);
      var self = this;
      var data = {
        uid: this.$store.state.userInfo.id,
        page: 1,
        psize: 10,
        level: 1
      };
      request.post("/roomapi/Room_Class/myPage", data, function(res) {
        self.$store.commit("setClassDynamic", res.data.total);
        if (res.code == 0) {
          if (res.data.model.length > 0) {
            self.articles = res.data.model.map(item => {
              if (item.image) {
                item.image = self.serverUrl + item.image;
              }
              item.isopen = false;
              return item;
            });
            console.log(self.articles, "9999");
          }
        }
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
