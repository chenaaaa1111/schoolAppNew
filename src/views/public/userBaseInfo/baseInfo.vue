<template>
  <div class="view-home">
    <div class="home-top">
      <el-row type="flex" justify="center">
        <el-col class="home-navbox" :xl="18" :lg="18" :md="20" :sm="22" :xs="24">
          <el-row>
            <el-col :span="12" class="nav-title" @click="goHome">
              <img src="../../../assets/fonts/logo.png" />
              欢迎来到校本社团综合管理服务系统
            </el-col>
            <el-col :span="12" class="nav-user">
              <el-avatar shape="circle" :size="48" :fit="fit" icon="el-icon-user-solid" :src="url"></el-avatar>
              <span class="userName">{{userInfo.name}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="home-body">
      <div class="body-inner">
        <el-row type="flex" justify="center" style="width: 100%;">
          <el-col :xl="16" :lg="16" :md="20" :sm="22" :xs="24">
            <el-card class="main-content">
              <div slot="header" class="clearfix">
                <el-page-header class="bkName" @back="goBack" :title="'返回'"></el-page-header>
              </div>
              <div class="headTop">
                <span class="title">基本信息</span>
                <el-button type="primary">保存</el-button>
              </div>
              <div class="avatatInfo">
                <div class="avatar">
                  <el-avatar
                    shape="circle"
                    :size="160"
                    :fit="fit"
                    icon="el-icon-user-solid"
                    :src="url"
                  ></el-avatar>
                </div>
                <p class="text">修改头像</p>
              </div>
              <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="校区">
                  <el-radio-group v-model="form.campus">
                    <el-radio label="东区"></el-radio>
                    <el-radio label="西区"></el-radio>
                     <el-radio label="南区"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                <div class="headTop">
                    <span class="title">空间资料</span>
                    <el-button type="primary">保存</el-button>
                </div>
                <el-form-item label="空间资料">
                  <el-checkbox-group v-model="form.type" class="checkBoxGroup">
                    <el-checkbox v-for="item in spaceList" :label="item.id" :name="item.id" :key="item.id">
                        <img :src="item.src" />
                        {{item.name}}
                    </el-checkbox>  
                    <!-- <el-checkbox name="classSpace">
                        <img src="../../../assets/images/classs.png" />
                        班级空间
                    </el-checkbox>
                    <el-checkbox name="gradeSpace">
                        <img src="../../../assets/images/grade.png" />
                        年级空间
                    </el-checkbox>
                    <el-checkbox name="teamSpace">
                        <img src="../../../assets/images/team.png" />
                        社团空间
                    </el-checkbox>
                    <el-checkbox name="specialSpace">
                        <img src="../../../assets/images/special.png" />
                        专题空间
                    </el-checkbox>
                     <el-checkbox name="topicSpace">
                         <img src="../../../assets/images/topic.png" />
                        课题空间
                    </el-checkbox>
                    <el-checkbox name="teachingSpace">
                        <img src="../../../assets/images/teaching.png" />
                        教研空间
                    </el-checkbox> -->
                  </el-checkbox-group>
                </el-form-item>
                <!-- <el-form-item label="活动区域">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.date1"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                  <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
               
                
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item> -->
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/api/request.js";
export default {
  name: "userBaseInfo",
  data() {
    return {
      userInfo: {},
      url: "",
      fit: "cover",
      labelPosition: 'left',
      spaceList: [
          {id: '1', src:require('../../../assets/images/classs.png'),name:'班级空间',check:0},
          {id: '2', src:require('../../../assets/images/grade.png'),name:'年级空间',check:1},
          {id: '3', src:require('../../../assets/images/team.png'),name:'社团空间',check:1},
          {id: '4', src:require('../../../assets/images/special.png'),name:'专题空间',check:0},
          {id: '5', src:require('../../../assets/images/topic.png'),name:'课题空间',check:1},
          {id: '6', src:require('../../../assets/images/teaching.png'),name:'教研空间',check:1}
      ],
      form: {
        name: "",//姓名
        campus: "",//校区
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: ['1','2'],
        
        desc: ""
      }
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    // this.userInfo=this.$store.state.userInfo;
    this.url = this.userInfo.avatar; //头像
  },
  methods: {
    goBack() {
      // 返回-从哪儿来往哪儿去
      // this.$router.push({
      //     name: this.fromwhere
      // })
    },
    goHome() {
      this.$router.push({
        // 回到空间选择页面
        name: "home"
      });
    },
    loginout() {
      sessionStorage.setItem("Authorization", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.view-home {
  height: 100%;
  //   background: url("../../../assets/images/bg1.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .home-top {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
    height: 100px;

    .home-navbox {
      .el-row {
        height: 100%;

        .nav-title {
          padding-left: 10px;
          height: 100px;
          font-size: 24px;
          font-weight: bold;
          display: flex;
          align-items: center;

          img {
            display: inline-block;
            width: 48px;
            height: 48px;
            vertical-align: middle;
            margin-right: 16px;
          }
        }

        .nav-user {
          padding-right: 10px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .userName {
            margin-left: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }

  .home-body {
    width: 100%;
    flex: 1;

    .main-content {
      .bkName {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .headTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        button {
          width: 110px;
          border-color: rgba(3, 70, 146, 1);
          background: rgba(3, 70, 146, 1);
        }
      }
      .avatatInfo {
        padding: 40px;
        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text {
          margin-top: 10px;
          text-align: center;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 28px;
        }
      }
      .checkBoxGroup{
          .el-checkbox{
            display: block;
            img{
                margin: 0 10px 0 10px;
                vertical-align: middle;
                width: 27px;
                height: 27px;
            }
          }
      }
    }
  }
}
</style>
