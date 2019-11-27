<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 学校新闻动态 -->
            <News :source="source"></News>
            <!-- 班级空间-侧边栏 -->
            <ClassSpace :source="routename"></ClassSpace>
            <!-- 通知公告 -->
            <Notice :source="routename"></Notice>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <el-card>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="menuSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="news">最新</el-menu-item>
              </el-menu>
            </el-card>
            <el-card style="margin-top: 10px;">
              <el-row class="chapter" v-for="(item,index) in chapterList" :key="index">
                <el-col class="title">{{item.title}}</el-col>
                <el-col class="author">
                  <el-avatar class="userimg" :size="32" :src="circleUrl"></el-avatar>
                  <span class="name">{{item.author}}</span>
                  <span class="teamname">{{item.team}}</span>
                </el-col>
                <el-col class="content">
                  <el-row :gutter="10" v-if="item.flag">
                    <el-col :span="6" class="chart">
                      <img :src="item.cover" />
                    </el-col>
                    <el-col :span="18" class="text">
                      <div class="ellipsis" v-html="item.content"></div>
                      <p :span="24" style="text-align: right;">
                        <el-button type="text" size="mini" v-show="item.flag" @click="chapterTreggle(index)">
                          阅读全文<i class="el-icon-arrow-down"></i>
                        </el-button>
                      </p>
                    </el-col>
                  </el-row>
                  <el-row v-if="!item.flag">
                    <el-col :span="24" class="text">
                      <div class="noEllipsis" v-html="item.content" ></div>
                    </el-col>
                    <!-- <el-col :span="24" class="chart" style="margin-top: 10px;">
                      <img :src="item.cover" />
                    </el-col> -->
                  </el-row>
                </el-col>
                <el-col class="time">
                  <div class="timeLine">
                    <div class="time">{{item.time}}</div>
                    <div class="btn">
                      <el-button type="text" size="mini" v-show="!item.flag" @click="chapterTreggle(index)">
                        收起<i class="el-icon-arrow-up"></i>
                      </el-button>
                    </div>
                  </div>
                  <el-divider></el-divider>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import PageTop from './components/PageTop.vue'
  // import News from './components/News.vue'
  import News from '../../public/widget/News.vue'
  import ClassSpace from './components/ClassSpace.vue'
  import Notice from './components/Notice.vue'
  export default{
    name: 'mainTeamHomepage',
    components: {
      PageTop,
      News,
      ClassSpace,
      Notice
    },
    data() {
      return {
        source: {
          routename: '',
          spacename: 'topic'
        },
        routename: '',
        activeIndex: 'all',
        circleUrl: require('../../../assets/images/user.png'),
        chapterList: [
          {
            title: '如何评价美国漫威热门电影《小丑》？',
            author: '章泽天',
            team: '学生会',
            cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574594077837&di=405789e616c9aac85462364fe6338aea&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_ls%2F0%2F10744269187_640330%2F0.jpg',
            time: '2019/08/22 09:23',
            content: '《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论层面具有一定价值，且十分有趣。'+
                     '从这个角度说，这部电影真的没有让人失望。它不是部动作戏，也并不带有明确的主观意图和目的性，而是一部发人深省、'+
                     '带有人物性格特征研究性质的电影《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论'+
                     '带有人物性格特征研究性质的电影《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论'+
                     '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574594077837&di=405789e616c9aac85462364fe6338aea&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_ls%2F0%2F10744269187_640330%2F0.jpg"/>'+
                     '层面具有一定价值，且十分有趣。从这个角度说，这部电影真的没有让人失望。它不是部动作戏，也并不带有明确的主观意图'+
                     '和目的性，而是一部发人深省、带有人物性格特征研究性质的电影',
            flag: true
          },
          {
            title: '如何评价美国漫威热门电影《小丑》？',
            author: '章泽天',
            team: '学生会',
            cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574594077837&di=405789e616c9aac85462364fe6338aea&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_ls%2F0%2F10744269187_640330%2F0.jpg',
            time: '2019/08/22 09:23',
            content: '《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论层面具有一定价值，且十分有趣。'+
                     '从这个角度说，这部电影真的没有让人失望。它不是部动作戏，也并不带有明确的主观意图和目的性，而是一部发人深省、'+
                     '带有人物性格特征研究性质的电影《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论'+
                     '带有人物性格特征研究性质的电影《小丑》被业界描述为一部风格大胆的独立电影，以蝙蝠侠的死敌为主要角色，在社会评论'+
                     '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574594077837&di=405789e616c9aac85462364fe6338aea&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_ls%2F0%2F10744269187_640330%2F0.jpg"/>'+
                     '层面具有一定价值，且十分有趣。从这个角度说，这部电影真的没有让人失望。它不是部动作戏，也并不带有明确的主观意图'+
                     '和目的性，而是一部发人深省、带有人物性格特征研究性质的电影',
            flag: true
          },
        ]
      }
    },
    mounted() {
      this.routename = this.$route.name
      this.source.routename = this.$route.name
      console.log(this.routename, '本页面routename')
    },
    methods:{
      menuSelect() {},
      chapterTreggle(index) {
        this.chapterList[index].flag = !this.chapterList[index].flag
      }
    }
  }
</script>
<style lang="scss">
  .ellipsis{
    img{
      display: none;
    }
  }
  .noEllipsis{
    img{
      width: 100%;
      display: block;
      margin: 10px 0px;
      border-radius: 8px;
    }
  }
</style>
<style media="screen" lang="scss" scoped>
  .space-wrap{
    margin-top: 30px;
    .entry-content{
      padding: 0px 10px;
      .el-menu-demo{
        border: 0;
        .el-menu-item{
          font-size: 20px;
          font-weight: 600;
          height: 24px;
          line-height: 24px;
        }
        .is-active{
          color: #034692;
          border-bottom: 0;
        }
      }
      .chapter{
        color: #1E1E1E;
        .title{
          font-size: 24px;
          font-weight: 600;
        }
        .author{
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          .userimg{
            display: inline-block;
          }
          .name{
            margin-left: 8px;
            display: inline-block;
          }
          .teamname{
            color: #034692;
            margin-left: 26px;
            display: inline-block;
          }
        }
        .content{
          margin-top: 20px;
          padding-left: 0;
          padding-right: 0;
          .chart{
            img{
              display: block;
              width: 100%;
              border-radius: 8px;
            }
          }
          .text{
            font-size: 18px;
            line-height: 0.4rem;
            .ellipsis{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;
              img{
                display: none;
              }
            }
          }
        }
        .time{
          font-size: 18px;
          color: #999;
          margin-top: 20px;
          .timeLine{
            display: table;
            width: 100%;
            .time{
              width: 50%;
              display: table-cell;
            }
            .btn{
              text-align: right;
              display: table-cell;
            }
          }
          .timeLine::after{
            content: '';
            display: block;
            height: 0;
            clear: both;
          }
        }
      }
    }
  }
</style>
