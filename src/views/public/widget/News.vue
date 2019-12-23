<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <span class="cardTitle"><img src="../../../assets/images/classes/news.png"/>学校新闻动态</span>
      <span class="more" @click="shownewsmore">
        <img src="../../../assets/images/classes/more.png"/>
      </span>
    </div>
    <ul class="newList">
      <li v-for="(item,index) in newsList" :key="index" @click="readDetails(item.id)">
        <span></span>
        <span class="text">{{item.title}}</span>
        <span class="date" :key="index">{{item.create_time}}</span>
      </li>
    </ul>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'news',
    props: {
      source: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageName: '',
        newsList: [],
      }
    },
    mounted() {
      console.log(this.source, '从哪个空间加载的新闻动态模块儿');
      this.getNews();
    },
    methods: {
      getNews(){
        var self=this;
        var data={sid:(JSON.parse(sessionStorage.getItem('userInfo'))).s_id};
        request.post('/roomapi/Users/NewsList',data,function(res){
          res.data.model.forEach(item=>{
            item.create_time=item.create_time.substr(5,5)
          })
          self.newsList=res.data.model;
        })},
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
      shownewsmore() { // 去更多新闻动态页面
        this.$router.push({
          name: 'newsmore',
          query: {
            widgetName: '学校新闻动态', // 模块儿名称
            fromwhere: this.source.routename,
            spacename: this.source.spacename // 属于哪个空间
          }
        })
      },
      readDetails(id) { // 跳转到新闻详情
        this.$router.push({
          name: 'readnews',
          query: {
            widgetName: this.getPageName(this.source.routename),
            spacename: this.source.spacename,
            id:id
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
}
</style>
