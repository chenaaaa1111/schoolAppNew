<template>
  <div class="space">
    <!-- 导航 -->
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal" router>
            <li class="homeEntry" @click="goHome">
              <img src="../../../assets/main/grade.png" />年级空间
            </li>
            <!-- <el-menu-item index="gradeHomepage">校园主页</el-menu-item> -->
            <li class="el-menu-item menu-search hidden-sm-and-down">
                <el-input type="text" suffix-icon="el-icon-search" placeholder="搜索相关内容"></el-input>
            </li>
            <li class="nav-user">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                      <el-avatar shape="circle" :size="48" :fit="fit" :src="userInfo.avatar"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </li>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="pageTop" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
        <el-row>
          <el-col :span="24" class="backStyle">
            <el-page-header @back="goBack" title="返回"></el-page-header>
          </el-col>
          <el-col :span="12" class="top-title">
            <img src="../../../assets/images/classes/class_else.png" alt=""/>{{gradeInfo.gradeName}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="myClasses">
      <!-- <PageTop></PageTop> -->
      <el-row type="flex" justify="center" class="space-wrap">
        <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
          <el-card>
            <div id="mainNavBar">
              <div class="mainNavBar">
                <div class="tabContainer">
                  <div class="leftBar">

                    <van-tabs class="mainleftbar" :swipe-threshold='5' :ellipsis="false" v-model="selectTab" @change="changeTabs"
                      :swipeable="true">
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
                                  <img v-else src="../../../assets/images/noimg.png" alt=""/>
                                </el-col>
                                <el-col :xl="16" :lg="16" :md="16" :sm="14" :xs="14" class="right-txt">
                                  <div class="text" v-html="item.content?item.content: '暂无数据'"></div>
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
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import request from '@/api/request.js'
  import PageTop from './components/PageTop.vue'
  import mainNavBar from './components/mainNavBar.vue'
  export default{
    name: 'otherGradeHomepage',
    components: {
      PageTop,
      mainNavBar
    },
    data() {
      return {
        routename: '',
        gradeInfo: {
          gradeName: '',
          gradeId: ''
        },
        userInfo: {
          avatar: '',
          name: ''
        },//用户信息
        fit: 'cover',
        source: {
          routename: '',
          spacename: 'grade'
        },
        routename: '',
        selectTab: 0,
        dataList: [],
        contentList: [],
        page: 1,
        psize: 10,
        loading: false,
        finished: false,
      }
    },
    // mounted() {
    //   console.log('其他年级接收传参')
    //   this.userInfo = this.$store.state.userInfo
    //   console.log(this.userInfo, 'userInfo')
    //
    //   // this.routename = this.$route.name;
    //   // this.source.routename = this.$route.name;
    //   // console.log(this.routename, '本页面routename')
    // },
    mounted() {
      this.getUserInfo();

      var data = {
        class: this.userInfo.class_id,
        column: this.selectTab,
        page: 1
      }
      this.getColmn(data.class_id);
    },
    methods:{
      goHome() {
        this.$router.push({ // 回到空间选择页面
          name: 'home'
        })
      },
      goBack() {
        this.$router.push({
          name: 'grade'
        })
      },
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
          if(res.code == 0) {
            _this.contentList = (res.data.model).map(item => {
              item.isopen = false
              return item
            });
          }

        })
      },
      getUserInfo() {
        var userInfo = {}
        this.userInfo = this.$store.state.userInfo;
        let query = this.$route.query
        console.log(this.$route.query, 'xxxxxxxx')
        if(Object.keys(query).length > 0) {
          this.gradeInfo = query
        }
        return userInfo;
      },
      getColmn(id) {//获取栏目
        let userInfoId = this.userInfo.grade_id;
        var _this = this;
        var data = { cid: userInfoId, type: 2 }
        request.post('/roomapi/Room_Class/column', data, function (res) {
          if(res.code == 0) {
             _this.dataList = res.data.model;
              data = {
                grade: _this.gradeInfo.grade_id,
                column:res.data[0]?res.data[0].id:0,
                page: 1
              }
          }

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
          grade: this.gradeInfo.gradeId,
          column: this.selectTab
        }
        request.post('/roomapi/Room_Grade/gradePage', data, function (res) {
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
          console.log(_this.contentList, '??????????????')
          _this.page = _this.page + 1;
          _this.loading = false;
        })
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
    }
  }
</script>
<style lang="scss" scoped>
  .space{
    height: 100%;
    overflow: auto;
    background: url('../../../assets/images/classes/classesbg.png') no-repeat;
    background-size: cover;
  }
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    padding: 0px 10px;
    .homeEntry{
      height: 100px;
      display: flex;
      align-items: center;
      margin-right: 35px;
      font-size: 26px;
      color: #E8A33D;
      img{

        display: inline-block;
        width: 56px;
        height: 56px;
        vertical-align: middle;
        margin: 0px 10px;
      }
      span{
        cursor: pointer;
      }
    }
    .searchContent{
      height: 100px;
      display: flex;
      align-items: center;
    }
    .nav-user{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 10px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
<!-- 导航 -->
<style lang="scss" scoped>
  .space{
    height: 100%;
    overflow: auto;
    background: url('../../../assets/images/classes/classesbg.png') no-repeat;
    background-size: cover;
  }
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    .nav-col{
      padding: 0px 10px;
      .el-menu-head{
        .homeEntry{
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;
          color: #E8A33D;
          img{
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }
        .el-menu-item{
          font-size: 22px;
          color: #5B728C;
          padding: 0px;
          margin-right: 35px;
          height: 100px;
          line-height: 106px;
        }
        .is-active{
          border-bottom: 0;
          color: #333;
        }
        .is-active::after{
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background: #409EFF;
          position: absolute;
          bottom: 6px;
          border-radius: 2px;;
        }
        .nav-user{
          float: right;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }


    }
  }
</style>
<style lang="scss">
  .mainleftbar {
    /* padding-right:40px; */
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
  .left-img{
    img{
      display: block;
      width: 100%;
      border-radius: 8px;
    }
  }
  .horizontal-row{
    .right-txt{
      .text{
        max-height: 110px;
      }
      img{
        display: none!important;
      }
    }
  }
  .vertical-row{
    .right-txt{
      .text{
        max-height: auto;
      }
      img{
        display: block;
        width: 100%;
        border-radius: 8px;
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
</style>
<style lang="scss" scoped>
  .pageTop{
    .pageContent{
      padding-left: 20px;
      margin-top: 48px;
      .top-title{
        margin: 20px 0;
        height:56px;
        font-size:40px;
        font-family:STYuanti-SC-Bold,STYuanti-SC;
        font-weight:bold;
        color:rgba(3,70,146,1);
        line-height:56px;
        letter-spacing:10px;
        text-shadow:0px 3px 3px rgba(0,0,0,0.07);
        -webkit-text-stroke:2px rgba(255,255,255,1);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        img{
          display: inline-block;
          width: 74px;
          height: 74px;
          vertical-align: middle;
          margin-right: 30px;
        }
      }
      .top-write{
        height: 56px;
        line-height: 56px;
        text-align: right;
        padding-right: 10px;
        span{
          display: inline-block;
          width: 152px;
          height: 52px;
          // background: url('../../../../assets/images/myhome/writenews.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .leftentry{
        text-align: right;
        margin-top: 20px;
        padding: 0px 10px;
        .entrybtns{
          .btnicon{
            width: 45px;
            height: 45px;
          }
          .el-button.is-circle{
            padding: 0px;
          }
        }
      }
      .department{
        padding-left: 10px;
        font-size: 24px;
        line-height: 46px;
      }
    }
  }
</style>
