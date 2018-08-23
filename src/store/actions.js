import * as types from './type'

export default{
	/* 是否存在页签 */
	tabTrue:({commit})=>{
		commit(types.TAB_TRUE);
	},
	tabFalse:({commit})=>{
		commit(types.TAB_FALSE);
	},
	/* 用户信息 */
	adminInfo:({commit},data)=>{
		commit(types.ADMIN_INFO,data.adminInfo);
	},
}