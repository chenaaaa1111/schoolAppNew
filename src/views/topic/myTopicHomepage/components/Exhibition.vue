<template>
  <el-card>
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">课题动态</span>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in topicDymic" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text" @click="viewDetails(item)">{{item.title}}</span>
                <span class="classify" @click="viewDetails(item)">{{item.c_name}}</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini" @click="deleteArt(item.id)">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <!-- 收起 -->
            <el-row class="content" :gutter="10" v-if="!item.isopen">
              <el-col class="content-cover" :span="6">
                 <img class="con-pic" v-if="item.image != ''" :src="setImg(item.image)" alt="" @click="viewDetails(item)"/>
                 <img v-else src="../../../../assets/images/noimg.png" alt="" @click="viewDetails(item)"/>
              </el-col>
              <el-col :span="18">
                <div class="con-text" @click="viewDetails(item)" v-html="item.content"></div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="openNews(index)">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
            <!-- 展开 -->
            <el-row class="content content-open" :gutter="10" v-if="item.isopen">
              <el-col class="content-cover" :span="24">
                 <img class="con-pic" v-if="item.image != ''" :src="setImg(item.image)" alt="" @click="viewDetails(item)"/>
                 <!-- <img v-else src="../../../../assets/images/noimg.png" alt="" @click="viewDetails(item)"/> -->
              </el-col>
              <el-col :span="24">
                <div class="con-text" @click="viewDetails(item)" v-html="item.content"></div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="closeNews(index)">收起<i class="el-icon-caret-top el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" style="font-size: 14px;margin-top: 20px;color:#666">
            <span class="date" @click="viewDetails(item)">{{item.create_time}}</span>
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
  import request from '@/api/request.js';
  import Vue from 'vue';
  export default {
    data() {
      return {
        keyword: '',//搜索关键字
        page: 1,
        psize: 5,
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        topicDymic: [],
        flag: false,
      }
    },
    created(){
      //创建事件总线
      var eventLister=new Vue();
      this.$root.eventLister=eventLister;
    },
    mounted() {
      this.getTopicDynimal();
    },
    methods: {
      getTopicDynimal() { //课题动态列表
        var self = this;
        var data = {
          u_id: self.userInfo.id,
          keyword: self.keyword,
          page: self.page,
          psize: self.psize
        }
        request.post('/roomapi/Subject/myPage', data, function (res) {
          if(res.code ==0){
            if(res.data.model.length>0) {
              self.topicDymic = (res.data.model).map(item => {
                item.isopen = false
                return item
              })
            }
            
          }
        })
      },
      deleteArt(id) {
        //课题动态 删除文章
        var vm = this;
        vm.$confirm(
          "删除后，你将不再看到该课题动态的信息，是否确认删除？",
          "删除提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //删除文章
            request.post("/roomapi/Subject/delete", { id: id }, res => {
              if (res.code == 0) {
                vm.$message({
                  duration: 1000,
                  offset: 190,
                  type: "success",
                  message: res.message
                });
                vm.getTopicDynimal();
                this.flag = true;
                vm.$root.eventLister.$emit('changeNumEvent', this.flag);
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
      viewDetails(item){//点击进入文章详情 id:文章id
        this.$router.push({
          name: 'readnews',
          query: {
            widgetName: '我的主页',
            spacename: 'topic',
            id: item.id
          }
        })
      },
      openNews(index) {
        this.topicDymic[index].isopen = true
      },
      closeNews(index) {
        this.topicDymic[index].isopen = false
      },
      setImg(src) {
        let baseSrc = ''
        if(src.indexOf('http') == -1) {
          baseSrc = 'http://school.i2f2f.com' + src
        } else {
          baseSrc = src
        }
        return baseSrc
      }
    }
  }
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

        span{
          cursor: pointer;
        }
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
        .content-cover{
          img{
            display: block;
            width: 100%;
          }
        }
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