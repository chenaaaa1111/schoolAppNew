<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="12" class="top-title">
          <img v-if="loadData.url" :src="loadData.url" alt=""/>{{loadData.title}}
        </el-col>
        <el-col v-if="loadData.showwrite" :span="12" class="top-write">
          <span @click="writenews"></span>
        </el-col>
        <el-col :span="12" class="department">
          <span v-for="(res,index) in teamList" :key="index" @click="teamTypeCheck(res)">{{res.title}}</span>
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <el-button type="danger" circle >
              <img class="btnicon" src="../../../../assets/images/classes/news.png"/>
            </el-button>
            <el-button type="primary" circle >
              <img class="btnicon" src="../../../../assets/images/classes/space.png"/>
            </el-button>
            <el-button type="primary" circle >
              <img class="btnicon" src="../../../../assets/images/classes/notice.png"/>
            </el-button>
          </span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    data() {
      return {
        loadData: {
          title: '我的个人主页',
          showwrite: true,
        },
        teamList: [], //我的社团列表
        userInfo: this.$store.state.userInfo
      }
    },
    mounted() {
      this.getTeamList();
    },
    methods: {
      getTeamList() { //获取社团列表 参数校园id
        // let data = {
        //   sid: this.userInfo.s_id
        // }
        let self = this;
        request.post('/roomapi/Community/myCommunity', {}, function (res) {
          if (res.code == 0) {
            self.teamList = res.data;
          }
        })
      },
      teamTypeCheck(item) { //点击我的社团类型 到该社团主页 c_id:社团id
        this.$router.push({
          path:'/team/myTeamDetail',
          query:{
            c_id: item.c_id,
            title: item.title
          }
        })
      },
      writenews() {
        this.$router.push({
          name: 'write',
          query: {
            isEdit: false,
            fromname: '我的主页',
            fromwhere: 'teamMyHomepage',
            spaceModule: 'team',
            upUrl:'/roomapi/Community/addArticle',//上传的url
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pageTop{
    .pageContent{
      margin-top: 48px;
      padding-left: 20px;
      .top-title{
        height: 56px;
        line-height: 56px;
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
          background: url('../../../../assets/images/myhome/writeinfo.png') no-repeat;
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
        padding-left: 20px;
        font-size: 24px;
        line-height: 46px;
        span{
          cursor: pointer;
          margin-right: 16px;
          font-size:24px;
          font-family:STYuanti-SC-Regular,STYuanti-SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:33px;
          letter-spacing:6px;
        }
        span:hover{
          color: #034692;
        }
        .active{
          color: #034692;
        }
      }
    }
  }
</style>
