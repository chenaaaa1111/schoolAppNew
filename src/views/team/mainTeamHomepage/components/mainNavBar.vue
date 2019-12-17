<template>
  <div id="mainNavBar">
    <div class="mainNavBar">
      <div class="leftBar">
          <el-menu :default-active="tabactive" class="el-menu-demo" mode="horizontal" @select="menuSelect">
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="news">热度</el-menu-item>
          </el-menu>
          <div class="mainContainer">
             <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
             <ul>
              <li v-for="(item,index) in contentList" :key="index" class="contentList">
                <h4 class="title">{{item.title}}</h4>
                <div class="imgline">
                  <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                  <span class="imgMessage">{{item.name}}</span>
                  <span class="imgMessage linkFont">王府水晶</span>
                </div>
                <div class="imtextview" :id="'content'+item.id">
                  <div class="leftImage">
                    <img :src="item.image" alt />
                  </div>
                  <div class="rightContent">
                    <span>{{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}</span>
                    <span @click="changShow(item.id)" class="updown">查看更多</span>
                  </div>
                </div>
                <div class="deatail" style="display: none;" :id="'detail'+item.id">
                  <div v-html="item.content"></div>
                  <span @click="fslip(item.id)" class="updown">收起</span>
                </div>
                <p class="date pd_40">{{item.create_time}}</p>
              </li>
            </ul>
            </van-list>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vant/lib/button/style';
import request from "@/api/request.js";
export default {
  name: "mainNavBar",
  props: {  },
  data() {
    return {
      keyword: '',//搜索关键字
      selectTab: "", //选中的标签
      userInfo: {},
      page: 1, //页数
      psize: 3,
      loading: false,
      finished: false,
      tabactive: "all",
      contentList: [], //文章列表
      loadUrl: "/roomapi/Community/communityPage",
      urlDict: {
        all: "/roomapi/Community/communityPage",
        news: "/roomapi/Community/browsePage",
        my: "/roomapi/Community/myPage"
      },
    };
  },
  mounted() {
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
          keyword: this.keyword,
          page: this.page,
          psize: this.psize,
        };
        request.post(self.loadUrl, data, function (res) {
          if(res.code ==0){
          self.contentList = res.data.model;
          }
        })
      }else if(tab == 'news'){
        var data1 = {
          page: this.page,
          psize: this.psize,
        };
        request.post(self.loadUrl, data1, function (res) {
          if(res.code ==0){
          self.contentList = res.data.model;
          }
        })
      }
    },
    allArtList() {  //社团id（不传显示所有社团文章
      var _this = this;
      var data = {
        keyword: _this.keyword,
        page: _this.page,
        psize: _this.psize,
      };
      request.post(_this.loadUrl, data, function(res) {
        if(res.code ==0){
          _this.contentList = res.data.model;
        }
      });
    },
    onLoad() { //触底加载更多
      let baseUrl = this.tabactive == 'all'?this.urlDict.all: this.urlDict.news;
      let obj ={
        keyword: this.keyword,
        page: this.page,
        psize: this.psize,
      }
      if(this.urlDict == 'news') {
        delete obj.keyword
      }
      var self = this;
      request.post(baseUrl, obj, function (res) {
        if(res.code ==0){
          if(res.data.model.length>0){
            self.finished =false;
            self.loading = true;
            self.contentList.push(...res.data.model);
            self.page +=1;
          }else{
            self.finished = true;
            self.loading = false;
          }
        }
      })

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    fslip(item) {
      document.getElementById("content" + item).style.display = "flex";
      document.getElementById("detail" + item).style.display = "none";
    },
    changShow(item) {
      console.log(item);
      document.getElementById("content" + item).style.display = "none";
      document.getElementById("detail" + item).style.display = "block";
    }
  },
  wrap() {
    var clientWidth = document.body.clientWidth;
    console.log("clientWidth", clientWidth);
    var html = document.getElementsByTagName("html")[0];
    if (clientWidth > 980) {
      clientWidth = 980;
    }
    html.style.fontSize = clientWidth / 12.4 + "px";
  },
  comments: {}
};
</script>
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
.van-hairline--top-bottom {
  /* width: 80%; */
}

.van-tab {
  padding-left: 20px;
  /* font-size: 14px; */
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
<style scoped>
.mainContainer{
  margin-top: 5px;
  background: #fff;
}
.contentList {
  border-bottom: #dcdcdc 1px solid;
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
}

body {
  background: #000;
}
</style>