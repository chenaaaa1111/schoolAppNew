<template>
  <!-- 班级主页内容组件 -->
  <div id="mainNavBar">
    <div class="mainNavBar">
      <div class="leftBar">
        <el-card class="card_head">
          <el-menu :default-active="tabactive" class="el-menu-demo" mode="horizontal" @select="menuSelect">
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="news">热度</el-menu-item>
          </el-menu>
        </el-card>
        <el-card class="mainContainer">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul v-if="false">
              <li v-for="(item,index) in contentList" class="contentList" :key="index">
                <h4 class="title">{{item.title}} <span
                    class="titleMsg">栏目{{item.column_name?'（'+item.column_name+'）':''}}</span> </h4>
                <div class=" imgline">
                  <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                  <span class="imgMessage">{{item.name}}</span>
                  <span class="imgMessage linkFont">{{item.c_name}}</span>
                </div>
                <div class="imtextview" :id="'content'+item.id">
                  <div class="leftImage">
                    <img :src="item.image" alt="">
                  </div>
                  <div class="rightContent">
                    <span>
                      {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}
                    </span>
                    <span @click="changShow(item.id)" class="updown">
                      查看更多
                    </span>
                  </div>
                </div>
                <div class="deatail" style="display: none;" :id="'detail'+item.id">
                  <div v-html="item.content"></div>
                  <span @click="fslip(item.id)" class="updown">
                    收起
                  </span>
                </div>
                <p class="date pd_40">{{item.create_time}}</p>
              </li>
            </ul>

            <el-row class="news-row" v-for="(item,index) in contentList" :key="index">
              <el-col class="news-head" :span="24">
                <div class="news-title">{{item.title}}</div>
              </el-col>
              <el-col :span="24" class="author-info">
                <el-avatar shape="circle" size="small" :src="item.avatar"></el-avatar> 
                <span>{{item.name}}</span>
                <span class="teamName">{{item.c_name}}</span>
              </el-col>
              <el-col class="news-content">
                <el-row :gutter="14" class="horizontal-row" v-if="item.isopen == false">
                  <el-col :xl="8" :lg="8" :md="8" :sm="10" :xs="10" class="left-img">
                    <img v-if="item.image != ''" :src="setImg(item.image)" alt=""/>
                    <img v-else src="../../../../assets/images/noimg.png" alt=""/>
                  </el-col>
                  <el-col :xl="16" :lg="16" :md="16" :sm="14" :xs="14" class="right-txt">
                    <div class="text" v-html="item.content"></div>
                    <div class="openmore">
                      <el-button type="text" size="mini" @click="openNews(index)">阅读更多<i class="el-icon-caret-bottom"></i></el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="14" class="vertical-row" v-if="item.isopen == true">
                  <el-col :span="24" class="left-img">
                    <img :src="setImg(item.image)" alt=""/>
                  </el-col>
                  <el-col :span="24" class="right-txt">
                    <div class="text" v-html="item.content"></div>
                    <div class="openmore">
                      <el-button type="text" size="mini" @click="closeNews(index)">收起<i class="el-icon-caret-top"></i></el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col class="news_create_time">{{item.create_time}}</el-col>
            </el-row>

          </van-list>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '@/api/request.js'
  export default {
    name: 'mainNavBar',
    props: { teamId: { default: '' } },
    data() {
      return {
        keyword: '', //搜索关键字
        userInfo: {},//用户信息
        page: 1,//页数
        psize: 5,
        loading: false,
        finished: false,
        active: 1,
        tabactive: 'all',
        contentList: [], //文章列表
        loadUrl: '/roomapi/Community/communityPage',
        urlDict: {
          all: "/roomapi/Community/communityPage",
          news: "/roomapi/Community/browsePage"
        }
      }
    },
    mounted() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      console.log(this.$props.teamId, 'propsId');
      this.allArtList();
    },
    methods: {
      menuSelect(tab) {
        this.page = 1;
        this.tabactive = tab;
        this.loadUrl = this.urlDict[tab];
        var self = this;
        if(tab =='all'){ //全部
          var data = {
            category_id: self.$props.teamId,
            keyword: self.keyword,
            page: self.page,
            psize: self.psize,
          };
          request.post(self.loadUrl, data, function (res) {
            if(res.code ==0){
              if(res.data.model.length>0) {
                self.contentList = (res.data.model).map(item => {
                  item.isopen = false
                  return item
                });
              }
            }
          })
        }else if(tab == 'news'){
          var data1 = {
            page: this.page,
            psize: this.psize,
          };
          request.post(self.loadUrl, data1, function (res) {
            if(res.code ==0){
              if(res.data.model.length>0) {
                self.contentList = (res.data.model).map(item => {
                  item.isopen = false
                  return item
                });
              }
            
            }
          })
        }
      },
      onLoad() { //触底加载更多
        let baseUrl = this.tabactive == 'all'?this.urlDict.all: this.urlDict.news;
        let obj ={
          category_id: this.$props.teamId,
          keyword: this.keyword,
          page: this.page,
          psize: this.psize,
        }
        if(this.urlDict == 'news') {
          delete obj.category_id
          delete obj.keyword
        }
        console.log(this.loadUrl,obj,9999)
        request.post(this.loadUrl, obj, (res) => {
          if(res.code ==0){
            if(res.data.model.length>0){
              this.finished =false;
              this.loading = false;
              let list = (res.data.model).map(item => {
                item.isopen = false
                return item
              })
              for(var i=0;i<list.length;i++) {
                 this.contentList.push(list[i]);
              }
             
              this.page +=1;
            }else{
              this.finished = true;
              this.loading = false;
            }
          }
        })
      },
      allArtList() {  //社团id（不传显示所有社团文章
        var _this = this;
        var data = {
          category_id: _this.$props.teamId,
          keyword: _this.keyword,
          page: _this.page,
          psize: _this.psize,
        };
        request.post(_this.loadUrl, data, function(res) {
          if(res.code ==0){
            if(res.data.model.lengt > 0) {
              _this.contentList = (res.data.model).map(item => {
                item.isopen = false
                return item
              })
            }
            
          }
        });
      },
      fslip(item) {
        document.getElementById('content' + item).style.display = "flex";
        document.getElementById('detail' + item).style.display = 'none';
      },
      changShow(item) {
        console.log(item)
        document.getElementById('content' + item).style.display = "none";
        document.getElementById('detail' + item).style.display = 'block';
      },
      openNews(index) {
        console.log('open list')
        this.contentList[index].isopen = true
        console.log(this.contentList[index])
      },
      closeNews(index) {
        console.log('close list')
        this.contentList[index].isopen = false
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
<style lang="scss">
  .horizontal-row{
    .right-txt{
      img{
        display: none!important;
      }
    }
  }
  .card_head{
    margin-bottom: 14px;
    .el-card__body{
      padding: 0;
    }
  }
</style>
<style scoped>
.van-list {
  background: #fff;
}
.topBar span {
  cursor: pointer;
  margin-right: 38px;
}
.topBar {
  height: 76px;
  line-height: 76px;
  margin-bottom: 10px;
  background: #fff;
  font-size: 20px;
  padding-left: 40px;
}

.van-tabs__content {
  min-height: 200px;
}

#mainNavBar .el-menu--horizontal > .el-submenu .el-submenu__title {
  line-height: 44px;
  height: 44px;
}

.mainNavBar .el-menu--horizontal>.el-menu-item.is-active{
  color: #034692;
  border-bottom: 0;
}
.leftBar .el-menu-demo{
  padding-left: 10px;
}

.van-tab {
  padding-left: 20px;
}

.van-tabs__nav--line {
  font-size: 20px;
}

.imtextview {
  display: flex;
  padding-top: 20px;
  font-size: 18px;
}

.linkFont {
  margin-left: 8px;
  cursor: pointer;
  color: #034692;
}

.van-image--round {
  vertical-align: middle;
}

.deatail {
  display: flex;
  padding-top: 30px;
  font-size: 18px;
}

.content {
  display: flex;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-size: 18px;
}
</style>
<style lang="scss" scoped>
  .mainContainer{
    margin-top: 5px;
    background: #fff;
  }
  .contentList {
    border-bottom: #DCDCDC 1px solid;
    padding-bottom: 30px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .imgline {
    padding-top: 20px;
  }

  .date {
    padding-top: 20px;
    font-size: 18px;
    color: #999;
  }

  .leftImage {
    width: 240px;
    height: 136px;
  }

  .leftImage img {
    width: 240px;
    height: 136px;
  }

  .imgMessage {
    font-size: 18px;
  }

  .title {
    /* padding-left: 40px; */
    font-size: 24px;
    font-weight: 900;
    padding-top: 30px;
  }

  .updown {
    color: #034692;
  }

  .rightContent {
    margin-left: 30px;
  }
  .leftBar {
    flex: 1;
    .news-row{
      .news-head{
        display: flex;
        align-items: center;
        margin-top: 30px;
        .news-title{
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 24px;
          font-weight: 600;
        }
        .news-column{
          font-size: 20px;
          color: #666;
          width: 180px;
          padding-left: 20px;
        }
      }
      .author-info{
        margin-top: 20px;
        display: flex;
        align-items: center;
        .el-avatar{
          display: inline-block;
          margin-right: 8px;
        }
        span{
          font-size: 18px;
          color: #034692;
        }
        .teamName{
          cursor: pointer;
          margin-left: 26px;
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(3,70,146,1);
          line-height:25px;
        }
      }
      .news-content{
        margin-top: 20px;
        .left-img{
          img{
            display: block;
            width: 100%;
            border-radius: 8px;
          }
        }
        .right-txt{
          .text{
            line-height: 30px;
            font-size: 18px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
          }
          .openmore{
            text-align: right;
          }
        }
        .horizontal-row{
          .right-txt{
            img{
              display: none!important;
            }
          }
        }
        .vertical-row{
          img{
            display: block;
            width: 100%;
            margin: 14px 0px;
          }
        }
      }
      .news_create_time{
        font-size: 18px;
        color: #999;
        margin-top: 20px;
      }
    }
  }

  body {
    background: #000;
  }
</style>