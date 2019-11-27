<template>
    <div class="login" :style="divstyle">
        <div class="loginContent">
            <p class="tx_center">找回密码</p>
            <van-cell-group>
                <van-field v-model="phone" required clearable label="手机号" placeholder="请输入手机号" />
                <div style="position: relative;padding-top: 10px;margin-bottom: 10px;">
                    <van-field v-model="veryCode" label="验证码" placeholder="请输入验证码" required />
                    <van-button type="default" class="sendCode" @click="sendCode">{{millTime==0?'发送验证码':millTime+'s后重试'}}</van-button>
                </div>


                <van-field v-model="password" :type="isShow?'text':'password'" label="设置新密码" :right-icon="isShow?'eye-o':'closed-eye'"
                @click-right-icon="showPass"
                 placeholder="设置新密码" required />

            </van-cell-group>
            <van-button type="default" class="submitLogin" @click="login">登录</van-button>

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
                var self=this;
                var data = {
                    mobile: this.phone
                }
                if(self.millTime!=0){
                    return;
                }
                request.post('/roomapi/Sms/ChuanglanSmsApi', data, function (res) {
                    if (res.status == 200) {
                        if (res.data.code == 0) {
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
            showPass(){
                this.isShow=!this.isShow;
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
                if(this.veryCode==''){
                    this.$toast.fail('请输入验证码');
                }
                var data = {
                    mobile: this.phone,
                    LoginPWD: this.password,
                    code:this.veryCode
                }
                request.post('/roomapi/Login/uploginpwd', data, function (res) {
                    
                    if (res.status == 200) {
                        if (res.data.code == 0) {
                            localStorage.setItem('Authorization', res.data.data.token);
                            self.$router.push('/')
                        }
                    }

                })
            }
        }
    }

</script>