import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    spaceInitTab: '',
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',//验证码
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
    SchoolDynamic:0,
    ClassDynamic:0,
    TeamDynamic:0,
    columnName:'',//栏目名称
    columnId:'',//栏目id
    baseUrl:process.env.NODE_ENV=='development'?'http://localhost:8081':'http://school.i2f2f.com'
  },
  mutations: {
    setColumnId(state,data){
      state.columnId=data;
    },
    setColumnName(state,data){
      state.columnName=data;
    },
    setTeamDynamic(state,data){
      state.TeamDynamic=data;
    },
    setSpaceInitTab(state, data) {
      state.spaceInitTab = data
    },
    setClassDynamic(state,data){//设置班级动态数
      state.ClassDynamic=data;
    },
    setSchoolDynamic(state,data){//设置校园动态数
      state.SchoolDynamic=data;
    },
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
})
export default store
