<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">登陆</div>
			<p class="right">忘记密码?</p>
		</div>

		<div class="LoginImg">
			<img src="public/image/login.png">
		</div>

		<!-- 主体 -->
		<div class="content">
			<div class="inputBox">
				<span 
					class="glyphicon glyphicon-user use" 
					:class="{showColor: user}"></span>
				<input 
					type="text" 
					name="" 
					placeholder="你的手机号/邮箱" 
					:class="{showBottom: user}" 
					v-focus
					v-model="userAdmin"
					@focus='showUser'>


				<span 
					class="glyphicon glyphicon-lock pas" 
					:class="{showColor: password}"></span>
				<input 
					type="password" 
					name="" 
					placeholder="请输入密码" 
					:class="{showBottom: password}"
					v-model="userPassword"
					@focus='showPassword'>
			</div>
			<div class="buttonBox">
				<button class="registerBtn left" @click="GoRegister">注册账号</button>
				<button class="loginBtn right" @click="Logining">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'Login';
	export default {
		components: {
		},
		data () {
			return {
				user: false,
				password: false,
				userAdmin: '',
				userPassword: '',
			}
		},
		methods: {
			showUser(){
				this.user = true;
				this.password = false;
			},
			showPassword(){
				this.user = false;
				this.password = true;
			},
			goBack(){
				this.$router.push({path:'/'});
			},
			GoRegister(){
				this.$router.push({path:'/register'});
			},
			Logining(){
				//如果登录信息localStorage已清除
				if(!localStorage.userStr){
					if(this.userPassword.length == 0 || this.userAdmin.length == 0){
						return alert('error!');
					}else{
						//发送post请求获取用户信息
						let data = {"userAdmin":this.userAdmin,"userPassword":this.userPassword};
						axios.post('http://localhost:8081/post/Login',data)
						.then(response=>{
							if(response.data.length == 0){
								return alert('登录失败!');
							}
							console.log(response.data);
							localStorage.userStr = response.data;
							this.$router.push({path:'/'});
							location.reload();
						})
						//获取失败
						.catch(error=>{
							console.log(error);
							alert('网络错误，不能访问');
						});
					}
				}
			}
		},
		created () {
			if(localStorage.userStr){
				this.$router.push({path:'/'});
			}
		},
		//注册局部指令获取焦点v-foucs
		directives:{
			focus: {
				inserted: function (el) {
					el.focus()
				}
			}
		},
	}
</script>
<style scoped lang="less">
	.main{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 30;
		background-color: rgb(244,244,244);
		/*头部*/
		.head {
			width: 100%;
			height: 79px;
			line-height: 29px;
			padding: 35px 0px 0px 20px;
			color: rgb(255,255,255);
			background-color: rgb(251,114,153);
			span{
				font-size: 20px;
			}
			div{
				font-size: 18px;
				margin-left: 30px;
			}
			p{
				font-size: 14px;
				margin-right: 20px;
				color: rgb(255,255,255);
			}
		}
		.LoginImg {
			width: 100%;
			img {
				width: 100%;
			}
		}
		/*主体*/
		.content {
			padding: 0 10%;
			position: relative;
			border: 0;
			input{
				border: 0;
				color:#666;
				padding-left: 40px;
				border-bottom: 3px solid #666;
				background-color: rgb(244,244,244);
			}
			span{
				color: #666;
				position: absolute;
				left: 50px;
			}
			.inputBox{
				.use{
					top: 10px;
				}
				.showColor {
					color: rgb(251,114,153);
				}
				.showBottom{
					border-bottom: 3px solid rgb(251,114,153);
				}
				.pas{
					top: 66px;
				}
			}
			.buttonBox {
				margin-top: 10px;
				button{
					width: 48%;
					height: 43px;
					font-size: 16px;
					border: 1px solid rgb(251,114,153);
				}
				.registerBtn{
					color: rgb(251,114,153);
					background-color: rgb(239,239,239);
					&:active{
						color: rgba(251,114,153,0.5);
						background-color: rgb(239,239,239,0.5);
						border: 1px solid rgb(251,114,153,0.5);
					}
				}
				.loginBtn{
					color: #fff;
					background-color: rgb(251,114,153);
					&:active{
						color: rgba(251,114,153,0.5);
						background-color: rgb(239,239,239,0.5);
						border: 1px solid rgb(251,114,153,0.5);
					}
				}
			}
		}
	}
</style>

