<template>
  <!-- 个人头像信息 -->
  <el-card class="banner-card">
    <div class="circle" style="text-align: center;">
      <el-avatar :size="120" :src="circleUrl" icon="el-icon-user-solid"></el-avatar>
    </div>
    <h2 class="myName">
      {{userInfo.name}} 
      <!-- <img src="../../../../assets/images/myhome/editName.png"/> -->
    </h2>
    <div class="dynamic">
      <div class="dynamic-special">
        <p class="count">{{dymic}}</p>
        <p class="title">专题动态</p>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default{
    props:{dymic:{default:''}},
    data() {
      return {
        circleUrl: this.$store.state.avatar,
        total:this.$store.state.TeamDynamic,
        userInfo:this.$store.state.userInfo
      }
    },
    mounted(){
      console.log('props.total',this.$props)
    },
    methods: {

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
    .dynamic-special{
      text-align: center;
      font-size: 26px;
      color: #034692;
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
