<template>
  <el-card >
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">社团动态</span>
        <el-button type="text">
          查看全部<img class="more" src="../../../../assets/images/classes/more.png"/>
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in teamNews" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">{{item.title}}</span>
                <!-- <span class="classify">(栏目: 影评)</span> -->
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
                <img class="con-pic" :src="item.image"/>
              </el-col>
              <el-col :span="18">
                <div class="con-text" v-html="item.content"></div>
                <div class="read-more">
                  <el-button type="text" size="mini">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" class="article-date">2019/08/22 09:23</el-col>
          <el-col :span="24" ><el-divider></el-divider></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    data() {
      return {
        teamNews: [
          {
                "id": 3,
                "s_id": 1,
                "category_id": 1,
                "c_name": "",
                "u_id": 1,
                "name": "123",
                "avatar": "http:\/\/git.i2f2f.com\\\/images\\\/icon\\\/20191111\\\/813aa473c84da8a0e698a56a91d472f3.jpg",
                "type": 2,
                "title": "添加1",
                "image": "https:\/\/www.empirise.com\/trading\/images\/error.png",
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
                "avatar": "https:\/\/www.empirise.com\/trading\/images\/error.png",
                "type": 2,
                "title": "广播福if",
                "image": "https:\/\/www.empirise.com\/trading\/images\/error.png",
                "content": "阿瓦单位",
                "create_time": "0000-00-00 00:00:00",
                "browse": 0
            },
            {
                "id": 1,
                "s_id": 1,
                "category_id": 1,
                "c_name": "",
                "u_id": 1,
                "name": "广播福if",
                "avatar": "https:\/\/www.empirise.com\/trading\/images\/error.png",
                "type": 2,
                "title": "广播福if",
                "image": "https:\/\/www.empirise.com\/trading\/images\/error.png",
                "content": "阿瓦单位",
                "create_time": "0000-00-00 00:00:00",
                "browse": 0
            }
        ]
      }
    },
    mounted() {
      this.getMyTeamNews()
    },
    methods:{
      getMyTeamNews() {
        request.post('/roomapi/Community/myPage',{},(res)=>{
          console.log(res, '社团动态')
          if(res.code == 0) {
            if(res.data.model.length > 0) {
              this.teamNews = res.data.model
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.top-block{
  .top-box{
    position: relative;
    text-align: center;
    margin-bottom: 35px;
    .top-title{
      display: inline-block;
      width: 200px;
      height: 50px;
      border: 1px solid #034692;
      border-radius: 25px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
    }
    .el-button{
      float: right;
      font-size: 12px;
      .more{
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
  .article{
    // margin-top: 25px;
    .subTitle{
      font-size: 16px;
      color: #999;
      line-height: 30px;
      .el-divider--horizontal{
        margin-top: 12px;
      }
    }
    .title{
      line-height: 40px;
      font-size: 20px;
      .text{
        font-weight: bold;
        margin-right: 30px;
      }
      .classify{
        color: #666;
        margin-right: 30px;
        white-space: nowrap;
      }
      .date{
        color: #666;
        white-space: nowrap;
      }
    }
    .operation{
      text-align: right;
      .el-button{
        padding-top: 0;
        font-size: 12px;
      }
    }
    .content{
      margin: 24px 0px 0px 0px;
      padding: 0;
      .con-pic{
        display: block;
        width: 100%;
      }
      .con-text{
        line-height: 36px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .read-more{
        text-align: right;
      }
    }
    .article-date{
      font-size: 18px;
      color: #999;
      line-height: 30px;
      margin-top: 14px;
    }
  }
}
</style>
