<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../../assets/images/classes/news.png"/>学校新闻动态</span>
      <span class="more" @click="shownewsmore">
        <img src="../../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <ul class="newList">
      <li v-for="(item,index) in newsList" :key="index" @click="readDetails">
        <span class="text">{{item.title}}</span>
        <span class="date" :key="index">{{item.date}}</span>
      </li>
    </ul>
  </el-card>
</template>
<script>
  export default{
    name: 'news',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        newsList: [
          {
            title: '激动人心的运动会',
            date: '04-02'
          },
          {
            title: '激动人心的运动会',
            date: '04-06'
          },
          {
            title: '激动人心的运动会激动人心的运动会',
            date: '04-09'
          },
          {
            title: '激动人心的运动会',
            date: '05-02'
          },
          {
            title: '激动人心的运动会激动人心的运动会',
            date: '05-08'
          },
        ],
      }
    },
    mounted() {

    },
    methods: {
      shownewsmore() {
        this.$router.push({
          name: 'newsmore',
          query: {
            widgetName: '学校新闻动态',
            fromname: '社团主页',
            fromwhere: this.source
          }
        })
      },
      readDetails() { // 跳转到文章详情页
        this.$router.push({
          name: 'readnews',
          params: {
            widgetName: '校园主页',
            fromwhere: this.source
          }
        })
      },
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
