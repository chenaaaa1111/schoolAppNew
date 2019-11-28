<template>
  <!-- 班级主页内容组件 -->
  <div id="mainNavBar">
    <div class="mainNavBar">
      <!-- <ul class="mnavbar">
                 <li v-for=" item in dataList">
                      {{item.text}}
                 </li>
              </ul> -->
      <div class="tabContainer">
        <div class="leftBar">
          <van-tabs class="mainleftbar" :swipe-threshold='5' :ellipsis="false" :swipeable="true">
            <van-tab v-for="item in dataList" :title="item.title" :name="item.id" :key="item.id">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <ul>
                  <li v-for="item in contentList" class="contentList">
                    <h4 class="title">{{item.title}} <span
                        class="titleMsg">栏目{{item.column_name?'（'+item.column_name+'）':''}}</span> </h4>
                    <div class=" imgline">
                      <van-image round width="32px" height="32px" fit="cover" :src="item.avatar" />
                      <span class="imgMessage">{{item.name}}</span>
                      <span class="imgMessage linkFont">王府水晶</span>
                    </div>
                    <div class="imtextview" :id="'content'+item.id">
                      <div class="leftImage">
                        <img :src="item.image" alt="">
                      </div>
                      <div class="rightContent">
                        <span>
                          Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                        </span>
                        <span @click="changShow(item.id)" class="updown">
                          查看更多
                        </span>
                      </div>
                    </div>
                    <div class="deatail" style="display: none;" :id="'detail'+item.id">
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团…
                      <span @click="fslip(item.id)" class="updown">
                        收起
                      </span>
                    </div>
                    <p class="date pd_40">{{item.create_time}}</p>
                  </li>
                </ul>
              </van-list>

            </van-tab>
          </van-tabs>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  // import 'vant/lib/button/style';
  import request from '@/api/request.js';
  export default {
    name: 'mainNavBar',
    comments: {},
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        active: 1,
        dataList: [
          { text: '全部', id: 'all' },
          { text: '最新', id: '1' },
          { text: '就业', id: '2' }, { text: '专业', id: '3' }, { text: '辅导', id: '4' }, { text: '辅导班', id: '5' }],
        contentList: [
          {
            "id": '',
            "columns": '',
            "column_name": "",
            "name": "",
            "avatar": "",
            "title": "",
            "image": "",
            "content": "暂无数据",
            "create_time": ""
          }
        ],
        activeIndex: 0,
        activeIndex2: '1',
        pageNum: 1,
        pageSize: 10,
        userInfo: {
          // access_class: 0,
          // access_community: 0,
          // access_grade: 0,
          // access_project: 0,
          // access_subject: 0,
          // access_teaching: 0,
          // avatar: '',
          // class_id: 1,
          // create_time: "2019-11-11 15:24:30",
          // grade_id: 1,
          // id: 1,
          // level: 1,
          // mobile: "15269920820",
          // name: "金刚",
          // password: "$P$BU3uZfakBj4h2FaeTVb91oRWbErDLf1",
          // room_class: 1,
          // room_community: "1",
          // room_grade: 1,
          // room_project: "1",
          // room_subject: 1,
          // room_teaching: 1,
          // s_id: 1,
          // status: 1,
          // subject_id: 1,
          // teaching_id: 1
        }
      }
    },
    mounted() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

      this.getTabs()
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getTabs() {
        let _this = this
        let data = {
          keyword: '',
          type: 2,
          cid: this.userInfo.grade_id
        }
        request.post('/roomapi/Room_Grade/column',data,function(res) {
          console.log(res, 'mainNavBar columns')
          if(res.code == 0) {
            _this.dataList = res.data
            _this.activeIndex = _this.dataList[0].id
          }
        })
      },
      onLoad() {
        let _this = this
        let data = {
          column: _this.activeIndex,
          page: this.pageNum,
          psize: this.pageSize
        }
        request.post('/roomapi/Room_Grade/schoolPage',data,function(res) {
          console.log(res, 'mainNavBar')
          if(res.code == 0) {
            if(res.data.model.length>0) {
              for(var i=0;i<res.data.model.length;i++) {
                _this.contentList.push(res.data.model[i])
              }
            } else {
              _this.finished = true
            }
            _this.loading = false;
          }
        })
      },
      fslip(item) {
        document.getElementById('content' + item).style.display = "flex";
        document.getElementById('detail' + item).style.display = 'none';
      },
      changShow(item) {
        console.log(item)
        document.getElementById('content' + item).style.display = "none";
        document.getElementById('detail' + item).style.display = 'block';
      }
    },
    wrap() {
      var clientWidth = document.body.clientWidth;
      console.log('clientWidth', clientWidth);
      var html = document.getElementsByTagName("html")[0];
      if (clientWidth > 980) {
        clientWidth = 980;
      }
      html.style.fontSize = clientWidth / 12.4 + "px";
    }
  }
</script>
<style>
  .mainleftbar {
    /* padding-right:40px; */
  }

  #mainNavBar .el-menu--horizontal>.el-submenu .el-submenu__title {
    line-height: 44px;
    height: 44px;

  }

  .van-hairline--top-bottom {
    /* width: 80%; */
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
</style>
<style scoped>
  .contentList {
    border-bottom: #DCDCDC 1px solid;
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

  .leftImage img {
    width: 240px;
    height: 136px;
  }

  .imgMessage {
    font-size: 18px;
  }

  .title {
    /* padding-left: 40px; */
    font-size: 24px;
    font-weight: 900;
    padding-top: 30px;
  }

  .updown {
    color: #034692;
  }

  .rightContent {
    margin-left: 30px;
  }

  .tabContainer {
    display: flex;
  }

  .leftBar {
    flex: 1;
  }



  body {
    background: #000;
  }
</style>
