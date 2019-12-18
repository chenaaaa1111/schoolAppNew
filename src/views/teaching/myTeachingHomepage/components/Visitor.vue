<template>
  <el-card class="banner-card">
    <div slot="header" class="clearfix">
      <h2 class="cardTitle"><img src="../../../../assets/images/myhome/vistor.png"/>最近访客</h2>
    </div>
    <h2 class="vistorCount">
      总共访问: {{userInfo.access_teaching?userInfo.access_teaching:0}}人次
    </h2>
    <div class="lately">最近10个访客:</div>
    <div v-if="avators.length>0">
      <span @click="goOther(item.id)" v-for="(item ,index ) in avators" :key="index" >
        <el-avatar class="vistor-avatar" :size="44" icon="el-icon-user-solid" :src="item.avatar" ></el-avatar>
      </span>
    </div>
    <div v-if="avators.length ==0">暂无访客</div>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    props:{
      teamId:{
        default:''
      }
    },
    data() {
      return {
        userInfo: {},
        circleUrl: require('../../../../assets/images/user.png'),
        avators:[]//访客列表
      }
    },
    mounted() {
      this.userInfo= JSON.parse(sessionStorage.getItem('userInfo'));
      this.getAvortors();
    },
    methods: {
      getAvortors(){ //最近访客 u_id 用户id
        var data= {
          u_id: this.userInfo.id
        };
        var self=this;
        request.post('/roomapi/Project/visitors',data,function(res){
          if(res.code ==0){
            self.avators=res.data;
          }          
        })
      },
      goOtherPage(){

      },
      goOther(id) {
        console.log('999')
        this.$router.push({
          name: 'otherTopicDetail',
          query:{id:id}
        })
      }     
    }
  }
</script>
<style lang="scss">
.banner-card{
  margin-bottom: 12px;
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
      width: 100%;
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
      font-size: 18px;
      color: #1E1E1E;
      padding: 6px 0px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .time{
      height: 44px;
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
