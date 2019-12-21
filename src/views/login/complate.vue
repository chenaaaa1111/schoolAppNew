<template>
    <div class="login" :style="divstyle">
        <div class="loginContent">
            <p class="tx_center">信息填写</p>
            <div class="topImage">
                <van-uploader v-model="fileList"  :after-read="afterRead" :preview-full-image="false" :max-count="1" />
                <!-- <el-upload action="/roomapi/Users/editBasic" list-type="picture-card"
                :data="updata"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->
                <p style="text-align: center;">头像</p>
            </div>
            <div style="clear: both;overflow: hidden;">
                <div class="leftName">校区选择：</div>
                <div class="rightButtons">

                    <van-button v-for="(item,index) in areaList" :key="item.id" type="default earb "
                        :class="index==0?'active':''" @click="selectSchool($event)" :data-id="item.id">{{item.title}}
                    </van-button>
                    <van-button type="default earb" @click="selectSchool($event)" data-id="2">北区</van-button>
                    <van-button type="default earb" @click="selectSchool($event)" data-id="3">南区</van-button>
                </div>
            </div>
            <div>
            
                <van-cell-group>
                    <van-field v-model="userInfo.name" placeholder="请输入用户名" />
                  </van-cell-group>
            </div>
        
            <van-button type="default" class="submitLogin" @click="next">完成注册并登陆</van-button>

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

    .earb.active {
        background: #E0EEFF url('./../../assets/images/select_ic.png') no-repeat right bottom;
        background-size: 20px 24px;
        border: 1px solid #034692;
    }

    .earb {
        margin-left: 20px;
        border-radius: 4px;

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
    import $ from 'jquery'
    export default {
        data: () => ({
            updata:{'sid':'1',name:'刘刚'},
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            userInfo:{},
            selects: '',
            areaList: [],
            divstyle: {
                backgroundImage: "url(" + require('./../../assets/images/lgbackground.png') + ")",
            }
        }),
        mounted: function () {
            this.getAeas();
            $('#app').on('click','.van-image-preview',function(){
            })
        },
        methods: {
            handleRemove(file, fileList) {
            },
            afterRead(file){
                var data = new FormData();
                data.append('file',file.file);
                data.append('type','1');
                var self=this;
                request.post('/roomapi/Upsystem/upload',data,function(res){
                   self.imgUrl=res.data.url;
                })
              
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getAeas() {//获取校区
                var self = this;
                request.post('/roomapi/School/lists', {}, function (responese) {
                    //默认选中第一个
                    if (responese.data&&responese.data&&responese.data[0]) {
                        self.selects = responese.data[0].id;
                        self.areaList = responese.data;
                    }else{
                        self.$toast.fail(res.message||'服务器错误');
                    }

                });
            },
            next() {
                this.userInfo.sid=this.selects;
                var data=this.userInfo;
                var self=this;
               data.avatar=this.imgUrl;
                  request.post('/roomapi/Users/editBasic',data,function(responese){
                      
                    if(responese.code==0){
                        self.$router.push('/login')
                    }
                })
                // this.$router.push('/login/complate2')
            },
            selectSchool(ev) {
                var select = this.selects;//选中校区id 只能一个

                // ev.target.lassList.add("active");
                var classVar = ev.target.getAttribute('class');
                if (classVar.indexOf('active') >= 0) {
                    classVar = classVar.replace('active', '');
                    ev.target.setAttribute('class', classVar);
                    this.selects = '';
                } else {
                    // debugger
                    classVar = classVar.concat('  active');
                    var sedom = document.querySelector('.active');
                    var oldClassVar = sedom.getAttribute('class');//是否有别的active
                    oldClassVar = oldClassVar.replace('active', '');
                    sedom.setAttribute('class', oldClassVar);
                    ev.target.setAttribute('class', classVar);
                    this.selects = ev.target.dataset.id;//选中校区id
                }
            }
        }

    }

</script>