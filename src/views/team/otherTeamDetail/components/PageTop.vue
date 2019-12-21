<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="12" class="top-title">
          <img v-if="options.avatar" :src="options.avatar" alt=""/>
          <span v-if="options.title"> {{options.title}}</span>
          <span v-if="options.name"> {{options.name}}</span>
          社团主页
        </el-col>
        <el-col v-if="options.showwrite" :span="12" class="top-write">
          <span @click="faddTeam"></span>
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <el-button type="danger" circle >
              <img class="btnicon" src="../../../../assets/images/myhome/vistor.png"/>
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
    props: {
      options: {
        type: Object,
        default: {
          id: '',
          title: '',
          name: '',
          avatar: '',
          showwrite: true
        }
      } 
    },
    data() {
      return {
        
      }
    },
    mounted() {

    },
    methods: {
      faddTeam(res){//加入社团
        var teamId=this.$store&&this.$store.state&&this.$store.state.teamId
        var data={ c_id:teamId};
        request.post('/roomapi/Community/addCommunity',data,(res)=>{
          if(res.code==0){
            this.$toast.success('加入成功');
          }else{
            this.$toast.fail(res.message);
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
          border-radius: 50%
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
          background: url('../../../../assets/images/classes/addTeam.png') no-repeat;
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
