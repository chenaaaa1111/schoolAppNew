<template>
  <el-card>
    <div slot="header" class="clearfix card-head-solt">
      <img :src="url" />
      <span>课题组组员</span>
    </div>
    <div class="avartContent" id="avartContent">
      <div class="avaters" v-for="(item,index) in alumnus" :key="index" @click="goOtherTopicHomePage(item)">
        <el-avatar :src="item.avatar" icon="el-icon-user-solid"></el-avatar>
        <p class="txcenter">{{item.name}}</p>
      </div>
    </div>
    <p class="btupDwon" @click="changeUp" :style="{}">
      {{showstate=='up'?'收起':'展开'}}
      <span class="iconupdow">
        <van-icon :name="showstate=='up'?'arrow-up':'arrow-down'" />
      </span>
    </p>
  </el-card>
</template>
<script>
import requst from "@/api/request.js";
export default {
  data() {
    return {
      fit: "cover",
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
      url: require("../../../../assets/images/teaching/group1.png"),
      showstate: "down",
      alumnus: [] //课题组组员
    };
  },
  mounted() {
    this.getTopicGroup();
  },
  methods: {
    getTopicGroup() {
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      var data = { class_id: userInfo.subject_id };
      var self = this;
      requst.post("/roomapi/Subject/SubjectUser", data, function(res) {
        if(res.code ==0){
          self.alumnus = res.data;
        }
      });
    },
    changeUp() {
      if (this.showstate == "up") {
        this.showstate = "down";
        document.getElementById("avartContent").style.maxHeight = "350px";
      } else {
        this.showstate = "up";
        document.getElementById("avartContent").style.maxHeight = "inherit";
      }
    },
    goOtherTopicHomePage(item) { //点击课题组组员  进入他的主页课题c_id 用户名name  课题组成员id 需要加上课题组名
      this.$router.push({
        name: 'otherTopicDetail',
        query: item
      })
    }
  }
};
</script>
</script>
<style>
</style>
<style lang="scss" scoped>
.card-head-solt {
  span {
    font-size: 24px;
    font-weight: 600;
    color: #1e1e1e;
    position: relative;
    top: 5px;
  }
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 10px;
  }
}

.iconupdow {
  border-radius: 50%;
  border: 1px solid #888888;
  width: 20px;
  height: 20px;
  line-height: 0.33rem;
  display: inline-block;
}
.btupDwon {
  text-align: center;
  padding-top: 30px;
}
.leftPhotoTop {
  height: 80px;
  line-height: 80px;
  padding-left: 40px;
  border-bottom: 1px solid #dfdfdf;
}
.avartContent {
  padding: 10px 20px 20px 20px;
  overflow: hidden;
  max-height: 460px;
}
.txcenter {
  text-align: center;
  line-height: 30px;
}
.avaters {
  display: inline-block;
  width: 23%;
  padding: 5px 0;
  cursor: pointer;
  margin-bottom: 20px;
  p {
    font-size: 14px;
    font-weight: bold;
    // margin-top: 10px;
  }
}
.avaters img {
  max-width: 100%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
</style>
