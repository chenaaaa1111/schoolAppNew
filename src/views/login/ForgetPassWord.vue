<template>
    <div class="login" :style="divstyle">
        <!-- 找回密码 -->
        <div v-if="status" class="loginContent">
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

            <van-button type="default" class="submitLogin" @click="confirmModify">确认修改</van-button>
            <div class="accountLogin"><el-button type="text" @click="login">账号密码登录</el-button></div>
            

        </div>
        <!-- 修改密码成功页面 -->
        <div v-else class="loginContent">
            <p class="tx_center">修改成功</p>
            <div class="modifyTip">
                <img src="../../assets/images/classes/success2.png" />
                <p>密码修改成功</p>
            </div>
            <div class="immediatelyLogin"><el-button plain @click="login">立即登录</el-button></div>
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
    .accountLogin,.immediatelyLogin{
        text-align: center;
    }
    .accountLogin span{
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(3,70,146,1);
    }

    .tx_center {
        text-align: center;
        font-size: 28px;
        margin-bottom: 100px;
    }

    .modifyTip{
        text-align: center;
        padding-bottom: 48px;
    }
    .modifyTip p{
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .immediatelyLogin button{
        width:286px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(205,204,204,1);
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
            status: false, //修改密码状态
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
            //验证手机号输入
            checkPhone(){
                if(!(/^1[3456789]\d{9}$/.test(this.phone))){
                    this.$toast.fail('手机号输入有误')
                    return false
                }else{
                    return true
                }
            },
            sendCode(){
                var self=this;
                var data = {
                    mobile: this.phone
                }
                if(self.millTime!=0){
                    return;
                }
                if (self.phone == '' || self.phone == undefined) {
                    self.$toast.fail('请输入手机号');
                    return;
                }
                if(!self.checkPhone()){
                    return
                }
                request.post('/roomapi/Sms/ChuanglanSmsApi', data, function (res) {
                    if (res.data.code == 0) {
                        self.$toast.success(res.message);
                        self.millTime=60;
                        self.sendInter=setInterval(function(){
                            self.millTime--;
                            if(self.millTime==0){
                                clearInterval(self.sendInter)
                            }
                        },1000);
                    }
                })
            },
            showPass(){
                this.isShow=!this.isShow;
            },
            confirmModify() { //确认修改
                var self = this;
                if (self.phone == '' || self.phone == undefined) {
                    self.$toast.fail('请输入手机号');
                    return;
                }
                if (self.password == '') {
                    self.$toast.fail('请输入密码');
                    return;
                }
                if(self.veryCode==''){
                    self.$toast.fail('请输入验证码');
                }
                var data = {
                    mobile: self.phone,
                    LoginPWD: self.password,
                    code: self.veryCode
                }
                request.post('/roomapi/Login/uploginpwd', data, function (res) {
                    if (res.code == 200) {
                        self.status = false;
                    }
                })
            },
            login() {  //账号密码登录 立即登录
                this.$router.push('/login');
            }
        }
    }

</script>