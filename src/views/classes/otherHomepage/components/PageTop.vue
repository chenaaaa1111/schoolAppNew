<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="24" class="top-title top-heigth">{{name}}的个人主页</el-col>
        <el-col :span="12" class="department margin-top">
          {{persionInfo}}
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
        userInfo: {}, //用户信息
        name: '',//用户名
        persionInfo: '', //班级信息
      }
    },
    mounted() {
      this.name = this.$route.query.name;
      this.getUserInfo();
    },
    methods: {
      //获取别人的主页的该用户的信息
      getUserInfo() {
        let self = this;
        let uid =  self.$route.query.id;
        var data = {
          u_id: uid
        }
        request.post('/roomapi/Users/user', data, function (res) {
          if(res.code ==0){
            self.userInfo = res.data;
            console.log(self.userInfo,'进入别人主页得到别人的信息');
            self.persionInfo = self.userInfo.school+'初中'+'20' + self.userInfo.grade + self.userInfo.class;

          }
        });       
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pageTop{
    .pageContent{
      margin-top: 48px;
      .top-title{
        padding-left: 20px;
        height:28px;
        font-size: 40px;
        font-family:STYuanti-SC-Bold,STYuanti-SC;
        font-weight:bold;
        color:rgba(3,70,146,1);
        line-height:28px;
        letter-spacing:10px;
        text-shadow:0px 2px 2px rgba(0,0,0,0.07);
        -webkit-text-stroke:1px rgba(255,255,255,1);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        img{
          display: inline-block;
          width: 74px;
          height: 74px;
          vertical-align: middle;
          margin-right: 18px;
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
          background: url('../../../../assets/images/myhome/writenews.png') no-repeat;
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
        font-family:STYuanti-SC-Regular,STYuanti-SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:17px;
        letter-spacing:6px;
      }
      .margin-top{
        margin-top: 20px;
      }
    }
  }
</style>
