<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle">
        <img
          style="background:#226BB4;border-radius: 50%;"
          src="../../../../assets/images/myhome/examine.png"/>审核中
      </span>
      <span class="more" @click="showexaminemore">
        <span class="text">全部</span><img src="../../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <div class="examineTips">{{list.length}}个正在审核中的新闻:</div>
    <el-row class="question" v-for="(item,index) in list" :key="index">
      <el-col :span="24" class="title"><el-button class="titleName" type="text" @click="msgDetails(item.id)">{{item.name}}</el-button></el-col>
      <el-col :span="24" class="bottom">
        <span>{{item.create_time}}</span>
        <el-button type="text" @click="recall(item)">撤回</el-button>
      </el-col>
      <el-col :span="24" ><el-divider></el-divider></el-col>
    </el-row>

  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'examine',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        list: []
      }
    },
    created(){
      
    },
    mounted(){
      this.getExamine();
    },
    methods: {
      getExamine(){
        var self = this;
        var data= {
          id:self.$store.state.userInfo.id,
          page:1,
          psize:3
        };
        request.post('/roomapi/Room_Class/audit',data,function(res){
          console.log(self.list,'审核中的文章列表')
          self.list = res.data.model;
        })
      },
      showexaminemore() {
        console.log('去更多审核中')
        // this.$router.push({
        //   path: '/noticemore',
        //   query: {
        //     widgetName: '审核中',
        //     fromwhere: this.source,
        //     loadUrl:'/roomapi/Room_Class/audit'
        //   }
        // })
        var tab='examing';
        this.$emit('changeTab',tab);
      },
      //点击撤回  跳转到编辑新闻页面 并携带信息过去 isEdit==true
      recall(item) {
        let query = item;
        query.widgetName = '审核中';
        query.fromname = '我的主页';
        query.fromwhere = 'myHomepage';
        query.spaceModule = 'classes';//班级空间名
        query.isEdit = true;
        this.$router.push({
          name: 'write',
          query: query
        })
      },
      msgDetails(id) {
        console.log('点击进去审核中--文章详情')
        let query = {};
        query.widgetName = '审核中';
        query.fromname = '我的主页';
        query.fromwhere = 'myHomepage';
        query.spaceModule = 'classes';//班级空间名
        query.id = id; //文章id
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
    // height: 16px;
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
        cursor: pointer;
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
    cursor: pointer;
    .title{
      font-size: 18px;
      color: #1E1E1E;
      padding: 6px 0px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .bottom{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button{
        cursor: pointer;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        font-size: 12px;
        color:rgba(3,70,146,1);
        span{
          color:rgba(3,70,146,1);
        }
      }
    }
  }
}
</style>
