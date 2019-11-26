import axios from 'axios';
import vm from '@/main.js';
// 添加请求拦截器，在请求头中加token
console.log("当前环境",process.env.NODE_ENV );

axios.interceptors.request.use(
    config => {
        console.log('config',typeof config,config.data);
        if(config.url.indexOf('Login')>=0 ){

        }else{
            if(config.data.__proto__.constructor.name=='FormData'){//判断是否formdata 类型
                config.data.append('token',sessionStorage.getItem('Authorization'));
            }else{
                if (sessionStorage.getItem('Authorization')) {
                    config.data.token = sessionStorage.getItem('Authorization');
                  }else{
                      console.log('this',this);
                      vm.$router.push('/login')
                  }
            }
          
        } 
      return config;
    },
    error => {
      return Promise.reject(error);
    });
var request={
    post:function(url,data,callBack,withToken){
        if(!withToken){

        }
        // var baseUrl="http://school.i2f2f.com";
        var baseUrl="" ;
        if(process.env.NODE_ENV=='development'){
            baseUrl= "http://localhost:8081"
        }else{
            baseUrl="http://school.i2f2f.com";
        }
        axios({
            
                method: 'post',
                url:baseUrl+url,
                data:data
              })
              .then((response)=>{
                  if(response.data.code==1001){
                    vm.$router.push('/login');
                      return;
                  }
                  if(callBack){
                      callBack(response);
                  }
              })
              .catch((error)=>{
                  console.error(error);
                //   alert('系统繁忙，请稍后再试')            
        })
    },
    get:function(url,data,callBack){
        // var baseUrl="http://school.i2f2f.com";
        var baseUrl=" http://localhost:8080" ;
        axios({
            
                method: 'get',
                url:baseUrl+url,
                data:data
              })
              .then((response)=>{
                  console.log(response);
                  if(callBack){
                      callBack(response);
                  }
              })
              .catch((error)=>{
                  console.error(error);
                //   alert('系统繁忙，请稍后再试')            
        })
    },
    requestLogin:function(){
        this.post('/roomapi/Login/Loginpwd',{
            mobile:'15269920820',
            LoginPWD:'123456'
        })
    }
}
// request.requestLogin()
export default request;