<template>
  <!-- 个人头像信息 -->
  <el-card class="banner-card">
    <div class="circle" style="text-align: center;">
      <el-avatar :size="120" :src="userInfo.avatar"></el-avatar>
    </div>
    <h2 class="myName">{{userInfo.name}}</h2>
    <div class="dynamic">
      <div class="dynamic-g">
        <p class="count">{{total}}</p>
        <p class="title">课题动态</p>
      </div>
    </div>
  </el-card>
</template>
<script>
  import request from '@/api/request.js';
  export default{
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        total: 0,
        page: 1,
        psize: 5,
        keyword: '',//搜索关键字
      }
    },
    created(){
      this.$root.eventLister.$on('changeNumEvent', this.changeNumEvent); //监听删除课题数
    },
    mounted(){
      // this.userInfo=this.$store.state.userInfo;
      this.getTopicDynimal();
    },
    methods: {
      getTopicDynimal() { //课题动态列表
        var self=this;
        var data = {
          u_id: self.userInfo.id,
          keyword: self.keyword,
          page: self.page,
          psize: self.psize
        }
        request.post('/roomapi/Subject/myPage', data, function (res) {
          if(res.code ==0){
            self.total = res.data.total;
          }
        })
      },
      changeNumEvent(flag) { //教研动态中删除了动态后  监听操作状态 来改变数量
        console.log(flag,'是否进行操作')
        if(flag){
          this.getTopicDynimal();
        }
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