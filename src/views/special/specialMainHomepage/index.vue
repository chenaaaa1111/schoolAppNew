<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 学校新闻动态 -->
            <News :source="source"></News>
            <!-- 班级空间-侧边栏 -->
            <!-- <ClassSpace :source="routename"></ClassSpace> -->
            <!-- 通知公告 -->
            <Notice :source="source"></Notice>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="news">最新</el-menu-item>
              </el-menu> -->
              <div class="topBar">
                <span :class="tabactive=='all'?'active':''" @click="changeTab('all')">全部</span>
                <span :class="tabactive=='new'?'active':''" @click="changeTab('new')">最新</span>
              </div>
            </el-card>
            <el-card style="margin-top: 10px;">
              <el-row :gutter="10">
                <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="move-box" v-for="(item,index) in moveList"
                  :key="index">
                  <div class="move-cover">
                    <div class="img-wrap">
                      <img :src="item.avatar" />
                    </div>
                    <span class="move-btn" @click="showplay">
                      <img src="../../../assets/images/classes/play.png" />
                    </span>
                  </div>
                  <div class="move-title">
                    {{item.title}}
                  </div>
                </el-col>

              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import PageTop from './components/PageTop.vue'
  // import News from './components/News.vue'
  import News from '../../public/widget/News.vue'
  // import ClassSpace from './components/ClassSpace.vue'
  // import Notice from './components/Notice.vue'
  import Notice from '../../public/widget/Notice.vue';
  import request from '@/api/request.js';
  export default {
    name: 'mainTeamHomepage',
    components: {
      PageTop,
      News,
      // ClassSpace,
      Notice
    },
    data() {
      return {
        loadUrl: '/roomapi/Project/projectPage',
        urlDict: { all: '/roomapi/Project/projectPage', new: '/roomapi/Project/projectPage' },
        tabactive: 'all',
        source: {
          routename: '',
          spacename: 'special'
        },
        routename: '',
        activeIndex: 'all',
        circleUrl: require('../../../assets/images/user.png'),
        moveList: [
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
          {
            title: '肖申克的救赎 The Shawshank Redemption'
          },
        ]
      }
    },
    mounted() {
      this.routename = this.$route.name
      this.source.routename = this.$route.name
      console.log(this.routename, '本页面routename');
      this.getSpecial();
    },
    methods: {
      changeTab(tab) {
        this.tabactive = tab;
        this.loadUrl = this.urlDict[tab];
        this.selectTab = tab;
        var self = this;
        var data = {
          page: 1
        }
        request.post(self.loadUrl, data, function (res) {
          self.contentList = res.data.model;
        })
      },
      getSpecial() {
        var data = {};
        var self = this;
        request.post('/roomapi/Project/projectPage', data, function (res) {
          if (res.data.model.length == 0) {
            res.data.model = [
              {
                "id": 1,
                "s_id": 1,
                "u_id": 1,
                "name": "姓名",
                "avatar": "123",
                "type": 2,
                "title": "12",
                "image": "13",
                "content": "123",
                "create_time": "0000-00-00 00:00:00"
              },
              {
                "id": 1,
                "s_id": 1,
                "u_id": 1,
                "name": "姓名",
                "avatar": "123",
                "type": 2,
                "title": "12",
                "image": "13",
                "content": "123",
                "create_time": "0000-00-00 00:00:00"
              }
            ]
          }
          self.moveList = res.data.model;
        })
      },
      menuSelect() { },
      chapterTreggle(index) {
        this.chapterList[index].flag = !this.chapterList[index].flag
      },
      showplay() { // 打开专题详情
        this.$router.push({
          name: 'showmovie',
          query: {
            fromwhere: 'specialMainHomepage'
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .active{
    color: #034692;
    font-size: 20px;
  }
    .topBar span{
      margin-right: 38px;
      font-size: 20px;
    }
  .ellipsis {
    img {
      display: none;
    }
  }

  .noEllipsis {
    img {
      width: 100%;
      display: block;
      margin: 10px 0px;
      border-radius: 8px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap {
    margin-top: 30px;

    .entry-content {
      padding: 0px 10px;

      .el-menu-demo {
        border: 0;

        .el-menu-item {
          font-size: 20px;
          font-weight: 600;
          height: 24px;
          line-height: 24px;
        }

        .is-active {
          color: #034692;
          border-bottom: 0;
        }
      }

    }

    .move-box {
      margin-bottom: 30px;

      .move-cover {
        position: relative;
        width: 100%;
        padding-bottom: 56%;
        border-radius: 8px;
        overflow: hidden;

        .img-wrap {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .move-btn {
          display: block;
          position: absolute;
          width: 38px;
          height: 38px;
          top: 50%;
          left: 50%;
          margin: -19px 0px 0px -19px;

          img {
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }

      .move-title {
        font-size: 16px;
        color: #1E1E1EFF;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 22px;
        margin-top: 8px;
      }
    }
  }
</style>
