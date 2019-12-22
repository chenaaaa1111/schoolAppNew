<template>
  <div class="campus">
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card class="teams" v-for="(item,index) in teachingList" :key="index" >
          <el-row>
            <el-col :span="16" class="team-info">
              <el-avatar class="team-icon" :size="size" :src="item.avatar"></el-avatar>
              <span class="team-name">{{item.title}}</span>
            </el-col>
            <el-col :span="8" class="team-go-page" >
              <el-button type="text" @click="FgotoPage(item)">进入主页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="teachingList.length == 0">
          暂无数据
        </el-card>
        <el-row class="addTeam">
          <el-col :span="24">
            <el-button type="primary" @click="addTeachingClick">+ 添加教研组</el-button>
          </el-col>
        </el-row>
        <el-dialog title="添加教研组" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-row>
            <el-col :span="24">如果没有你要加入的教研组请点击<el-button type="text">申请教研组</el-button></el-col>
          </el-row>
          <el-select v-model="teachingGroup" multiple placeholder="请选择（可多选）">
            <el-option
              v-for="(item,index) in teachingAddList"
              :key="index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'myTeachGroupHomepage',
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        size: 74,
        teachingList: [],//教研组列表-显示
        dialogVisible: false, //添加教研组
        teachingAddList: [],//被添加的教研组组
        teachingGroup: [], //已添加的教研组组

      }
    },
    mounted() {
      this.getMyTeachingList();
    },
    methods: {
      getMyTeachingList() {
        request.post('/roomapi/Community/myCommunity',{},(res)=>{
          if(res.code == 0) {
            if(res.data.length > 0) {
              this.teachingList = res.data
            }
          }
        })
      },
      FgotoPage(item){ //点击进入我的教研组 主页
        this.$router.push({
          name:'myTeachMainHomepage',
          query: item
        })
      },
      addTeachingClick(){ //点击添加列表 出现弹窗
        this.getTeachingList();
        this.dialogVisible = true;
      },
      getTeachingList() { //获取要教研组列表 参数  校园id
        let data = {
          level_id: this.userInfo.level_id
        }
        let self = this;
        request.post('/roomapi/Users/Teaching', data, function (res) {
          if (res.code == 0) {
            self.teachingAddList = res.data;
          }
        })
      },
      handleClose(){ //关闭弹窗
        this.dialogVisible = false;
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
        this.teachingGroup = [];
      },
      confirmSelect(){ //添加教研组 弹窗确认
        var data = {
          community: this.teachingGroup
        }
        request.post('/roomapi/Community/editRoom', data, function (res) {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: res.message
            });
            this.getMyTeachingList(); //刷新我的教研组列表
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

      .addTeam{
        margin-top: 44px;
        button{
          width:201px;
          background:rgba(3,70,146,1);
          border-radius:4px;
        }
      }
    }
  }
</style>
