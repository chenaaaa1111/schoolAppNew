<template>
    <div>
        <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>
        <!-- {{ content }} -->

        <button @click="submitText">确定提交</button>
    </div>

</template>
<script>
    //ueditor
    import VueUeditorWrap from 'vue-ueditor-wrap';
    import request from '@/api/request.js';

    export default {
        name: 'ue',
        components: { VueUeditorWrap },
        data() {
            return {
                editor: null,
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址

                    serverUrl: 'http://39.104.116.153/roomapi/Upsystem/upload/',//这里不能用域名要用ip ，坑逼
                    // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: '/dist/UEDitor1_4_33/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 工具栏是否可以浮动
                    autoFloatEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 340,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: true
                },
                content: ''
            }
        },
        props: {
            value: '',
            config: {}
        },
        mounted() {
            if (process.env.NODE_ENV == 'development') {
                baseUrl = "http://localhost:8081"
            } else {
                baseUrl = "http://school.i2f2f.com";
            }
        },
        methods: {
            submitText() {
                var data = {

                }
                request.post('', data, function (res) {

                })
            }
        },
        destroyed() {

        }
    }
</script>