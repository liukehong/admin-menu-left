<template>
    <Row>
        <h2>待办事项</h2>
        <div class="boxStyle">
            <div class="item">
                <h3><CountTo :endVal="+list.auditServer" :countStyle="countStyle"></CountTo></h3>
                <router-link to="./service/brandService">待审核服务</router-link>
            </div>
            <div class="item">
                <h3><CountTo :endVal="+list.auditEmployee" :countStyle="countStyle"></CountTo></h3>
                <router-link to="./worker/workerManage">待审核员工</router-link>
            </div>
            <div class="clear"></div>
        </div>
        <h2 class="dataSee">数据概览</h2>
        <div class="boxStyle">
            <Tabs value="name1" @click.native="tabClick" v-model="cd.type">
                <TabPane label="今日" name="1">
                    
                </TabPane>
                <TabPane label="7天" name="7">
                     
                </TabPane>
                <TabPane label="30天" name="30">
                    
                </TabPane>
            </Tabs>
            <div style="overflow:hidden;position:relative;">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="item">
                    <h3><CountTo :endVal="+list.newMember" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./memberCard/cardManage">新增会员</router-link>
                </div>
                <div class="item">
                    <h3><CountTo :endVal="+list.newMember" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./store/storeManage">新增门店</router-link>
                </div>
                <div class="item">
                    <h3><CountTo :endVal="+list.newServer" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./service/brandService">新增服务</router-link>
                </div>
                    <div class="item">
                    <h3><CountTo :endVal="+list.newMemberCard" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./memberCard/cardManage">新增会员卡</router-link>
                </div>
                    <div class="item">
                    <h3><CountTo :endVal="+list.newServerOrder" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./order/serviceOrder">新增服务订单</router-link>
                </div>
                <div class="item">
                    <h3><CountTo :endVal="+list.newSellCardOrder" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./order/goodsOrder">新增售卡订单</router-link>
                </div>
                    <div class="item">
                    <h3><CountTo :endVal="+list.newPayOrder" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./financeManage/tradeWater">新增充值订单订单</router-link>
                </div>
                <div class="item">
                    <h3><CountTo :endVal="+list.sumNumber" :countStyle="countStyle"></CountTo></h3>
                    <router-link to="./financeManage/storeCoun">交易额</router-link>
                </div>
            </div>
        </div>
    </Row>
</template>

<script>
import common from '../base.js';
import CountTo from './component/count-to/count-to'
export default {
    name: 'home',
    components: {
        CountTo
    }, 
    data: function() {
         return {
             countStyle: {
                 fontSize: '24px',
                 color: '#dc9387',
             },
             list:{
                 auditServer:'',
                 auditEmployee:'',
                 newMember:'',
                 newStore:'',
                 newServer:'',
                 newMemberCard:'',
                 newServerOrder:'',
                 newSellCardOrder:'',
                 newPayOrder:'',
                 sumNumber:''
             },
            cd:{
                type:''
            },
            spinShow:false
        }
    },
    activated:function(){
        this.getService(1);
    },
    mounted: function() {
        let vm = this;
        this.fnIsEnter();
    },
    methods: {
        /* 是否有登录 */
        fnIsEnter () {
            if(!!!window.localStorage.getItem("userInfo")){
                alert("请先登录")
                this.$router.push("/login");
            }
        },
        /* 初始化表格筛选条件 */
        fnInit () {
            let vm = this;
            vm.cd.type = '';//评价时间
        },
        // 获取数据
        getService (num,init) {
            let vm = this;
             if(!!init&&init=='init'){
                vm.fnInit();
            }
            let url = vm.common.path + 'store/data/count';
            let postData = {
                days:num,
                type:0,
                storeId:0
            }
            vm.spinShow = true;
            vm.$http.post(url,postData).then(function(res){
                console.log(res);
                if (res.data.code == 200) {
                    let datas = res.data.data;
                     vm.spinShow = false;
                    //待审核服务
                    vm.list.auditServer = datas.pendingProductCount;
                    //待审核员工
                    vm.list.auditEmployee= datas.pendingBeauticianCount; 
                    //新增会员
                    vm.list.newMember = datas.addMemberCount;
                    //新增门店
                    vm.list.newStore = datas.addStoreCount; 
                    //新增服务
                    vm.list.newServer = datas.addProductCount; 
                    //新增会员卡
                    vm.list.newMemberCard = datas.addMemberCardCount;
                    //新增服务订单
                    vm.list.newServerOrder = datas.addProductOrderCount;
                    //新增售卡订单
                    vm.list.newSellCardOrder = datas.addSaleCardOrderCount;
                    //新增充值订单
                    vm.list.newPayOrder = datas.addRechargeOrderCount;
                    //交易额
                    vm.list.sumNumber = datas.turnoverCount;        
                } else {
                    vm.list.spinShow = true;
                }
            }).catch(function(err){
                vm.spinShow = true;
                vm.$Message.error('失败!');
            })
        },
        //tab点击事件
        tabClick () {
            let type = this.cd.type;
            this.getService(type);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .testWrap h2{
        margin-bottom: 6px;
    }
    .boxStyle .item{
        float: left;
        padding: 20px 43px;
        text-align: center;
    }
    .item h3{
        margin: 4px 0 24px 0;
        font-size: 20px;
    }
    .dataSee{
        margin-top: 10px;
    }
    a{
        color: #495060;
    }
</style>
