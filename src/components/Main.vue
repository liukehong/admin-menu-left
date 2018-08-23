<template>
    <div class="layout main" :class="{'layout-hide-text': spanLeft < 3}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <!-- 左侧菜单展开时 -->
                <menu-show v-show="!!hideMenuText" :menuList="menuList"></menu-show>
                <!-- 左侧菜单收缩时 -->
                <menu-hide v-show="!!!hideMenuText" :menuList="menuList"></menu-hide>
            </Col>
            <Col :span="spanRight">
                <!-- 头部 -->
                <Header v-on:toggleChange="fnToggleMenu"></Header>
                <!-- 页签区域 -->
                <page-tabs></page-tabs>
                <!-- 内容区域 -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import MenuHide from './main_components/menuHide'
import MenuShow from './main_components/menuShow'
import Header from './main_components/header'
import PageTabs from './main_components/pageTabs'
export default {
    data () {
        return {
            hideMenuText: true,
            spanLeft: 3, // layout布局左侧的宽度
            spanRight: 21, // layout布局右侧的宽度
            menuList:[], // 菜单列表数组
        }
    },
    components:{
        MenuShow,
        MenuHide,
        Header,
        PageTabs,
    },
    mounted: function(){
        this.fnGetMenuList();//获取菜单
    },
    activated: function(){
        this.fnGetMenuList();//获取菜单数据
    },
    methods: {
        /* 面包屑点击时,触发父组件相关的变化 */
        fnToggleMenu (obj) {
            let vm = this;
            vm.spanLeft = obj.spanLeft;
            vm.spanRight = obj.spanRight;
            vm.hideMenuText = obj.hideMenuText;
        },
        /* 获取菜单数据 */
        fnGetMenuList () {
            let vm = this;
            let arrs = this.common.menuList;
            switch (vm.common.menuType) {
                case 1:
                    vm.menuList = arrs;  // 不走存储拿菜拿菜单数据
                    break;
                case 2:
                    if(window.localStorage.getItem("userInfo")){
                        vm.menuList = JSON.parse(window.localStorage.getItem("userInfo")).menu;
                    }
                    break;
                default:
                    vm.menuList = arrs;  // 不走存储拿菜拿菜单数据
            }

            console.log(vm.menuList,'~~~~~~~');
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../../static/sass/main.scss'
</style>




