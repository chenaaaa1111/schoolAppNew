<template>
  <el-card>
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">社区动态</span>
        <el-button type="text">
          查看全部<img class="more" src="../../../../assets/images/classes/more.png" />
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in teamDymic" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">{{item.title}}</span>
                <span class="classify">{{item.c_name}}</span>
                <span class="date">{{item.create_time}}</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row class="content" :gutter="10">
              <el-col :span="6">
                <img class="con-pic" :src="item.avatar" />
              </el-col>
              <el-col :span="18">
                <div class="con-text">
                {{item.content}}
                </div>
                <div class="read-more">
                  <el-button type="text" size="mini">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <!-- <el-col :span="24" class="article-date">2019/08/22 09:23</el-col> -->
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
        </el-row>

        <!-- <el-row class="article">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">如何评价电影《少年的你》?</span>
                <span class="classify">(栏目: 影评)</span>
                <span class="date">2019/08/22 09:23</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row class="content" :gutter="10">
              <el-col :span="6">
                <img class="con-pic" src="../../../../assets/images/content.png"/>
              </el-col>
              <el-col :span="18">
                <div class="con-text">
                  看完电影想说的太多，况且作为专职写影评的，我也大可以从电影技法、摄影镜头、
                  演员表演来讲，可事实上现在这些我都不想谈。因为看完后我最大感受就是锥心刺
                  骨的痛。全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹，甚至观看间几次想
                  直接离全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至
                  忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,
                  全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至忘带纸
                  巾的我只能把鼻涕乱抹
                </div>
                <div class="read-more">
                  <el-button type="text" size="mini">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="article-date">2019/08/22 09:23</el-col>
          <el-col :span="24" ><el-divider></el-divider></el-col>
        </el-row>

        <el-row class="article">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">如何评价电影《少年的你》?</span>
                <span class="classify">(栏目: 影评)</span>
                <span class="date">2019/08/22 09:23</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini">删除</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row class="content" :gutter="10">
              <el-col :span="6">
                <img class="con-pic" src="../../../../assets/images/content.png"/>
              </el-col>
              <el-col :span="18">
                <div class="con-text">
                  看完电影想说的太多，况且作为专职写影评的，我也大可以从电影技法、摄影镜头、
                  演员表演来讲，可事实上现在这些我都不想谈。因为看完后我最大感受就是锥心刺
                  骨的痛。全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹，甚至观看间几次想
                  直接离全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至
                  忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,
                  全程忘记哭了几次以至忘带纸巾的我只能把鼻涕乱抹,全程忘记哭了几次以至忘带纸
                  巾的我只能把鼻涕乱抹
                </div>
                <div class="read-more">
                  <el-button type="text" size="mini">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="article-date">2019/08/22 09:23</el-col>
        </el-row> -->
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    data() {
      return {
        teamDymic:[],
      }

    },
    methods: {
      getTeamDynimal() {
        var self=this;
        var data = {
          u_id:self.$store.state.userInfo.id
        }
        
        request.post('/roomapi/Community/myPage', data, function (res) {
          if(res.data.model.length==0){
            res.data.model=[{
                "id": 3,
                "s_id": 1,
                "category_id": 1,
                "c_name": "",
                "u_id": 1,
                "name": "123",
                "avatar": "http:\/\/git.i2f2f.com\\\/images\\\/icon\\\/20191111\\\/813aa473c84da8a0e698a56a91d472f3.jpg",
                "type": 2,
                "title": "添加1",
                "image": "",
                "content": "财经栏目2",
                "create_time": "2019-11-14 17:21:59",
                "browse": 0
            },
            {
                "id": 2,
                "s_id": 1,
                "category_id": 2,
                "c_name": "",
                "u_id": 1,
                "name": "广播福if",
                "avatar": "https:www.empirise.com/trading/images/error.png",
                "type": 2,
                "title": "广播福if",
                "image": "https:www.empirise.com/trading/images/error.png",
                "content": "阿瓦单位",
                "create_time": "0000-00-00 00:00:00",
                "browse": 0
            }];
          }
          self.teamDymic=res.data.model;
        })
      }
    },
    mounted: function () {
      this.getTeamDynimal();
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