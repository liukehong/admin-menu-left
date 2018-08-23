<template>
    <div class="layout-header">
        <Modal
            v-model="modal.show"
            title="修改密码"
            :loading="modal.loading"
            @on-ok="asyncOK">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="用户名" prop="age">
                    <Input type="text" v-model="formCustom.age" number></Input>
                </FormItem>
                <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formCustom.passwd"></Input>
                </FormItem>
                <FormItem label="二次密码" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Button class="showOrHide" type="text" @click.native="toggleClick">
            <Icon type="navicon" size="32"></Icon>
        </Button>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem v-for="item in bread.breadArrs" :to="item.path" :key="item.id">{{ item.name }}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-right-header">
            <div style="float:left">
                <router-link to="/newsmanage">
                    <Icon size="16" type="android-notifications"></Icon>
                </router-link>
            </div>
            <div style="float:left; margin-left:8px; margin-right:10px;">
                <Dropdown>
                    <a href="javascript:void(0)">
                        {{ userName }}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <a @click="changePassWord">修改密码</a>
                        </DropdownItem>
                        <DropdownItem @click.native="backHome">
                            <a>退出</a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'menuShrink',
    props: ['menuList'],
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的密码'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入您的密码'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            callback();
        };
        return {
            bread:{
                breadArrs:[],//面包屑数组，用来遍历面包屑
            },
            layout: {
                spanLeft: 3,
                spanRight: 21,
                hideMenuText: true
            },
            userName: '',
            modal:{
                show:false,
                loading:true
            },
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /* 菜单的收缩和展开 */
        toggleClick () {
            if (this.layout.spanLeft === 1) {
                this.layout.hideMenuText = true;
                this.layout.spanLeft = 3;
                this.layout.spanRight = 21;
            } else {
                this.layout.hideMenuText = false;
                this.layout.spanLeft = 1;
                this.layout.spanRight = 23;
            }
            this.$emit('toggleChange', {
                spanLeft: this.layout.spanLeft,
                spanRight: this.layout.spanRight,
                hideMenuText: this.layout.hideMenuText
            }); 
        },
        /* 面包屑 */
        fnBreadcrumb () {
            let vm = this;
            let arrs = [];
            let route = this.$route;
            if(route.name == "首页"){// 首页
                vm.bread.breadArrs = [];
                return false;
            }else if(route.name != "首页"){// 非首页
                if(!!!route.matched[0].path&&route.matched.length>1){// 只有一级
                    let obj = {};
                    obj.name = route.matched[1].name;
                    obj.path = route.matched[1].path;
                    arrs.push(obj);
                }else if(!!route.matched[0].path){// 二级以上
                    route.matched.forEach((item,index) => {
                        let obj = {};
                        obj.name = item.name;
                        if(index == (route.matched.length-1)){
                            obj.path = item.path; 
                        }else{
                            obj.path = "";
                        }
                        arrs.push(obj);
                    })
                }
            }
            vm.bread.breadArrs = arrs;
        },
        /* 获取用户名 */
        getUserName () {
            let vm = this
            let userName = '';
            let userInfo = ''
            if(!!window.localStorage.getItem("userInfo")){
                userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
                if(!!userInfo.store){
                    userName = userInfo.store.storeName;
                }else{
                    userName = JSON.parse(window.localStorage.getItem("userInfo")).user.nickName;
                }
            }
            return userName;
        },
        /* 修改密码 */
        changePassWord () {
            let vm = this;
            let data = JSON.parse(window.localStorage.getItem("userInfo"));
            this.$refs['formCustom'].resetFields();
            vm.modal.show = true;
            vm.formCustom.age = data.user.loginName;
            console.log(data);
        },
        /* 修改密码的确定事件 */
        asyncOK () {
            let vm = this;
            let name = "formCustom";
            let data = JSON.parse(window.localStorage.getItem("userInfo"));
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let md5PassWord = md5(vm.formCustom.passwd+'cnbbx');
                    let url = vm.common.path2 + "baseUsers/update";
                    let ajaxData = {
                        password:md5PassWord,
                        userId:data.user.userId,
                        loginName:vm.formCustom.age
                    }
                    vm.$http.put(
                        url,
                        ajaxData
                    ).then(function(res){
                        let oData = res.data;
                        if(oData.code == 200){
                            vm.modal.show = false;
                            window.localStorage.clear("userInfo");
                            vm.$router.push("/login");
                        }
                        vm.modal.loading = false;
                        vm.$Message.success(oData.message);
                    }).catch(function(err){
                        vm.modal.loading = false;
                        vm.$Message.success(res);
                    })
                } else {
                    vm.modal.loading = false;
                    vm.$Message.error('失败!');
                }
            })
        },
        /* 退回 */
        backHome () {
            let vm = this;
            window.localStorage.clear("userInfo");
            vm.$router.push("/login");
        },
    },
    mounted: function () {
        this.fnBreadcrumb();//更新面包屑
        this.userName = this.getUserName(); // 获取用户名字
        
    },
    watch:{  
        $route(to, from) {  
            this.fnBreadcrumb();
        },
    },
}
</script>
<style scoped>
.layout-header{
    height: 60px;
    line-height: 60px;
    background: #fff;
    position: relative;
}
.showOrHide{
    float: left;
}
.layout-breadcrumb{
    padding: 0px;
    float: left;
    line-height: unset!important;
}
.layout-right-header{
    height: 100%;
    line-height: 60px;
    float: right;
}
.ivu-icon{
    line-height: unset!important;
}
.ivu-btn{
    line-height: 1.4;
}
</style>