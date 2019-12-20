<template>
  <div class="myClasses">
    <PageTop :options="loadData"></PageTop>
    <el-row type="flex" justify="center" class="space-wrap">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="entry-content">
        <el-row :gutter="10" class="panel-row">
          <el-col :xl="6" :lg="6" :md="8" :sm="8" class="panel-left hidden-xs-only">
            <!-- <Students :source="routename" :teamId="loadData.id"></Students> -->
            <Visitor :source="routename" :teamId="loadData.id"></Visitor>
          </el-col>
          <el-col :xl="18" :lg="18" :md="16" :sm="16" :xs="24">
            <mainNavBar :teamId="loadData.id"></mainNavBar>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from "@/api/request.js";
import PageTop from "./components/PageTop.vue";
import Visitor from "./components/Visitor.vue";
// import Students from "./components/Students.vue";
import mainNavBar from "./components/mainNavBar.vue";
export default {
  components: {
    PageTop,
    Visitor,
    // Students,
    mainNavBar
  },
  data() {
    return {
      routename: "",
      loadData: {
        id: "", //社团id
        title: "",
        name: "",
        avatar: "",
        showwrite: true
      }
    };
  },
  created() {
    this.routename = this.$route.name;
    let querys = this.$route.query;
    if (Object.keys(querys).length > 0) {
      for (let i in querys) {
        this.loadData[i] = querys[i];
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style media="screen" lang="scss" scoped>
.space-wrap {
  margin-top: 30px;
  .entry-content {
    padding: 0px 10px;
  }
}
</style>
