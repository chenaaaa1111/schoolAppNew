<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <h2 class="cardTitle"><img src="../../../../assets/images/myhome/vistor.png" />最近访客</h2>
    </div>
    <h2 class="vistorCount">
      总共访问: {{this.userInfo.access_class}}人次
    </h2>
    <div class="lately">最近10个访客:</div>
    <div>
      <span @click="goOther(item.id)" v-for="(item,index) in visitors" :key="index">
        <el-avatar class="vistor-avatar" icon="el-icon-user-solid" :size="44" :src="item.avatar"></el-avatar>
      </span>
    </div>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    data() {
      return {
        userInfo: {},//用户信息
        circleUrl: require('../../../../assets/images/user.png'),
        visitors: [], //最近10位访客
      }
    },
    created(){
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      console.log('userInfo',this.userInfo);
    },
    mounted() {
      this.getVisitors();
    },
    methods: {
      goOther(id) { //到别人的主页中 id: 用户id
        this.$router.push({
          name: 'otherHomepage',
          query:{
            id: id
          }
        })
      },
      getVisitors() {
        let self = this;
        let id = self.$store.state.userInfo.id
        var data = {
          uid: id
        }
        request.post('/roomapi/Room_Class/visitors', data, function (res) {
          self.visitors = res.data;
        })
      }
    }
  }
</script>
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
  }
</style>