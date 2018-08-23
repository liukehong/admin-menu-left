import * as types from './type'
/* ===============================状态值============================ */
const state = {
	TabType:true,
	//用户登录信息
	adminInfo:"",
};
/* =========================改变状态的唯一方法======================= */
const mutations = {
	[types.TAB_TRUE](state){
		state.TabType = true;
	},
	[types.TAB_FALSE](state){
		state.TabType = false;
	},
	[types.ADMIN_INFO](state,adminInfo){
		state.adminInfo = adminInfo;
	},
}
/* ====================对状态进行处理再输出=========================== */
const getters = {
	tabTrue(state){
		return state.TabType
	},
	adminInfo(state){
		return state.adminInfo
	},
}
export default{
	state,
	mutations,
	getters
}