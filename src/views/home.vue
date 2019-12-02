<template>
  <div class="view-home">
    <div class="home-top">
      <el-row type="flex" justify="center">
        <el-col class="home-navbox" :xl="18" :lg="18" :md="20" :sm="22" :xs="24">
          <el-row>
            <el-col :span="12" class="nav-title">
              <img src="../assets/fonts/logo.png" />
              欢迎来到校本社团综合管理服务系统
            </el-col>
            <el-col :span="12" class="nav-user">
              <el-dropdown trigger="click" @visible-change="visibleChange">
                <span class="el-dropdown-link">
                  <el-avatar shape="circle" :size="48" :fit="fit" :src="userInfo?userInfo.avatar:''"></el-avatar>
                  <span v-if="!visible" class="userName">{{userInfo.name}}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close" @click="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="home-body">
      <div class="body-inner">
        <el-row type="flex" justify="center" style="width: 100%;">
          <el-col :xl="16" :lg="16" :md="20" :sm="22" :xs="24">
            <el-card class="nine">
              <el-row>
                <el-col :span="8" v-for="(item, index) in realRoutlist" :key="index">
                  <div :to="{name: item.name,query:{id:item._id}}"
                    @click="goToDetail({name: item.name,query:{id:item._id}})" class="router-link">
                    <div class="icon-box">
                      <img :src="item.image" />
                    </div>
                    <div class="item-title">{{item.title}}</div>
                  </div>
                </el-col>
                <!-- <el-col :span="8">
                  <div class="icon-box">
                    <img src="../assets/main/grade.png" />
                  </div>
                  <div class="item-title">年级空间</div>
                </el-col>
                <el-col :span="8">
                  <div class="icon-box">
                    <img src="../assets/main/team.png" />
                  </div>
                  <div class="item-title">社团</div>
                </el-col>
                <el-col :span="8">
                  <div class="icon-box">
                    <img src="../assets/main/special.png" />
                  </div>
                  <div class="item-title">专题空间</div>
                </el-col>
                <el-col :span="8">
                  <div class="icon-box">
                    <img src="../assets/main/topic.png" />
                  </div>
                  <div class="item-title">课题空间</div>
                </el-col>
                <el-col :span="8">
                  <div class="icon-box">
                    <img src="../assets/main/teaching.png" />
                  </div>
                  <div class="item-title">教研空间</div>
                </el-col> -->
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 班级弹窗 s -->
    <el-dialog title="填写信息" :visible.sync="classDialog">
      <el-form :model="classInfo">
        <el-row :gutter="20">
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
            <el-form-item label="专业">
              <el-select v-model="classInfo.region" placeholder="请选择专业">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
            <el-form-item label="班级">
              <el-select v-model="classInfo.region" placeholder="请选择专业">
                <el-option label="2班" value="1"></el-option>
                <el-option label="1班" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classDialog = false">取 消</el-button>
        <el-button type="primary" @click="classdialogHandle('class')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 班级弹窗 e -->
   <!-- 年级弹窗 s -->
   <el-dialog title="填写信息" :visible.sync="gradeDialog">
      <el-form :model="classInfo">
        <el-row :gutter="20">
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
            <el-form-item label="专业">
              <el-select v-model="classInfo.region" placeholder="请选择专业">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
            <el-form-item label="班级">
              <el-select v-model="classInfo.region" placeholder="请选择专业">
                <el-option label="2班" value="1"></el-option>
                <el-option label="1班" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gradeDialog = false">取 消</el-button>
        <el-button type="primary" @click="gradeDialogHandle('class')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 年级弹窗 e -->
    
       <!-- 课题组弹窗 s -->
    <el-dialog title="填写信息" :visible.sync="specialDialog">
        <el-form :model="classInfo">
          <el-row :gutter="20">
            <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
            <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
              <el-form-item label="专业">
                <el-select v-model="classInfo.region" placeholder="请选择专业">
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
              <el-form-item label="班级">
                <el-select v-model="classInfo.region" placeholder="请选择专业">
                  <el-option label="2班" value="1"></el-option>
                  <el-option label="1班" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          </el-row>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specialDialog = false">取 消</el-button>
          <el-button type="primary" @click="specialDialogHandle('class')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 课题组弹窗 e -->
         <!-- 教研组弹窗 s -->
    <el-dialog title="填写信息" :visible.sync="teachingDialog">
        <el-form :model="classInfo">
          <el-row :gutter="20">
            <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
            <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
              <el-form-item label="专业">
                <el-select v-model="classInfo.region" placeholder="请选择专业">
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
              <el-form-item label="班级">
                <el-select v-model="classInfo.region" placeholder="请选择专业">
                  <el-option label="2班" value="1"></el-option>
                  <el-option label="1班" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          </el-row>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="teachingDialog = false">取 消</el-button>
          <el-button type="primary" @click="teachingDialogHandle('class')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 课题组弹窗 e -->
  </div>
</template>
<style>
  .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    width: 77%;
    display: inline-block;
  }
