<template>
    <div class="login">
        <div class="loginContent">
            <p class="tx_center">信息填写</p>
            <div class="topImage">
                <van-uploader v-model="fileList" multiple :max-count="1" />
                <p style="text-align: center;">头像</p>
            </div>
            <div style="clear: both;">
                <div class="leftName">校区选择：</div>
                <div class="rightButtons">
                    <van-button type="default earb active" @click="selectSchool($event)" data-id="1">西区</van-button>
                    <van-button type="default earb" @click="selectSchool($event)" data-id="2">北区</van-button>
                    <van-button type="default earb" @click="selectSchool($event)" data-id="3">南区</van-button>

                </div>
            </div>
            <van-button type="default" class="submitLogin" @click="next">下一步</van-button>

        </div>
    </div>
</template>
<style>
    .topImage {
        text-align: center;
    }
</style>
<style scoped>
    .leftName {
        float: left;
        line-height: 60px;
        font-size: 22px;
    }

    .rightButtons {
        float: left;
    }
    .earb.active{
        background:#E0EEFF url('./../../assets/images/select_ic.png') no-repeat  right bottom;
        background-size: 20px 24px;
        border: 1px solid #034692;
    }
    .earb{
        margin-left: 20px;
        border-radius:4px ;
        
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

    .sendCode {
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
            fileList: [],
            selects:[]
        }),
        mounted: function () {

        },
        methods: {
            next() {

            },
            selectSchool(ev){
                console.log(ev.target.dataset);
                var select=this.selects;//选中校区数组
                
                console.log('ev',ev);
                // ev.target.lassList.add("active");
                var classVar= ev.target.getAttribute('class');
                console.log(classVar);
                if(classVar.indexOf('active')>=0){
                    var index=select.indexOf(ev.target.dataset.id);
                    classVar= classVar.replace('active','');
                    ev.target.setAttribute('class',classVar);
                    select.splice(index,1);
                }else{
                    // debugger
                    classVar= classVar.concat('  active');
                    ev.target.setAttribute('class',classVar);
                    console.log('classeses',classVar);
                    select.push(ev.target.dataset.id)
                }
                console.log('select***',select)
            }
        }

    }

</script>