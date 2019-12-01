<template>
  <div class="campus">
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-card class="teams" v-for="(item,index) in teamList" :key="index" >
          <el-row>
            <el-col :span="16" class="team-info">
              <el-avatar class="team-icon" :size="size" :src="item.avatar"></el-avatar>
              <span class="team-name">{{item.name}}</span>
            </el-col>
            <el-col :span="8" class="team-go-page" >
              <el-button type="text" @click="FgotoPage(item.id)">进入主页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default {
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
      FgotoPage(id) {
        console.log(id,'ididid');
        this.$router.push({
          path: '/team/myTeamDetail',
          query: { id: id }
        })
      },
      getTeams() {
        var data = {};
        var self = this;
        request.post('/roomapi/Community/myCommunity', data, function (res) {
          if (res.data.length == 0) {
            res.data = [{
              "id": 1,
              "s_id": 1,
              "c_id": 1,
              "title": "0",
              "u_id": 1,
              "avatar": "https:\/\/www.empirise.com\/mall\/public\/images\/slide\/20191111\/3b3ddc44b8d93e5cedd62f7060ca2895.jpg",
              "name": "姓名",
              "create_time": "2019-09-07 12:49:09"
            }, {
              "id": 1,
              "s_id": 1,
              "c_id": 1,
              "title": "0",
              "u_id": 1,
              "avatar": "https:\/\/www.empirise.com\/mall\/public\/images\/slide\/20191111\/3b3ddc44b8d93e5cedd62f7060ca2895.jpg",
              "name": "姓名",
              "create_time": "2019-09-07 12:49:09"
            }]
          }
          self.teamList = res.data;
        })
      }
    },
    mounted() {
      this.getTeams();
      console.log('ssdfsdfasdf')
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