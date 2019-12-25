<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../assets/images/grade/space.png"/>年级空间</span>
    </div>
    <div class="areablock" v-for="(item,index) in areaList" :key="index">
      <div class="areaName"><img src="../../../assets/images/classes/classFlg.png"/><span>{{item.title}}</span></div>
      <ul class="area">
        <li class="first" v-for="(res,num) in item.grade" :key="num">
          <ul class="areaZone">
            <li v-for="(d, it) in res" :key="it">
              <el-button type="text" class="gradeName" @click="toOtherGrade(d)">{{d.title}}</el-button>
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
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        areaList:[],//年级空间
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      toOtherGrade(res) { // 访问别的年级主页
        this.$router.push({
          name: 'otherGradeHomepage',
          query: {
            title: res.title,
            id: res.id
          }
        })
      },
      getList() {
        let _this = this
        request.post('/roomapi/Room_Grade/level',{},function(res) {
          if(res.code == 0) {
            _this.areaList = res.data
          }
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
      background-color: #DCFBFF;
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
        width: 33.3%;
        .areaZone{
          li{
            float: left;
            width: 100%;
            padding: 8px 0px;
            font-size: 18px;
          }
          .gradeName{
            font-size:18px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(30,30,30,1);
            line-height:25px;
          }
          .gradeName:hover{
            color: #034692;
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
}
</style>
