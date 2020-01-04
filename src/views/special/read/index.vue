<template>
  <div class="space">

    <el-row class="write-content" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="col-body">
        <el-card>
          <div slot="header" class="clearfix">
            <el-page-header @back="goBack" title="返回上一页"></el-page-header>
          </div>
          <div class="news-box">

            <el-row class="news-row">
              <el-col :span="24" class="newsTitle">{{specialDetailsList.title}}</el-col>
              <el-col :span="24" class="news-type">
                <span>发布于: {{specialDetailsList.create_time}}</span>
              </el-col>
              <el-col :span="24" class="user-info">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="specialDetailsList.avatar" @click.native="goOtersHomePageClick"></el-avatar>
                <span>{{specialDetailsList.name}}</span>

              </el-col>
              <el-col :span="24" class="news-content">
                <p v-html="specialDetailsList.content"></p>
                <video :src="specialDetailsList.image" controls="controls">
                  您的浏览器不支持 video 标签。
                </video>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    name: 'showmovie',
    data() {
      return {
        title: '返回',
        fromwhere: '', // 从哪个页面跳转过来的还跳转回去
        fit: 'cover',
        url: require('../../../assets/images/user.png'),
        specialDetailsList: {},// 专题详情列表
      }
    },
    mounted() {
      let querys = this.$route.query;
      if(Object.keys(querys).length > 0) {
        this.fromwhere = this.$route.query.fromwhere
      }
      this.getSpecialDetails()
    },
    methods: {
      goHome() { // 会空间选择页面
        this.$router.push({ // 回到空间选择页面
          name: 'home',
        })
      },
      goBack() { // 返回-从哪儿来往哪儿去 如果是别人主页中进来
        console.log(this.fromwhere, '回去 -- readback')
        if(this.$route.query.activeIndex){
          this.$router.push({
            name: this.fromwhere,
            query:{
              activeIndex: this.$route.query.activeIndex
            }
          })
        }else{
          this.$router.push({
            name: this.fromwhere,
            query: this.specialDetailsList
          })
        }
        // this.$router.go(-1)
      },
      getSpecialDetails() { //获取专题详情 文章id
        var data = {
          id: this.$route.query.id
        }
        var self = this;
        request.post('/roomapi/Project/projectDetails', data, (res) => {
          if(res.code ==0){
            self.specialDetailsList = res.data;
          }
        })
      },
      goOtersHomePageClick(){ //点击发布人头像 --进入到别人的主页 文章详情内容携带过去
        this.$router.push({
          name: 'otherHomepage',
          query: this.specialDetailsList
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .space{
    height: 100%;
    overflow: auto;
    background: url('../../../assets/images/classes/classesbg.png') no-repeat;
    background-size: 100% 100%;
  }
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    .nav-col{
      padding: 0px 10px;
      .el-menu-head{
        .homeEntry{
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;
          color: #E27755;
          img{
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }
        .el-menu-item{
          font-size: 22px;
          color: #5B728C;
          padding: 0px;
          margin-right: 35px;
          height: 100px;
          line-height: 106px;
        }
        .is-active{
          border-bottom: 0;
          color: #333;
        }
        .is-active::after{
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background: #409EFF;
          position: absolute;
          bottom: 6px;
          border-radius: 2px;;
        }
        .nav-user{
          float: right;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .menu-release{
          float: right;
        }
      }


    }
  }
  .write-content{
    margin-top: 30px;
    .col-body{
      padding: 0px 10px;
      .formrow{
        margin: 30px 0px;
        .ql-editor{
          min-height: 400px;
          overflow: auto;
        }
      }
      .upload-box{
        margin-top: 32px;
        padding: 20px;
        background: #F6F6F6;
        .el-icon-plus{
          font-size: 14px;
        }
      }
      .ql-container{
        height: 350px;
        overflow: auto;
      }
      .news-box{
        padding: 0px 40px;
        .news-row{
          .news-cover{
            img{
              display: block;
              width: 100%;
            }
          }
          .newsTitle{
            font-size :24px;
            color: #1E1E1E;
            font-weight: 600;
            margin-top: 0.4rem;
          }
          .news-type{
            font-size: 20px;
            color: #666;
            margin-top: 0.2rem;
            span:nth-child(1) {
              margin-right: 1rem;
            }
          }
          .user-info{
            display: flex;
            align-items: center;
            font-size: 18px;
            color: #1E1E1E;
            font-weight: 600;
            margin-top: 0.2rem;
            .el-avatar{
              margin-right: 10px;
            }
          }
          .news-content{
            margin-top: 0.2rem;
            font-size: 18px;
            line-height: 0.4rem;
            img{
              display: block;
              width: 100%;
              margin: 0.2rem 0;
              border-radius: 8px;
            }
            video{
              width: 100%;
              border-radius: 8px;
              margin: 0.2rem 0;
            }
          }
          .news-date{
            font-size: 18px;
            color: #999;
          }
        }
      }
    }
  }

</style>