</style>
<script>
  import request from "@/api/request.js"
  export default {
    data() {
      return {
        classInfo: {},
        classDialog: false,//班级弹框是否显示
        gradeDialog: false,//班级弹框是否显示
        teachingDialog: false,//班级弹框是否显示
        specialDialog: false,//班级弹框是否显示
        userInfo: {},
        url: require('../assets/images/user.png'),
        fit: 'cover',
        visible: false,
        keys: ["room_class", "room_grade", "room_community", "room_project", "room_subject", "room_teaching"],
        realRoutlist: [],
        routerList: [
          {
            id: "room_class",
            key: "class_id",
            name: 'classes',
            title: '班级空间',
            image: require('../assets/main/classes.png')
          },
          {
            id: "room_grade",
            key: "grade_id",
            name: 'grade',
            title: '年级空间',
            image: require('../assets/main/grade.png')
          },
          {
            id: "room_community",
            key: "class_id",
            name: 'team',
            title: '社团空间',
            image: require('../assets/main/team.png')
          },
          {
            id: "room_project",
            key: "class_id",
            name: 'special',
            title: '专题空间',
            image: require('../assets/main/special.png')
          },
          {
            id: "room_subject",
            key: "subject_id",
            name: 'topic',
            title: '课题空间',
            image: require('../assets/main/topic.png')
          },
          {
            id: "room_teaching",
            key: "teaching_id",
            name: 'teaching',
            title: '教研空间',
            image: require('../assets/main/teaching.png')
          },
        ]
      }
    },
    mounted() {
      this.getUserInfo();
      this.formatObj()
    },
    methods: {
      classdialogHandle(){
          this.$router.push({
            name:'classes'
          })
      },
      gradeDialogHandle(){
          this.$router.push({
            name:'grade'
          })
      },
     specialDialogHandle(){
          this.$router.push({
            name:'special'
          })
      },
      teachingDialogHandle(){
          this.$router.push({
            name:'teaching'
          })
      },
      topicdialogHandle(){
          this.$router.push({
            name:'topic'
          })
      },
      goToDetail(data) {
        console.log(data);
        switch (data.name) {
          case "classes":
            if (this.$store.state.userInfo.class_id) {
              this.$router.push(data)
            } else {
              this.classDialog = true;
            }
            console.log("classes");
            break;
          case "grade":
          if (this.$store.state.userInfo.class_id) {
              this.$router.push(data)
            } else {
              this.gradeDialog = true;
            }
            console.log("classes");
            break;
            case "special":
          if (this.$store.state.userInfo.class_id) {
              this.$router.push(data)
            } else {
              this.specialDialog = true;
            }
            console.log("classes");
            break;
            case "teaching":
          if (this.$store.state.userInfo.class_id) {
              this.$router.push(data)
            } else {
              this.teachingDialog = true;
            }
            console.log("classes");
            break;
     

        }
      },
      loginout() {
        sessionStorage.setItem('Authorization', '');
        this.$router.push('/login');
      },
      getUserInfo() {
        var userInfo = sessionStorage.getItem('userInfo');
        this.userInfo = JSON.parse(userInfo);
        return JSON.parse(userInfo);
      },
      formatObj() {
        var self = this;
        var realRoutlist = [];
        var userInfo = this.getUserInfo();
        Object.keys(userInfo).forEach(key => {
          self.routerList.forEach(im => {
            if (key == im.id && userInfo[key] == 1) {
              im._id = userInfo[im.key];
              realRoutlist.push(im);
            }
          })
        });
        this.realRoutlist = realRoutlist;
        console.log('realRoutlist', realRoutlist)
      },
      visibleChange(val) {
        this.visible = val
      },
      changeRouter(name) {
      }
    }
  }
</script>

<style lang="scss">
  .view-home {
    height: 100%;
    background: url('../assets/images/bg1.jpg') no-repeat;
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
            text-align: right;

            .el-dropdown {
              height: 100%;

              .el-dropdown-link {
                display: block;
                height: 100%;
                display: flex;
                align-items: center;

                .el-avatar {
                  margin-right: 16px;
                }

                .userName {
                  float: right;
                  font-size: 20px;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }

    .home-body {
      width: 100%;
      flex: 1;

      .body-inner {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;

        .nine {
          background: #F8FBFC;
          margin: 0px 10px;

          .el-card__body {
            padding: 80px;
          }

          .el-col:nth-child(3) {
            box-shadow: 0px 1px #CECDCD;
          }

          .el-col:nth-child(4) {
            box-shadow: 1px 0px #CECDCD;
          }

          .el-col:nth-child(5) {
            box-shadow: 1px 0px #CECDCD;
          }

          .el-col:nth-child(6) {
            box-shadow: 0px 0px #CECDCD;
          }

          .el-col:hover {
            background: #c1e0e8;
            cursor: pointer;
            color: #329EB6;
          }

          .el-col {
            box-shadow: 1px 1px #CECDCD;

            .icon-box {
              width: 100px;
              height: 100px;
              padding: 10px;
              margin: 42px auto 10px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .item-title {
              font-size: 24px;
              text-align: center;
              margin-bottom: 50px;
            }
          }
        }
      }
    }
  }
</style>