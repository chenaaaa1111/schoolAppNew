<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <h2 class="cardTitle"><img src="../../../../assets/images/myhome/vistor.png" />访问信息</h2>
    </div>
    <el-row class="vistorInfo"> 
      <el-col :span="24" class="vistorItem">
        <div>
          <p class="head">当前在线人数</p>
          <p class="footer">{{vistorInfo.num_dq?vistorInfo.num_dq:0}}人</p>
        </div>
      </el-col>
      <el-col :span="24" class="vistorItem">
        <div>
          <p class="head">本周浏览量：</p>
          <p class="footer">{{vistorInfo.num_bz?vistorInfo.num_bz:0}}次</p>
        </div>
      </el-col>
      <el-col :span="24" class="vistorItem">
        <div>
          <p class="head">累计浏览量：</p>
          <p class="footer">{{vistorInfo.num_zs?vistorInfo.num_zs:0}}次</p>
        </div>
      </el-col>
    </el-row>   
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    data() {
      return {
        vistorInfo: {}, //访问信息
        circleUrl: require('../../../../assets/images/user.png')
      }
    },
    created(){
      
    },
    mounted() {
      this.getVistorInfo();
    },
    methods: {
      //获取访问信息
      getVistorInfo(){
        var data = {
          room: 3, //1班级2年级3社团4专题5课堂6教研
          c_id: this.$route.query.id //社团id
        };
        var self = this;
        request.post("/roomapi/Users/lll", data, function(res) {
          if (res.code == 0) {
            if(res.data){
              self.vistorInfo = res.data;
            }
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .banner-card {
    margin-bottom: 12px;

    .cardTitle {
      font-size: 24px;
      font-weight: 600;

      img {
        display: inline-block;
        width: 38px;
        height: 38px;
        vertical-align: middle;
        margin-right: 17px;
      }
    }
    .vistorInfo{
      .vistorItem{
        margin-bottom: 16px;
        width: 100%;
        height: 96px;
        background:rgba(211,225,241,1);
        border-radius: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .head{
          margin-bottom: 4px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(102,102,102,1);
          line-height:22px;
        }
        .footer{
          font-size:22px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:30px;
        }
      }
    }
  }
</style>