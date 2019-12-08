<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 个人信息 -->
            <UserInfo :source="routename" :dymic="usertotal"></UserInfo>
            <!-- 最近访客 -->
            <Visitor :source="routename"></Visitor>
            <!-- 通知公告 -->
            <!-- <Notice :source="routename"></Notice> -->
            <!-- 审核中 -->
            <Examine :source="routename" @changeTab="changeTab"></Examine>
            <!-- 审核未通过 -->
            <NotPass :source="routename" @changeTab="changeTab"></NotPass>
            <!-- 消息通知 -->
            <Message :source="routename" @changeTab="changeTab"></Message>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <!-- <el-card> -->
            <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="news">最新</el-menu-item>
              </el-menu> -->
            <!-- <div class="topBar">
                  <span :class="tabactive=='all'?'active':''" @click="changeTab('all')">全部</span>
                  <span :class="tabactive=='new'?'active':''" @click="changeTab('new')">最新</span>
                </div> -->
            <!-- </el-card> -->
            <el-card style="margin-top: 10px;">
              <el-row :gutter="10">
                <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="move-box" v-for="(item,index) in specialList"
                  :key="index">
                  <div class="move-cover">
                    <div class="img-wrap">
                      <img :src="item.image" />
                    </div>
                    <span class="move-btn" @click="showplay">
                      <img src="../../../assets/images/classes/play.png" />
                    </span>
                  </div>
                  <div class="move-title">
                    {{item.title}}
                  </div>
                  <div class="move-del">
                    <el-button plan size="small" @click="fdelete(item.id)">删除</el-button>
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
  import UserInfo from './components/UserInfo.vue'
  import Visitor from './components/Visitor.vue'

  import NotPass from './components/NotPass.vue'
  import Message from './components/Message.vue'
  import Examine from './components/Examine.vue'
  // import Notice from './components/Notice.vue';
  import request from '@/api/request.js';
  export default {
    name: 'mainTeamHomepage',
    components: {
      PageTop,
      UserInfo,
      Visitor,
      NotPass,
      Message,
      Examine      // Notice
    },
    data() {
      return {
        usertotal: '',//专题动态数
        loadUrl: '/roomapi/Project/projectPage',
        urlDict: { 2: '/roomapi/Project/auditPage', 3: '/roomapi/Project/notPage' },//2审核中，3 未通过
        tabactive: 'all',
        routename: '',
        activeIndex: 'all',
        circleUrl: require('../../../assets/images/user.png'),
        moveList: this.$store.state.moveList,
        specialList: []

      }
    },
    created() {
      this.getMoves();
    },
    mounted() {
      this.routename = this.$route.name
      console.log(this.routename, '本页面routename');
      this.getMoves();
    },
    methods: {
      fdelete(id) {
        this.fopencinfirm(id);
      },
      fopencinfirm(id) {
        this.$confirm('此删除不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/roomapi/Project/delete', {id:id}, (res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.get
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changeTab(tab) {
        console.log(tab);
        this.tab = tab;
        if (tab == 'examing') {
          request.post('/roomapi/Project/auditPage', {}, (res) => {
            this.specialList = res.data.model;
            this.ExhibitionTitle = "审核中";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'notPass') {
          request.post('/roomapi/Project/notPage', {}, (res) => {
            this.specialList = res.data.model;
            this.ExhibitionTitle = "审核未通过";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'message') {
          request.post('/roomapi/Project/notPage', {}, (res) => {
            this.specialList = res.data.model;

          })
        }
      },
      getMoves() {
        var data = {};
        var self = this;
        request.post('/roomapi/Project/projectPage', data, function (res) {
          self.specialList = res.data.model;
          self.$store.commit('setTeamDynamic', res.data.total)
          // self.$store.commit('setMoveList', res.data.model)
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
            fromwhere: 'mySpecialHomepage'
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

      .move-del {
        margin-top: 8px;

        .el-button {
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>