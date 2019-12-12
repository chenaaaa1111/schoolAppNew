<template>
        <el-card class="banner-card">
          <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classes/myHomepage' }" class="headPage">我的主页</el-breadcrumb-item>
            <el-breadcrumb-item class="currentPage">{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="clearfix">
            <el-col :span="24" class="top-box">
              <span class="top-title">
                 {{title}}
                <!-- <el-badge :value="messageLists.total" :max="99" class="item">
                  {{title}}
                </el-badge> -->
              </span>
              <!-- <el-button type="text">
                查看全部<img class="more" src="../../../../assets/images/classes/more.png"/>
              </el-button> -->
            </el-col>
            <!-- <span class="cardTitle">
              <img
                style="background:#226BB4;border-radius: 50%;"
                src="../../../../assets/images/myhome/message.png"/>
                <el-badge :value="messageLists.total" :max="99" class="item">
                  消息通知
                </el-badge>
            </span> -->
            <!-- <span class="more" @click="showmessagemore">
              <span class="text">全部</span><img src="../../../../assets/images/classes/more.png"/>
            </span> -->
          </div>
          <el-row class="question" v-for ="(item,index) in messageLists.model" :key="index">
            <el-col class="title"><el-button class="titleName" @click="msgDetails(item)" type="text">{{item.title}}</el-button></el-col>
            <el-col>
              <el-row>
                <el-col :span="14" class="time">{{item.create_time}}</el-col>
                <el-divider></el-divider>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </template>
      <script>
        import request from '@/api/request.js';
        export default{
          props: {
            source: {
              type: String,
              default: ''
            },
            title:{
              type: String,
              default:''
            },
            messageLists:{
              type: [Object, Array],
              default: () => {}
            }
          },
          data() {
            return {
              total: ''
            }
          },
          mounted(){
            console.log(this.messageLists,'adsdsaddssdsadasdas')
          },
          methods: {
            showmessagemore() {

            },
            msgDetails(item) { //点击消息 --进入消息通知详情页面
              let query = {};
              query.widgetName = '消息通知';
              query.fromname = '我的主页';
              query.fromwhere = 'myHomepage';
              query.spaceModule = 'classes';//班级空间名
              query.id = item.id; //消息id
              this.$router.push({
                name: 'readmessage',
                query: query
              })
            }
          }
        }
      </script>
      <style media="screen" lang="scss">
      .item{
        .is-fixed{
          right: -3px!important;
          top: 14px!important;
        }
      }
      </style>
      <style lang="scss">
      .banner-card{
        margin-bottom: 12px;
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
        .cardTitle{
          font-size: 24px;
          font-weight: 600;
          img{
            display: inline-block;
            width: 38px;
            height: 38px;
            vertical-align: middle;
            margin-right: 17px;
          }
        }
        .more{
          float: right;
          display: block;
          // width: 16px;
          height: 16px;
          cursor: pointer;
          margin-top: 0.1rem;
          .text{
            position: relative;
            top: 2px;
            margin-right: 10px;
            color: #888;
          }
          img{
            display: inline;
            width: 18px;
            vertical-align: middle;
          }
        }
        .newList{
          list-style: none;
          li{
            padding: 16px 20px 16px 18px;
            margin-left: 20px;
            font-size: 18px;
            background: url('../../../../assets/images/classes/dotg.png') no-repeat 0px center;
            background-size: 8px 8px;
            cursor: pointer;
            position: relative;
            border-bottom: 1px dashed #DEDEDE;
            .text{
              display: block;
              margin-right: 80px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .date{
              position: absolute;
              width: 80px;
              top: 17px;
              right: 0;
              color: #888888;
            }
          }
          li:hover{
            color: #034692;
            background-image: url('../../../../assets/images/classes/dot.png');
          }
        }
        .areablock{
          .areaName{
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .area{
            list-style: none;
            margin-bottom: 30px;
            li{
              float: left;
              width: 33.333%;
              padding: 8px 0px;
              font-size: 18px;
            }
            li:hover{
              color: #034692;
              cursor: pointer;
            }
          }
          .area::after{
            content: "";
            display: block;
            height: 0;
            clear: both;
          }
        }
        .notice{
          font-size: 18px;
          li{
            padding: 8px 0px;
            line-height: 30px;
            border-bottom: 1px dashed #DEDEDE;
            .noticeTitle{
              overflow:hidden;
              text-overflow:ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .noticeDate{
              text-align: right;
              color: #888888;
            }
          }
        }
        .circle{
          text-align: center;
          padding: 24px 0px 14px;
        }
        .myName{
          text-align: center;
          img{
            display: inline-block;
            width: 22px;
            height: 22px;
            vertical-align: middle;
            cursor: pointer;
            position: relative;
            top: -3px;
            left: 12px;
          }
        }
        .dynamic{
          height: 108px;
          margin-top: 30px;
          border-radius:12px;
          overflow: hidden;
          background-color: #D3E1F1;
          .dynamic-g,.dynamic-c{
            float: left;
            width: 50%;
            height: 100%;
            text-align: center;
            color: #034692;
            font-size: 26px;
            .count{
              width: 100%;
              height: 48px;
              line-height: 48px;
              margin-top: 26px;
            }
            .title{
              font-size: 16px;
              color: #333;
            }
          }
          .dynamic-g:first-child{
            .count{
              box-shadow: 1px 0px #819EBF;
            }
          }
      
        }
        .dynamic::after{
          content: '';
          display: block;
          height: 0;
          clear: both;
        }
        .vistorCount{
          font-size: 20px;
          color: #1E1E1E;
          font-weight: 600;
        }
        .lately{
          font-size: 16px;
          color: #034692;
          padding: 15px 0px 20px;
        }
        .vistor-avatar{
          margin-top: 10px;
          margin-right: 10px;
        }
        .examineTips{
          font-size: 14px;
          color: red;
          line-height: 30px;
        }
        .question{
          margin-top: 10px;
          .title{
            padding: 4px 0px;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .titleName{
              span{
                font-size:20px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(30,30,30,1);
              }
            }
          }
          .time{
            margin-bottom: 10px;
            // height: 44px;
            font-size: 14px;
            color: #999999;
            display: flex;
            align-items: center;
          }
          .exit{
            text-align: right;
            .el-button{
              font-size: 12px;
            }
          }
        }
      }
      </style>
      