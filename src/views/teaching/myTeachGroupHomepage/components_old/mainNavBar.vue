<template>
    <!-- 班级主页内容组件 -->
    <div id="mainNavBar">
      <div class="mainNavBar">
        <!-- <ul class="mnavbar">
                   <li v-for=" item in dataList">
                        {{item.text}}
                   </li>
                </ul> -->
        <div class="tabContainer">
          <div class="leftBar">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
  
            <van-tabs class="mainleftbar" :swipe-threshold='5' :ellipsis="false" v-model="selectTab" @change="changeTabs"
              :swipeable="true">
              <van-tab v-for="item in dataList" :title="item.title" :name="item.id" :key="item.id">
                  <ul>
                    <li v-for="item in contentList" class="contentList">
                      <h4 class="title">{{item.title}} <span
                          class="titleMsg">栏目{{item.column_name?'（'+item.column_name+'）':''}}</span> </h4>
                      <div class=" imgline">
                        <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                        <span class="imgMessage">{{item.name}}</span>
                        <span class="imgMessage linkFont">王府水晶</span>
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
              
  
              </van-tab>
            </van-tabs>
          </van-list>
          </div>
          <!-- <div class="rightBar">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                  <el-submenu index="2">
                    <template slot="title" style="line-height: 44px;">更多</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                  </el-submenu>
                </el-menu>
              </div> -->
        </div>
  
      </div>
    </div>
  
  </template>
  
  <script>
    // import 'vant/lib/button/style';
    import request from '@/api/request.js'
    export default {
      name: 'mainNavBar',
      props: { classId: { default: '' } },
      data() {
        return {
          selectTab: '',//选中的标签
          userInfo: {},
          list: [],
          pageSize: 5,//页尺寸
          page: 2,//页数
          psize: 10,
          loading: false,
          finished: false,
          active: 1,
          dataList: [{ text: '全部', id: 'all' }, { text: '最新', id: '1' },
          { text: '就业', id: '2' }, { text: '专业', id: '3' }, { text: '辅导', id: '4' }, { text: '辅导班', id: '5' }],
          contentList: [
            // {
            //   "id": 4,
            //   "columns": 1,
            //   "column_name": "",
            //   "name": "姓名",
            //   "avatar": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
            //   "title": "标题",
            //   "image": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
            //   "content": "",
            //   "create_time": "2019-11-29 00:00:00"
            // },
            // {
            //   "id": 5,
            //   "columns": 2,
            //   "column_name": "",
            //   "name": "12321312",
            //   "avatar": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
            //   "title": "12321312",
            //   "image": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
            //   "content": "",
            //   "create_time": "2019-11-29 00:00:00"
            // }
          ],
          activeIndex: '1',
          activeIndex2: '1'
        }
      },
      methods: {
        changeTabs(name, title) {
          var _this = this;
          console.log(name, title);
          var data = {
            page: 1,
            psize: this.psize,
            class: 1,
            column: this.selectTab
          }
          request.post('/roomapi/Room_Class/classPage', data, function (res) {
            _this.contentList = res.data.model;
          })
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        getUserInfo() {
          var userInfo = {}
          this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          console.log('user***', userInfo)
          return userInfo;
        },
        getColmn(id) {//获取栏目
          this.getUserInfo();
          let userInfoId = this.userInfo.class_id;
          var _this = this;
          var data = { cid: userInfoId, type: 1 }
          request.post('/roomapi/Room_Class/column', data, function (res) {
            _this.dataList = res.data;
            debugger
            data = {
              class: _this.userInfo.class_id,
              column:res.data[0]?res.data[0].id:0,
              page: 1
            }
            request.post('/roomapi/Room_Class/classPage', data, function (res) {//获取数据
              _this.contentList = res.data.model;
              if( _this.contentList.length==0){
              _this.onLoad("fineshed");
              }
            });
          });
        },
        onLoad(state) {
          var _this = this;
  
          if(state=="fineshed"){
              _this.loading = false;
              _this.finished = true;
              return;
          }
          var data = {
            page: this.page,
            psize: this.psize,
            class: 1,
            column: this.selectTab
          }
          request.post('/roomapi/Room_Class/classPage', data, function (res) {
            if (res.data.model.length == 0) {
              _this.loading = false;
              _this.finished = true;
              return;
            }
            _this.page = _this.page + 1;
            _this.contentList = [...res.data.model, ..._this.contentList];
            _this.loading = false;
          })
        },
        fslip(item) {
          document.getElementById('content' + item).style.display = "flex";
          document.getElementById('detail' + item).style.display = 'none';
        },
        changShow(item) {
          console.log(item)
          document.getElementById('content' + item).style.display = "none";
          document.getElementById('detail' + item).style.display = 'block';
        }
      },
      mounted: function () {
        this.getUserInfo();
  
        var data = {
          class: this.userInfo.class_id,
          column: this.selectTab,
          page: 1
        }
        var _this = this;
        this.getColmn(data.class_id);
        // request.post('/roomapi/Room_Class/classPage',data,function(res){
        //     _this.contentList=res.data.model;
        // });
      },
      wrap() {
        var clientWidth = document.body.clientWidth;
        console.log('clientWidth', clientWidth);
        var html = document.getElementsByTagName("html")[0];
        if (clientWidth > 980) {
          clientWidth = 980;
        }
        html.style.fontSize = clientWidth / 12.4 + "px";
      },
      comments: {
  
      }
  
    }
  </script>
  <style>
    .mainleftbar {
      /* padding-right:40px; */
    }
    /* .van-tabs__content{
      min-height: 200px;
    } */
    #mainNavBar .el-menu--horizontal>.el-submenu .el-submenu__title {
      line-height: 44px;
      height: 44px;
  
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
      color: #034692;
    }
  
    .van-image--round {
      vertical-align: middle;
    }
  
    .titleMsg {
      color: #666;
      font-size: 20px;
      margin-left: 30px;
    }
  
    .rightBar {
      width: 100px;
      margin-left: 40px;
      line-height: 44px;
      height: 44px;
  
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
    .contentList {
      border-bottom: #DCDCDC 1px solid;
      padding-bottom: 30px;
    }
  
    .imgline {
      padding-top: 20px;
    }
  
    .date {
      padding-top: 20px;
      font-size: 18px;
      color: #999;
    }
    .leftImage  {
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
  
    /* .tabContainer {
      display: flex;
    } */
  
    .leftBar {
      flex: 1;
    }
  
  
  
    body {
      background: #000;
    }
  </style>