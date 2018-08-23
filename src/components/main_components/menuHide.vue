<template>
    <div>
        <div v-for="item in menuList">
            <Dropdown trigger="click" transfer placement="right-start" :key="item.id" @on-click="changeMenu">
                <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                    <Icon :size="20" style="color:#fff;" :type="item.menuLogo"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <template v-for="(child, i) in item.childList">
                        <DropdownItem v-if="!!!child.hasChildList" :name="child.href" :key="child.id"><span style="padding-left:10px;">{{ child.name }}</span></DropdownItem>
                        <Dropdown trigger="click" transfer placement="right-start" v-if="!!child.hasChildList">
                            <DropdownItem style="width: 200px;">
                                <span style="padding-left:10px;">{{ child.name }}<Icon style="position: absolute; right: 15px;" type="ios-arrow-right"></Icon></span>
                            </DropdownItem>
                            <DropdownMenu slot="list">
                                <template v-for="(third,i) in child.childList">
                                    <DropdownItem :name="third.href" :key="third.id">
                                        <span style="padding-left:10px;">{{ third.name }}</span>
                                    </DropdownItem>
                                </template>
                            </DropdownMenu>
                        </Dropdown>
                    </template>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<script>
export default {
    name: 'menuShrink',
    props: ['menuList'],
    data () {
        return {

        }
    },
    methods: {
        changeMenu (active) {
            console.log(active);
            this.$router.push({
                path: active
            });
        }
    },
    mounted() {
        console.log(this.menuList)
    },
}
</script>