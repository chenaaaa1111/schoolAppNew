<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 个人信息 -->
            <UserInfo></UserInfo>
            <!-- 最近访客 -->
            <Visitor></Visitor>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <el-row :gutter="10">
                <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="12" class="top-box">
                    <span class="top-title">专题动态</span>
                  </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  :xl="6"
                  :lg="6"
                  :md="8"
                  :sm="12"
                  :xs="12"
                  class="move-box"
                  v-for="(item,index) in specialList"
                  :key="index"
                >
                  <div class="move-cover">
                    <div class="img-wrap">
                      <img :src="item.avatar" />
                    </div>
                    <span class="move-btn" @click="showplay">
                      <img src="../../../assets/images/classes/play.png" />
                    </span>
                  </div>
                  <div class="move-title">{{item.title}}</div>
                  <div class="move-del">
                    <el-button plan size="small" @click="fdelete(item.id)">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PageTop from "./components/PageTop.vue";
import UserInfo from "./components/UserInfo.vue";
import Visitor from "./components/Visitor.vue";
import request from "@/api/request.js";
export default {
  name: "otherHomepage",
  components: {
    PageTop,
    UserInfo,
    Visitor
  },
  data() {
    return {
      keyWord: "", //搜索关键字
      page: "",
      psize: "",
      usertotal: "", //专题动态数
      routename: "",
      specialList: [],//专题列表
    };
  },
  created() {
    this.getSpecialList();
  },
  mounted() {
    this.routename = this.$route.name;
    console.log(this.routename, "本页面routename");
  },
  methods: {
    fdelete(id) {
      this.fopencinfirm(id);
    },
    fopencinfirm(id) {
      this.$confirm("此删除不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.post("/roomapi/Project/delete", { id: id }, res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.get;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getSpecialList() {
      //获取我的专题列表
      var data = {
        u_id: this.$store.state.userInfo.id,
        keyword: this.keyWord,
        page: this.page,
        psize: this.psize
      };
      var self = this;
      request.post("/roomapi/Project/myPage", data, function(res) {
        if (res.code == 0) {
          self.specialList = res.data.model;
          self.usertotal = res.data.total;
        }
      });
    },
    showplay() {
      // 打开专题详情
      this.$router.push({
        name: "showmovie",
        query: {
          fromwhere: "otherHomepage"
        }
      });
    }
  }
};
</script>
<style lang="scss">
.active {
  color: #034692;
  font-size: 20px;
}

.topBar span {
  margin-right: 38px;
  font-size: 20px;
}

.ellipsis {
  img {
    display: none;
  }
}

.noEllipsis {
  img {
    width: 100%;
    display: block;
    margin: 10px 0px;
    border-radius: 8px;
  }
}
</style>
<style media="screen" lang="scss" scoped>
.space-wrap {
  margin-top: 30px;

  .entry-content {
    padding: 0px 10px;

    .el-menu-demo {
      border: 0;

      .el-menu-item {
        font-size: 20px;
        font-weight: 600;
        height: 24px;
        line-height: 24px;
      }

      .is-active {
        color: #034692;
        border-bottom: 0;
      }
    }
  }
  .top-box {
    width: 100%;
    position: relative;
    text-align: center;
    margin-bottom: 35px;
    .top-title {
      display: inline-block;
      width: 200px;
      height: 50px;
      border: 1px solid #034692;
      border-radius: 25px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .move-box {
    margin-bottom: 30px;

    .move-cover {
      position: relative;
      width: 100%;
      padding-bottom: 56%;
      border-radius: 8px;
      overflow: hidden;

      .img-wrap {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .move-btn {
        display: block;
        position: absolute;
        width: 38px;
        height: 38px;
        top: 50%;
        left: 50%;
        margin: -19px 0px 0px -19px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }

    .move-title {
      font-size: 16px;
      color: #1e1e1eff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 22px;
      margin-top: 8px;
    }

    .move-del {
      margin-top: 8px;

      .el-button {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>