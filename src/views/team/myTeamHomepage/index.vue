<template>
  <div class="campus">
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card class="teams" v-for="(item,index) in teamList" :key="index">
          <el-row>
            <el-col :span="16" class="team-info">
              <el-avatar class="team-icon" :size="size" :src="circleUrl"></el-avatar>
              <span class="team-name">{{item.name}}</span>
            </el-col>
            <el-col :span="8" class="team-go-page">
              <el-button type="text">进入主页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'myTeamHomepage',
    components: {

    },
    data() {
      return {
        size: 74,
        circleUrl: require('../../../assets/images/classes/class_else.png'),
        teamList: [
          {
            name: '足球队'
          },
          {
            name: '篮球队'
          },
          {
            name: '电竞队'
          },
          {
            name: '乒乓球队'
          },
          {
            name: '熊猫队'
          },
        ]
      }
    },
    methods: {

    }
  }
</script>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
      .teams{
        margin-bottom: 20px;
        .el-row{
          display: flex;align-items: center;
        }
        .team-info{
          display: flex;
          align-items: center;
          .team-icon{
            display: inline-block;
            margin-right: 16px;
          }
          .team-name{
            font-size: 28px;
            color: #1E1E1EFF;
            font-weight: 600;
          }
        }
        .team-go-page{
          text-align: right;
        }
      }
    }
  }
</style>
