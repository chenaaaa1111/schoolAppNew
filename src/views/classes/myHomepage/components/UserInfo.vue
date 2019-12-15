<template>
  <!-- 个人头像信息 -->
  <el-card class="banner-card">
    <div class="circle" style="text-align: center;">
      <el-avatar :size="120" :src="circleUrl"></el-avatar>
    </div>
    <h2 class="myName">
      {{userInfo.name}}
      <img src="../../../../assets/images/myhome/editName.png" @click="editName" />
      <!-- <i class="el-icon-edit"></i> -->
      <!-- <img :src="userInfo.avatar||'../../../../assets/images/myhome/editName.png'"/> -->
    </h2>
    <div class="dynamic">
      <div class="dynamic-g">
        <p class="count">{{SchoolDynamic}}</p>
        <p class="title" @click="allSchoolDynamic">校园动态</p>
      </div>
      <div class="dynamic-c">
        <p class="count">{{ClassDynamic}}</p>
        <p class="title" @click="allClassDynamic">班级动态</p>
      </div>
    </div>
  </el-card>
</template>
<script>
import request from "@/api/request.js";
export default {
  data() {
    return {
      circleUrl: "",
      // circleUrl: require('../../../../assets/images/user.png'),
      userInfo: {}, //用户信息
      ClassDynamic: 0,
      SchoolDynamic: 0
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("userInfo", this.userInfo);
    this.circleUrl = this.userInfo.avatar;
  },
  mounted() {
    this.getShoolDynamic();
    this.getClassDynamic();
    this.$root.eventLister.$on('changeNumEvent', this.changeNumEvent);//数量变化监听
    // this.SchoolDynamic=this.$store.state.SchoolDynamic;
    // this.ClassDynamic=this.$store.state.ClassDynamic;
  },
  methods: {
    allSchoolDynamic() { //点击校园动态
      var tab = 'allSchoolDynamics';
      this.$emit('changeTab',tab);
    },
    allClassDynamic() { //点击班级动态
      var tab = 'allClassDynamics';
      this.$emit('changeTab',tab);
    },
    getShoolDynamic() {
      //获取校园动态数量
      let self = this;
      let data = {
        uid: self.$store.state.userInfo.id,
        page: 1,
        psize: 3,
        level: 2
      };
      request.post("/roomapi/Room_Class/myPage", data, function(res) {
        self.SchoolDynamic = res.data.total;
      });
    },
    getClassDynamic() {
      //获取班级动态数量
      let self = this;
      var data = {
        uid: self.$store.state.userInfo.id,
        page: 1,
        psize: 3,
        level: 1
      };
      request.post("/roomapi/Room_Class/myPage", data, function(res) {
        self.ClassDynamic = res.data.total;
      });
    },
    changeNumEvent(flag) { //班级动态中删除了新闻后  监听操作状态 来改变数量
      console.log(flag,'是否进行了删除操作')
      if(flag == 1){
        this.getClassDynamic();
      }else if(flag == 2){
        this.getShoolDynamic();
      }
    },
    editName() {
      this.$router.push({
        name: 'userBaseInfo'
      })
    }
  }
};
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
      background: url("../../../../assets/images/classes/dotg.png") no-repeat
        0px center;
      background-size: 8px 8px;
      cursor: pointer;
      position: relative;
      border-bottom: 1px dashed #dedede;
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
      background-image: url("../../../../assets/images/classes/dot.png");
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
      border-bottom: 1px dashed #dedede;
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
    background-color: #d3e1f1;
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
        box-shadow: 1px 0px #819ebf;
      }
    }
  }
  .dynamic::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  .vistorCount {
    font-size: 20px;
    color: #1e1e1e;
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
