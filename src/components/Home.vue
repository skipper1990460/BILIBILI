<template>
	<div class="home">

		<!-- 头部状态栏蒙版 -->
		<div class="mask"></div>

		<!-- 左侧动态导航栏组件 -->
		<nav-left ref="myLeftNav"></nav-left>

		<!-- 头部导航栏 -->
		<div class="navHeader clearfloat" v-bind:class="{ scrollUp: flag }">
			<span class="left_box menu" @click="navLeftChildShow">
				<img src="public/image/IconMenu.png">
			</span>
			<span class="left_box user" @click="navLeftChildShow">
				<img :src= "'public/'+this.userArr[3]" v-if="userShow">
				<img src= "public/image/defaultUser.jpg" v-if="!userShow" class="defaultIcon">
			</span>

			<div class="search left">
				<span class="glyphicon glyphicon-search"></span>
			</div>

			<span class="right_box game">
				<img src="public/image/Icon03.png">
			</span>
			<span class="right_box caseright">
				<img src="public/image/Icon02.png">
			</span>
			<span class="right_box news">
				<img src="public/image/Icon01.png">
			</span>
		</div>
		
		<!-- 头部二级路由 -->
		<div class="subnav" v-bind:class="{ scrollDown: flag }">
			<router-link class="left" tag="div" to="/LiveBroadcast">直播</router-link>
			<router-link class="left" tag="div" to="/Recommend">推荐</router-link>
			<router-link class="left" tag="div" to="/Popular">热门</router-link>
			<router-link class="left" tag="div" to="/ChasingAnime">追番</router-link>
		</div>

		<!-- 中间二级路由视图区域 -->
		<div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>

// 导入组件
import navLeft from "./HomeNavLeft.vue";
export default {
	components: {
		//声明组件
		navLeft
	},
	data () {
    return {
    	flag: false,
			userShow: false,
    }
	},
	methods: {
		//头部导航栏卷曲
		handleScroll () {
		  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		  if (scrollTop>50) {
		  	this.flag = true;
		  }else{
		  	this.flag = false;
		  };
		},
		// 页面离开后执行函数
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll)
		},

		//父组件触发子组件函数
		navLeftChildShow() {
			this.$refs.myLeftNav.navShow();
		}
	},
	// 渲染已经完成或el对应HTML渲染后
	mounted () {
	  window.addEventListener('scroll', this.handleScroll)
	},
	beforeCreate() {
		this.PublicMethod.LoginVerification();
	},
	created () {
		if(localStorage.userStr){
			var str = localStorage.userStr;
			this.userArr = str.split(',');
			this.userShow = true;
		};
	},
}
</script>
<style scoped lang="less">
	/*顶部蒙版*/
	.mask {
		width: 100%;
		height: 25px;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: rgb(251,114,153);
	} 
	/*头部导航栏*/
	.navHeader {
		width: 100%;
		background-color: rgb(251,114,153);
		padding-top: 25px;
		z-index: 5;
		span{
			width: 20px;
			height: 20px;
			margin: 10px 15px 20px 15px;
			text-align: center;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.user{
			width: 28px;
			height: 28px;
			text-align: center;
			overflow:hidden;
			margin-top: 6px;
			img{
				width: 125%;
			}
		}
		/*头部导航栏左侧按钮*/
		.left_box {
			float: left;
			border-radius: 50%;
			border: 1px solid #ccc;
			.defaultIcon{
				margin-left: -12%;
			}
		}
		/*头部导航栏右侧按钮*/
		.right_box {
			float: right;
		}
		/*搜索框*/
		.search {
			width: 155px;
			height: 30px;
			margin-top: 5px;
			border-radius: 30px;
			background-color: rgb(229,104,140);
			border: 0;
			position: relative;
			span{
				position: absolute;
				left: -5px;
				top: -2px;
				color: rgb(234,172,190);
			}
		}
		.menu {
			width: 8px;
			margin: 8px 0 20px 0;
			border-radius: 0;
			border: 0;  
		}
	}
	/*二级标题栏*/
 	.subnav {
		width: 100%;
		height: 46px;
		font-size: 14px;
		padding: 0 15%;
		z-index: 5;
		color: rgb(117,117,117);
		background-color: rgb(255,255,255);
		border-bottom: 2px solid rgb(231,231,231);
		div{
			text-align: center;
			line-height: 38px;
			margin:3px 7% 3px 6%;
		}
	}
 	/*动态绑定*/
	.scrollDown {
		position: fixed;
		top: 25px;
	}
	.scrollUp {
		margin-bottom: 46px;
	}
	.router-link-exact-active {
		color: rgb(251,114,153);
		border-bottom: 2px solid rgb(251,114,153);
		margin-bottom: 0px;
	}
</style>