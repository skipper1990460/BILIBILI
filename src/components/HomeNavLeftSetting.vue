<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">设置</div>
		</div>

		<!-- 主体 -->
		<div class="content">
			<ul class="first" v-if="userShow">
				<li class="borderBottom" @click="toUserData">
					<span>账号资料</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li class="borderBottom">
					<span>安全隐私</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li>
					<span>收货信息</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
			</ul>
			
			<ul class="second">
				<li class="borderBottom">
					<span>播放设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li class="borderBottom">
					<span>解码设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li class="borderBottom">
					<span>弹幕设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li class="borderBottom">
					<span>离线设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li>
					<span>追番设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
			</ul>
			
			<ul class="third">
				<li class="borderBottom">
					<span>推送与消息</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li class="borderBottom">
					<span>清理存储空间</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li>
					<span>其他设置</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
			</ul>
			
			<ul class="fourth">
				<li class="borderBottom">
					<span>我的客服</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li>
					<span>帮助</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
			</ul>
			
			<ul class="signOut" v-if="userShow">
				<li @click="signOut">
					退出登录
				</li>
			</ul>
			
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'Setting';
	export default {
		components: {
		},
		data () {
			return {
				userShow: false,
			}
		},
		methods: {
			goBack(){
				this.$router.push({path:'/'});
			},
			signOut(){
				localStorage.clear();
				if(!localStorage.userStr){
					console.log('已退出');
				}
				this.$router.push({path:'/'});
				location.reload();
			},
			toUserData(){
				this.$router.push({path:'/UserData'});
			},
		},
		beforeCreate() {
		},
		created () {
			if(localStorage.userStr){
				this.userShow = true;
			}
		},
	}
</script>
<style scoped lang="less">
	.main{
		width: 100%;
		top: 0;
		bottom: 0;
		z-index: 30;
		position: fixed;
		overflow-y:scroll;
		overflow-x:hidden;
		background-color: rgb(244,244,244);
		/*头部*/
		.head {
			width: 100%;
			height: 79px;
			line-height: 29px;
			padding: 35px 0px 0px 20px;
			color: rgb(255,255,255);
			background-color: rgb(251,114,153);
			box-shadow: 0px 2px 3px #888888;
			span{
				font-size: 20px;
			}
			div{
				font-size: 18px;
				margin-left: 30px;
			}
		}
	
		/*主体*/
		.content {
			width: 100%;
			ul{
				margin: 10px 0;
				li{
					width: 100%;
					height: 45px;
					line-height: 45px;
					color: rgb(51,51,51);
					font-size: 16px;
					background-color: #fff;
					padding: 0 10%;
					span{
						margin: 13px 0;
					}
				}
				.borderBottom{
					border-bottom: 1px solid rgb(231,231,231);
				}
			}
			.signOut{
				text-align: center;
			}
		}
	}
	
</style>
