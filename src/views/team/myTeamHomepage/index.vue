<template>
  <div class="campus">
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card class="teams" v-for="(item,index) in teamList" :key="index">
          <el-row>
            <el-col :span="16" class="team-info">
              <el-avatar class="team-icon" :size="size" :src="item.avatar"></el-avatar>
              <span class="team-name">{{item.title}}</span>
            </el-col>
            <el-col :span="8" class="team-go-page">
              <el-button type="text" @click="FgotoPage(item)">进入主页<i class="el-icon-arrow-right el-icon--right"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="teamList.length == 0">
          暂无数据
        </el-card>
        <el-row class="addTeam">
          <el-col :span="24">
            <el-button type="primary" @click="addTeamClick">+ 添加社团</el-button>
          </el-col>
        </el-row>
        <el-dialog title="添加社团" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-row>
            <el-col :span="24">如果没有你要加入的社团请点击<el-button type="text" @click="addTeamDialog=true">申请社团</el-button>
            </el-col>
          </el-row>
          <el-select v-model="teamGroup" multiple placeholder="请选择（可多选）">
            <el-option v-for="(item,index) in teamAddList" :key="index" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- 申请社团弹窗 s -->
    <el-dialog title="填写信息" :visible.sync="addTeamDialog">
      <span class="topdes">
        请正确的输入要申请的社团名称，提交后，由后台管理员审核，审核成功后，即可加入该社团
      </span>

      <el-form :model="teamInfo">
        <el-row :gutter="20">
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
            <el-form-item label="社团名称">
              <el-input v-model="teamInfo.title" placeholder="请输入社团名称">

              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
          <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
            <el-form-item label="社团说明">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="teamInfo.statement">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeamDialog = false">取消</el-button>
        <el-button type="primary" @click="addTeam('team')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    name: 'myTeamHomepage',
    data() {
      return {
        teamInfo:{},
        addTeamDialog:false,
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        size: 74,
        circleUrl: require('../../../assets/images/classes/class_else.png'),
        teamList: [],//社团列表-显示
        dialogVisible: false, //添加社团
        teamAddList: [],//被添加的社团组
        teamGroup: [], //已添加的社团组

      }
    },
    mounted() {
      this.getMyTeamList();
    },
    methods: {
      addTeam(){
        request.post('/roomapi/Community/createCommunity',this.teamInfo,(res)=>{
          if(res.data.code==0){
            this.$message.success('创建成功');
            this.addTeamDialog=false;
            this.dialogVisible=false;
          }else{
            this.$message.error(res.message);
          }
        })
      },
      getMyTeamList() {
        request.post('/roomapi/Community/myCommunity', {}, (res) => {
          if (res.code == 0) {
            if (res.data.length > 0) {
              this.teamList = res.data
            }
          }
        })
      },
      FgotoPage(item) {
        this.$router.push({
          path: '/team/myTeamDetail',
          query: {
            c_id: item.c_id,
            title: item.title
          }
        })
      },
      addTeamClick() { //点击添加列表 出现弹窗
        this.getTeamList();
        this.dialogVisible = true;
      },
      getTeamList() { //获取要社团列表 参数  校园id
        let data = {}
        let self = this;
        request.post('/roomapi/Users/CommunityList', data, function (res) {
          if (res.code == 0) {
            self.teamAddList = res.data;
          }
        })
      },
      handleClose() { //关闭弹窗
        this.dialogVisible = false;
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        this.teamGroup = [];
      },
      confirmSelect() { //添加社团 弹窗确认
        var data = {
          community: this.teamGroup
        }
        request.post('/roomapi/Community/editRoom', data,  (res)=> {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: res.message
            });
            this.getMyTeamList(); //刷新我的社团列表
            this.dialogVisible=false;
          }
        })
      }
    }
  }
</script>
<style media="screen" lang="scss" scoped>
  .space-wrap {
    margin-top: 30px;

    .entry-content {
      padding: 0px 10px;

      .teams {
        margin-bottom: 20px;

        .el-row {
          display: flex;
          align-items: center;
        }

        .team-info {
          display: flex;
          align-items: center;

          .team-icon {
            display: inline-block;
            margin-right: 16px;
          }

          .team-name {
            font-size: 28px;
            color: #1E1E1EFF;
            font-weight: 600;
          }
        }

        .team-go-page {
          text-align: right;
        }
      }

      .addTeam {
        margin-top: 44px;

        button {
          width: 201px;
          background: rgba(3, 70, 146, 1);
          border-radius: 4px;
        }
      }
    }
  }
</style>