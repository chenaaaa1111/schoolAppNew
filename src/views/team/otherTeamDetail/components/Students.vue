<template>
  <el-card>
    <div slot="header" class="clearfix card-head-solt">
      <img :src="url" />
      <span>学生主页</span>
    </div>
    <div class="avartContent" id="avartContent">
      <div class="avaters" v-for="(item,index) in alumnus" :key="index" @click="goOther(item)">
        <img :src="item.avatar" alt="头像" />
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
import request from "@/api/request.js";
export default {
  name: "students",
  props: {
    teamId: {
      default: ""
    }
  },
  data() {
    return {
      fromwhere: "",
      fit: "cover",
      url: require("../../../../assets/images/grade/peple.png"),
      dataList: [],
      showstate: "down",
      alumnus: []
    };
  },
  mounted() {
    this.fromwhere = this.$route.params.fromwhere;
    this.getStudents();
  },
  methods: {
    getStudents() {
      var data = {
        c_id: this.$props.teamId
      };
      var self = this;
      request.post("/roomapi/Community/communityUser", data, function(res) {
        self.alumnus = res.data;
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
    goOther(data) {
      this.$emit("toOtherHomepage", data);
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
