<template>
  <div class="showmore">
    <el-row type="flex" justify="center" style="background: #FFF;">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="more-content">
        <el-menu :default-active="activeIndex" class="el-menu-head" mode="horizontal">
            <li class="homeEntry" @click="goHome">
              <img src="../../../assets/main/classes.png" />班级空间
            </li>
            <el-menu-item class="brandTitle" index="writenews" disabled>{{widgetName}}</el-menu-item>
            <li class="nav-user">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                      <el-avatar shape="circle" :size="48" :fit="fit" :src="url"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-s-custom">刘子璇</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </li>
        </el-menu>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="more-container">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="more-box">
        <el-card>
          <div slot="header" class="clearfix">
            <el-page-header @back="goBack" title="返回我的主页"></el-page-header>
          </div>
          <div class="card-content">
            <el-row class="more-list">
              <el-col :span="24" class="news-title">
                有哪些高情商的聊天技巧？<span class="news-type">(栏目: 影评)</span>
              </el-col>
              <el-col :span="24" class="news-author">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="url"></el-avatar>
                <span class="author">关一凡</span>
                <span class="author-class">工商管理142班</span>
              </el-col>
              <el-col :span="24" class="news-text">
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
              </el-col>
              <el-col :span="24" class="news-trigger">
                <el-button type="text" >阅读全文<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-col>
              <el-col :span="24" class="news-date">
                2019/08/22 09:23
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
            </el-row>
            <el-row class="more-list">
              <el-col :span="24" class="news-title">
                有哪些高情商的聊天技巧？<span class="news-type">(栏目: 影评)</span>
              </el-col>
              <el-col :span="24" class="news-author">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="url"></el-avatar>
                <span class="author">关一凡</span>
                <span class="author-class">工商管理142班</span>
              </el-col>
              <el-col :span="24" class="news-text">
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
                Brisbane： 从来没有一个瞎子，能在bo5三把中连续打出整个赛季的top10 从来没有一个瞎子，能在一把比赛中，拥有Dandy的大局观，灵药的开团
              </el-col>
              <el-col :span="24" class="news-trigger">
                <el-button type="text" >阅读全文<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-col>
              <el-col :span="24" class="news-date">
                2019/08/22 09:23
              </el-col>
              <el-col :span="24">
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'newsmore',
    data() {
      return {
        fit: 'cover',
        url: require('../../../assets/images/user.png'),
        activeIndex: '',
        fromwhere: '',
        spaceName: '',
        widgetName: '',
      }
    },
    mounted() {
      this.fromwhere = this.$route.params.fromwhere
      this.widgetName = this.$route.params.widgetName
    },
    methods:{
      goHome() {
         this.$router.push({
           name: 'home'
         })
      },
      goBack() {
        console.log(this.$route.params, '回去吧')
        this.$router.push({
          name: this.fromwhere
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .showmore{
    height: 100%;
    overflow: auto;
    background-color: #93DBF1;
    .more-content{
      .el-menu-head{
        .menu-release{
          float: right;
          .el-button{
            font-size: 22px;
            font-weight: 500;
          }
        }
        .brandTitle{
          cursor: default;
          color: #333;
          opacity: 1;
        }
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
      }
    }
    .more-container{
      margin-top: 30px;
      padding: 0px 10px;
      .more-list:last-child{
        .el-divider{
          display: none;
        }
      }
      .more-list{
        .news-title{
          font-size: 24px;
          font-weight: bold;
          color: #1E1E1E;
          .news-type{
            color: #999;
            font-weight: 500;
            margin-left: 0.5rem;
          }
        }
        .news-author{
          display: flex;
          align-items: center;
          font-size: 18px;
          margin-top: 0.2rem;
          .el-avatar{
            float: left;
            margin-right: 0.15rem;
          }
          .author{
            color: #1E1E1E;
            margin-right: 0.4rem;
          }
          .author-class{
            color: #034692;
          }
        }
        .news-text{
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-top: 0.2rem;
          font-size: 18px;
          color: #1E1E1E;
          line-height: 0.38rem;
        }
        .news-trigger{
          text-align: right;
        }
        .news-date{
          font-size: 18px;
          color: 999;
        }
      }
    }
  }
</style>
