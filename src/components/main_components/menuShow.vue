<template>
    <div>
        <Menu ref="leftMenu" width="auto" :active-name="menu.active" :theme="layout.theme2" :open-names="menu.open" :accordion="false">
            <template v-for="item in menuList">
                <router-link v-if="!!!item.hasChildList" :to="item.href" :key="item.id">
                    <MenuItem  :name="item.href">
                        <Icon :type="item.menuLogo" :size="14"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </MenuItem>
                </router-link>
                <Submenu v-if="!!item.hasChildList" :name="item.name" :key="item.id">
                    <template slot="title">
                        <Icon :type="item.menuLogo" :size="14"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </template>
                    <template v-for="list in item.childList">
                        <router-link v-if="!!!list.hasChildList" :to="list.href" :key="list.id">
                            <MenuItem :name="list.href" class="layout-text">
                                <span class="layout-text">{{ list.name }}</span>
                            </MenuItem>
                        </router-link> 
                        <Submenu v-if="!!list.hasChildList" :name="list.name">
                            <template slot="title">
                                {{ list.name }}
                            </template>
                            <router-link v-for="third in list.childList" :to="third.href" :key="third.id">
                                <MenuItem :name="third.href">{{ third.name }}</MenuItem>
                            </router-link> 
                        </Submenu>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>
<script>
export default {
    name: 'menuShrink',
    props: ['menuList'],
    data () {
        return {
            menu: {
                open: [this.$route.matched[0].name],//菜单展开的标识
                active: this.$route.path,//被点击菜单的标识
            },
            layout:{
                theme2: 'dark',//菜单主题
            },
        }
    },
    methods: {
        /* 激活菜单 */
        fnMenuChange () {
            this.menu.open = [];
            this.$route.matched.forEach((item,index) => {
                if(index < this.$route.matched.length-1){
                    this.menu.open.push(item.name);
                }
            })
            this.menu.active = this.$route.path;
            this.$nextTick(function() {
                this.$refs.leftMenu.updateOpened();
                this.$refs.leftMenu.updateActiveName();
            });
        },
    },
    mounted: function () {
        console.log(this.menuList,'fhsdhfdshf');
        this.fnMenuChange();
        
    },
    watch: {
        $route(to, from) {  
            this.fnMenuChange();
        },
    }
}
</script>