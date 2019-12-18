<template>
  <!-- 班级主页内容组件 -->
  <div id="mainNavBar">
    <div class="mainNavBar">
      <div class="tabContainer">
        <div class="leftBar">
            <van-tabs class="mainleftbar" swipeable  :swipe-threshold='5' :ellipsis="false"
              v-model="selectTab" @change="changeTabs" >

              <van-tab v-for="item in dataList" :title="item.title" :name="item.id" :key="item.id">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-click="false"
                  @load="onLoad">
                  <el-row class="news-row" v-for="(item,index) in contentList" :key="index">
                    <el-col class="news-head" :span="24">
                      <div class="news-title">{{item.title}}</div>
                      <div class="news-column">栏目: {{item.column_name}}</div>
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

                <ul v-if="false">
                  <li v-for="(item,index) in contentList" class="contentList" :key="index">
                    <h4 class="title">{{item.title}}
                      <span class="titleMsg">栏目{{item.column_name?'（'+item.column_name+'）':''}}</span>
                    </h4>
                    <div class=" imgline">
                      <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                      <span class="imgMessage">{{item.name}}</span>
                      <span class="imgMessage linkFont">王府水晶</span>
                    </div>
                    <div class="imtextview" :id="'content'+item.id">
                      <div class="leftImage">
                        <img :src="'http://school.i2f2f.com'+item.image" alt="">
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

        </div>
   
      </div>

    </div>
  </div>

</template>

<script>
  import request from '@/api/request.js'
  export default {
    name: 'mainNavBar',
    props: { classId: { default: '' } },
    data() {
      return {
        srarchWord: '', //搜索关键字
        selectTab: 0,//选中的标签 栏目列表索引值  初始导航下标
        userInfo: {},
        list: [],
        pageSize: 5,//页尺寸
        page: 1,//页数
        psize: 10,
        loading: false, //加载状态
        finished: false, //加载是否完成
        active: 1,
        dataList: [], //导航栏目 数组
        keyword: '',
        contentList: [

        ],
        activeIndex: '1',
      }
    },
    methods: {
      changeTabs(name, title) {
        var _this = this;
        console.log(name, title);
        this.$store.commit('setColumnId', name);
        this.$store.commit('setColumnName', title);
        var data = {
          page: 1,
          keyword: this.keyword,
          psize: this.psize,
          column: this.selectTab
        }
        request.post('/roomapi/Room_Class/schoolPage', data, function (res) {
          _this.contentList = res.data.model.map(item => {
            item.isopen = false
            return item
          });
          console.log(_this.contentList, '????')
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
        // debugger
        this.getUserInfo();
        // let userInfoId = this.userInfo.class_id;
        var self = this;
        var data = {}
        request.post('/roomapi/Room_Class/column', data, function (res) {
          if (res.code == '0') {
            if(res.data.model.length > 0) {
              self.dataList = res.data.model
              self.dataList.unshift({ id: 0, title: '全部' });
              var columnId = res.data.model[0] ? res.data.model[0].id : '';
              var columnName = res.data.model[0] ? res.data.model[0].title : '';
              self.$store.commit('setColumnId', columnId);
              self.$store.commit('setColumnName', columnName);
            }
            console.log(columnId, columnName, 'fist*************************,***********')
            // self.$store.commit()
            data = {
              column: res.data.model[0] ? res.data.model[0].id : 0,
              keyword: self.keyword,
              page: 1
            }
          }

          // request.post('/roomapi/Room_Class/schoolPage', data, function (res) {//获取数据
          //   self.contentList = res.data.model;
          // });
        });
      },
      onLoad(state) {

        let _this = this
        if (state == "fineshed") {
          _this.loading = false;
          _this.finished = true;
          return;
        }
        let data = {
          page: this.page,
          psize: this.psize,
          keyword: this.keyword?this.keyword:'',
          column: this.selectTab
        }
        request.post('/roomapi/Room_Class/schoolPage', data, function (res) {
          console.log(res, '获取列表')
          if(res.code == 0) {

            if(res.data.model.length>0) {
              let list = res.data.model
              let flagList = list.map(item => {
                item.isopen = false
                return item;
              })
              for(var i=0;i<flagList.length;i++) {
                _this.contentList.push(flagList[i])
              }
              console.log(_this.contentList, '????????????')
              _this.page+=1
              _this.loading = false;
            } else {
              _this.finished = true
              _this.loading = false
              return
            }
          }
        })
      },
      onLoad1(state) {
        console.log('列表即将滚动到底部时，会触发事件并加载更多列表项', state)
        var _this = this;

        if (state == "fineshed") {
          _this.loading = false;
          _this.finished = true;
          return;
        }
        var data = {
          page: this.page,
          psize: this.psize,
          keyword: '',
          column: this.selectTab
        }
        if (this.keyword) {
          data = {
            page: this.page,
            psize: this.psize,
            keyword: this.keyword,
            column: 0
          }
        }
        console.log('加载更多的时候调用的参数是', data)
        request.post('/roomapi/Room_Class/schoolPage', data, function (res) {
          _this.contentList = _this.contentList.concat(res.data.model);
          console.log('contentList',_this.contentList);
          if (res.data.model.length == 0) {
            _this.loading = false;
            _this.finished = true;
            return;
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
      seachInfo(key) {
        var self = this;
        console.log('搜索key' + key);
        this.keyword = key;
        this.page = 1;
        var data = {
          keyword: key,
          column: 0,
          page: this.page,
          psize: this.psize
        }
        request.post('/roomapi/Room_Class/schoolPage', data, function (res) {//获取数据
          if(res.code == 0) {
            if(res.data.model.length > 0) {
              self.contentList = res.data.model.map(item => {
                item.isopen = false
                return item
              })
            }
          }

        });
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
        if(src.indexOf('i2f2f.com') == -1) {
          baseSrc = 'http://school.i2f2f.com' + src
        } else {
          baseSrc = src
        }
        return baseSrc
      }
    },
    created: function () {
      this.$root.eventLister.$on('seachInfo', this.seachInfo)
    },
    mounted: function () {
      this.getUserInfo();
      var data = {
        class: this.userInfo.class_id,
        column: this.selectTab,
        page: 1
      }
      var _this = this;
      this.getColmn(data.class);
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
    }
  }
</script>
<style lang="scss">
  .mainleftbar {
    /* padding-right:40px; */
  }

  .van-tabs__content {
    min-height: 200px;
  }

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
  .horizontal-row{
    .right-txt{
      img{
        display: none!important;
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
    padding-top: 30px;
  }

  .title {
    font-size: 24px;
    font-weight: 900;
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
      }
    }
  }



  body {
    background: #000;
  }
</style>
