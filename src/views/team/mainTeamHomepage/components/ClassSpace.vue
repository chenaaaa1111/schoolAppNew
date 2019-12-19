<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle">
        <img src="../../../../assets/images/grade/space.png" />社团空间
      </span>
      <span class="more" @click="showOtherTeam" v-if="false">
        <img src="../../../../assets/images/classes/more.png" />
      </span>
    </div>
    <div
      class="areablock"
      v-for="(item,index) in areaList"
      :key="index"
      v-show="item.class.length > 0"
    >
      <div class="areaName">
        <img src="../../../../assets/images/classes/classFlg.png" />
        {{item.title}}
      </div>
      <ul class="area">
        <li v-for="(res,num) in item.class" :key="num" @click="toOtherClass(res)">{{res.title}}</li>
      </ul>
    </div>
  </el-card>
</template>
<script>
import request from "@/api/request.js";
export default {
  name: "ClassSpace",
  props: {
    source: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      areaList: [
        {
          title: "",
          class: [
            {
              title: ""
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      var self = this;
      var data = {};

      request.post("/roomapi/Community/CommunityList", data, function(res) {
        self.areaList = res.data;
      });
    },
    showOtherTeam() {
      // 弃用
      this.$router.push({
        name: "classesmore",
        params: {
          fromwhere: this.source.routename
        }
      });
    },
    toOtherClass(team) { //社团id
      this.$store.commit("setTeamId", team.id);
      this.$router.push({
        name: "oterTeamDetail",
        query: {
          id: team.id,
          avatar: team.avatar,
          title: team.title
        }
      });
    }
  }
};
</script>
<style lang="scss">
.banner-card {
  margin-bottom: 12px;
  .cardTitle {
    font-size: 24px;
    font-weight: 500;
    img {
      display: inline-block;
      width: 38px;
      height: 38px;
      vertical-align: middle;
      margin-right: 10px;
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
      img {
        margin-right: 8px;
        vertical-align: middle;
      }
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
}
</style>
