<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
       <el-col :span="16" class="top-title">
          <img v-if="url" :src="url" alt=""/> {{classInfo}}
        </el-col>
        <el-col :span="8" class="top-write">
          <span @click="writenews"></span>
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <!-- <el-button type="danger" circle >
              <img class="btnicon" src="../../../../assets/images/myhome/vistor.png"/>
            </el-button> -->
            <el-button type="danger" circle >
              <img class="btnicon" src="../../../../assets/images/classes/news.png"/>
            </el-button>
            <el-button type="primary" circle >
              <img class="btnicon" src="../../../../assets/images/myhome/notpass.png"/>
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
  export default{
    data() {
      return {
        url: require('../../../../assets/images/classes/class_else.png'),
        userInfo: {},//用户信息
        classInfo: '', //班级信息
      }
    },
    created() {
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      console.log(this.userInfo,'用户信息');
      this.classInfo = '20' + this.userInfo.grade + this.userInfo.class;
    },
    methods: {
      writenews() {
        this.$router.push({
          name: 'write',
          query: {
            fromname: '我的班级',
            spaceModule: 'classes',//班级空间名
            fromwhere: 'myClassPage'
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
    }
  }
</style>
