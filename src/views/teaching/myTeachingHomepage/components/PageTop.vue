<template>
  <el-row class="pageTop" type="flex" justify="center">
    <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="pageContent">
      <el-row>
        <el-col :span="12" class="top-title">我的个人主页</el-col>
        <el-col :span="12" class="top-write">
          <span @click="writeArt"></span>
        </el-col>
        <el-col :span="24" class="department">
          <span v-for="(item,index) in teachingAddList" @click="goToTeaching(item)" :key="index">{{item.title}}</span>
        </el-col>
        <el-col class="leftentry">
          <span class="entrybtns hidden-sm-and-up">
            <el-button type="danger" circle>
              <img class="btnicon" src="../../../../assets/images/myhome/vistor.png" />
            </el-button>
          </span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        teachGroup: '教研1组', //教研组别
        teachingAddList: []
      }
    },
    mounted() {
      this.getTeachingList();
    },
    methods: {
      goToTeaching(item) {
        this.$router.push({
          name: 'myTeachMainHomepage',
          query: item
        })
      },
      getTeachingList() { //获取要教研组列表 参数  校园id
        let data = {
          level_id: this.userInfo.level_id
        }
        let self = this;
        request.post('/roomapi/Teaching/myTeaching', data, function (res) {
          if (res.code == 0) {
            self.teachingAddList = res.data;
          }
        })
      },
      writeArt() {
        this.$router.push({
          name: 'write',
          query: {
            fromname: '我的主页',
            fromwhere: 'myTeachingHomepage',
            spaceModule: 'teaching'
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
        font-size: 40px;
        font-family: STYuanti-SC-Bold, STYuanti-SC;
        font-weight: bold;
        color: rgba(3, 70, 146, 1);
        line-height: 56px;
        letter-spacing: 10px;
        text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.07);
        -webkit-text-stroke: 2px rgba(255, 255, 255, 1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

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
          background: url('../../../../assets/images/teaching/writeArt1.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
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
        margin-top: 8px;
        font-size: 24px;
        font-family: STYuanti-SC-Regular, STYuanti-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        letter-spacing: 6px;

        span {
          margin-left: 10px;
        }
      }
    }
  }
</style>