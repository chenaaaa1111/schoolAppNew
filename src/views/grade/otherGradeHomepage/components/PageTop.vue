<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="24" class="backStyle">
          <el-page-header @back="goBack" title="返回"></el-page-header>
        </el-col>
        <el-col :span="12" class="top-title">
          <img v-if="url" :src="url" alt=""/>{{classInfo.title}}
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  export default{
    data() {
      return {
        classInfo: {}, //年级信息
        url: require('../../../../assets/images/classes/class_else.png')
      }
    },
    mounted() {
      this.classInfo = this.$route.query;
    },
    methods: {
      goBack() { // 返回-从哪儿来往哪儿去
        this.$router.push({
          name: 'grade'
        })
      },
    }
  }
</script>
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
        padding-left: 10px;
        font-size: 24px;
        line-height: 46px;
      }
    }
  }
</style>
<style>
  .pageContent .backStyle .el-page-header__left::after {
    content: "";
    position: absolute;
  }
  .pageContent .backStyle .el-page-header__left{
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:25px;
  }
</style>
