<template>
  <div id="mainNavBar">
    <div class="mainNavBar">
      <div class="leftBar">
          <el-menu :default-active="tabactive" class="el-menu-demo" mode="horizontal" @select="menuSelect">
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="news">热度</el-menu-item>
            <el-menu-item index="myPublish">我发布的</el-menu-item>
          </el-menu>
          <div class="mainContainer">
             <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
               <ul>
                <li v-for="(item,index) in contentList" :key="index" class="contentList">
                  <h4 class="title">{{item.title}}</h4>
                  <div class="imgline">
                    <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                    <span class="imgMessage">{{item.name}}</span>
                    <span class="imgMessage linkFont">{{item.c_name}}</span>
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
import request from "@/api/request.js";
export default {
  name: "mainNavBar",
  props: { teamId:{ default: ''} },
  data() {
    return {
      keyword: '',//搜索关键字
      page: 1, //页数
      psize: 10,
      loading: false,
      finished: false,
      tabactive: "all",
      contentList: [], //文章列表
      loadUrl: "/roomapi/Community/communityPage",
      urlDict: {
        all: "/roomapi/Community/communityPage",
        news: "/roomapi/Community/browsePage",
        myPublish: '/roomapi/Community/myPage'
      },
    };
  },
  mounted() {
    this.allArtList();
    this.$root.eventLister.$on('seachInfo',this.seachInfo);
  },
  methods: {
    seachInfo(key){
      console.log(key,'key');
      this.keyword=key;
      this.page=1;
      this.menuSelect(this.tabactive);
    },
    menuSelect(tab) {
      this.page = 1;
      this.tabactive = tab;
      this.loadUrl = this.urlDict[tab];
      var self = this;
      if(tab =='all'){ //全部
        this.loadUrl= this.urlDict['all'];
        var data = {
          category_id: self.$props.teamId,
          keyword: self.keyword,
          page: self.page,
          psize: self.psize,
        };
        request.post(self.loadUrl, data, function (res) {
          if(res.code ==0){
            self.contentList = res.data.model;
          }
        })
      }else if(tab == 'news'){
        this.loadUrl= this.urlDict['news'];
        var data1 = {
          keyword: self.keyword,
          page: self.page,
          psize: self.psize,
        };
        request.post(self.loadUrl, data1, function (res) {
          if(res.code ==0){
            self.contentList = res.data.model;
          }
        })
      }else if(tab == 'myPublish'){
        this.loadUrl= this.urlDict['myPublish'];
        var data2 = {
          u_id: this.$store.state.userInfo.id,
          c_id: this.$route.query.c_id,
          keyword: this.keyword,
          page: this.page,
          psize: this.psize,
        };
        request.post(self.loadUrl, data2, function (res) {
          if(res.code ==0){
            self.contentList = res.data.model;
          }
        })
      }
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
          _this.contentList = res.data.model;
        }
      });
    },
    onLoad() { //触底加载更多
      var param = {};
      var self = this;
      if(self.tabactive =='all'){ //全部
        param = {
          category_id: self.$props.teamId,
          keyword: self.keyword,
          page: self.page,
          psize: self.psize,
        };
      }else if(self.tabactive == 'news'){
        param = {
          page: this.page,
          psize: this.psize,
        };
      }else if(self.tabactive == 'myPublish'){
        param = {
          u_id: this.$store.state.userInfo.id,
          c_id: this.$route.query.c_id,
          keyword: this.keyword,
          page: this.page,
          psize: this.psize,
        };
      }
      console.log(this.loadUrl,param,9999)
      request.post(this.loadUrl, param, (res) => {
        if(res.code ==0){
          if(res.data.model.length>0){
            this.finished =false;
            this.loading = false;
            // this.contentList = [...res.data.model, ...this.contentList];
            this.contentList.push(...res.data.model);
            this.page +=1;
          }else{
            this.finished = true;
            this.loading = false;
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
  }
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
