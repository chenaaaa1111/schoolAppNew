<template>
  <el-card >
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">班级动态</span>
      </el-col>
      <el-col :span="24" v-if="articles.length>0">
        <el-row class="article" v-for="(item,index) in articles" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">{{item.title}}</span>
              </el-col>
              <el-col :span="24" class="title">
                <span class="classify">栏目: {{item.column_name}}</span>
                <span class="date">{{item.create_time}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row class="content" :gutter="10" v-if="!item.isopen">
              <el-col :span="6">
                <img class="con-pic" :src="item.avatar"/>
              </el-col>
              <el-col :span="18">
                <div class="con-text" v-html="item.content">
                    <!-- {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}} -->
                  </div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="openContent(index)">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="content content-open" v-if="item.isopen">
              <el-col :span="24">
                <img class="con-pic" :src="item.avatar"/>
              </el-col>
              <el-col :span="24">
                <div class="con-text" v-html="item.content">
                    <!-- {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}} -->
                  </div>
                <div class="read-more">
                  <el-button type="text" size="mini" @click="closeContent(index)">收起<i class="el-icon-caret-top el-icon--right"></i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24" ><el-divider></el-divider></el-col>
        </el-row>
      </el-col>
      <el-col :span="24" v-else>
        <div class="noContent">暂无更多的班级动态</div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default {
    props:{

    },
    data:function(){
      return {
        articles:[],
        serverUrl:this.$store.state.serverUrl
      }
    },
    mounted(){
      this.getGenaras();
      console.log(this.$store.state.serverUrl,'baseurl是')
    },
    methods:{
      getGenaras() {
        var self = this;
        var data= {
          uid: self.$route.query.id,
          page: 1,
          psize: 10,
          level: 1 //1班级栏目2校园栏目
        }
        request.post('/roomapi/Room_Class/myPage',data,function(res){
          if(res.code == 0) {
            if(res.data.model.length>0) {
              self.articles=res.data.model.map(item => {
                if(item.image){
                  item.image = self.serverUrl+item.image;
                }
                item.isopen = false
                return item
              })
              console.log(self.articles, '别人主页中的班级动态')
            }
          }
        })
      },
      openContent(index) {
        this.articles[index].isopen = true
      },
      closeContent(index) {
        this.articles[index].isopen = false
      }
    }
  }
</script>
<style lang="scss" scoped>
.top-block{
  .top-box{
    position: relative;
    text-align: center;
    margin-bottom: 35px;
    .top-title{
      display: inline-block;
      width: 200px;
      height: 50px;
      border: 1px solid #034692;
      border-radius: 25px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
    }
    .el-button{
      float: right;
      font-size: 12px;
      .more{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-left: 10px;
        position: relative;
        top: -3px;
      }
    }
  }
  .article{
    // margin-top: 25px;
    .subTitle{
      font-size: 16px;
      color: #999;
      line-height: 30px;
      .el-divider--horizontal{
        margin-top: 12px;
      }
    }
    .title{
      line-height: 40px;
      font-size: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .text{
        font-weight: bold;
        margin-right: 30px;
      }
      .classify{
        color: #666;
        margin-right: 30px;
        white-space: nowrap;
      }
      .date{
        color: #666;
        white-space: nowrap;
      }
    }
    .operation{
      text-align: right;
      .el-button{
        padding-top: 0;
        font-size: 12px;
      }
    }
    .content{
      margin: 24px 0px 0px 0px;
      padding: 0;
      .con-pic{
        display: block;
        width: 100%;
      }
      .con-text{
        line-height: 36px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .read-more{
        text-align: right;
      }
      img{
        display: block;
        width: 100%;
        border-radius: 8px;
      }
    }
    .content-open{
      .con-text{
        overflow: auto;
        -webkit-line-clamp: inherit;
      }
    }
    .article-date{
      font-size: 18px;
      color: #999;
      line-height: 30px;
      margin-top: 14px;
    }
  }
  .noContent{
    text-align: center;
    font-size:10px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:14px;
  }
}
</style>
