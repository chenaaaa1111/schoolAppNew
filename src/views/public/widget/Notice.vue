<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../assets/images/classes/notice.png"/>通知公告p</span>
      <span class="more" @click="shownoticemore">
        <span class="text">全部</span><img src="../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <ul class="notice">
      <li v-for="(item,index) in noticeList" :key="index" @click="noticeDetails">
        <div class="noticeTitle">{{item.title}}</div>
        <div class="noticeDate">{{item.date}}</div>
      </li>
    </ul>
  </el-card>
</template>
<script>
  export default{
    name: 'notice',
    props: {
      source: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        noticeList: [
          {
            title: '沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警',
            date: '2019-11-11'
          },
          {
            title: '沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学20',
            date: '2019-11-11'
          },
          {
            title: '沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四',
            date: '2019-11-11'
          },
          {
            title: '沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警沈家门第四小学2019学校安全工作一号预警',
            date: '2019-11-11'
          },
        ]
      }
    },
    mounted() {
      console.log(this.source, '通知公告模块接收到传值')
    },
    methods: {
      shownoticemore() {
        this.$router.push({
          name: 'noticemore',
          query: {
            widgetName: '通知公告',
            fromwhere: this.source.routename,
            spacename: this.source.spacename
          }
        })
      },
      noticeDetails() {
        // widgetName: this.getPageName(this.source.routename),
        // spacename: this.source.spacename,
        this.$router.push({
          name: 'noticemore',
          query: {
            widgetName: this.getPageName(this.source.routename),
            fromwhere: this.source
          }
        })
      },
      getPageName(str) { // 设置返回按钮显示的文字
        switch (str) {
          case 'campusHomepage':
            return '校园主页';
          case 'gradeHomepage':
            return '校园主页';
          case 'mainTeamHomepage':
            return '社团主页';
          case 'specialMainHomepage':
            return '首页';
          case 'topicHomepage':
            return '课题主页';
          case 'teachingHomepage':
            return '教研主页';
          default:
            return '空间主页'
        }
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
      background: url('../../../assets/images/classes/dotg.png') no-repeat 0px center;
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
      background-image: url('../../../assets/images/classes/dot.png');
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
