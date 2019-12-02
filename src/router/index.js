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
      path: '/login/complate',
      name: 'complate',
      component: () => import('@/views/login/complate.vue')
    },
    {
      path: '/login/complateSpace',
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
        {
          path: '/classes/classHomepage',
          name: 'classHomepage',
          component: () => import('@/views/classes/classHomepage/index.vue') // 班级主页
        },
        {
          path: '/classes/myHomepage',
          name: 'myHomepage',
          component: () => import('@/views/classes/myHomepage/index.vue') // 我的主页
        },
        {
          path: '/classes/otherClassHomepage',
          name: 'otherClassHomepage',
          component: () => import('@/views/classes/otherClassHomepage/index.vue') // 别人的班级
        },
        {
          path: '/classes/otherHomepage',
          name: 'otherHomepage',
          component: () => import('@/views/classes/otherHomepage/index.vue') // 别人的主页
        }
      ]
    },
    {
      path: '/grade',
      name: 'grade',
      component: () => import('@/views/grade/index.vue'), // 年级空间
      redirect: '/grade/gradeHomepage',
      children: [
        {
          path: '/grade/gradeHomepage',
          name: 'gradeHomepage',
          component: () => import('@/views/grade/campusHomepage/index.vue'), // 社团空间
        },
        {
          path: '/grade/myGradeHomepage',
          name: 'myGradeHomepage',
          component: () => import('@/views/grade/myGradeHomepage/index.vue'), // 社团空间
        },
        {
          path: '/grade/otherGradeHomepage',
          name: 'otherGradeHomepage',
          component: () => import('@/views/grade/otherGradeHomepage/index.vue'), // 社团空间
        },
      ]
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
          component: () => import('@/views/topic/topicHomepage/index.vue'), //
        },
        {
          path: '/topic/myTopicGroupHomepage',
          name: 'myTopicGroupHomepage',
          component: () => import('@/views/topic/myTopicGroupHomepage/index.vue'), //
        },
        {
          path: '/topic/myTopicHomepage',
          name: 'myTopicHomepage',
          component: () => import('@/views/topic/myTopicHomepage/index.vue'), //
        },
        {
          path: '/topic/otherTopicDetail',
          name: 'otherTopicDetail',
          component: () => import('@/views/topic/otherTopicDetail/index.vue'), //
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
          component: () => import('@/views/teaching/teachingHomepage/index.vue'), // 专题空间-首页
        },
        {
          path: '/teaching/myTeachGroupHomepage',
          name: 'myTeachGroupHomepage',
          component: () => import('@/views/teaching/myTeachGroupHomepage/index.vue'), // 专题空间-首页
        },
        {
          path: '/teaching/myTeachingHomepage',
          name: 'myTeachingHomepage',
          component: () => import('@/views/teaching/myTeachingHomepage/index.vue'), // 专题空间-首页
        }
      ]
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('@/views/write/index.vue') // 写新闻 -- 通用
    },
    {
      path: '/newsmore',
      name: 'newsmore',
      component: () => import('@/views/public/more/newsmore.vue'), // 学校新闻动态展开更多
    },
    {
      path: '/noticemore',
      name: 'noticemore',
      component: () => import('@/views/public/more/noticemore.vue'), // 学校新闻动态展开更多
    },
    {
      path: '/classes/classesmore',
      name: 'classesmore',
      component: () => import('@/views/classes/more/classesmore.vue'), // 班级空间展开更多
    },
    {
      path: '/grade/gradeSpacemore',
      name: 'gradeSpacemore',
      component: () => import('@/views/grade/campusHomepage/more/gradeSpacemore.vue'), // 班级空间展开更多
    },
    {
      path: '/classes/examinemore',
      name: 'examinemore',
      component: () => import('@/views/classes/more/examinemore.vue'), // 审核中展开更多
    },
    {
      path: '/classes/messagemore',
      name: 'messagemore',
      component: () => import('@/views/classes/more/messagemore.vue'), // 消息通知展开更多
    },
    {
      path: '/readnews',
      name: 'readnews',
      component: () => import('@/views/public/read/readnews.vue'), // 文章详情页
    },
    {
      path: '/readnotice',
      name: 'readnotice',
      component: () => import('@/views/public/read/readnotice.vue'), // 文章详情页
    },
    {
      path: '/classes/readmessage',
      name: 'readmessage',
      component: () => import('@/views/classes/read/readmessage.vue'), // 文章详情页
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login'||to.path.indexOf('login')>=0) {
    next();
  } else {
    let token = sessionStorage.getItem('Authorization');

    if (token === null || token === '') {
      // if(from){

      // }
      console.log('from',to);
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
