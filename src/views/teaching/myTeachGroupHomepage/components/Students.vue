<template>
    <el-card>
      <div slot="header" class="clearfix card-head-solt">
        <img :src="url" /> <span>教研组组员</span>
      </div>
        <!-- <div class="leftPhotoTop">
            <van-image round width="32px" height="32px" fit="cover" style="vertical-align: middle;"
                src="./../assets/images/grade.png" /> <span>学生主页</span>
        </div> -->
        <div class="avartContent" id="avartContent">
           <div class="avaters" v-for="(item,index) in alumnus" :key="index" @click="goOther(item)">
                <img :src="item.url" alt="头像">
                <p class="txcenter">{{item.name}}</p>
           </div>
        </div>
        <p class="btupDwon" @click="changeUp" :style="{}" >{{showstate=='up'?'收起':'展开'}} <span class="iconupdow"> <van-icon :name="showstate=='up'?'arrow-up':'arrow-down'" /></span></p>
    </el-card>
</template>
<script>
  import requst from "@/api/request.js";
export default {
    name: 'students',
    data() {
      return {
        fromwhere: '',
        fit: 'cover',
        url: require('../../../../assets/images/grade/peple.png'),
        dataList: [],
        showstate:'down',
        alumnus: [
          {
            name: '周华健',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级19班'
          },
          {
            name: '乌龙茶',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级20班'
          },
          {
            name: '果子狸',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级21班'
          },
          {
            name: '猪坚强',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级22班'
          },
          {
            name: '王富贵',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级23班'
          },
          {
            name: '王翠花',
            url: require('../../../../assets/images/user.png'),
            classroom: '东区高中2018级24班'
          }
        ]
      }
    },
    mounted() {
      this.fromwhere = this.$route.params.fromwhere;
      this.getClassMates();
    },
    methods:{
      getClassMates(){
        var userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
        var classId=userInfo.class_id;
        var data={class_id:classId};
        var self=this;
          requst.post('/roomapi/Subject/SubjectUser',data,function(res){
            self.alumnus=res.data;
          });
      },
      changeUp(){
        if(this.showstate=='up'){
          this.showstate='down'
          document.getElementById('avartContent').style.maxHeight="350px";
        }else{
          this.showstate='up';
          document.getElementById('avartContent').style.maxHeight="inherit";
        }
      },
      goOther(data) {
        this.$router.push({
          name: 'otherHomepage'
        })
      }
    }
}
</script>
</script>
<style>

</style>
<style lang="scss" scoped>
    .card-head-solt{
      span{
        font-size: 24px;
        font-weight: 600;
        color: #1E1E1E;
        position: relative;
        top: 5px;
      }
      img{
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }

    .iconupdow{
        border-radius: 50%;border: 1px solid #888888;
        width: 20px;
        height: 20px;
        line-height: .33rem;
        display: inline-block;
    }
    .btupDwon{
        text-align: center;
        padding-top: 30px;
    }
     .leftPhotoTop {
        height: 80px;
        line-height: 80px;
        padding-left: 40px;
        border-bottom: 1px solid #DFDFDF;
    }
    .avartContent{
        padding: 10px 20px 20px 20px;
        overflow: hidden;
        max-height: 460px;
    }
    .txcenter{
        text-align: center;
        line-height: 30px;
    }
    .avaters{
        display: inline-block;
        width: 23%;
        padding: 5px 0;
        cursor: pointer;
        margin-bottom: 20px;
        p{
          font-size: 14px;
          font-weight: bold;
          // margin-top: 10px;
        }
    }
    .avaters img{
        max-width: 100%;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
    }
</style>
