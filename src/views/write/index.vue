<template>
    <div class="space">
        <el-row class="page-header" type="flex" justify="center">
            <el-col :xl="18" :lg="18" :md="20" :sm="22" :xs="24" class="nav-col">
                <el-menu class="el-menu-head" mode="horizontal">
                    <li class="homeEntry" @click="goHome" :class="spaceNav[navIndex]?spaceNav[navIndex].styles:''">
                        <img
                            :src="spaceNav[navIndex]?spaceNav[navIndex].icon:''" />{{spaceNav[navIndex]?spaceNav[navIndex].spacename:''}}
                    </li>
                    <el-menu-item>{{writeContent}}</el-menu-item>
                    <li class="nav-user">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <el-avatar shape="circle" :size="48" :fit="fit" :src="userInfo.avatar"></el-avatar>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-s-cooperation">资料与账号</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>

                    <li class="el-menu-item menu-release ">
                        <el-button v-if="navIndex == 'classes'" plan size="small" @click="openPublish">班级发布</el-button>
                        <el-button v-if="navIndex == 'team'" plan size="small" @click="openTeamDialog">社团发布</el-button>
                        <el-button v-if="navIndex == 'special'" plan size="small" @click="specialPublish">专题发布
                        </el-button>
                        <el-button v-if="navIndex == 'topic'" plan size="small" @click="topicPublish">课题发布</el-button>
                        <el-button v-if="navIndex == 'teaching'" plan size="small" @click="teachingPublish">教研发布
                        </el-button>
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
                                <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
                      </el-upload> -->
                                <el-upload class="avatar-uploader" action="/roomapi/Upsystem/upload" :data="updata"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-col>
                        <el-col :span="24">
                            <el-input type="text" v-model="articletitle" placeholder="请输入标题"></el-input>
                        </el-col>
                        <el-col :span="24" class="formrow">
                            <!-- 图片上传组件辅助-->
                            <el-upload class="avatar-uploader avupnew" :action="serverUrl" name="file" :headers="header"
                                :show-file-list="false" :data="updata" :on-success="uploadSuccess" :file-list="fileList"
                                :on-error="uploadError" :before-upload="beforeUpload">
                            </el-upload>
                            <quill-editor v-model="form.goods_desc" ref="myQuillEditor" :options="editorOption"
                                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)">
                            </quill-editor>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!-- 班级空间 发布 弹窗选择主页和栏目 -->
        <el-dialog title="发布" :visible.sync="dialog" width="30%" class="mydialog" @close="handleClose('ruleForm')">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <!-- <el-form-item label="发布主题" prop="theme">
                        <el-select v-model="ruleForm.theme" filterable placeholder="选择主页" style="width: 100%;">
                            <el-option v-for="(item,index) in options" :key="index" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="选择栏目" prop="column">
                        <el-select v-model="ruleForm.column" @change="selectColumn" filterable placeholder="选择栏目"
                            style="width: 100%;">
                            <el-option v-for="(item,index) in allColumnList" :key="index" :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="tips">
                    发布的新闻审核成功后发布，您可以在审核中查看审核进度
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose('ruleForm')">取 消</el-button>
                <el-button v-if="!isEdit" type="primary" @click="publishArt('ruleForm')">确 定</el-button>
                <el-button v-if="isEdit" type="primary" @click="editPublishArt('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 社团空间 选择发布社团弹窗 -->
        <el-dialog title="发布" :visible.sync="teamCheckdialog" width="30%" class="mydialog"
            @close="closeTeamDialog('teamRuleForm')">
            <el-form :model="teamRuleForm" :rules="teamRules" ref="teamRuleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="发布社团" prop="team">
                    <el-select v-model="teamRuleForm.team" @change="selectTeam" filterable placeholder="选择发布社团"
                        style="width: 100%;">
                        <el-option v-for="(item,index) in teamList" :key="index" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeTeamDialog('teamRuleForm')">取 消</el-button>
                <el-button type="primary" @click="teamPublish('teamRuleForm')">发 布</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import $ from 'jquery'
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import request from '@/api/request.js';
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{ header: 1 }, { header: 2 }], // 1、2 级标题
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
        [{ script: "sub" }, { script: "super" }], // 上标/下标
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        // [{'direction': 'rtl'}],                         // 文本方向
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ font: [] }], // 字体种类
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除文本格式
        ["link", "image", "video"] // 链接、图片、视频
    ];
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                fileList: [],//已上传的文件列表
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                spaceNav: { // 顶部导航栏显示信息,按需加载
                    "classes": {
                        icon: require('../../assets/main/classes.png'),
                        spacename: '班级空间',
                        styles: 'classesColor'
                    },
                    "grade": {
                        icon: require('../../assets/main/grade.png'),
                        spacename: '年级空间',
                        styles: 'gradeColor'
                    },
                    "team": {
                        icon: require('../../assets/main/team.png'),
                        spacename: '社团空间',
                        styles: 'teamColor'
                    },
                    "special": {
                        icon: require('../../assets/main/special.png'),
                        spacename: '专题空间',
                        styles: 'specialColor'
                    },
                    "topic": {
                        icon: require('../../assets/main/topic.png'),
                        spacename: '课题空间',
                        styles: 'topicColor'
                    },
                    "teaching": {
                        icon: require('../../assets/main/teaching.png'),
                        spacename: '教研空间',
                        styles: 'teachingColor'
                    }
                },
                writeContent: '', //书写的类型 是写新闻 还是信息
                navIndex: 'classes',//空间类型 
                isEdit: false,//是否是编辑新闻状态
                artUpdata: {},//发布文章用到的参数
                //主页面 输入内容
                articletitle: '', //标题
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                editorOption: {
                    placeholder: "",
                    theme: "snow", // or 'bubble'
                    placeholder: "您想说点什么？",
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            // container: "#toolbar",
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        $(".avupnew input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                },
                                // link: function(value) {
                                //   if (value) {
                                //     var href = prompt('请输入url');
                                //     this.quill.format("link", href);
                                //   } else {
                                //     this.quill.format("link", false);
                                //   }
                                // },
                            }
                        }
                    }
                },
                baseUrl: this.$store.state.baseUrl,
                serverUrl: this.$store.state.baseUrl + "/roomapi/Upsystem/upload/", // 这里写你要上传的图片服务器地址
                header: {
                    // token: sessionStorage.token
                },// 有的图片
                responseUrl: '',//背景封面地址
                updata: {
                    type: 2,
                    token: sessionStorage.getItem('Authorization')
                },
                imageUrl: '',//新图片路径 
                title: '返回',
                fromwhere: '', // 从哪个页面跳转过来的还跳转回去
                fit: 'cover',
                activeIndex: 'campusHomepage',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                form: {
                    goods_desc: '',
                    title: ''
                },
                //班级空间发布新闻部分
                dialog: false, //班级空间发布选择栏目弹窗
                ruleForm: { //班级空间发布选择主页 栏目form
                    theme: '',
                    column: ''
                },
                rules: { //班级空间发布选择栏目弹窗 输入验证规则
                    // theme: [
                    //     { required: true, message: '请选择主页', trigger: 'change' }
                    // ],
                    column: [
                        { required: true, message: '请选择栏目', trigger: 'change' }
                    ],
                },
                options: [ //班级空间发布选择班级主页
                    // {
                    //     value: '1',
                    //     label: '班级主页'
                    // },
                    {
                        value: '2',
                        label: '校园主页'
                    }
                ],
                allColumnList: [], //班级空间 发布时候 所有栏目列表
                columnSelect: {},// 班级空间下拉选择栏目 筛选得到的栏目名称和id
                //社团空间 发布信息 部分
                teamCheckdialog: false, //社团空间 选择社团弹窗
                teamRuleForm: { //社团空间发布社团
                    team: ''
                },
                teamRules: { //班级空间发布选择栏目弹窗 输入验证规则
                    team: [
                        { required: true, message: '请选择社团', trigger: 'change' }
                    ]
                },
                teamList: [], //社团列表
                teamSelect: {},// 社团空间下拉选择发布社团 筛选得到的社团名称和id

            }
        },
        mounted() {
            console.log(this.$route.query, '点击发布新闻路由传参集合')
            if (Object.keys(this.$route.query).length > 0) {
                this.fromwhere = this.$route.query.fromwhere;
                this.title = this.$route.query.fromname;
                this.navIndex = this.$route.query.spaceModule;
                switch (this.navIndex) {
                    case "classes":
                        this.writeContent = '写新闻'
                        break;
                    case "team":
                        this.writeContent = '写信息'
                        break;
                    case "special":
                        this.writeContent = '写专题'
                        break;
                    case "topic":
                        this.writeContent = '写课题'
                        break;
                    case "teaching":
                        this.writeContent = '写文章'
                        break;
                }
            }
            this.artUpdata = this.$route.query;
            this.isEdit = this.$route.query.isEdit ? this.$route.query.isEdit : this.isEdit;
            if (this.isEdit) { //如果时编辑文章  
                this.getArticleDetails();
            }
        },
        methods: {
            init() {
                if (this.isEdit) {
                    var editor = JSON.parse(sessionStorage.getItem('editor'));
                    console.log('editor', editor);
                    console.log(this.$refs['myQuillEditor']);
                    // this.$refs.myQuillEditor.setcontents(editor)
                    this.$set(this.form, 'goods_desc', editor.content);
                    // this.$set(this.form,'title',editor.title);
                    this.articletitle = editor.title;
                    self.responseUrl = editor.image;
                    var reurl = [{ url: editor.image }];
                    this.fileList = reurl;
                    this.url = this.userInfo.avatar;//头像
                    // this.goods_desc=editor.content;
                } else {
                    this.url = this.userInfo.avatar;//头像
                }
            },
            getArticleDetails() { //参数  文章id  获取文章详情  //从我的主页 审核中 审核未通 撤回及编辑 回到重新编辑新闻页面回显信息
                var data = {
                    id: String(this.$route.query.id)
                }
                var _this = this;
                request.post('/roomapi/Room_Class/myDetails', data, function (res) {
                    if (res.code == 0) {
                        console.log(res.data, '获取文章详情返回数据')
                        _this.articletitle = res.data.title;
                        _this.form.goods_desc = res.data.content;
                        _this.imageUrl = 'http://school.i2f2f.com' + res.data.image;
                    }
                })
            },
            // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                console.log('beforeeee')
                this.quillUpdateImg = true;
            },
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例

                var self = this;
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res.code == 0) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.url为服务器返回的图片地址
                    quill.insertEmbed(length, "image",  res.data.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
                // loading动画消失
                this.quillUpdateImg = false;
            },
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error("图片插入失败");
            },
            handleAvatarSuccess(res, file) {//图片上传类方法
                console.log(res.data.url, 'resresresres');
                this.responseUrl = res.data.url;
                console.log(file, '图片上传时候获取的对象')
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(this.imageUrl, '得到的路径')
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },//end
            goHome() {
                this.$router.push({ // 回到空间选择页面
                    name: 'home',
                    params: {
                        fromwhere: this.fromwhere
                    }
                })
            },
            goBack() { // 返回-从哪儿来往哪儿去
                this.$router.push({
                    name: this.fromwhere,
                    query: this.$route.query
                })
            },


            //班级空间发布新闻部分
            openPublish() { //班级空间 打开发表dialog
                var self = this;
                if (self.articletitle == '') {
                    self.$toast.fail('请输入标题');
                    return
                }
                if (self.form.goods_desc == '') {
                    self.$toast.fail('请输入新闻内容');
                    return
                }
                this.dialog = true;
                this.getAllcolumn();
                // this.publishArt()
            },
            //发布弹窗 选择栏目的 获取所有栏目
            getAllcolumn() {
                var data = {};
                var self = this;
                request.post('/roomapi/Room_Class/column', data, function (res) {
                    if (res.code == 0) {
                        console.log(res.data.model, '栏目列表')
                        if (res.data.model.length > 0) {
                            self.allColumnList = res.data.model;
                        }
                    }
                })
            },
            selectColumn(val) { //弹窗中下拉选择栏目事件
                const receiveArr = this.allColumnList.filter((item) => {
                    return item.id == val
                })
                this.columnSelect = receiveArr[0];
                console.log(this.columnSelect, '筛选出匹配的栏目')
            },
            publishArt(formName) {//班级空间发布文章  如果是点击写新闻进入的
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var self = this;
                        let data = {};
                        // var data = self.artUpdata;
                        // if(self.responseUrl ==''){
                        //     self.$toast.fail('请添加题图');
                        //     return
                        // }
                        if (self.articletitle == '') {
                            self.$toast.fail('请输入标题');
                            return
                        }
                        if (self.form.goods_desc == '') {
                            self.$toast.fail('请输入新闻内容');
                            return
                        }
                        // data.level = self.ruleForm.theme;//1班级2校园
                        data.columns = self.ruleForm.column; //栏目id 
                        data.column_name = self.columnSelect.title;//栏目名称
                        data.image = self.responseUrl;
                        data.content = self.form.goods_desc;
                        data.title = self.articletitle;
                        console.log(data, '写新闻--发布添加文章接口参数')
                        request.post('/roomapi/Room_Class/addArticle', data, function (res) {
                            if (res.code == 0) {
                                self.$toast.success(res.message);
                                self.dialog = false;
                                self.$router.go(-1);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            editPublishArt(formName) {//发布文章  如果是点击编辑写新闻进入的
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        var self = this;
                        let data = {}
                        if (self.articletitle == '') {
                            self.$toast.fail('请输入标题');
                            return
                        }
                        if (self.form.goods_desc == '') {
                            self.$toast.fail('请输入新闻内容');
                            return
                        }
                        data.id = self.artUpdata.id;
                        data.level = self.artUpdata.level;
                        data.columns = self.artUpdata.columns;
                        data.column_name = self.artUpdata.column_name;
                        data.image = self.responseUrl;
                        data.content = self.form.goods_desc;
                        data.title = self.articletitle;
                        console.log(data, '编辑新闻--发布添加文章接口参数')
                        request.post('/roomapi/Room_Class/editArticle', data, function (res) {
                            if (res.code == 0) {
                                self.$toast.success(res.message);
                                self.dialog = false;
                                self.$router.go(-1);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            openTeamDialog() { //社团空间 发布信息  打开选择社团的弹窗
                var self = this;
                if (self.articletitle == '') {
                    self.$toast.fail('请输入标题');
                    return
                }
                if (self.form.goods_desc == '') {
                    self.$toast.fail('请输入新闻内容');
                    return
                }
                this.teamCheckdialog = true;
                this.getTeamList();
            },
            getTeamList() { //获取社团列表 参数校园id
                let data = {
                    sid: this.userInfo.s_id
                }
                let self = this;
                request.post('/roomapi/Users/CommunityList', data, function (res) {
                    if (res.code == 0) {
                        self.teamList = res.data;
                    }
                })
            },
            selectTeam(val) { //弹窗中下拉选择发布社团 事件
                const receiveArr = this.teamList.filter((item) => {
                    return item.id == val
                })
                this.teamSelect = receiveArr[0];
                console.log(this.teamSelect, '筛选出匹配的社团名称和id集合')
            },
            teamPublish(teamForm) { //确认弹窗 社团空间发布 信息
                this.$refs[teamForm].validate((valid) => {
                    if (valid) {
                        var self = this;
                        let data = {
                            c_id: self.teamRuleForm.team,
                            c_name: self.teamSelect.title,
                            title: self.articletitle,
                            image: self.responseUrl,
                            content: self.form.goods_desc
                        };
                        request.post('/roomapi/Community/addArticle', data, function (res) {
                            if (res.code == 0) {
                                self.$toast.success(res.message);
                                self.teamCheckdialog = false;
                                self.$router.go(-1);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            specialPublish() { //专题空间发布 专题
                var self = this;
                let data = {}
                if (self.articletitle == '') {
                    self.$toast.fail('请输入专题标题');
                    return
                }
                if (self.form.goods_desc == '') {
                    self.$toast.fail('请输入专题内容');
                    return
                }
                data.image = self.responseUrl;
                data.content = self.form.goods_desc;
                data.title = self.articletitle;
                console.log(data, '写专题---接口参数')
                request.post(data.upUrl, data, function (res) {
                    if (res.code == 0) {
                        self.$router.go(-1);
                    }
                })
            },
            topicPublish() { //课题空间 发布 课题
                var self = this;
                if (self.articletitle == '') {
                    self.$toast.fail('请输入文章标题');
                    return
                }
                if (self.form.goods_desc == '') {
                    self.$toast.fail('请输入文章内容');
                    return
                }
                let data = {
                    c_id: self.$store.state.userInfo.subject_id, //课题id
                    c_name: '', //课题名
                    title: self.articletitle,
                    image: self.responseUrl,
                    content: self.form.goods_desc
                };
                request.post('/roomapi/Subject/addArticle', data, function (res) {
                    if (res.code == 0) {
                        self.$toast.success(res.message);
                        self.$router.go(-1);
                    } else {
                        self.$toast.fail(res.message);
                    }
                })
            },
            teachingPublish() { //教研空间 发布文章
                var self = this;
                if (self.articletitle == '') {
                    self.$toast.fail('请输入文章标题');
                    return
                }
                if (self.form.goods_desc == '') {
                    self.$toast.fail('请输入文章内容');
                    return
                }
                let data = {
                    c_id: self.$store.state.userInfo.teaching_id, //教研组id
                    c_name: '', //教研组名称
                    title: self.articletitle,
                    image: self.responseUrl,
                    content: self.form.goods_desc
                };
                request.post('/roomapi/Teaching/addArticle', data, function (res) {
                    if (res.code == 0) {
                        self.$toast.success(res.message);
                        self.$router.go(-1);
                    } else {
                        self.$toast.fail(res.message);
                    }
                })
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
                // console.log(this.form)
            }, // 失去焦点事件
            onEditorFocus() { }, // 获得焦点事件
            onEditorChange() {
                // console.log(this.form.goods_desc)
            }, // 内容改变事件
            overWrite(data) { // 发表文章
                this.dialog = true
            },
            //班级空间 发布弹窗关闭
            handleClose(formName) {
                this.dialog = false;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                });
            },
            //社团空间 发布选择社团 弹窗关闭
            closeTeamDialog(teamForm) {
                this.teamCheckdialog = false;
                this.$nextTick(() => {
                    this.$refs[teamForm].resetFields();
                });
            },
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style lang="scss">
    .formrow {
        .ql-editor {
            min-height: 400px;
            overflow: auto;
        }
    }

    .mydialog {
        .el-dialog {
            min-width: 9.733333rem;
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

                .classesColor {
                    color: #E27755;
                }

                .gradeColor {
                    color: #E8A33D;
                }

                .teamColor {
                    color: #4DB65B;
                }

                .specialColor {
                    color: #328B8C;
                }

                .topicColor {
                    color: #4F88C5;
                }

                .teachingColor {
                    color: #4F88C5;
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