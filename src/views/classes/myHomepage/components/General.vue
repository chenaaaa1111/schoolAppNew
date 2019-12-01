<template>
  <el-card style="margin-bottom: 12px;">
    <el-row class="top-block">
      <el-col :span="24" class="top-box">
        <span class="top-title">校园动态</span>
        <el-button type="text">
          <span class="hidden-md-and-up">查看全部</span><img class="more" src="../../../../assets/images/classes/more.png"/>
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-row class="article" v-for="(item,index) in articles" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="18" class="title">
                <span class="text">{{item.title}}</span>
              </el-col>
              <el-col :span="6" class="operation">
                <el-button type="text" size="mini">删除</el-button>
              </el-col>
              <el-col :span="24" class="subTitle">
                <span class="date">{{item.create_time}}</span>
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
    export default{
      props:{

      },
      data:function(){
        return  {
          articles:[]
        }
      },
      mounted:function(res){
        this.getGenaras()
      },
      methods:{
        getGenaras:function(){
          console.log(this.$store.state)
          var self=this;
          var data={
            uid:this.$store.state.userInfo.id,
            page:1,
            psize:3,
            level:2
          }
          request.post('/roomapi/Room_Class/myPage',data,function(res){
            self.$store.commit('setSchoolDynamic',res.data.total);
            console.log('********', self.$store.state.userInfo)
            self.articles=res.data.model.length>0?res.data.model:[{
                "id": 4,
                "columns": 1,
                "column_name": "",
                "name": "姓名",
                "avatar": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
                "level": 2,
                "title": "标题",
                "image": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
                "content": "",
                "create_time": "2019-11-29 00:00:00"
            },
            {
                "id": 4,
                "columns": 1,
                "column_name": "",
                "name": "姓名",
                "avatar": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
                "level": 2,
                "title": "标题",
                "image": "https:\/\/www.i2f2f.com\/attachment\/images\/26\/2019\/04\/giXIQxrG74ZXPnLnnFxnd4Rn0QpCFP.jpg",
                "content": "",
                "create_time": "2019-11-29 00:00:00"
            }
          ]
          })
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
    }
    .article-date{
      font-size: 18px;
      color: #999;
      line-height: 30px;
      margin-top: 14px;
    }
  }
}
</style>
