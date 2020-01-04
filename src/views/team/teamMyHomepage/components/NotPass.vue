<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle">
        <img
          style="background:#226BB4;border-radius: 50%;"
          src="../../../../assets/images/myhome/notpass.png"/>审核未通过
      </span>
      <span class="more" @click="shownotpassmore">
        <span class="text">全部</span><img src="../../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <div class="examineTips">{{total}}个审核未通过的信息:</div>
    <el-row class="question" v-for="(item,index) in List" :key="index">
      <el-col :span="24" class="title" @click.native="msgDetails(item.id)">{{item.title}}</el-col>
      <el-col :span="24" class="bottom">
        <span>{{item.create_time}}</span>
        <div class="recall">
          <el-button type="text" @click="reEdit(item.id)">编辑</el-button>
          <el-button type="text" @click="deleteArtcile(item.id)">删除</el-button>
        </div>
      </el-col>
      <el-col :span="24" ><el-divider></el-divider></el-col>
    </el-row>

  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'NotPass',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        total: '', //审核未通过数量
        List:[],//审核未通过列表
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList(){ //审核未通过列表
        var data= {};
        request.post('/roomapi/Community/notAudit',data,(res) =>{
          this.List= res.data.model;
          this.total = res.data.total;
        })
      },
      reEdit(id){ //重新编辑 
        let query = {};
        query.id = id; //文章id
        query.isEdit = true;
        query.widgetName = '审核未通过';
        query.fromname = '我的主页';
        query.fromwhere = 'teamMyHomepage';
        query.spaceModule = 'team';//社团空间名
        this.$router.push({
          name: 'write',
          query: query
        })
      },
      deleteArtcile(id) { //删除信息
        var vm = this;
        vm.$confirm('删除后，你将不再看到该信息，是否确认删除？', '删除提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//删除文章
          request.post('/roomapi/Community/delete', { id: id }, (res) => {
            if(res.code == 0){
              vm.$message({
                duration: 1000,
                offset: 190,
                type: 'success',
                message: res.message
              });
            }
            this.getList();
          })
        }).catch(() => {
          vm.$message({
            duration: 1000,
            offset: 190,
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      shownotpassmore(tab) {
        var tab='notPass';
        this.$emit('changeTab',tab);
      },
      msgDetails(id) { //审核未通过 点击标题 进入新闻详情
        let query = {};
        query.id = id; //文章id
        query.widgetName = '审核未通过';
        query.fromname = '我的主页';
        query.fromwhere = 'teamMyHomepage';
        query.spaceModule = 'team';//班级空间名
        this.$router.push({
          name: 'teamReadmessage',
          query: query
        })
      }
    }
  }
</script>
<style lang="scss">
.banner-card{
  margin-bottom: 12px;
  .cardTitle{
    font-size: 24px;
    font-weight: 600;
    img{
      display: inline-block;
      width: 38px;
      height: 38px;
      vertical-align: middle;
      margin-right: 17px;
    }
  }
  .more{
    float: right;
    display: block;
    // width: 16px;
    height: 16px;
    cursor: pointer;
    margin-top: 0.1rem;
    .text{
      position: relative;
      top: 2px;
      margin-right: 10px;
      color: #888;
    }
    img{
      display: inline;
      width: 18px;
      vertical-align: middle;
    }
  }
  .examineTips{
    font-size: 14px;
    color: red;
    line-height: 30px;
  }
  .question{
    margin-top: 10px;
    .title{
      font-size: 18px;
      color: #1E1E1E;
      padding: 6px 0px;
    }
  }
}
</style>
