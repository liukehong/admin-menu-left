<template>
    <div class="tagWrap">
        <div class="tabLeft">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in menu.arrs1" :key="item.id">
                    <Tag
                        type="dot" 
                        @click.native="fnTagsBtn(item.path)" 
                        :closable="item.path==='/home'?false:true" 
                        checkable 
                        :color="menu.currentPageName===item.path?'blue':'default'"
                        @on-close="deleteItem(item)"
                    >{{item.name}}</Tag>
                </swiper-slide>
            </swiper>
        </div>
        <div class="tabRight">
            <Dropdown style="margin-left:15px; margin-top:9px;">
                <Button type="primary" size="small">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="fnHandleMenu('all')">关闭所有</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('other')">关闭其它</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('left')">关闭左侧</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('right')">关闭右侧</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data () {
        return {
            menu: {
                currentPageName: this.$route.fullPath,//页签样式显示的标识
                arrs:['/home'],//保存页签,防止重复
                arrs1:[{path:'/home',name:'首页'}],//遍历该数组生成页签
            },
            swiperOption: {
                "slidesPerView":"auto",
                "observer":true,//修改swiper自己或子元素时，自动初始化swiper
                "observeParents":true,
            },
        }
    },
    mounted: function(){
        this.addItem();
    },
    methods: {
        /* 页签点击事件 */
        fnTagsBtn(msg){
            this.$router.push({path:msg});
        },
        /* 页签添加 */
        addItem(){
            let vm = this;
            let path = vm.$route.fullPath;
            let name = vm.$route.meta.name;
            let type = vm.$route.meta.type;
            if(vm.menu.arrs.indexOf(path) == -1&&type=="菜单"){
                vm.menu.arrs.push(path);
                vm.menu.arrs1.push({path:path,name:name});
            }
        },
        /* 删除页签 */
        deleteItem(item){
            let vm = this;
            let arrs = [];
            let index = vm.menu.arrs.indexOf(item.path);
            vm.menu.arrs.splice(index,1);
            vm.menu.arrs1.splice(index,1);
            let len = vm.menu.arrs.length>1?1:0;
            if(item.path == vm.$route.path){
                vm.$router.push(vm.menu.arrs[len]);
            }
        },
        /* 页签删除后再点开的处理 */
        fnExistTabList (to) {
            let vm = this;
            if(this.menu.arrs.indexOf(to.fullPath) == -1){
                //不存在的情况
                vm.$store.dispatch('tabFalse');
            }else{
                //存在的情况
                vm.$store.dispatch('tabTrue');
            }
        },
        /* 页签管理 */
        fnHandleMenu (type) {
            let vm = this;
            switch (type) {
                case "all":
                    //如果当前就是首页就不用处理
                    if(vm.$route.name!="首页"){
                        vm.menu.arrs = ['/home'];
                        vm.menu.arrs1 = [{path:'/home',name:'首页'}];
                        vm.$router.push('/home');
                    }
                    break;
                case "left":
                    if(vm.$route.name != "首页"){
                        let index = vm.menu.arrs.indexOf(vm.$route.path);
                        if(index>1){
                            let arrs = ['/home'];
                            let arrs1 = [{path:'/home',name:'首页'}];
                            vm.menu.arrs.forEach(function(item,i){
                                if(i>=index){
                                    arrs.push(item);
                                    arrs1.push(vm.menu.arrs1[i]);
                                }
                            })
                            vm.menu.arrs = arrs;
                            vm.menu.arrs1 = arrs1;
                        }
                    }
                    break;
                case "right":
                    let index = vm.menu.arrs.indexOf(vm.$route.path);
                    let arrs = [];
                    let arrs1 = [];
                    vm.menu.arrs.forEach(function(item,i){
                        if(i<=index){
                            arrs.push(item);
                            arrs1.push(vm.menu.arrs1[i]);
                        }
                    })
                    vm.menu.arrs = arrs;
                    vm.menu.arrs1 = arrs1;
                    break;
                case "other":
                    //如果当前是首页就简单处理
                    if(vm.$route.name == "首页"){
                        vm.menu.arrs = ['/home'];
                        vm.menu.arrs1 = [{path:'/home',name:'首页'}];
                    }else{
                        let path = vm.$route.path;
                        let arrs = ['/home'];
                        let arrs1 = [{path:'/home',name:'首页'}];
                        if(vm.menu.arrs.length>2){
                            vm.menu.arrs.forEach(function(item,index){
                                if(item == path){
                                    arrs.push(item);
                                    arrs1.push(vm.menu.arrs1[index]);
                                }
                            })
                            vm.menu.arrs = arrs;
                            vm.menu.arrs1 = arrs1;
                        }
                    }
                    break;
                default:
                    //情况不符
            }
        },
    },
    components:{
        swiper,
        swiperSlide,
    },
    watch:{  
        $route(to, from) {  
            // this.fnExistTabList(to);//判断是否存在页签中
            this.menu.currentPageName = to.fullPath;
            this.addItem();
        },
    },
    created () {
    },
    beforeDestory(){
    } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tagWrap{
    position: relative;
    width: 100%;
    height: 47px;
    padding-top: 0px!important;
    background: #f0f0f0;
    border-bottom: 3px solid #e6e6e6;
    border-top: 3px solid #e6e6e6;
    .tabPrev{
        position: absolute;
        left: 0px;
        width: 15px;
        text-align: center; 
        height: 41px;
        line-height: 41px;
        // cursor: context-menu;
        cursor: pointer;
        background: #fff;
    }
    .tabNext{
        position: absolute;
        right: 110px;
        width: 15px;
        text-align: center; 
        height: 41px;
        line-height: 41px;
        // cursor: context-menu;
        cursor: pointer;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
    }
    .tabLeft{
        padding-top: 2px;
        margin-left: 5px;
        position: absolute;
        left: 0px; right: 110px;
        height: 41px;
        overflow: hidden;
        .tabLeftWrap{
            position: absolute;
            width: max-content;
            height: 41px;
            left: 0px;
        }
    }
    .tabRight{
        width: 110px; height: 41px;
        right: 0px; 
        height: 41px;
        position: absolute;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
    }
}
/* 顶部右侧区域 */
.swiper-slide{
    width: auto!important;
}
</style>




