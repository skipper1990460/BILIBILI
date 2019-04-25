//引用
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './src/app.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player'
import $ from 'jquery';
import '_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css';
import '_bootstrap@3.4.1@bootstrap/dist/js/bootstrap.min.js';


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

//导入公共方法
import PublicMethod from './src/static/PublicMethod.js'

//路由配置
import Home from './src/components/Home.vue';//首页组件
import LiveBroadcast from './src/components/HomeLiveBroadcast.vue';//直播组件
import Recommend from './src/components/HomeRecommend.vue';//推荐组件
import Popular from './src/components/HomePopular.vue';//热门组件
import ChasingAnime from './src/components/HomeChasingAnime.vue';//追番组件

import Video from './src/components/Video.vue'//播放组件


import Channel from './src/components/Channel.vue';
import Dynamic from './src/components/Dynamic.vue';
import MemberPurchase from './src/components/MemberPurchase.vue';

import Login from './src/components/HomeNavLeftLogin.vue';//登录组件
	import Register from './src/components/HomeNavLeftLoginRegister.vue';//注册组件

import Setting from './src/components/HomeNavLeftSetting.vue';//设置组件
	import UserData from './src/components/HomeNavLeftSettingUserData.vue';//用户数据组件
		import ChangeUserName from './src/components/HomeNavLeftSettingUserDataName.vue';//用户昵称修改组件
		import ChangeUserImg from './src/components/HomeNavLeftSettingUserDataImg.vue';//用户头像修改组件

//使用组件库
Vue.use(VideoPlayer)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

//声明公共方法
Vue.prototype.PublicMethod = PublicMethod;

//路由配置
const Routers = [
	{ path: '/',redirect:'/Home'},//默认首页
	{path:'/Home',name:"Home",component:Home,children:[//一级路由,首页
		{path:'/LiveBroadcast',name:"LiveBroadcast",component:LiveBroadcast},//二级路由,直播
		{path:'/Recommend',name:"Recommend",component:Recommend},//二级路由,推荐
		{path:'/Popular',name:"Popular",component:Popular},//二级路由,热门
		{path:'/ChasingAnime',name:"ChasingAnime",component:ChasingAnime}//二级路由,追番
	],redirect: '/Recommend'
	},
	{path:'/Channel',name:"Channel",component:Channel},
	{path:'/Dynamic',name:"Dynamic",component:Dynamic},
	{path:'/MemberPurchase',name:"MemberPurchase",component:MemberPurchase},
	
	{path:'/Login',name:"Login",component:Login},//一级路由,登录
		{path:'/Register',name:"Register",component:Register},//二级路由,注册
		
	{path:'/Setting',name:"Setting",component:Setting},//一级路由,设置
		{path:'/UserData',name:"UserData",component:UserData},//二级路由,用户数据
			{path:'/ChangeUserName',name:"ChangeUserName",component:ChangeUserName},//三级路由,修改用户昵称
			{path:'/ChangeUserImg',name:"ChangeUserImg",component:ChangeUserImg},//三级路由,修改用户头像
			
	{path:'/Video/:id',name:'video',component:Video},
];

const RouterConfig = {
	mode: 'history',
	routes: Routers,
}

const router = new VueRouter(RouterConfig);

const store = new Vuex.Store({
	
})



new Vue({
	el: '#app',
	router: router,
	store: store,
	//箭头函数(ES6)
	render: h => {
		return h(App)
	}
});