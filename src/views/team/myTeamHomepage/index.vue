<template>
  <div class="campus">
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card class="teams" v-for="(item,index) in teamList" :key="index" >
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
        <el-card v-if="teamList.length == 0">
          暂无数据
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'myTeamHomepage',
    data() {
      return {
        size: 74,
        circleUrl: require('../../../assets/images/classes/class_else.png'),
        teamList: [],//社团列表
      }
    },
    mounted() {
      this.getMyTeamList()
    },
    methods: {
      getMyTeamList() {
        request.post('/roomapi/Community/myCommunity',{},(res)=>{
          if(res.code == 0) {
            if(res.data.length > 0) {
              this.teamList = res.data
            }
          }
        })
      },
      FgotoPage(item){
        this.$router.push({
          path:'/team/myTeamDetail',
          query:{
            c_id: item.c_id,
            title: item.title
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
    }
  }
</style>
