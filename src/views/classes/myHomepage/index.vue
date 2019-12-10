<template>
  <div class="myHome">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 展示个人头像 姓名 和动态统计 -->
            <UserInfo></UserInfo>
            <!-- 最近访客 -->
            <Visitor></Visitor>
            <!-- 审核中 -->
            <Examine :source="routename" @changeTab="changeTab"></Examine>
            <!-- 审核未通过 -->
            <NotPass :source="routename" @changeTab="changeTab"></NotPass>
            <!-- 消息通知 -->
            <Message :source="routename" @changeTab="changeTab"></Message>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card v-show="this.tab=='main'">
              <!-- 班级动态 -->
              <Exhibition></Exhibition>
              <el-col :span="24" class="card-block">
                <el-row :gutter="10">
                  <el-col :span="24" class="actblock">
                    <!-- 校园动态 -->
                    <General></General>
                  </el-col>
                </el-row>
              </el-col>
            </el-card>
            
            <EXhibitionExaming :articles="examings" v-show="this.tab!='main'&&this.tab!='message'" :upUrl="upUrl" :title="ExhibitionTitle">
            </EXhibitionExaming>
            
            <MessageList :messageList="messageLists"   v-show="this.tab=='message'"></MessageList>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MessageList from './components/MessageList.vue';
  import request from '@/api/request.js';
  import PageTop from './components/PageTop.vue'
  import UserInfo from './components/UserInfo.vue'
  import Visitor from './components/Visitor.vue'
  import Examine from './components/Examine.vue'
  import NotPass from './components/NotPass.vue'
  import Message from './components/Message.vue'
  import Exhibition from './components/Exhibition.vue'
  import General from './components/General.vue'
  import EXhibitionExaming from './components/ExhibitionExaming.vue';
  export default {
    name: 'myHomepage',
    components: {
      PageTop,
      UserInfo,
      Visitor,
      Examine,
      NotPass,
      Message,
      Exhibition,
      General,
      EXhibitionExaming,
      MessageList


    },
    data() {
      return {
        ExhibitionTitle: '审核中',// 审核中，审核未通过标题
      upUrl: '',
      messageLists:[],//消息
      userMassages:[],
        routename: '',
        tab: 'main',
        examings: []
      }
    },
    mounted() {
      this.routename = this.$route.name
      console.log(this.routename, '本页面routename')
    },
    methods: {
      changeTab(tab) {
        console.log(tab);
        this.tab = tab;
        if (tab == 'examing') {
          request.post('/roomapi/Room_Class/audit', {}, (res) => {
            this.examings = res.data.model;
            this.ExhibitionTitle = "审核中";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'notPass') {
          request.post('/roomapi/Room_Class/notAudit', {}, (res) => {
            this.examings = res.data.model;
            this.ExhibitionTitle = "审核未通过";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'message') {
          request.post('/roomapi/Users/userMessage', {}, (res) => {
            this.messageLists = res.data.model;
            
          })
        }

      }
    }
  }
</script>
<style media="screen" lang="scss" scoped>
  .space-wrap {
    margin-top: 30px;

    .entry-content {
      padding: 0px 10px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap {
    margin-top: 30px;
  }

  .card-block {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-top: 14px;
  }
</style>