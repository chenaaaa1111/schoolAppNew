<template>
  <div class="campus">
    <PageTop></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- 学校新闻动态 -->
            <News :source="source"></News>
            <!-- 教研组-侧边栏 -->
            <ClassSpace :source="routename"></ClassSpace>
            <!-- 通知公告 -->
            <Notice :source="source"></Notice>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <mainNavBar></mainNavBar>
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
  // import Notice from './components/Notice.vue'
  import Notice from '../../public/widget/Notice.vue';
  import mainNavBar from "./components/mainNavBar.vue"
  import request from "@/api/request";
  export default {
    name: 'teachingHomepage',
    components: {
      PageTop,
      News,
      ClassSpace,
      Notice,
      mainNavBar
    },
    data() {
      return {
        source: {
          routename: '',
          spacename: 'teaching'
        },
        routename: '',
      }
    },
    mounted() {
      this.routename = this.$route.name
      this.source.routename = this.$route.name
      console.log(this.routename, '本页面routename');
    },
    methods: {
    }
  }
</script>
<style media="screen" lang="scss" scoped>
  .space-wrap {
    margin-top: 30px;

    .entry-content {
      padding: 0px 10px;

      .el-menu-demo {
        border: 0;

        .el-menu-item {
          font-size: 20px;
          font-weight: 600;
          height: 24px;
          line-height: 24px;
        }

        .is-active {
          color: #034692;
          border-bottom: 0;
        }
      }

      .chapter {
        color: #1E1E1E;

        .title {
          font-size: 24px;
          font-weight: 600;
        }

        .author {
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;

          .userimg {
            display: inline-block;
          }

          .name {
            margin-left: 8px;
            display: inline-block;
          }

          .teamname {
            color: #034692;
            margin-left: 26px;
            display: inline-block;
          }
        }

        .content {
          margin-top: 20px;
          padding-left: 0;
          padding-right: 0;

          .chart {
            img {
              display: block;
              width: 100%;
              border-radius: 8px;
            }
          }

          .text {
            font-size: 18px;
            line-height: 0.4rem;

            .ellipsis {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;

              img {
                display: none;
              }
            }
          }
        }

        .time {
          font-size: 18px;
          color: #999;
          margin-top: 20px;

          .timeLine {
            display: table;
            width: 100%;

            .time {
              width: 50%;
              display: table-cell;
            }

            .btn {
              text-align: right;
              display: table-cell;
            }
          }

          .timeLine::after {
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