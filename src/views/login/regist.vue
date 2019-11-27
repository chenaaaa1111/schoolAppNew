<template>
    <div class="login" :style="divstyle">
        <div class="loginContent">
            <p class="tx_center">注册账号</p>
            <van-cell-group>
                <van-field v-model="phone" required clearable label="手机号" placeholder="请输入手机号" />
                <div style="position: relative;padding-top: 10px;margin-bottom: 10px;">
                    <van-field v-model="veryCode" label="验证码" placeholder="请输入验证码" required />
                    <van-button type="default" class="sendCode" @click="sendCode">{{millTime==0?'发送验证码':millTime+'s后重试'}}</van-button>
                </div>


                <van-field v-model="password" :type="isShow?'text':'password'" label="密码" :right-icon="isShow?'eye-o':'closed-eye'"
                @click-right-icon="showPass"
                 placeholder="设置密码" required />

            </van-cell-group>
            <van-button type="default" class="submitLogin" @click="login">下一步</van-button>
            <p class="pcenter bodP">已有账号？<a href="javascript:void(0)" @click="goLogin" >立即登录</a> </p>

        </div>
    </div>
</template>
<style scoped>
    .bodP{
        margin-top: 30px;
    }
    .pcenter{
        text-align: center;
    }
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
    .sendCode{
        position: absolute;
        top: 8px;
        right: 0;
    }
    .submitLogin {
        width: 100%;
        margin-top: 100px;
        background: #034692;
        color: #fff;
    }

    .tx_center {
        text-align: center;
        font-size: 28px;
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
        data: () => ({
            phone: '',
            password: '',
            veryCode:'',
            isShow:false,
            millTime:0,
            sendInter:'',
            divstyle:{
                backgroundImage:"url("+require('./../../assets/images/lgbackground.png')+")",
            }
        }),
        mounted:function(){
            clearInterval(this.sendInter)
        },
        methods: {
            sendCode(){
                debugger
                var self=this;
                var data = {
                    mobile: this.phone
                }
                if(self.millTime!=0){
                    return;
                }
                request.post('/roomapi/Sms/ChuanglanSmsApi', data, function (res) {
                    console.log('返回res', res);
                    if (res.status == 200) {
                        if (res.code == 0) {
                            self.$toast.success('发送成功');
                            self.millTime=60;
                            self.sendInter=setInterval(function(){
                                self.millTime--;
                                if(self.millTime==0){
                                    clearInterval(self.sendInter)
                                }
                            },1000);
                        }
                    }

                })
            },
            goLogin(){
                this.$router.push('/login')
            },
            showPass(){
                this.isShow=!this.isShow;
                console.log(this.isShow)
            },
            login() {
                var self = this;
                if (this.phone == '' || this.phone == undefined) {
                    this.$toast.fail('请输入手机号');
                    return;
                }
                if (this.password == '') {
                    this.$toast.fail('请输入密码');
                    return;
                }
                var data = {
                    mobile: this.phone,
                    LoginPWD: this.password,
                    code:this.veryCode,
                }

                request.post('/roomapi/Login/registered', data, function (res) {
                    console.log('返回res', res);
                
                        if (res.code == 0) {
                            localStorage.setItem('Authorization',res.data.token);
                            console.log('res.data',res.data);
                            self.$router.push('/complate')
                        }else{
                            self.$toast.fail(res.data.message);

                        }
               

                })
            }
        }
    }

</script>