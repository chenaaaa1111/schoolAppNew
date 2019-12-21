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
            <!-- <Visitor></Visitor> -->
            <!-- 审核中 -->
            <Examine :source="routename" @changeTab="changeTab"></Examine>
            <!-- 审核未通过 -->
            <NotPass :source="routename" @changeTab="changeTab"></NotPass>
            <!-- 消息通知 -->
            <Message :source="routename" @changeTab="changeTab"></Message>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <!-- 社团动态 -->
              <Exhibition v-show="this.tab=='main'"></Exhibition>
              <!-- 审核中 审核未通过 -->
              <EXhibitionExaming @changeTab="changeTab" :articles="examings" v-show="this.tab!='main'&&this.tab!='message'&&this.tab!='allClassDynamics'&&this.tab!='allSchoolDynamics'" :upUrl="upUrl" :title="ExhibitionTitle">
              </EXhibitionExaming>
              <!-- 消息通知列表 -->
              <MessageList @changeTab="changeTab" :messageLists="messageList"  v-show="this.tab=='message'" :title="ExhibitionTitle"></MessageList>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import PageTop from './components/PageTop.vue';
  import UserInfo from './components/UserInfo.vue';
  // import Visitor from './components/Visitor.vue';
  import Examine from './components/Examine.vue';
  import NotPass from './components/NotPass.vue';
  import Message from './components/Message.vue';
  import Exhibition from './components/Exhibition.vue';
  import MessageList from './components/MessageList.vue';
  import EXhibitionExaming from './components/ExhibitionExaming.vue';
  export default{
    name: 'teamMyHomepage',
    components: {
      PageTop,
      UserInfo,
      // Visitor,
      Examine,
      NotPass,
      Message,
      Exhibition,
      MessageList,
      EXhibitionExaming
    },
    data() {
      return {
        routename: '',
        ExhibitionTitle: '审核中',// 审核中，审核未通过标题
        upUrl: '',
        messageList: {},//消息通知列表
        classTitle: '',
        routename: '',
        tab: 'main', //右侧主页面
        examings: [] //审核中 审核未通过 全部列表数据
      }
    },
    mounted() {
      this.routename = this.$route.name;
      // let userInfo = this.$store.state.userInfo;
      // if(Object.keys(userInfo).length>0) {
      //   this.userId = userInfo.id.toString()
      // }
    },
    methods: {
      changeTab(tab) {
        console.log(tab);
        this.tab = tab;
        if (tab == 'examing') {
          request.post('/roomapi/Room_Class/audit', {}, (res) => {
            if(res.code ==0){
              if (res.data.model.length > 0) {
                this.examings = res.data.model.map(item => {
                  item.isopen = false;
                  return item;
                });
              }
            }
            this.ExhibitionTitle = "审核中";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'notPass') {
          request.post('/roomapi/Room_Class/notAudit', {}, (res) => {
            if(res.code ==0){
              if (res.data.model.length > 0) {
                this.examings = res.data.model.map(item => {
                  item.isopen = false;
                  return item;
                });
              }
            }
            this.ExhibitionTitle = "审核未通过";
            this.upUrl = "/roomapi/Room_Class/addArticle";
          })
        } else if (tab == 'message') {
          var self = this;
          var data= {
            kid: 1, //空间： 1班级空间2年级空间3社团4专题5课题6教研
            page: 1,
            psize: 50
          };
          request.post('/roomapi/Users/userMessage', data, (res) => {
            if(res.code ==0){
              if (res.data.model.length > 0) {
                self.messageList = res.data;
              }
            }
            self.ExhibitionTitle = "消息通知";
          })
        } else if (tab == 'allClassDynamics') {
          var self = this;
          var data= {
            uid: self.$store.state.userInfo.id,
            page: 1,
            psize: 20,
            level: 1
          }
          request.post('/roomapi/Room_Class/myPage',data,function(res){
            if(res.code == 0) {
              self.classTitle = "班级动态";
              if(res.data.model.length>0) {
                self.allClassDyamics=res.data.model.map(item => {
                  item.isopen = false
                  return item
                })
                console.log(self.allClassDyamics, '全部班级动态')
              }
            }
          })
        } else if (tab == 'allSchoolDynamics') {
          var self = this;
          var data= {
            uid: self.$store.state.userInfo.id,
            page: 1,
            psize: 10,
            level: 2
          }
          request.post('/roomapi/Room_Class/myPage',data,function(res){
            if(res.code == 0) {
              self.classTitle = "校园动态";
              if(res.data.model.length>0) {
                self.allClassDyamics=res.data.model.map(item => {
                  item.isopen = false
                  return item
                })
                console.log(self.allClassDyamics, '全部校园动态')
              }
            }
          })
        }
      }
    }
  }
</script>
<style>
  .con-text img{
    max-width: 100%;
  }
</style>
<style media="screen" lang="scss" scoped>
   .active{
      color: #034692;
    }
  .space-wrap{
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .card-block{
    padding-left: 0!important;
    padding-right: 0!important;
    margin-top: 14px;
  }
</style>
