<template>
  <!-- 班级主页内容组件 -->
  <div id="mainNavBar">
    <div class="mainNavBar">
      <div class="tabContainer">
        <div class="leftBar">
          <van-tabs
            class="mainleftbar"
            swipeable
            :swipe-threshold="5"
            :ellipsis="false"
            v-model="selectTab"
            @change="changeTabs"
          >
            <van-tab v-for="item in dataList" :title="item.title" :name="item.id" :key="item.id">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-click="false"
                @load="onLoad"
              >
                <el-row class="news-row" v-for="(item,index) in contentList" :key="index">
                  <el-col class="news-head" :span="24">
                    <div class="news-title">{{item.title}}</div>
                  </el-col>
                  <el-col :span="24" class="author-info">
                    <el-avatar shape="circle" size="small" :src="item.avatar"></el-avatar>
                    <span>{{item.name}}</span>
                  </el-col>
                  <el-col :span="24" class="news-content">
                    <el-row :gutter="14" class="horizontal-row" v-if="item.isopen == false">
                      <el-col :xl="8" :lg="8" :md="8" :sm="10" :xs="10" class="left-img">
                        <img v-if="item.image != ''" :src="setImg(item.image)" alt />
                        <img v-else src="../../../../assets/images/noimg.png" alt />
                      </el-col>
                      <el-col :xl="16" :lg="16" :md="16" :sm="14" :xs="14" class="right-txt">
                        <div class="text" v-html="item.content"></div>
                        <div class="openmore">
                          <el-button type="text" size="mini" @click="openNews(index)">
                            阅读更多
                            <i class="el-icon-caret-bottom"></i>
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="14" class="vertical-row" v-if="item.isopen == true">
                      <el-col :span="24" class="right-txt">
                        <div class="text" v-html="item.content?item.content: '暂无内容'"></div>
                        <div class="openmore">
                          <el-button type="text" size="mini" @click="closeNews(index)">
                            收起
                            <i class="el-icon-caret-top"></i>
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="24" class="news_create_time">
                    <el-row>
                      <el-col :span="12" class="columnInfo">
                        <span class="columnName">栏目: {{item.column_name}}</span>
                        <span>{{item.create_time}}</span>
                      </el-col>
                      <el-col :span="12" class="praise">
                        <img src="../../../../assets/images/unpraise.png"/>
                        <span>0</span>
                      </el-col>
                    </el-row>                    
                  </el-col>
                </el-row>
              </van-list>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </el-backtop>
  </div>
</template>

