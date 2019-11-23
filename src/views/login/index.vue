<template>
    <div class="login">
        <div class="loginContent">
            <p class="tx_center">账号密码登录</p>
            <van-cell-group>
                <van-field v-model="phone" required clearable label="手机号" 
                    placeholder="请输入手机号"  />

                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
            </van-cell-group>
            <p style="text-align: right;" @click="forgetPass">忘记密码</p>
            <van-button type="default" class="submitLogin" @click="login"  >登录</van-button>

        </div>
    </div>
</template>
<style scoped>
    .loginContent {
        width: 50%;
        height: 800px;
        background: #fff;
        border-radius: 12px;
        position: absolute;
        left: 50%;
        top: 50%;
        padding: 42px 42px 42px 42px;
        box-sizing: border-box;
        padding-top: 42px;
        transform: translate(-50%, -50%);
    }
    .submitLogin{
        width: 100%;
        margin-top: 100px;
        background: #034692;
        color: #fff;
    }
    .tx_center{
        text-align: center;
        font-size:28px;
        margin-bottom: 100px;
    }

    @media screen and (max-width: 600px) {
        .loginContent {
            width: 95%;
        }
    }

    .login {
        background: url('./../../assets/images/lgbackground.png') no-repeat center center;
        height: 100%;
        width: 100%;
        background-size: 100% 100%;
    }
</style>
<script>
    import request from '@/api/request.js';
    export default {
        data:()=>({
            phone:'',
            password:''
        }),
        methods: {
            forgetPass(){
                this.$router.push('/forgotPWD')
            },
            login(){
                var self=this;
                if(this.phone==''||this.phone==undefined){
                    this.$toast.fail('请输入手机号');
                    return;
                }
                if(this.password==''){
                    this.$toast.fail('请输入密码');
                    return;
                }
                var data={
                    mobile:this.phone,
                    LoginPWD:this.password
                }
                request.post('/roomapi/Login/Loginpwd',data,function(res){
                    console.log('返回res',res);
                    debugger
                    if(res.status==200){
                        if(res.data.code==0){
                        localStorage.setItem('Authorization',res.data.data.token);
                        self.$router.push('/')
                    }
                    }
                  
                })
            }
        }
    }

</script>