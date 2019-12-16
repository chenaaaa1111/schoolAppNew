<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="12" class="top-title">
          <img v-if="loadData.url" :src="loadData.url" alt=""/>{{'20'+otherClassInfo.grade+otherClassInfo.class}}
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <el-button type="danger" circle >
              <img class="btnicon" src="../../../../assets/images/grade/peple.png"/>
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
        otherClassInfo: {}, //别人的班级id
        loadData: {
          url: require('../../../../assets/images/classes/class_else.png'),
          title: '2000级20班-别人的班级',
          subTitle: '',
          showwrite: true
        }
      }
    },
    mounted() {
      this.getOtherInfo();
    },
    methods: {
      //获取所在班级的年级信息
      getOtherInfo() {
        var data = {
          column: 0,
          class: this.$route.query.id
        }
        var self = this;
        request.post('/roomapi/Room_Class/classPage',data,function(res){
          if(res.code ==0){
            self.otherClassInfo = res.data;
            console.log('获取其他班级的时候的信息',self.otherClassInfo)
          }
        });
      },
      writenews() {
        this.$router.push({
          name: 'write',
          params: {
            fromname: '班级主页',
            fromwhere: 'classHomepage'
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
        height:56px;
        font-size:30px;
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
