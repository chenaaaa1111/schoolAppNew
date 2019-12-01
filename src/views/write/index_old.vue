<template>
  <div class="space">
    <el-row class="page-header" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
        <el-menu class="el-menu-head" mode="horizontal">
          <li class="homeEntry" @click="goHome">
            <img src="../../assets/main/classes.png" />班级空间
          </li>
          <el-menu-item>写新闻</el-menu-item>
          <li class="homeEntry">
            <el-button @click="publishArt">发布</el-button>
          </li>
          <li class="nav-user">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar shape="circle" :size="48" :fit="fit" :src="url"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-custom">刘子璇</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <li class="el-menu-item menu-release hidden-sm-and-down">
            <el-button plan size="small" @click="publish">发布</el-button>
          </li>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="write-content" type="flex" justify="center">
      <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="col-body">
        <el-card>
          <div slot="header" class="clearfix">
            <el-page-header @back="goBack" :title="'返回'+title"></el-page-header>
          </div>
          <el-row>
            <el-col :span="24" class="formrow">
              <div class="upload-box">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                  <i slot="default" class="el-icon-plus">添加图片</i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </div>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
            <el-col :span="24">
              <el-input type="text" v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="24" class="formrow">
              <quill-editor v-model="form.goods_desc" ref="myQuillEditor" :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
              </quill-editor>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="发布" :visible.sync="dialog" width="30%" class="mydialog" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="发布主题" prop="theme">
            <el-select v-model="ruleForm.theme" filterable placeholder="选择主页" style="width: 100%;">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择栏目" prop="column">
            <el-select v-model="ruleForm.column" filterable placeholder="选择栏目" style="width: 100%;">
              <el-option label="影评" value="1"></el-option>
              <el-option label="专业" value="2"></el-option>
              <el-option label="考试" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="tips">
          发布到校园主页需要审核后才能发布成功，发布到班级主页不需要审核
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="publish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import request from '@/api/request.js';
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        urldict: {

        },
        title: '',
        title: '返回',
        fromwhere: '', // 从哪个页面跳转过来的还跳转回去
        fit: 'cover',
        url: require('../../assets/images/user.png'),
        activeIndex: 'campusHomepage',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        form: {
          goods_desc: '',
          title: ''
        },
        // moduleConfig: { // 所有配置项
        //   container: [
        // ['bold', 'italic', 'underline', 'strike'],
        // ['blockquote', 'code-block'],
        // [{'header': 1}, {'header': 2}],
        // [{'list': 'ordered'}, {'list': 'bullet'}],
        // [{'script': 'sub'}, {'script': 'super'}],
        // [{'indent': '-1'}, {'indent': '+1'}],
        // [{'direction': 'rtl'}],
        // [{'size': ['small', false, 'large', 'huge']}],
        // [{'header': [1, 2, 3, 4, 5, 6, false]}],
        // [{'color': []}, {'background': []}],
        // [{'font': []}],
        // [{'align': []}],
        // ['clean'],
        // ['link', 'image', 'video']
        //   ]
        // },
        editorOption: { // 精简配置项
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic'],
                [{ 'header': 1 }, { 'header': 2 }],
                ['image', 'video']
              ]
            }
          }
        },
        prevPageName: '',
        dialog: false,
        ruleForm: {
          theme: '',
          column: ''
        },
        rules: {
          theme: [
            { required: true, message: '请选择主页', trigger: 'change' }
          ],
          column: [
            { required: true, message: '请选择栏目', trigger: 'change' }
          ],
        },
        options: [
          {
            value: '0',
            label: '校园主页'
          },
          {
            value: '1',
            label: '班级主页'
          },
          {
            value: '2',
            label: '我的主页'
          }
        ],
      }
    },
    mounted() {
      this.fromwhere = this.$route.params.fromwhere
      this.title = this.$route.params.fromname
      console.log(this.fromwhere, 'fromwhere --- write/index.vue page')
    },
    methods: {
      publishArt() {
        debugger
        console.log('')
        var self=this;
        var data = {
          level: 1,
          columns: 1,
          column_name: '',
          title: self.title,
          image: '',
          content: this.form.goods_desc
        };
        request.post('/roomapi/Room_Class/addArticle', data, function (res) {

        })
      },
      goHome() { // 会空间选择页面
        this.$router.push({ // 回到空间选择页面
          name: 'home',
          params: {
            fromwhere: this.fromwhere
          }
        })
      },
      goBack() { // 返回-从哪儿来往哪儿去
        this.$router.push({
          name: this.fromwhere
        })
      },
      openPublish() { // 打开发表dialog
        this.dialog = true
      },
      publish() { // 确定发表
        // this.dialog = false
        // console.log(this.fromwhere)
        // // return
        // this.$router.push({
        //   name: 'readnews',
        //   params: {
        //     fromname: this.title,
        //     fromwhere: this.fromwhere
        //   }
        // })
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur() {
        console.log(this.form)
      }, // 失去焦点事件
      onEditorFocus() { }, // 获得焦点事件
      onEditorChange() { }, // 内容改变事件
      overWrite(data) { // 发表文章
        this.dialog = true
      },
      handleClose() {
        this.dialog = false
      },
    }
  }
</script>
<style lang="scss">
  .formrow {
    .ql-editor {
      min-height: 400px;
      overflow: auto;
    }
  }
</style>
<style lang="scss" scoped>
  .space {
    height: 100%;
    overflow: auto;
    background: url('../../assets/images/classes/classesbg.png') no-repeat;
    background-size: 100% 100%;
  }

  .page-header {
    background: #FFF;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999999;

    .nav-col {
      padding: 0px 10px;

      .el-menu-head {
        .homeEntry {
          cursor: pointer;
          float: left;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 35px;
          font-size: 26px;
          color: #E27755;

          img {
            display: inline-block;
            width: 56px;
            height: 56px;
            vertical-align: middle;
            margin: 0px 10px;
          }
        }

        .el-menu-item {
          font-size: 22px;
          color: #5B728C;
          padding: 0px;
          margin-right: 35px;
          height: 100px;
          line-height: 106px;
        }

        .is-active {
          border-bottom: 0;
          color: #333;
        }

        .is-active::after {
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background: #409EFF;
          position: absolute;
          bottom: 6px;
          border-radius: 2px;
          ;
        }

        .nav-user {
          float: right;
          height: 100px;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }

        .menu-release {
          float: right;
        }
      }


    }
  }

  .write-content {
    margin-top: 30px;

    .col-body {
      padding: 0px 10px;

      .formrow {
        margin: 30px 0px;

        .ql-editor {
          min-height: 400px;
          overflow: auto;
        }
      }

      .upload-box {
        margin-top: 32px;
        padding: 20px;
        background: #F6F6F6;

        .el-icon-plus {
          font-size: 14px;
        }
      }

      .ql-container {
        height: 350px;
        overflow: auto;
      }
    }
  }

  .mydialog {
    .el-dialog {
      min-width: 9.733333rem;
    }

    .tips {
      font-size: 18px;
      color: #999;
      padding-left: 0.58rem;
    }
  }
</style>