<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 学校新闻动态 -->
            <News :source="source"></News>
            <!-- 通知公告 -->
            <Notice :source="source"></Notice>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="news">热度</el-menu-item>
              </el-menu>
            </el-card>
            <el-card style="margin-top: 10px;">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <el-row :gutter="10" v-show="activeIndex=='all'">
                  <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="move-box" v-for="(item,index) in moveList"
                    :key="index">
                    <div class="move-cover">
                      <div class="img-wrap">
                        <img :src="item.avatar" />
                      </div>
                      <span class="move-btn" @click="showplay(item.id)">
                        <img src="../../../assets/images/classes/play.png" />
                      </span>
                    </div>
                    <div class="move-title">
                      {{item.title}}
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="activeIndex=='news'">
                  <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="move-box" v-for="(item,index) in moveList"
                    :key="index">
                    <div class="move-cover">
                      <div class="img-wrap">
                        <img :src="item.avatar" />
                      </div>
                      <span class="move-btn" @click="showplay(item.id)">
                        <img src="../../../assets/images/classes/play.png" />
                      </span>
                    </div>
                    <div class="move-title">
                      {{item.title}}
                    </div>
                  </el-col>
                </el-row>
              </van-list>

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
  // import Notice from './components/Notice.vue'
  import Notice from '../../public/widget/Notice.vue';
  import request from '@/api/request.js';
  export default {
    name: 'specialMainHomepage',
    components: {
      PageTop,
      News,
      Notice
    },
    data() {
      return {
        loadUrl: '/roomapi/Project/projectPage',
        urlDict: { all: '/roomapi/Project/projectPage', news: '/roomapi/Project/browsePage' },
        source: {
          routename: 'specialMainHomepage',
          spacename: 'special'
        },
        loading:false,
        finished:false,
        keyword: '',//搜索关键字
        page: 1,
        psize: 20,
        routename: '',
        activeIndex: 'all',
        circleUrl: require('../../../assets/images/user.png'),
        moveList: [], // 专题列表
      }
    },
    created() {
      this.$root.eventLister.$on('seachInfo', this.seachInfo);
    },
    mounted() {
      this.routename = this.$route.name;
      this.source.routename = this.$route.name;
      console.log(this.routename, '本页面routename');
      // if (this.$route.query.activeIndex) {
      //   this.activeIndex = this.$route.query.activeIndex;
      //   this.loadUrl = this.urlDict[this.activeIndex];
      //   var self = this;
      //   var data = {
      //     keyword: this.keyword, //关键字
      //     page: self.page,
      //     psize: self.psize
      //   }
      //   request.post(self.loadUrl, data, function (res) {
      //     if (res.code == 0) {
      //       self.moveList = res.data.model;
      //     }
      //   })
      // } else {
      //   this.getSpecial();
      // }
    },
    methods: {
      onLoad(){
        var data={
          page:this.page,
          keyword:this.keyword,
          psize:10
        }
        request.post(this.loadUrl,data,(res)=>{   
          if(res.data.model.length>0){
            var moveList=res.data.model;
            let oldList=this.moveList;
            this.moveList=[...oldList,moveList];
            this.loading=false;
            this.page=this.page+1;
          }else{
            this.finished=true;
          }
        })
      },
      seachInfo(key) {
        this.keyword = key;
        this.page = 1;
        console.log(this.keyword, 'seachInfo');
        this.menuSelect(this.activeIndex);
      },
      getSpecial() {
        var data = {
          keyword: this.keyword, //关键字
          page: this.page,
          psize: this.psize
        };
        var self = this;
        request.post('/roomapi/Project/projectPage', data, function (res) {
          if (res.code == 0) {
            self.moveList = res.data.model;
          }
        })
      },
      menuSelect(activeIndex) {
        this.page=1;
        console.log('我点击了啥', activeIndex)
        this.activeIndex = activeIndex;
        this.loadUrl = this.urlDict[activeIndex];
        var self = this;
        var data = {
          keyword: this.keyword, //关键字
          page: self.page,
          psize: self.psize
        }
        request.post(self.loadUrl, data, function (res) {
          if (res.code == 0) {
            self.moveList = res.data.model;
          }
        })
      },
      chapterTreggle(index) {
        this.chapterList[index].flag = !this.chapterList[index].flag
      },
      showplay(id) { // 打开专题详情
        this.$router.push({
          name: 'showmovie',
          query: {
            fromwhere: 'specialMainHomepage',
            id: id,
            activeIndex: this.activeIndex
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .active {
    color: #034692;
    font-size: 20px;
  }

  .topBar span {
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