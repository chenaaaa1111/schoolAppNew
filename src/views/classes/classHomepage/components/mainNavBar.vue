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
          <van-tabs class="mainleftbar" :swipe-threshold='5' :ellipsis="false" v-model="selectTab"
            @change="changeTabs" :swipeable="true">
            <van-tab v-for="item in dataList" :title="item.title" :name="item.id" :key="item.id">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-click="false"
                @load="onLoad">
                <el-row class="news-row" v-for="(item,index) in contentList" :key="index">
                  <el-col class="news-head" :span="24">
                    <div class="news-title">{{item.title}}</div>
                    <!-- <div class="news-column">栏目: {{item.column_name}}</div> -->
                  </el-col>
                  <el-col :span="24" class="author-info">
                    <el-avatar shape="circle" size="small" :src="item.avatar"></el-avatar> <span>{{item.name}}</span>
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
                      <!-- <el-col :span="24" class="left-img">
                        <img :src="setImg(item.image)" alt=""/>
                      </el-col> -->
                      <el-col :span="24" class="right-txt">
                        <div class="text" v-html="item.content?item.content:'暂无数据'"></div>
                        <div class="openmore">
                          <el-button type="text" size="mini" @click="closeNews(index)">收起<i class="el-icon-caret-top"></i></el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col class="news_create_time"><span class="columnName">栏目: {{item.column_name}}</span>{{item.create_time}}</el-col>
                </el-row>
              </van-list>
            </van-tab>
          </van-tabs>
        </div>
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
        selectTab: 0,//选中的标签
        userInfo: {},
        list: [],
        pageSize: 5,//页尺寸
        page: 1,//页数
        psize: 5,
        loading: false,
        finished: false,
        active: 1,
        dataList: [],
        contentList: [

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
          class: sessionStorage.getItem('class_id'),
          column: this.selectTab
        }
        request.post('/roomapi/Room_Class/classPage', data, function (res) {
          if(res.code == 0) {
            if(res.data.model.length > 0) {
              _this.contentList = (res.data.model).map(item => {
                item.isopen = false
                return item
              })
            } else {
              _this.contentList = res.data.model;
            }
          }
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
        var data = {  }
        request.post('/roomapi/Room_Class/column', data, function (res) {
          _this.dataList = res.data.model;
          data = {
            class:sessionStorage.getItem('class_id'),
            column: res.data[0] ? res.data[0].id : 0,
            page: 1
          }
          // request.post('/roomapi/Room_Class/classPage', data, function (res) {//获取数据
          //   _this.contentList = res.data.model;
          //   if (_this.contentList.length == 0) {
          //     _this.onLoad("fineshed");
          //   }
          // });
        });
      },
      onLoad(state) {
        var _this = this;

        if (state == "fineshed") {
          _this.loading = false;
          _this.finished = true;
          return;
        }
        if (this.selectTab == 'all') {
          return;
        }
        var data = {
          page: this.page,
          psize: this.psize,
          class: sessionStorage.getItem('class_id'),
          column: this.selectTab
        }
        request.post('/roomapi/Room_Class/classPage', data, function (res) {
          if (data.column == 'all') {
            return
          }
          if (res.data.model.length == 0) {
            _this.loading = false;
            _this.finished = true;
            return;
          }
          let list = res.data.model
          let listFlag = list.map(item => {
            item.isopen = false
            return item
          })
          for(var i=0;i<listFlag.length;i++) {
            _this.contentList.push(listFlag[i])
          }
          _this.page = _this.page + 1;
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
<style lang="scss">
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
  .contentList img{
    max-width: 100%;
  }
  .horizontal-row{
    .right-txt{
      img{
        border-radius: 8px;
        display: none!important;
      }
    }
  }
  .vertical-row{
    .right-txt{
      img{
        width: 100%;
        margin: 10px 0px;
        border-radius: 8px;
        display: block!important;
      }
    }
  }
</style>
<style lang="scss" scoped>
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

  .leftImage{
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
            margin: 14px 0px;
          }
        }
      }
      .news_create_time{
        font-size: 18px;
        color: #999;
        margin-top: 20px;
        .columnName{
          margin-right: 30px;
          color: #333;
        }
      }
    }
  }



  body {
    background: #000;
  }
</style>
