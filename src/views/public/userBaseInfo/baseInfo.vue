<template>
  <div class="view-home">
    <div class="home-top">
      <el-row type="flex" justify="center">
        <el-col class="home-navbox" :xl="18" :lg="18" :md="20" :sm="22" :xs="24">
          <el-row>
            <el-col :span="12" class="nav-title">
              <img src="../../../assets/fonts/logo.png" @click="goHome"/>
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
                    <el-button type="primary" @click="saveBaseInfo">保存</el-button>
                  </el-col>
                  <el-col class="formAvatar">
                    <el-avatar shape="circle" :size="160" :src="avatar"></el-avatar>
                    <!-- <img :src="avatar" class="userImg"/> -->
                    <p class="text"><el-button type="text" size="mini" @click="editAvatar">修改头像</el-button></p>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <el-form-item label="姓名">
                      <el-input v-model="formdata.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="校区">
                      <el-radio-group v-model="formdata.s_id" style="line-height: 40px;">
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
                    <el-button type="primary" @click="saveSpaceChecked">保存</el-button>
                  </el-col>

                </el-row>
                <!-- 班级空间 -->
                <el-row class="formRow" :gutter="10">
                  <el-col class="formTitle">
                    <div class="title subTitle">班级空间</div>
                  </el-col>
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" v-if="true">
                    <el-form-item label="校部">
                      <el-select class="formwidth" v-model="formdata.level_id" placeholder="请选择">
                        <el-option v-for="(item,index) in schoolList" :label="item.title" :value="item.id" :key="index+5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" v-if="true">
                    <el-form-item label="年级">
                      <el-select class="formwidth" v-model="formdata.grade_id" placeholder="请选择">
                        <el-option v-for="(item,index) in gradeList" :label="item.title" :value="item.id" :key="index+10"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                    <el-form-item label="班级">
                      <el-select class="formwidth" v-model="formdata.class_id" placeholder="请选择">
                        <el-option v-for="(item,index) in classList" :label="item.title" :value="item.id" :key="index+20"></el-option>
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
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
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
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                    <el-form-item label="教研组">
                      <el-select class="formwidth" v-model="formdata.teaching_id" placeholder="请选择">
                        <el-option v-for="(item,index) in teachingList" :label="item.title" :value="item.id" :key="index+60"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col><el-divider></el-divider></el-col>
                </el-row>
                <!-- 教研空间 -->
                <el-row class="formRow">
                  <el-col class="formTitle">
                    <div class="title subTitle">
                      社团空间
                      <span class="subTitle_tips">
                        如果没有你要加入的社团,请前往社团空间
                        <el-link type="primary">申请新社团</el-link>
                      </span>
                    </div>
                  </el-col>
                  <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                    <el-form-item label="社团">
                      <el-select class="formwidth" multiple  v-model="teamids" placeholder="请选择" @change="teamChange">
                        <el-option v-for="(item,index) in teamList" :label="item.title" :value="item.id" :key="index+70"></el-option>
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
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-remove="handleRemove"
                    :on-change="fileChange">
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
            <el-form label-width="120px" :model="mobileFormData" :rules="mobileRules">
                <el-form-item label="旧手机号码">
                    <el-input v-model="formdata.mobile" type="text" readonly></el-input>
                </el-form-item>
                <el-form-item label="新手机号码" prop="newMobile">
                    <el-input v-model="mobileFormData.newMobile" :maxlength="mobilemaxlen" type="text" placeholder="请输入新号码"></el-input>
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
    var validataMobile = (rule, value, callback) => {
      var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if(value == '') {
        callback(new Error('请输入新的手机号码!'));
      }else if (TEL_REGEXP.test(value)) {
        callback();
      } else {
        callback(new Error('手机号码格式不正确!'));
      }
    };
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
      teamList: [], // 社团列表
      formdata: {
        id: 1,
        s_id: 1,
        status: 0,
        level: 1,
        mobile: "15269922222",
        password: "$P$BU3uZfakBj4h2FaeTVb91oRWbErDLf1",
        avatar: "http:\/\/git.i2f2f.com\\\/images\\\/icon\\\/20191111\\\/813aa473c84da8a0e698a56a91d472f3.jpg",
        name: "我不叫金刚啊",
        room_class: 0,
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
        class: "22班",

      },
      teamids: [],
      dialogImageUrl: "",
      trueLabel: 1,
      falseLabel: 0,
      avatarVisible: false,
      avatarDialog: false,
      mobileDialog: false,
      passDialog: false,
      avatar: '',// 默认显示的用户头像
      fileList: [], // 用来回显原来头像和接收选择图片的数组
      newAvatar: '', // 图片上传成功后返回的图片地址
      mobileRules: {
        newMobile: [
          { required: true, validator: validataMobile, trigger: 'blur' }
        ]
      },
      mobileFormData: {
        newMobile: ''
      },
      mobilemaxlen: 11

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
    this.getTeamList()
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

    teamChange(val) {
      this.formdata.teamids = val
      console.log(val, 'team select')
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
    getTeamList() {
      request.post('/roomapi/Users/CommunityList', {}, (res)=>{
        console.log(res, '请求team列表')
        if(res.code == 0) {
          this.teamList = res.data
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
          // this.formdata.teamids = (res.data.community).map(item => {
          //   return item.c_id
          // })
          let ids = []
          if(res.data.community.length>0) {
            for(var i=0;i<res.data.community.length;i++) {
              ids.push(res.data.community[i].c_id)
            }
            this.teamids = ids
          }
          let avatarObj = {
            name: 'oldAvatar',
            url: res.data.avatar
          }

          this.avatar = res.data.avatar
          this.fileList = [avatarObj]
        }
      })
    },
    editAvatar() {
      this.avatarDialog = true
    },
    avatarCancel() {
      this.avatarDialog = false
      this.newAvatar = ''
    },
    savenewavatar() {
      console.log(this.fileList[0].name, '保存图片')
      let fm = new FormData()
      fm.append('type',1)
      fm.append('file',this.fileList[0].raw)
      request.post('/roomapi/Upsystem/upload', fm, (res)=>{
        console.log(res, '上传图片')
        if(res.code == 0) {
          this.$message.success('上传头像成功!')
          this.newAvatar = res.data.url
          this.avatarDialog = false
        } else {
          this.$message.error('上传头像失败,请检查网络')
        }
      })

    },
    saveBaseInfo() { // 基本信息--save
      let data = {
        avatar: this.newAvatar,
        sid: this.formdata.s_id,
        name: this.formdata.name
      }
      if(this.newAvatar == '') {
        data.avatar = this.formdata.avatar
      } else {
        this.newAvatar
      }
      request.post('/roomapi/Users/editBasic', data, (res)=>{
        console.log(res, '保存基本信息')
        if(res.code == 0) {
          this.newAvatar = ''
          this.getData()
        }
      })
    },
    saveSpaceChecked() { // 空间信息 -- save
      let data = {
        room_class: this.formdata.room_class,
        room_grade: this.formdata.room_grade,
        room_community: this.formdata.room_community,
        room_project: this.formdata.room_project,
        room_subject: this.formdata.room_subject,
        room_teaching: this.formdata.room_teaching
      }
      request.post('/roomapi/Users/editRoom', data, (res)=>{
        console.log(res, '保存空间信息')
        if(res.code == 0) {
          this.$message.success(res.message)
          this.getData()
        }
      })
    },
    saveClass() { // 班级空间 -- save
      let data = {
        class_id: this.formdata.class_id,
      }
      request.post('/roomapi/Users/editRoomClass', data, (res)=>{
        console.log(res, '保存班级空间')
        if(res.code == 0) {
          this.$message.success(res.message)
          this.getData()
        }
      })
    },
    saveGrade() { // 班级空间 -- save
      let data = {
        grade_id: this.formdata.grade_id,
      }
      request.post('/roomapi/Users/editRoomGrade', data, (res)=>{
        console.log(res, '保存年级空间')
        if(res.code == 0) {
          this.$message.success(res.message)
          this.getData()
        }
      })
    },
    saveSubject() {
      let data = {
        subject_id: this.formdata.subject_id,
      }
      request.post('/roomapi/Users/editSubject', data, (res)=>{
        console.log(res, '保存课题空间')
        if(res.code == 0) {
          this.$message.success(res.message)
          this.getData()
        }
      })
    },
    editMobile() { // 打开更改手机号
      this.mobileDialog = true
    },
    mobileCancel() { // 关闭更改手机号
      this.mobileFormData = {
        newMobile: ''
      }
      this.mobileDialog = false
    },
    savenewmobile() { // 保存手机号
      let data = {
        mobile: this.mobileFormData.newMobile
      }
      request.post('/roomapi/Users/upmobile', data, (res)=>{
        console.log(res, '保存新手机号码')
        if(res.code == 0) {
          this.$message.success('更换手机号码成功')
          this.mobileFormData = {
            newMobile: ''
          }
          this.getData()
        } else {
          this.$message.error(res.message)
        }
      })
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
    handleRemove(file) {
      this.fileList = []
    },
    fileChange(file, fileList) { //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      console.log(file, 'change file')
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
      if(isJPG) {
        this.fileList = [file]
      } else {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
        this.fileList = fileList.splice(file,1)
      }

    },
  }
};
</script>
<style lang="scss">
    .mydialog {
        .el-dialog {
            min-width: 9.733333rem;
        }
        .el-upload-list__item {
          transition: none !important;
        }
    }
    .subTitle{
      .subTitle_tips{
        font-size: 12px;
        font-weight: normal;
        color: #ddd;
        white-space: nowrap;
        .el-link--inner{
          font-size: 12px;
          position: relative;
          top: -3px;
        }
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
      .userImg{
        width: 160px;height: 160px;border-radius: 50%;
        display: block;margin: 0 auto;
        box-shadow: 0px 0px 5px #ccc;
        border: 1px solid #ccc;
      }
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
