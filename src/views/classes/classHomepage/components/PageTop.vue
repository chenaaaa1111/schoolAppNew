<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="16" class="top-title">
          <img v-if="loadData.url" :src="loadData.url" alt=""/> {{classInfo}}
        </el-col>
        <el-col v-if="loadData.showwrite" :span="8" class="top-write">
          <span @click="writenews"></span>
        </el-col>
        <!-- <el-col :span="12" class="department">
          {{loadData.subTitle}}
        </el-col> -->
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
  export default{
    data() {
      return {
        loadData: {
          url: require('../../../../assets/images/classes/class_else.png'),
          subTitle: '',
          showwrite: true
        },
        userInfo: '',//用户信息
        classInfo: '', //班级信息
      }
    },
    created() {
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      console.log(this.userInfo,'用户信息')
      this.classInfo = '20' + this.userInfo.grade + this.userInfo.class;
    },
    methods: {
      writenews() {
        this.$router.push({
          name: 'write',
          query: {
            fromname: '班级主页',
            spaceModule: 'classes',//班级空间名
            fromwhere: 'classHomepage',
            upUrl:'/roomapi/Room_Class/addArticle',//上传的url
           //上传参数
            level:2,
            columns:this.$store.state.columnId,
            column_name:this.$store.state.columnName    //栏目名称
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
        height: 56px;
        font-size: 40px;
        font-family: STYuanti-SC-Bold,STYuanti-SC;
        font-weight: bold;
        color: rgba(3,70,146,1);
        line-height: 56px;
        letter-spacing: 10px;
        text-shadow: 0px 3px 3px rgba(0,0,0,0.07);
        -webkit-text-stroke: 2px rgba(255,255,255,1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
        padding-left: 10px;
        font-size: 24px;
        line-height: 46px;
      }
    }
  }
</style>
