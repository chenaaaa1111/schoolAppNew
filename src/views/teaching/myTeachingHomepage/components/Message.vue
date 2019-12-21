<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle">
        <img
          style="background:#226BB4;border-radius: 50%;"
          src="../../../../assets/images/myhome/message.png"/>
          <el-badge :value="total" :max="99" class="item">
            消息通知
          </el-badge>
      </span>
      <span class="more" @click="showmessagemore">
        <span class="text">全部</span><img src="../../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <el-row class="question" v-for ="(item,index) in messages" :key="index">
      <el-col :span="24" class="title" @click.native="msgDetails(item)">{{item.title}}</el-col>
      <el-col :span="24" class="bottom1">
        <span>{{item.create_time}}</span>
      </el-col>
      <el-col :span="24" ><el-divider></el-divider></el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        messages:[], //消息列表
        total: '', //消息数量
      }
    },
    mounted(){
      this.getMessages();
    },
    methods: {
        getMessages(){
          var self = this;
          var data= {
            kid: 1,
            page: 1,
            psize: 4
          };
          request.post('/roomapi/Users/userMessage',data,function(res){
            self.messages = res.data.model;
            self.total = res.data.total;
        })
      },
      showmessagemore() { //消息通知 点击全部
        console.log(222222);
        // this.$router.push({
        //   name: 'messagemore',
        //   params: {
        //     widgetName: '消息通知',
        //     fromwhere: this.source
        //   }
        // })
        var tab='message';
        this.$emit('changeTab',tab);
        console.log("message")
      },
      msgDetails(item) { //点击消息 --进入消息通知详情页面
        let query = {};
        query.widgetName = '消息通知';
        query.fromname = '我的主页';
        query.fromwhere = 'myHomepage';
        query.spaceModule = 'classes';//班级空间名
        query.id = item.id; //消息id
        this.$router.push({
          name: 'readmessage',
          query: query
        })
      }
    }
  }
</script>
<style media="screen" lang="scss">
.item{
  .is-fixed{
    right: -3px!important;
    top: 14px!important;
  }
}
</style>
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
    .bottom1{
     padding: 20px 0;
     
    }
  }
}
</style>
