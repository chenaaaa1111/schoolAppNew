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
  props: {  },
  data() {
    return {

      keyword: '',//搜索关键字
      page: 1, //页数
      psize: 5,
      loading: false,
      finished: false,
      tabactive: "all",
      contentList: [], //文章列表
      loadUrl:'/roomapi/Teaching/TeachingPage',
      urlDict:{all:'/roomapi/Teaching/TeachingPage',news:'/roomapi/Teaching/browsePage'}
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
        var data1 = {
          category_id: this.$route.query.id, //教研组id
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
    allArtList() {  //教研组category_id（不传显示所有课题文章）
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
      let obj ={
        category_id: this.$route.query.id, //教研组id
        keyword: this.keyword,
        page: this.page,
        psize: this.psize,
      }
      if(this.urlDict == 'all') {
        delete obj.category_id
      }
      console.log(this.loadUrl,obj)
      request.post(this.loadUrl, obj, (res) => {
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
