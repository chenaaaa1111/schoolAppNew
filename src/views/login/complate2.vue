<template>
    <div class="view-home">
        <div class="home-top">
            <el-row type="flex" justify="center">
                <el-col class="home-navbox" :xl="18" :lg="18" :md="20" :sm="22" :xs="24">
                    <el-row>
                        <el-col :span="12" class="nav-title">
                            <img src="@/assets/fonts/logo.png" />
                            欢迎来到校本社团综合管理服务系统
                        </el-col>
                        <el-col :span="12" class="nav-user">
                            <el-dropdown trigger="click" @visible-change="visibleChange">
                                <span class="el-dropdown-link">
                                    <el-avatar shape="circle" :size="48" :fit="fit" :src="url"></el-avatar>
                                    <span v-if="!visible" class="userName">刘子璇</span>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-s-custom">刘子璇</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div class="home-body">
            <div class="body-inner">
                <el-row type="flex" justify="center" style="width: 100%;">
                    <el-col :xl="16" :lg="16" :md="20" :sm="22" :xs="24">
                        <el-card class="nine">
                            <el-row>
                                <el-col :span="8" v-for="(item, index) in routerList" :key="index">
                                    <!-- <router-link :to="{name: item.name}" class="router-link"> -->
                                    <div class="icon-box">
                                        <el-checkbox v-model="list[index]" @change="changeSe(index)"></el-checkbox>
                                        <img :src="item.image" />
                                    </div>
                                    <div class="item-title">{{item.title}}</div>
                                    <!-- </router-link> -->
                                </el-col>
                            </el-row>
                            <el-row style="padding-top:70px ;">
                                 
                                            <el-col :span="24">
                                                    <el-button type="primary" style="width: 100%;" @click="rigeGo">完成注册并登录</el-button>
            
                                            </el-col>
                                   
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
               

            </div>

        </div>
    </div>
</template>
<script>
    import request from "@/api/request.js"
    export default {
        data() {
            return {
                url: require('@/assets/images/user.png'),
                fit: 'cover',
                list:[],
                lsitdict:["room_class","room_grade","room_community","room_project","room_subject","room_teaching"],
                dict:{room_class:0,room_grade:0,room_community:0,room_project:0,room_subject:0,room_teaching:0},
                visible: false,
                routerList: [
                    {
                        id:"room_class",
                        name: 'classes',
                        title: '班级空间',
                        image: require('@/assets/main/classes.png')
                    },
                    {
                        id:"room_grade",
                        name: 'grade',
                        title: '年级空间',
                        image: require('@/assets/main/grade.png')
                    },
                    {
                        id:"room_community",
                        name: 'team',
                        title: '社团空间',
                        image: require('@/assets/main/team.png')
                    },
                    {
                        id:"room_project",
                        name: 'room_project',
                        title: '专题空间',
                        image: require('@/assets/main/special.png')
                    },
                    {
                        id: 'room_subject',
                        name: 'room_subject',
                        title: '课题空间',
                        image: require('@/assets/main/topic.png')
                    },
                    {
                        id: 'room_teaching',
                        name: 'room_teaching',
                        title: '教研空间',
                        image: require('@/assets/main/teaching.png')
                    },
                ]
            }
        },
        mounted() {

        },
        methods: {
            rigeGo(){
                var data=this.dict;
                var self=this;
                request.post('/roomapi/Users/editRoom',data,function(res){//提交空间并跳转登录
                    console.log('res',res);
                    if(res.data&&res.data.code==0){
                        self.$router.push('/login');
                    }else{

                    }
                });
            },
            changeSe(sind){
                console.log('se',this.list);
                // lsitdict.array.forEach((element,index) => {
                //     if(list[index]==true){
                //         element=1
                //     }else{
                //         element=0  
                //     }
                // });
                var lsitdict =this.lsitdict ;
                if(this.list[sind]==true){
                    this.dict[lsitdict[sind]]=1
                }else{
                    this.dict[lsitdict[sind]]=0;
                }
                console.log('se',this.dict);
            },
            visibleChange(val) {
                console.log(val, 'val shishenme ')
                this.visible = val
            },
            changeRouter(name) {
                console.log('name')
            }
        }
    }
</script>

<style lang="scss">
    .el-checkbox {
        position: absolute;
        right: 37px;
        top: 30px;
    }

    .el-col {
        position: relative;
    }

    .view-home {
        height: 100%;
        background: url('./../../assets/images/bg1.jpg') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;

        .home-top {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
            height: 100px;

            .home-navbox {
                .el-row {
                    height: 100%;

                    .nav-title {
                        padding-left: 10px;
                        height: 100px;
                        font-size: 24px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;

                        img {
                            display: inline-block;
                            width: 48px;
                            height: 48px;
                            vertical-align: middle;
                            margin-right: 16px;
                        }
                    }

                    .nav-user {
                        padding-right: 10px;
                        height: 100%;
                        text-align: right;

                        .el-dropdown {
                            height: 100%;

                            .el-dropdown-link {
                                display: block;
                                height: 100%;
                                display: flex;
                                align-items: center;

                                .el-avatar {
                                    margin-right: 16px;
                                }

                                .userName {
                                    float: right;
                                    font-size: 20px;
                                    font-weight: 500;
                                }
                            }
                        }
                    }
                }
            }
        }

        .home-body {
            width: 100%;
            flex: 1;

            .body-inner {
                width: 100%;
                height: 100%;
                position: relative;
                align-items: center;

                .nine {
                    background: #F8FBFC;
                    margin: 0px 10px;

                    .el-card__body {
                        padding: 80px;
                    }

                    .el-col:nth-child(3) {
                        box-shadow: 0px 1px #CECDCD;
                    }

                    .el-col:nth-child(4) {
                        box-shadow: 1px 0px #CECDCD;
                    }

                    .el-col:nth-child(5) {
                        box-shadow: 1px 0px #CECDCD;
                    }

                    .el-col:nth-child(6) {
                        box-shadow: 0px 0px #CECDCD;
                    }

                    .el-col:hover {
                        background: #c1e0e8;
                        cursor: pointer;
                        color: #329EB6;
                    }

                    .el-col {
                        box-shadow: 1px 1px #CECDCD;

                        .icon-box {
                            width: 100px;
                            height: 100px;
                            padding: 10px;
                            margin: 42px auto 10px;

                            img {
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .item-title {
                            font-size: 24px;
                            text-align: center;
                            margin-bottom: 50px;
                        }
                    }
                }
            }
        }
    }
</style>