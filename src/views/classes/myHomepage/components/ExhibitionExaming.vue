<!-- 审核中的动态 -->
<template>
        <el-card>
          <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classes/myHomepage' }" class="headPage">我的主页</el-breadcrumb-item>
            <el-breadcrumb-item class="currentPage">{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row class="top-block">
            <el-col :span="24" class="top-box">
              <span class="top-title">{{title}}</span>
              <!-- <el-button type="text">
                查看全部<img class="more" src="../../../../assets/images/classes/more.png"/>
              </el-button> -->
            </el-col>
            <el-col :span="24">
              <el-row class="article" v-for="(item,index) in articles" :key="index">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="18" class="title">
                    <span class="text">{{item.title}}</span>
                      <span class="classify">(栏目: {{item.column_name}})</span>
                      <span class="date">{{item.create_time}}</span>
                    </el-col>
                    <el-col :span="3" class="operation">
                            <el-button v-if="title == '审核中'" type="text" size="mini" @click="recall(item)">撤回</el-button>
                            <el-button v-if="title == '审核未通过'" type="text" size="mini" @click="goToEdit(item)">编辑</el-button>
                          </el-col>
                    <el-col :span="3" class="operation">
                      <el-button type="text" size="mini">删除</el-button>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <el-row class="content" :gutter="10">
                    <el-col :span="6">
                      <img class="con-pic" :src="baseUrl+item.image||'../../../../assets/images/content.png'"/>
                    </el-col>
                    <el-col :span="18">
                      <div class="con-text">
                          {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}
                        </div>
                      <div class="read-more">
                        <el-button type="text" size="mini">阅读全文<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <!-- <el-col :span="24" class="article-date">{{item.create_time}}</el-col> -->
                <el-col :span="24" ><el-divider></el-divider></el-col>
              </el-row>
      
             
            </el-col>
          </el-row>
        </el-card>
      </template>
      <script>
        import request from '@/api/request.js';
        export default {
          props:{
            articles:{default:[]},
            title:{default:'审核中'},
            updateUrl:''
          },
          data(){
            return {
                baseUrl:this.$store.state.serverUrl,
                upUrl:this.$props.updateUrl
            }
          },
          mounted(){

          },
          methods:{
            changeTab(tab){
              console.log(tab);
            },
            recall(item){ //审核中 点击撤回

            },
            goToEdit(item){ //审核未通过  点击编辑
                sessionStorage.setItem('editor',JSON.stringify(item));
                this.$router.push({
                    path:'/write',
                    query:{
                        isEdit:true,
                        upUrl:'/roomapi/Room_Class/addArticle',
                        spacename:'classes',
                        fromname:'班级空间'
                    }
                })
            }
        
          }
        }
      </script>
      <style lang="scss" scoped>
      .top-block{
        .top-box{
          position: relative;
          text-align: center;
          margin-bottom: 35px;
          .top-title{
            display: inline-block;
            width: 200px;
            height: 50px;
            border: 1px solid #034692;
            border-radius: 25px;
            line-height: 50px;
            font-size: 24px;
            font-weight: 600;
          }
          .el-button{
            float: right;
            font-size: 12px;
            .more{
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: middle;
              margin-left: 10px;
              position: relative;
              top: -3px;
            }
          }
        }
        .article{
          // margin-top: 25px;
          .subTitle{
            font-size: 16px;
            color: #999;
            line-height: 30px;
            .el-divider--horizontal{
              margin-top: 12px;
            }
          }
          .title{
            line-height: 40px;
            font-size: 20px;
            .text{
              font-weight: bold;
              margin-right: 30px;
            }
            .classify{
              color: #666;
              margin-right: 30px;
              white-space: nowrap;
            }
            .date{
              color: #666;
              white-space: nowrap;
            }
          }
          .operation{
            text-align: right;
            .el-button{
              padding-top: 0;
              font-size: 12px;
            }
          }
          .content{
            margin: 24px 0px 0px 0px;
            padding: 0;
            .con-pic{
              display: block;
              width: 100%;
            }
            .con-text{
              line-height: 36px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;
            }
            .read-more{
              text-align: right;
            }
          }
          .article-date{
            font-size: 18px;
            color: #999;
            line-height: 30px;
            margin-top: 14px;
          }
        }
      }
      </style>
      