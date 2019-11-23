<template>
  <div class="readNews">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal">
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
    <el-row class="read-box" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="read-col">
        <el-card>
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="24">
                <el-page-header :title="'返回'+title" @back="goBack"></el-page-header>
              </el-col>
              <el-col :span="24" class="news-result">
                <p class="">您发布的“如果没有明天”已被管理员删除</p>
                <p>
                  <span>删除原因:</span>
                  <span>您发布的新闻帖子影响校园学生积极向上的心</span>
                </p>
                <p>删除时间：2019-08-22 09:2</p>
              </el-col>
            </el-row>
          </div>
          <div class="news-box">
            <el-row class="news-row">
              <el-col :span="24" class="news-edit">
                <span>
                  <img src="../../../assets/images/classes/editnews.png" />
                </span>
              </el-col>
              <el-col class="news-cover">
                <img src="../../../assets/images/readNews/cover.png"/>
              </el-col>
            </el-row>
            <el-row class="news-row">
              <el-col :span="24" class="newsTitle">如何评价电影《少年的你》?</el-col>
              <el-col :span="24" class="news-type">
                <span>发布主页: 班级主页</span>
                <span>发布栏目: 影评</span>
              </el-col>
              <el-col :span="24" class="user-info">
                <el-avatar shape="circle" :size="32" :fit="fit" :src="url"></el-avatar>
                <span>王自如</span>
              </el-col>
              <el-col :span="24" class="news-content">
                <p>
                  之前听主人公叫韩湘子竟然没有印象，后来才发现是个八仙（八仙我能记住的只有吕洞宾和何仙姑了...）
                  考了一阵韩湘子传说资料之后，觉得这部东游应该是以韩湘子吹箫会龙女为蓝本进行改编的（虽然只有龙女这个物种是没变的...连萧都变成了笛子...）
                  整体风格还是挺无厘头的风格的，感觉编剧和剪辑的整体风格都是在往《大圣娶亲》上靠，在影片中还植入了好几个致敬的小彩蛋，我这里取了两个比较经典的放在下面了，
                  一个是经典的至尊宝和紫霞在城楼上的那段（这BGM一起来又想再听两遍一生所爱）另一个就是那个经典告白了（虽然形式不同，但内核感觉差不多）但其实罗家英一出场，
                  整个电影就弥漫着无厘头的气息…
                  编剧在构画故事的时候也比较完整，有头有尾，不会像一些网大，看完了整个电影满头问号以外还想问候一下全体人员家里亲属…
                  导演也不错，其实一个小时的时长可能在网大里面算常见，但是太短了不利于整个电影的故事交代，但这个导演也处理的不错，节奏挺快的，
                  在一半就已经要开始酝酿高潮的戏份了，是我这种倍速狂人也没怎么加速的水平。还有一点要好评，我是一个看电影会看完的那种人，看到最后，
                  字幕上出现了所有参与演出制作人员的名字很是感动，给整组鼓个掌。
                  谈到演员方面，张远作为歌手出身，虽然在演戏方面还略显青涩，但这部戏里面表现的真的还不错，至少没有出戏，就是这妆发有点五毛…
                  女主整体演技很自然，有一幕（在视频里面我放了）望着紫霞和至尊宝的时候，她的那个眼神还是有戏的。
                  综上所述，我认为这部电影还是挺不错的，虽然剧情上有一些bug，特效不够图片来凑。但作为网大来说是很及格的水平了 。
                </p>
                <img src="../../../assets/images/readNews/cover.png"/>
              </el-col>
              <el-col :span="24" class="news-date">
                发布于 2019/08/22 09:23
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
    name: 'readmessage',
    data() {
      return{
        fit: 'cover',
        url: require('../../../assets/images/user.png'),
        fromwhere: '',
        title: '',
        widgetName: ''
      }
    },
    mounted() {
      this.fromwhere = this.$route.params.fromwhere
      this.widgetName = this.$route.params.widgetName
      this.title = this.$route.params.routeName
    },
    methods: {
      goHome() {
        this.$router.push({
          name: 'home'
        })
      },
      goBack() {
        this.$router.push({
          name: this.fromwhere
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .page-header{
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;
    .nav-col{
      padding: 0px 10px;
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
  }
</style>
<style lang="scss" scoped>
  .readNews{
    height: 100%;
    overflow: auto;
    background-color: #93DBF1;
    .read-box{
      margin-top: 20px;
      .read-col{
        padding: 0px 10px;
        margin-bottom: 0.4rem;
        .news-result{
          padding: 0px 40px;
          p{
            margin-top: 20px;
          }
          p:first-child{
            font-size: 24px;
            color: #333;
            font-weight: bold;
          }
          p:first-child+p{
            font-size: 20px;
            color: #333;
            span:first-child{
              color: #CC2121;
            }
          }
          p:last-child{
            font-size: 20px;
            color: #999;
          }
        }
        .el-card__body{
          padding: 40px 80px;
        }
        .news-box{
          padding: 0px 40px;
          .news-row{
            .news-edit{
              display: block;
              width: 152px;
              cursor: pointer;
              margin-bottom: 0.4rem;
              img{
                display: block;
                width: 100%;
              }
            }
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
              color: #1E1E1E;
              font-weight: 600;
              line-height: 0.4rem;
              img{
                display: block;
                width: 100%;
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
  }
</style>
