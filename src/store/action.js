

export default{
	//初始化信息
	changeRoute({ commit },name) {
		commit('ADDRou',name);
	},
	changeLink({ commit },url) {
		commit('LinkRou',url);
	},
	changeName({ commit },name) {
		commit('LinkName',name);
	}
	
}
