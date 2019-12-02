<template>
  <div class="myHome">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 展示个人头像 姓名 和动态统计 -->
            <UserInfo :teamId="teamId"></UserInfo>
            <!-- 最近访客 -->
            <Visitor :teamId="teamId"></Visitor>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <!-- 班级动态 -->
              <Exhibition :teamId="teamId" :key="teamId"></Exhibition>
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
  import Exhibition from './components/Exhibition.vue'
  export default{
    name: 'myHomepage',
    components: {
      PageTop,
      UserInfo,
      Visitor,
      Exhibition,
    },
    data() {
      return {
        routename: '',
        teamId: '',
        loadInfo: { // 别人的主页接收到传参
          id: '',
          name: '',
          avatar: ''
        }
      }
    },
    mounted() {
      let querys = this.$route.query
      // console.log(querys, 'teamOtherMyPage query')
      if(Object.keys(querys).length > 0) {
        this.teamId = querys.id
        this.loadInfo = querys
      }
      console.log(this.teamId)
    },
    methods: {

    }
  }
</script>
<style media="screen" lang="scss" scoped>
   .active{
      color: #034692;
    }
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
  }
  .card-block{
    padding-left: 0!important;
    padding-right: 0!important;
    margin-top: 14px;
  }
</style>
