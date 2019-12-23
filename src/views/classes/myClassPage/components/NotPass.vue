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
    <div class="examineTips">{{total}}个审核未通过的新闻:</div>
    <el-row class="question" v-for="(item,index) in list" :key="index">
      <el-col :span="24" class="title" @click.native="msgDetails(item.id)">{{item.title}}</el-col>
      <el-col :span="24" class="bottom">
        <span>{{item.create_time}}</span>
        <div class="recall">
          <el-button type="text" @click="reEditNews(item.id)">编辑</el-button>
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
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        total: '', //审核未通过数量
        list:[],//审核未通过列表
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList(){ //审核未通过列表  班级class_id
        var self = this;
        var data= {
          c_id: self.userInfo.class_id,
          page: 1,
          psize: 3
        };
        request.post('/roomapi/Room_Class/notAudit', data, function(res){
          if(res.code ==0){
            self.list= res.data.model;
            self.total = res.data.total;
          }
        })
      },
      reEditNews(id){ //重新编辑 回到新闻页面
        let query = {};
        query.id = id; //文章id
        query.isEdit = true;
        query.widgetName = '审核未通过';
        query.fromname = '我的班级';
        query.fromwhere = 'myClassPage';
        query.spaceModule = 'classes';//班级空间名
        this.$router.push({
          name: 'write',
          query: query
        })
      },
      deleteArtcile(id) { //删除文章
        var vm = this;
        vm.$confirm('删除后，你将不再看到该新闻的信息，是否确认删除？', '删除提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//删除文章
          request.post('/roomapi/Room_Class/delete', { id: id }, (res) => {
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
        console.log('shownotpassmore********')
        var tab='notPass';
        this.$emit('changeTab',tab);
      },
      msgDetails(id) { //审核未通过 点击标题 进入新闻详情
        let query = {};
        query.id = id; //文章id
        query.widgetName = '审核未通过';
        query.fromname = '我的班级';
        query.fromwhere = 'myClassPage';
        query.spaceModule = 'classes';//班级空间名
        this.$router.push({
          name: 'readmessage',
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
  .newList{
    list-style: none;
    li{
      padding: 16px 20px 16px 18px;
      margin-left: 20px;
      font-size: 18px;
      background: url('../../../../assets/images/classes/dotg.png') no-repeat 0px center;
      background-size: 8px 8px;
      cursor: pointer;
      position: relative;
      border-bottom: 1px dashed #DEDEDE;
      .text{
        display: block;
        margin-right: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .date{
        position: absolute;
        width: 80px;
        top: 17px;
        right: 0;
        color: #888888;
      }
    }
    li:hover{
      color: #034692;
      background-image: url('../../../../assets/images/classes/dot.png');
    }
  }
  .areablock{
    .areaName{
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .area{
      list-style: none;
      margin-bottom: 30px;
      li{
        float: left;
        width: 33.333%;
        padding: 8px 0px;
        font-size: 18px;
      }
      li:hover{
        color: #034692;
        cursor: pointer;
      }
    }
    .area::after{
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
  }
  .notice{
    font-size: 18px;
    li{
      padding: 8px 0px;
      line-height: 30px;
      border-bottom: 1px dashed #DEDEDE;
      .noticeTitle{
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .noticeDate{
        text-align: right;
        color: #888888;
      }
    }
  }
  .circle{
    text-align: center;
    padding: 24px 0px 14px;
  }
  .myName{
    text-align: center;
    img{
      display: inline-block;
      width: 22px;
      height: 22px;
      vertical-align: middle;
      cursor: pointer;
      position: relative;
      top: -3px;
      left: 12px;
    }
  }
  .dynamic{
    height: 108px;
    margin-top: 30px;
    border-radius:12px;
    overflow: hidden;
    background-color: #D3E1F1;
    .dynamic-g,.dynamic-c{
      float: left;
      width: 50%;
      height: 100%;
      text-align: center;
      color: #034692;
      font-size: 26px;
      .count{
        width: 100%;
        height: 48px;
        line-height: 48px;
        margin-top: 26px;
      }
      .title{
        font-size: 16px;
        color: #333;
      }
    }
    .dynamic-g:first-child{
      .count{
        box-shadow: 1px 0px #819EBF;
      }
    }

  }
  .dynamic::after{
    content: '';
    display: block;
    height: 0;
    clear: both;
  }
  .vistorCount{
    font-size: 20px;
    color: #1E1E1E;
    font-weight: 600;
  }
  .lately{
    font-size: 16px;
    color: #034692;
    padding: 15px 0px 20px;
  }
  .vistor-avatar{
    margin-top: 10px;
    margin-right: 10px;
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
