<template>
  <el-card>
    <div slot="header" class="clearfix card-head-solt">
      <img :src="url" />
      <span>教研组组员</span>
    </div>
    <div class="avartContent" id="avartContent">
      <div v-if="alumnus.length == 0">暂无教研组组员</div>
      <div v-if="alumnus.length>0">
        <div class="avaters" v-for="(item,index) in alumnus" :key="index" @click="goOtherHomepage(item)">
          <el-avatar :src="item.avatar" icon="el-icon-user-solid"></el-avatar>
          <p class="txcenter">{{item.name}}</p>
        </div>
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
      teachingInfo: {}, //教研组信息
      fromwhere: "",
      fit: "cover",
      url: require("../../../../assets/images/teaching/group1.png"),
      showstate: "down",
      alumnus: [] //教研组组员
    };
  },
  mounted() {
    this.teachingInfo = this.$route.query;
    this.getTeachingGroup();
  },
  methods: {
    getTeachingGroup() { //教研组id
      var data = { class_id: this.teachingInfo.category_id };
      var self = this;
      requst.post("/roomapi/Teaching/TeachingUser", data, function(res) {
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
    goOtherHomepage(item) { //跳转到别人的主页  教研组id   c_id
      let query = item;
      query.category_id = query.c_id;
      this.$router.push({
        name: 'othersHomepage',
        query: query
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
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
