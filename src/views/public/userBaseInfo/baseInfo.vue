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
              <!-- <span class="userName">{{userInfo.name}}</span> -->
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
              <el-form ref="form" :label-position="labelPosition" :model="formdata" :inline="false" label-width="60px">
                <!-- 基本信息 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <span class="title">基本信息</span>
                    <el-button type="primary">保存</el-button>
                  </el-col>
                  <el-col class="formAvatar">
                    <el-avatar
                      shape="circle"
                      :size="160"
                      :fit="fit"
                      icon="el-icon-user-solid"
                      :src="formdata.avatar"
                    ></el-avatar>
                    <p class="text"><el-button type="text" size="mini" @click="editAvatar">修改头像</el-button></p>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="姓名">
                      <el-input v-model="formdata.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="校区">
                      <el-radio-group v-model="formdata.s_id">
                        <el-radio v-for="(item,index) in schoolList" :label="item.id" :key="item.id">{{item.title}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <!-- 空间资料 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <span class="title">空间资料</span>
                  </el-col>
                  <el-col>
                    <el-form-item label="空间选择" label-width="80px">
                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_class">
                            <img src="../../../assets/main/classes.png" class="spaceIcon"/>班级空间
                          </el-checkbox>
                        </el-form-item>
                      </div>

                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_grade">
                            <img src="../../../assets/main/grade.png" class="spaceIcon"/>年级空间
                          </el-checkbox>
                        </el-form-item>
                      </div>

                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_community">
                            <img src="../../../assets/main/team.png" class="spaceIcon"/>社团空间
                          </el-checkbox>
                        </el-form-item>
                      </div>

                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_project">
                            <img src="../../../assets/main/special.png" class="spaceIcon"/>专题空间
                          </el-checkbox>
                        </el-form-item>
                      </div>

                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_subject">
                            <img src="../../../assets/main/topic.png" class="spaceIcon"/>课题空间
                          </el-checkbox>
                        </el-form-item>
                      </div>

                      <div>
                        <el-form-item>
                          <el-checkbox v-model="formdata.room_teaching">
                            <img src="../../../assets/main/teaching.png" class="spaceIcon"/>教研空间
                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 班级空间 -->
                <el-row class="formRow" :gutter="10">
                  <el-col class="formTitle">
                    <div class="title subTitle">班级空间</div>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="年级">
                      <el-select class="formwidth" v-model="formdata.grade_id" placeholder="请选择">
                        <el-option v-for="(item,index) in gradeList" :label="item.title" :value="item.id" :key="index+10"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="班级">
                      <el-select class="formwidth" v-model="formdata.class_id" placeholder="请选择">
                        <el-option v-for="(item,index) in classList" :label="item.title" :value="item.id" :key="index+20"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col><el-divider></el-divider></el-col>
                </el-row>
                <!-- 年级空间 -->
                <el-row class="formRow" :gutter="10">
                  <el-col class="formTitle">
                    <div class="title subTitle">年级空间</div>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="年级">
                      <el-select class="formwidth" v-model="formdata.grade_id" placeholder="请选择">
                        <el-option v-for="(item,index) in gradeList" :label="item.title" :value="item.id" :key="index+30"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="班级">
                      <el-select class="formwidth" v-model="formdata.class_id" placeholder="请选择">
                        <el-option v-for="(item,index) in classList" :label="item.title" :value="item.id" :key="index+40"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col><el-divider></el-divider></el-col>
                </el-row>
                <!-- 课题空间 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <div class="title subTitle">课题空间</div>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="课题组">
                      <el-select class="formwidth" v-model="formdata.subject_id" placeholder="请选择">
                        <el-option v-for="(item,index) in subjectList" :label="item.title" :value="item.id" :key="index+50"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col><el-divider></el-divider></el-col>
                </el-row>
                <!-- 教研空间 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <div class="title subTitle">教研空间</div>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="教研组">
                      <el-select class="formwidth" v-model="formdata.teaching_id" placeholder="请选择">
                        <el-option v-for="(item,index) in teachingList" :label="item.title" :value="item.id" :key="index+60"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col><el-divider></el-divider></el-col>
                </el-row>
                <!-- 账号密码 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <span class="title">账号密码</span>
                  </el-col>
                  <el-col>
                    <el-form-item label="手机号" label-width="80px">
                      <span>{{formdata.mobile}}</span>
                      <el-button type="text" @click="editMobile">更换</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="登录密码" label-width="80px">
                      <span>{{formdata.password}}</span>
                      <el-button type="text" @click="editPass">更换</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="更换头像" :visible.sync="avatarDialog" width="30%" class="mydialog" :before-close="avatarCancel">
        <div>
            <el-form label-width="80px" >
                <el-form-item label="上传头像">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="avatarVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="avatarCancel">取 消</el-button>
            <el-button type="primary" @click="savenewavatar">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="更改手机号码" :visible.sync="mobileDialog" width="30%" class="mydialog" :before-close="mobileCancel">
        <div>
            <el-form label-width="80px" >
                <el-form-item label="手机号码">
                    <el-input type="text" placeholder="请输入新号码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="mobileCancel">取 消</el-button>
            <el-button type="primary" @click="savenewmobile">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="更改密码" :visible.sync="passDialog" width="30%" class="mydialog" :before-close="passCancel">
        <div>
            <el-form label-width="100px" >
                <el-form-item label="输入旧密码">
                    <el-input type="text" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码">
                    <el-input type="text" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="passCancel">取 消</el-button>
            <el-button type="primary" @click="savenewpass">确 定</el-button>
        </span>
    </el-dialog>
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
      schoolList: [], // 校区列表
      roomList: [], // 空间列表
      gradeList: [], // 年级列表
      classList: [], // 班级列表
      subjectList: [], // 课题组列表
      teachingList: [], // 教研组列表
      formdata: {
        id: 1,
        s_id: 1,
        status: 0,
        level: 1,
        mobile: "15269922222",
        password: "$P$BU3uZfakBj4h2FaeTVb91oRWbErDLf1",
        avatar: "http:\/\/git.i2f2f.com\\\/images\\\/icon\\\/20191111\\\/813aa473c84da8a0e698a56a91d472f3.jpg",
        name: "我不叫金刚啊",
        room_class: 1,
        room_grade: 0,
        room_community: 0,
        room_project: 0,
        room_subject: 0,
        room_teaching: 0,
        class_id: '1',
        grade_id: '1',
        subject_id: '1',
        teaching_id: '1',
        access_class: '0',
        access_grade: '1',
        access_community: '0',
        create_time: "2019-11-11 15:24:30",
        school: 1,
        grade: "19级",
        class: "22班"
      },
      dialogImageUrl: '',
      avatarVisible: false,
      avatarDialog: false,
      mobileDialog: false,
      passDialog: false,
      spaceList: [
          {id: '1', src:require('../../../assets/images/classs.png'),name:'班级空间',check:0},
          {id: '2', src:require('../../../assets/images/grade.png'),name:'年级空间',check:1},
          {id: '3', src:require('../../../assets/images/team.png'),name:'社团空间',check:1},
          {id: '4', src:require('../../../assets/images/special.png'),name:'专题空间',check:0},
          {id: '5', src:require('../../../assets/images/topic.png'),name:'课题空间',check:1},
          {id: '6', src:require('../../../assets/images/teaching.png'),name:'教研空间',check:1}
      ],
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log(this.userInfo, '????')
    // this.userInfo=this.$store.state.userInfo;
    this.url = this.userInfo.avatar; //头像
    this.getSchoolList()
    this.getRoomList()
    this.getGradeList()
    this.getClassList()
    this.getSubjectList()
    this.getTeachingList()
    this.getData()
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
    },

    getSchoolList() {
      request.post('/roomapi/School/lists', {}, (res)=>{
        console.log(res, '请求校区列表')
        if(res.code == 0) {
          this.schoolList = res.data
        }
      })
    },
    getRoomList() {
      request.post('/roomapi/Users/editRoom', {}, (res)=>{
        console.log(res, '请求空间列表')
        if(res.code == 0) {
          this.roomList = res.data
        }
      })
    },
    getGradeList() {
      request.post('/roomapi/School/grade', {}, (res)=>{
        console.log(res, '请求年级列表')
        if(res.code == 0) {
          this.gradeList = res.data
        }
      })
    },
    getClassList() {
      request.post('/roomapi/School/banji', {}, (res)=>{
        console.log(res, '请求班级列表')
        if(res.code == 0) {
          this.classList = res.data
        }
      })
    },
    getSubjectList() {
      request.post('/roomapi/Users/Subject', {}, (res)=>{
        console.log(res, '请求课题组列表')
        if(res.code == 0) {
          this.subjectList = res.data
        }
      })
    },
    getTeachingList() {
      request.post('/roomapi/Users/Teaching', {}, (res)=>{
        console.log(res, '请求教研组列表')
        if(res.code == 0) {
          this.teachingList = res.data
        }
      })
    },
    getData() { // 获取用户信息
      let data = {
        u_id: this.userInfo.id
      }
      request.post('/roomapi/Users/user', data, (res)=>{
        console.log(res, '请求用户信息')
        if(res.code == 0) {
          this.formdata = res.data
        }
      })
    },
    editAvatar() {
      this.avatarDialog = true
    },
    avatarCancel() {
      this.avatarDialog = false
    },
    savenewavatar() {
      this.avatarDialog = false
    },
    editMobile() { // 打开更改手机号
      this.mobileDialog = true
    },
    mobileCancel() { // 关闭更改手机号
      this.mobileDialog = false
    },
    savenewmobile() { // 保存手机号
      this.mobileDialog = false
    },
    editPass() { // 打开更改密码
      this.passDialog = true
    },
    passCancel() { // 关闭更改密码
      this.passDialog = false
    },
    savenewpass() { // 保存新密码
      this.passDialog = false
    },
    // 上传头像部分方法
    handlePictureCardPreview() {},
    handleRemove() {},
  }
};
</script>
<style lang="scss">
    .mydialog {
        .el-dialog {
            min-width: 9.733333rem;
        }
    }
</style>
<style lang="scss" scoped>
.view-home {
  height: 100%;
  //   background: url("../../../assets/images/bg1.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .formRow{
    .formwidth{
      width: 100%;
    }
    .formTitle{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
      .title {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      button {
        width: 110px;
        border-color: rgba(3, 70, 146, 1);
        background: rgba(3, 70, 146, 1);
      }
      .subTitle{
        display: block;
        font-size: 22px;
        font-weight: bold;
        padding-left: 20px;
        background: url('../../../assets/fonts/dot.png') no-repeat left center;
      }
    }
    .formAvatar{
      text-align: center;
    }
    .spaceIcon{
      display: inline-block;
      width: 0.32rem;
      height: 0.32rem;
      vertical-align: middle;
      position: relative;
      top: -2px;
      margin-right: 10px;
    }
  }
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
          font-weight: bold;
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
