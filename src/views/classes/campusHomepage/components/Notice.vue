<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../../assets/images/classes/notice.png"/>通知公告</span>
      <span class="more" @click="shownoticemore">
        <span class="text">全部</span><img src="../../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <ul class="notice">
      <li v-for="(item,index) in noticeList" :key="index" @click="readDetails(item.id)">
        <div class="noticeTitle">{{item.title}}</div>
        <div class="noticeDate">{{item.date}}</div>
      </li>
    </ul>
  </el-card>
</template>
<script>
  import request from '@/api/request.js'

  export default{
    name: 'notice',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        noticeList: [
          {
            title: '沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警',
            date: '2019-11-11'
          }
         
        ]
      }
    },
    mounted() {
      this.getNotice();
    },
    methods: {
      getNotice(res){
        var userInfo=JSON.parse(sessionStorage.getItem('userInfo')) ;
            var scchoolId=userInfo.s_id;
            var data={
              sid:scchoolId

            }
        request.post('/roomapi/Users/NoticeList',data,function(res){
           
        })
      },
      shownoticemore() {
        this.$router.push({
          name: 'newsmore',
          params: {
            widgetName: '通知公告',
            fromwhere: this.source
          }
        })
      },
      readDetails() {
        this.$router.push({
          name: 'readnotice',
          params: {
            widgetName: '校园主页',
            fromwhere: this.source
          }
        })
      },
    }
  }
</script>
<style media="screen">
.el-dialog{
  min-width: 9.733333rem;
}
</style>
<style lang="scss" scoped>
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
    }
    .area{
      list-style: none;
      margin-bottom: 30px;
      li{
        float: left;
        width: 33.333%;
        padding: 8px 0px;
        font-size: 18px;
      }
      li:hover{
        color: #034692;
        cursor: pointer;
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
      cursor: pointer;
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
    li:hover{
      .noticeTitle{
        color: #034692;
      }
      .noticeDate{
        color: #034692;
      }
    }
  }
}
</style>