<script>
import request from "@/api/request.js";
export default {
  name: "mainNavBar",
  data() {
    return {
      classId: '',//进入别人的班级所需的班级id
      selectTab: 0, //选中的标签 栏目列表索引值  初始导航下标 默认全部
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      page: 1, //页数
      psize: 10,
      loading: false, //加载状态
      finished: false, //加载是否完成
      dataList: [], //导航栏目 数组
      keyword: "", //搜索关键字
      contentList: [] //主页右侧主内容列表
    };
  },
  methods: {
    changeTabs(name, title) {
      var _this = this;
      _this.page = 1;
      console.log(name, title);
      _this.$store.commit("setColumnId", name);
      _this.$store.commit("setColumnName", title);
      var data = {
        column: _this.selectTab, //栏目id 0为全部
        class: _this.$route.query.id, //班级id
        keyword: _this.keyword,
        page: _this.page,
        psize: _this.psize
      };
      request.post("/roomapi/Room_Class/classPage", data, function(res) {
        _this.contentList = res.data.model.map(item => {
          item.isopen = false;
          return item;
        });
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getColmn() {
      //获取栏目组列表  所有栏目通用，包括年级栏目，分页参数不传是显示全部
      var self = this;
      var data = {
        keyword: self.keyword
      };
      request.post("/roomapi/Room_Class/column", data, function(res) {
        if (res.code == "0") {
          if (res.data.model.length > 0) {
            self.dataList = res.data.model;
            self.dataList.unshift({ id: 0, title: "全部" }); //手动添加全部 这一栏目 栏目id:0 标题：全部
            var columnId = res.data.model[0] ? res.data.model[0].id : "";
            var columnName = res.data.model[0] ? res.data.model[0].title : "";
            self.$store.commit("setColumnId", columnId);
            self.$store.commit("setColumnName", columnName);
          }
          console.log(
            columnId,
            columnName,
            "fist*************************,***********"
          );
        }
      });
    },
    onLoad() { //进入页面时候 默认执行
      let _this = this;
      let data = {
        column: _this.selectTab,
        class: _this.$route.query.id, //班级id
        keyword: _this.keyword ? _this.keyword : "",
        page: _this.page,
        psize: _this.psize,
      };
      request.post("/roomapi/Room_Class/classPage", data, function(res) {
        console.log(res, "获取数据列表");
        if (res.code == 0) {
          if (res.data.model.length > 0) {
            let list = res.data.model;
            let flagList = list.map(item => {
              item.isopen = false;
              return item;
            });
            for (var i = 0; i < flagList.length; i++) {
              _this.contentList.push(flagList[i]);
            }
            _this.page += 1;
            _this.loading = false;
          } else {
            _this.finished = true;
            _this.loading = false;
            return;
          }
        }
      });
    },
    fslip(item) {
      document.getElementById("content" + item).style.display = "flex";
      document.getElementById("detail" + item).style.display = "none";
    },
    changShow(item) {
      console.log(item);
      document.getElementById("content" + item).style.display = "none";
      document.getElementById("detail" + item).style.display = "block";
    },
    seachInfo(key) { //搜索事件
      var self = this;
      console.log("搜索key" + key);
      self.keyword = key;
      self.page = 1;
      var data = {
        column: self.selectTab,//栏目id 0为全部
        class: self.$route.query.id, //班级id
        keyword: key,
        page: self.page,
        psize: self.psize
      };
      request.post("/roomapi/Room_Class/classPage", data, function(res) {
        if (res.code == 0) {
          if (res.data.model.length > 0) {
            self.contentList = res.data.model.map(item => {
              item.isopen = false;
              return item;
            });
          }
        }
      });
    },
    openNews(index) {
      console.log("open list");
      this.contentList[index].isopen = true;
      console.log(this.contentList[index]);
    },
    closeNews(index) {
      console.log("close list");
      this.contentList[index].isopen = false;
    },
    setImg(src) {
      let baseSrc = "";
      if (src.indexOf("i2f2f.com") == -1) {
        baseSrc = "http://school.i2f2f.com" + src;
      } else {
        baseSrc = src;
      }
      return baseSrc;
    }
  },
  created() {
    this.$root.eventLister.$on("seachInfo", this.seachInfo); //监听搜索事件
  },
  mounted() {
    this.getColmn();
  },
  wrap() {
    var clientWidth = document.body.clientWidth;
    console.log("clientWidth", clientWidth);
    var html = document.getElementsByTagName("html")[0];
    if (clientWidth > 980) {
      clientWidth = 980;
    }
    html.style.fontSize = clientWidth / 12.4 + "px";
  }
};
</script>
<style lang="scss">

.van-tabs__content {
  min-height: 200px;
}

#mainNavBar .el-menu--horizontal > .el-submenu .el-submenu__title {
  line-height: 44px;
  height: 44px;
}

.van-tab {
  padding-left: 20px;
  /* font-size: 14px; */
}

.van-tabs__nav--line {
  font-size: 20px;
}

.imtextview {
  display: flex;
  padding-top: 20px;
  font-size: 18px;
}

.linkFont {
  color: #034692;
}

.van-image--round {
  vertical-align: middle;
}

.titleMsg {
  color: #666;
  font-size: 20px;
  margin-left: 30px;
}

.rightBar {
  width: 100px;
  margin-left: 40px;
  line-height: 44px;
  height: 44px;
}

.deatail {
  display: flex;
  padding-top: 30px;
  font-size: 18px;
}

.content {
  display: flex;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-size: 18px;
}
.horizontal-row {
  .right-txt {
    img {
      display: none !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.contentList {
  border-bottom: #dcdcdc 1px solid;
  padding-bottom: 30px;
}

.imgline {
  padding-top: 20px;
}

.date {
  padding-top: 20px;
  font-size: 18px;
  color: #999;
}

.leftImage {
  width: 240px;
  height: 136px;
}

.leftImage img {
  width: 240px;
  height: 136px;
}

.imgMessage {
  font-size: 18px;
}

.title {
  /* padding-left: 40px; */
  padding-top: 30px;
}

.title {
  font-size: 24px;
  font-weight: 900;
}

.updown {
  color: #034692;
}

.rightContent {
  margin-left: 30px;
}

.leftBar {
  flex: 1;
  .news-row {
    .news-head {
      display: flex;
      align-items: center;
      margin-top: 30px;
      .news-title {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 24px;
        font-weight: 600;
      }
      .news-column {
        font-size: 20px;
        color: #666;
        width: 180px;
        padding-left: 20px;
      }
    }
    .author-info {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .el-avatar {
        display: inline-block;
        margin-right: 8px;
      }
      span {
        font-size: 18px;
        color: #034692;
      }
    }
    .news-content {
      margin-top: 20px;
      .left-img {
        img {
          display: block;
          width: 100%;
          border-radius: 8px;
        }
      }
      .right-txt {
        .text {
          line-height: 30px;
          font-size: 18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
        .openmore {
          text-align: right;
        }
      }
      .horizontal-row {
        .right-txt {
          img {
            display: none !important;
          }
        }
      }
      .vertical-row {
        img {
          margin: 14px 0px;
        }
      }
    }
    .news_create_time {
      font-size: 18px;
      color: #999;
      margin-top: 20px;
      .columnInfo{
        display: flex;
        align-items: center;
        .columnName {
          margin-right: 30px;
          color: #333;
        }
      }
      .praise{
        padding-right: 3%;
        text-align: right;
        img{
          width: 15px;
        }
      }
    }
  }
}

body {
  background: #000;
}
</style>
