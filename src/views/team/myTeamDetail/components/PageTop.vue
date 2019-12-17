<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="12" class="top-title">
          <img v-if="loadData.url" :src="loadData.url" alt="" />{{this.$route.query.title +'社团主页'}}
        </el-col>
        <el-col :span="12" class="top-write">
          <span v-if="flag" class="quitTeam" @click="quitTeam"></span>
          <span v-else class="addTeam" @click="addTeam"></span>
          <span v-if="flag" class="writeNews" @click="writenews"></span>
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <el-button type="danger" circle>
              <img class="btnicon" src="../../../../assets/images/grade/peple.png" />
            </el-button>
            <!-- <el-button type="primary" circle>
              <img class="btnicon" src="../../../../assets/images/classes/space.png" />
            </el-button>
            <el-button type="primary" circle>
              <img class="btnicon" src="../../../../assets/images/classes/notice.png" />
            </el-button> -->
          </span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import request from "@/api/request.js";
  export default {
    data() {
      return {
        loadData: {
          url: require('../../../../assets/images/classes/class_else.png')
        },
        flag: true, //点击退出社团后 按钮变成加入社团
      }
    },
    mounted() {
    },
    methods: {
      quitTeam() { //退出社团
        var data = {
          c_id: String(this.$route.query.c_id)
        };
        var self = this;
        request.post("/roomapi/Community/delCommunity", data, function(res) {
          if(res.code==0){
            self.flag = false;
            self.$toast.success('退出成功');
          }else{
            self.$toast.fail(res.message);
          }
        });
      },
      addTeam() { //加入社团
        var data = {
          c_id: String(this.$route.query.c_id)
        };
        var self = this;
        request.post("/roomapi/Community/addCommunity", data, function(res) {
          if(res.code==0){
            self.$toast.success('加入成功');
          }else{
            self.$toast.fail(res.message);
          }
        });
      },
      writenews() { //写信息 回到我的社团
        this.$router.push({
          name: 'write',
          query: {
            fromname: '我的社团',
            fromwhere: 'myTeamDetail',
            spaceModule: 'team',
            upUrl:'/roomapi/Community/addArticle',//上传的url
            title: this.$route.query.title,
            c_id: this.$route.query.c_id
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pageTop {
    .pageContent {
      margin-top: 48px;
      padding-left: 20px;
      .top-title {
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
        img {
          display: inline-block;
          width: 74px;
          height: 74px;
          vertical-align: middle;
          margin-right: 30px;
        }
      }

      .top-write {
        height: 56px;
        line-height: 56px;
        text-align: right;
        padding-right: 10px;
        span {
          display: inline-block;
          width: 152px;
          height: 52px;
          cursor: pointer;
        }
        .writeNews{
          margin-left: 28px;
          background: url('../../../../assets/images/team/write1.png') no-repeat;
          background-size: 100% 100%;
        }
        .quitTeam{
          background: url('../../../../assets/images/team/quit.png') no-repeat;
          background-size: 100% 100%;
        }
        .addTeam{
          background: url('../../../../assets/images/classes/addTeam.png') no-repeat;
          background-size: 100% 100%;
        }
      }

      .leftentry {
        text-align: right;
        margin-top: 20px;
        padding: 0px 10px;

        .entrybtns {
          .btnicon {
            width: 45px;
            height: 45px;
          }

          .el-button.is-circle {
            padding: 0px;
          }
        }
      }

      .department {
        padding-left: 10px;
        font-size: 24px;
        line-height: 46px;
      }
    }
  }
</style>