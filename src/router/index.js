import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

/**
 * 重写路由的push方法, 避免点击同一个item的时候报路由已存在 错误
 */
const routerPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const router= new Router({
  base: './', //加上这一行
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue') // 主页
    },
    {
      path: '/complate',
      name: 'complate',
      component: () => import('@/views/login/complate.vue')
    },
    {
      path: '/complateSpace',
      name: 'complateSpace',
      component: () => import('@/views/login/complate2.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/login/regist',
      name: 'regist',
      component: () => import('@/views/login/regist.vue')
    },
    {
      path: '/login/forgotPWD',
      name: 'forgotPWD',
      component: () => import('@/views/login/ForgetPassWord.vue')
    },
    {
      path: '/userBaseInfo',
      name: 'userBaseInfo',
      component: () => import('@/views/public/userBaseInfo/baseInfo.vue')
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('@/views/classes/index.vue'), // 班级空间
      redirect: '/classes/campusHomepage',
      children: [
        {
          path: '/classes/campusHomepage',
          name: 'campusHomepage',
          component: () => import('@/views/classes/campusHomepage/index.vue') // 校园主页
        },
        // {
        //   path: '/classes/classHomepage',
        //   name: 'classHomepage',
        //   component: () => import('@/views/classes/classHomepage/index.vue') // 班级主页
        // },
        // {
        //   path: '/classes/myHomepage',
        //   name: 'myHomepage',
        //   component: () => import('@/views/classes/myHomepage/index.vue') // 我的主页
        // },
        {
          path: '/classes/myClassPage',
          name: 'myClassPage',
          component: () => import('@/views/classes/myClassPage/index.vue') //我的班级
        },
        {
          path: '/classes/otherClassHomepage',
          name: 'otherClassHomepage',
          component: () => import('@/views/classes/otherClassHomepage/index.vue') // 别人的班级
        },
        // {
        //   path: '/classes/otherHomepage',
        //   name: 'otherHomepage',
        //   component: () => import('@/views/classes/otherHomepage/index.vue') // 别人的主页
        // }
      ]
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import('@/views/grade/index.vue'), // 年级空间
      // component: () => import('@/views/grade/grade.vue'), // 年级空间
      // redirect: '/grade/gradeHomepage',
      // children: [
      //   {
      //     path: '/grade/gradeHomepage',
      //     name: 'gradeHomepage',
      //     component: () => import('@/views/grade/campusHomepage/index.vue'), // 年级空间 --校园主页
      //   },
      //   // {
      //   //   path: '/grade/myGradeHomepage',
      //   //   name: 'myGradeHomepage',
      //   //   component: () => import('@/views/grade/myGradeHomepage/index.vue'), // 年级空间 --我的年级
      //   // },
      //   {
      //     path: '/grade/otherGradeHomepage',
      //     name: 'otherGradeHomepage',
      //     component: () => import('@/views/grade/otherGradeHomepage/index.vue'), // 年级空间 --别人的年级
      //   }
      // ]
    },
    {
      path: '/grade/otherGradeHomepage',
      name: 'otherGradeHomepage',
      component: () => import('@/views/grade/otherGradeHomepage/index.vue'), // 年级空间 --别人的年级
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('@/views/team/index.vue'), // 社团空间
      redirect: '/team/mainTeamHomepage',
      children: [
        {
          path: '/team/mainTeamHomepage',
          name: 'mainTeamHomepage',
          component: () => import('@/views/team/mainTeamHomepage/index.vue'), // 社团空间
        },
        {
          path: '/team/myTeamHomepage',
          name: 'myTeamHomepage',
          component: () => import('@/views/team/myTeamHomepage/index.vue'), // 社团空间
        },
        {
          path: '/team/teamMyHomepage',
          name: 'teamMyHomepage',
          component: () => import('@/views/team/teamMyHomepage/index.vue'), // 社团空间
        },
        {
          path: '/team/myTeamDetail',
          name: 'myTeamDetail',
          component: () => import('@/views/team/myTeamDetail/index.vue'), // 社团空间
        },
        {
          path:"/team/otherTeamDetail",
          name: 'oterTeamDetail',
          component: () => import('@/views/team/otherTeamDetail/index.vue'), // 社团空间
        },
        {
          path:"/team/otherTeamMyPage",
          name: 'otherTeamMyPage',
          component: () => import('@/views/team/otherTeamMyPage/index.vue'), // 社团空间
        }
      ]
    },
    {
      path: '/special',
      name: 'special',
      component: () => import('@/views/special/index.vue'), // 专题空间
      redirect: '/special/specialMainHomepage',
      children: [
        {
          path: '/special/specialMainHomepage',
          name: 'specialMainHomepage',
          component: () => import('@/views/special/specialMainHomepage/index.vue'), // 专题空间-首页
        },
        {
          path: '/special/mySpecialHomepage',
          name: 'mySpecialHomepage',
          component: () => import('@/views/special/mySpecialHomepage/index.vue'), // 专题空间-我的专题
        },
        {
          path: '/special/otherHomepage',
          name: 'otherHomepage',
          component: () => import('@/views/special/otherHomepage/index.vue'), // 专题空间-别人的主页
        },
        {
          path: '/special/showmovie',
          name: 'showmovie',
          component: () => import('@/views/special/read/index.vue'), // 专题空间-我的专题内容详情
        }
      ]
    },
    {
      path: '/topic',
      name: 'topic',
      component: () => import('@/views/topic/index.vue'), // 课题空间
      redirect: '/topic/topicHomepage',
      children: [
        {
          path: '/topic/topicHomepage',
          name: 'topicHomepage',
          component: () => import('@/views/topic/topicHomepage/index.vue'), //课题空间 -- 课题主页
        },
        {
          path: '/topic/myTopicGroupHomepage',
          name: 'myTopicGroupHomepage',
          component: () => import('@/views/topic/myTopicGroupHomepage/index.vue'), // 课题空间 -- 我的课题组
        },
        {
          path: '/topic/myTopicMainHomepage',
          name: 'myTopicMainHomepage',
          component: () => import('@/views/topic/myTopicMainHomepage/index.vue'), // 课题空间 -- 从我的课题组---进入的课题组
        },
        {
          path: '/topic/otherTopicGroupHomepage',
          name: 'otherTopicGroupHomepage',
          component: () => import('@/views/topic/otherTopicGroupHomepage/index.vue'), //课题空间 -- 别人的课题组 -主页
        },
        {
          path: '/topic/myTopicHomepage',
          name: 'myTopicHomepage',
          component: () => import('@/views/topic/myTopicHomepage/index.vue'), // 课题空间 -- 我的主页
        },
        {
          path: '/topic/otherTopicDetail',
          name: 'otherTopicDetail',
          component: () => import('@/views/topic/otherTopicDetail/index.vue'), // 课题空间 -- 别人的主页
        }
      ]
    },
    {
      path: '/teaching',
      name: 'teaching',
      component: () => import('@/views/teaching/index.vue'), // 教研空间
      redirect: '/teaching/teachingHomepage',
      children: [
        {
          path: '/teaching/teachingHomepage',
          name: 'teachingHomepage',
          component: () => import('@/views/teaching/teachingHomepage/index.vue'), // 教研空间-教研主页
        },
        {
          path: '/teaching/myTeachGroupHomepage',
          name: 'myTeachGroupHomepage',
          component: () => import('@/views/teaching/myTeachGroupHomepage/index.vue'), // 教研空间-我的教研组
        },
        {
          path: '/teaching/myTeachMainHomepage',
          name: 'myTeachMainHomepage',
          component: () => import('@/views/teaching/myTeachMainHomepage/index.vue'), // 教研空间-我的教研组--主页
        },
        {
          path: '/teaching/myTeachingHomepage',
          name: 'myTeachingHomepage',
          component: () => import('@/views/teaching/myTeachingHomepage/index.vue'), // 教研空间-我的主页
        },
        {
          path: '/teaching/otherTeachingHomepage',
          name: 'otherTeachingHomepage',
          component: () => import('@/views/teaching/otherTeachingHomepage/index.vue'), // 教研空间-别的教研主页
        },
        {
          path: '/teaching/otherHomepage',
          name: 'otherHomepage',
          component: () => import('@/views/teaching/otherHomepage/index.vue'), // 教研空间-别人的主页
        },
      ]
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('@/views/write/index.vue') // 写新闻/消息/文章/专题 -- 通用（各个空间模块）
    },
    {
      path: '/readnews',
      name: 'readnews',
      component: () => import('@/views/public/read/readnews.vue'), // 通用  新闻详情
    },
    {
      path: '/readnotice',
      name: 'readnotice',
      component: () => import('@/views/public/read/readnotice.vue'), // 通用 通知公告详情
    },
    {
      path: '/newsmore',
      name: 'newsmore',
      component: () => import('@/views/public/more/newsmore.vue'), // 通用   学校新闻动态 展开更多
    },
    {
      path: '/noticemore',
      name: 'noticemore',
      component: () => import('@/views/public/more/noticemore.vue'), // 通用  通知公告  展开更多
    },
    {
      path: '/classes/classesmore',
      name: 'classesmore',
      component: () => import('@/views/classes/more/classesmore.vue'), // 校园主页- 班级空间  展开更多
    },
    {
      path: '/grade/gradeSpacemore',
      name: 'gradeSpacemore',
      component: () => import('@/views/grade/campusHomepage/more/gradeSpacemore.vue'), //年级空间 校园首页 年级空间 展开更多
    },
    {
      path: '/classes/readmessage',
      name: 'readmessage',
      component: () => import('@/views/classes/read/readmessage.vue'), // 班级空间 我的主页从审核 审核未通过 消息通知 进入到文章详情页 消息通知详情
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login'||to.path.indexOf('login')>=0) {
//     next();
//   } else {
//     let token = sessionStorage.getItem('Authorization');

//     if (token === null || token === '') {
//       // if(from){

//       // }
//       console.log('from',to);
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

export default router;
