import axios from 'axios';
// 添加请求拦截器，在请求头中加token
console.log("当前环境",process.env.NODE_ENV );
axios.interceptors.request.use(
    config => {
        console.log('config',config,config.data.mobile);
        if(config.url.indexOf('Login')>=0||config.url.indexOf('editRoom')>=0 ){

        }else{
            if (localStorage.getItem('Authorization')) {
                config.data.token = localStorage.getItem('Authorization');
              }else{
                  console.log('this',this)
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