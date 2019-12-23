<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../../assets/images/classes/space.png"/>班级空间</span>
      <!-- <span class="more" @click="showclassesmore">
        <img src="../../../../assets/images/classes/more.png"/>
      </span> -->
    </div>
    <div class="areablock" v-for="(item,index) in areaList" :key="index">
      <div class="areaName"><img src="../../../../assets/images/classes/classFlg.png"/><span>{{item.title}}</span></div>
      <ul class="area">
        <li class="first" v-for="(res,num) in item.grade" :key="num">
          <ul class="areaZone">
            <li v-for="(d, it) in res" :key="it">
              <el-popover placement="bottom-start" width="220" trigger="hover">
                <el-row class="row-bg" justify="start">
                  <el-col :span="24">{{d.title}}</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                  <el-col :span="6" v-for="(t, n) in d.class" :key="n"><el-button type="text">{{t.title}}</el-button></el-col>
                </el-row>
                <el-button slot="reference" class="gradeName">{{d.title}}</el-button>
              </el-popover>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'ClassSpace',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        areaList:[],
      }
    },
    mounted() {

      this.getClassRoomList();
    },
    methods: {
      getClassRoomList(){ // 班级空间---校园主页 --获取班级空间左侧导航栏数据 sid：校区id
        var data ={
          sid: this.userInfo.s_id 
        }
        var _this=this;
        request.post('/roomapi/Room_Class/level', data, function(res){
          _this.areaList=res.data;
          console.log(_this.areaList,'返回得班级空间列表')
        })
      },
      showclassesmore() {
        this.$router.push({
          name: 'classesmore',
          params: {
            fromwhere: this.source
          }
        })
      },
      toOtherClass(id) {  //班级空间 点击班级  传入班级id  进入别人的班级
        this.$router.push({
          name: 'otherClassHomepage',
          query:{id:id}
        })
      }
    }
  }
</script>
<style lang="scss">
.banner-card{
  margin-bottom: 12px;
  .cardTitle{
    font-size: 24px;
    font-weight: 500;
    img{
      display: inline-block;
      width: 38px;
      height: 38px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .more{
    float: right;
    display: block;
    // width: 16px;
    height: 16px;
    cursor: pointer;
    margin-top: 0.1rem;
    .text{
      position: relative;
      top: 2px;
      margin-right: 10px;
      color: #888;
    }
    img{
      display: inline;
      width: 18px;
      vertical-align: middle;
    }
  }
  .newList{
    list-style: none;
    li{
      padding: 16px 20px 16px 18px;
      margin-left: 20px;
      font-size: 18px;
      background: url('../../../../assets/images/classes/dotg.png') no-repeat 0px center;
      background-size: 8px 8px;
      cursor: pointer;
      position: relative;
      border-bottom: 1px dashed #DEDEDE;
      .text{
        display: block;
        margin-right: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .date{
        position: absolute;
        width: 80px;
        top: 17px;
        right: 0;
        color: #888888;
      }
    }
    li:hover{
      color: #034692;
      background-image: url('../../../../assets/images/classes/dot.png');
    }
  }
  .areablock{
    .areaName{
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 10px;
      img{
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .area{
      list-style: none;
      margin-bottom: 30px;
      .first{
        float: left;
        width: 50%;
        .areaZone{
          li{
            float: left;
            width: 100%;
            padding: 8px 0px;
            font-size: 18px;
          }
          li:hover{
            color: #034692;
            cursor: pointer;
          }
          .gradeName{
            font-size: 14px;
            font-weight: 500;
            color: rgba(136, 136, 136, 1)
          }
        }
      }
      
    }
    .area::after{
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
  }
  .notice{
    font-size: 18px;
    li{
      padding: 8px 0px;
      line-height: 30px;
      border-bottom: 1px dashed #DEDEDE;
      .noticeTitle{
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .noticeDate{
        text-align: right;
        color: #888888;
      }
    }
  }
}
</style>
