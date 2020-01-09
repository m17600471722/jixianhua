
const ADDRou = 'ADDRou'
const LinkRou = 'LinkRou'
const LinkName = 'LinkName'
export default{
	[ADDRou](state, name) {
		state.stateRoute = name;
	},
	[LinkRou](state, url) {
		state.linkUrl = url;
	},
	[LinkName](state, name) {
		state.linkName = name;
	},
}