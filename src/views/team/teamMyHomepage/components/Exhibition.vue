<template>
  <el-card>
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">社团动态</span>
        <el-button type="text">
          <!-- 查看全部<img class="more" src="../../../../assets/images/classes/more.png" /> -->
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in teamDymic" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">{{item.title}}</span>
                <!-- <span class="classify">{{item.c_name}}</span> -->
                <!-- <span class="date">{{item.create_time}}</span> -->
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini" @click="deleteArt(item.id)">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <!-- 关闭结构 -->
            <el-row class="content" :gutter="10" v-if="!item.open">
              <el-col :span="6">
                <img class="con-pic" :src="serverUrl+item.image" />
              </el-col>
              <el-col :span="18">
                <div class="con-text" v-html="item.content?item.content: '暂无数据'">
                  <!-- {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}} -->
                </div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="open(index)">
                    阅读全文<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <!-- 展开结构 -->
            <el-row class="content content-open" :gutter="10" v-if="item.open">
              <!-- <el-col :span="24">
                <img class="con-pic" :src="serverUrl+item.image" />
              </el-col> -->
              <el-col :span="24">
                <div class="con-text con-open" v-html="item.content?item.content:'暂无数据'"></div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="close(index)">
                    收起<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="article-date"><span class="columnName">{{item.c_name}}</span>2019/08/22 09:23</el-col>
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
        teamId: '',
        teamDymic: [],
        serverUrl: this.$store.state.serverUrl
      }
    },
    created(){
      //创建事件总线
      var eventLister=new Vue();
      this.$root.eventLister=eventLister;
    },
    mounted() {
      this.getTeamDynimal();
    },
    methods: {
      getTeamDynimal() {
        var self = this;
        var data = {
          u_id: self.$store.state.userInfo.id
        }

        request.post('/roomapi/Community/myPage', data, function (res) {

          if (res.data.model.length > 0) {
            self.teamDymic = res.data.model.map(item => {
              item.open = false
              return item
            });
            console.log(self.teamDymic, 'teamDymic')
          }

        })
      },
      deleteArt(id) {
        this._delete(id)
      },
      _delete(id) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//删除文章
          request.post('/roomapi/Community/delete', { id: id }, (res) => {
            this.$message({
              duration: 1000,
              offset: 190,
              type: 'success',
              message: '删除成功!'
            });
            this.getTeamDynimal();
            this.$root.eventLister.$emit('changeNumEvent', true);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open(index) {
        this.teamDymic[index].open = true
      },
      close(index) {
        this.teamDymic[index].open = false
      },
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
        line-height: 40px;
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
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }

        .con-open {
          line-height: 36px;

          img {
            display: block;
            border-radius: 8px;
            width: 100%;
            margin: 10px 0px;
          }
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
        .columnName{
          margin-right: 30px;
          color: #333;
        }
      }
    }
  }
</style>
