<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle">
        <img style="background:#226BB4;border-radius: 50%;" src="../../../../assets/images/myhome/message.png" />
        <el-badge :value="total" :max="99" class="item">
          消息通知
        </el-badge>
      </span>
      <span class="more" @click="showmessagemore">
        <span class="text">全部</span><img src="../../../../assets/images/classes/more.png" />
      </span>
    </div>
    <el-row class="question" v-for="(item,index) in messages" :key="index">
      <el-col :span="24" class="title">
        <el-button @click="msgDetails(item)" type="text">{{item.title}}</el-button>
      </el-col>
      <el-col>
        <el-row>
          <el-col :span="14" class="time">{{item.create_time}}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        messages: [],
        total: 0
      }
    },
    mounted() {
      this.getMessages();
    },
    methods: {
      getMessages: function () {
        var self = this;
        var data = {
          kid: 4, //空间： 1班级空间2年级空间3社团4专题5课题6教研
          page: 1, 
          psize: 4
        };
        request.post('/roomapi/Users/userMessage', data, function (res) {
          if(res.code ==0){
            self.messages = res.data.model
            self.total = res.data.total;
          }
        })
      },
      showmessagemore() {
        var tab = 'message';
        this.$emit('changeTab', tab);
      },
      msgDetails(item) { //点击消息 --进入消息通知详情页面
        let query = {};
        query.widgetName = '消息通知';
        query.fromname = '我的专题';
        query.fromwhere = 'mySpecialHomepage';
        query.spaceModule = 'special';//专题空间名
        query.id = item.id; //消息id
        this.$router.push({
          name: 'specialReadmessage',
          query: query
        })
      }
    }
  }
</script>
<style media="screen" lang="scss">
  .item {
    .is-fixed {
      right: -3px !important;
      top: 14px !important;
    }
  }
</style>
<style lang="scss">
  .banner-card {
    margin-bottom: 12px;

    .cardTitle {
      font-size: 24px;
      font-weight: 600;

      img {
        display: inline-block;
        width: 38px;
        height: 38px;
        vertical-align: middle;
        margin-right: 17px;
      }
    }

    .more {
      float: right;
      display: block;
      // width: 16px;
      height: 16px;
      cursor: pointer;
      margin-top: 0.1rem;

      .text {
        position: relative;
        top: 2px;
        margin-right: 10px;
        color: #888;
      }

      img {
        display: inline;
        width: 18px;
        vertical-align: middle;
      }
    }

    .newList {
      list-style: none;

      li {
        padding: 16px 20px 16px 18px;
        margin-left: 20px;
        font-size: 18px;
        background: url('../../../../assets/images/classes/dotg.png') no-repeat 0px center;
        background-size: 8px 8px;
        cursor: pointer;
        position: relative;
        border-bottom: 1px dashed #DEDEDE;

        .text {
          display: block;
          margin-right: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .date {
          position: absolute;
          width: 80px;
          top: 17px;
          right: 0;
          color: #888888;
        }
      }

      li:hover {
        color: #034692;
        background-image: url('../../../../assets/images/classes/dot.png');
      }
    }

    .areablock {
      .areaName {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
      }

      .area {
        list-style: none;
        margin-bottom: 30px;

        li {
          float: left;
          width: 33.333%;
          padding: 8px 0px;
          font-size: 18px;
        }

        li:hover {
          color: #034692;
          cursor: pointer;
        }
      }

      .area::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
      }
    }

    .notice {
      font-size: 18px;

      li {
        padding: 8px 0px;
        line-height: 30px;
        border-bottom: 1px dashed #DEDEDE;

        .noticeTitle {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .noticeDate {
          text-align: right;
          color: #888888;
        }
      }
    }

    .circle {
      text-align: center;
      padding: 24px 0px 14px;
    }

    .myName {
      text-align: center;

      img {
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

    .dynamic {
      height: 108px;
      margin-top: 30px;
      border-radius: 12px;
      overflow: hidden;
      background-color: #D3E1F1;

      .dynamic-g,
      .dynamic-c {
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
        color: #034692;
        font-size: 26px;

        .count {
          width: 100%;
          height: 48px;
          line-height: 48px;
          margin-top: 26px;
        }

        .title {
          font-size: 16px;
          color: #333;
        }
      }

      .dynamic-g:first-child {
        .count {
          box-shadow: 1px 0px #819EBF;
        }
      }

    }

    .dynamic::after {
      content: '';
      display: block;
      height: 0;
      clear: both;
    }

    .vistorCount {
      font-size: 20px;
      color: #1E1E1E;
      font-weight: 600;
    }

    .lately {
      font-size: 16px;
      color: #034692;
      padding: 15px 0px 20px;
    }

    .vistor-avatar {
      margin-top: 10px;
      margin-right: 10px;
    }

    .examineTips {
      font-size: 14px;
      color: red;
      line-height: 30px;
    }

    .question {
      margin-top: 10px;

      .title {
        font-size: 18px;
        color: #1E1E1E;
        padding: 6px 0px;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .time {
        height: 44px;
        font-size: 14px;
        color: #999999;
        display: flex;
        align-items: center;
      }

      .exit {
        text-align: right;

        .el-button {
          font-size: 12px;
        }
      }
    }
  }
</style>