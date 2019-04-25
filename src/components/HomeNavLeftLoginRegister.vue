<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">注册账号</div>
		</div>

		<!-- 主体 -->
		<div class="content">
			<ul>
				<li>
					<span>中国大陆</span>
				</li>
				
				<li class="admin">
					<span>
						+86
						<input 
							type="text" 
							v-focus
							placeholder="请输入常用手机号" 
							v-model="userAdmin">
						<div class="GetVC" @click="GetVC">获取验证码</div>
					</span>
				</li>
				
				<li class="VC">
					<span>
						验证码
						<input 
							type="text" 
							placeholder="请输入验证码"
							v-model="userVerificationCode">
					</span>
				</li>
				
				<li class="password">
					<span>
						密码
						<input 
							type="password"
							placeholder="6~16个字符,区分大小写" 
							v-model="userPassword">
					</span>
				</li>
				
			</ul>
			
			<div class="registerBtn" @click="registerBtn">完成注册并登陆</div>
			<p>
				点击"获取验证码"按钮,即表示同意
				<a href="">注册信息</a>
			</p>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'Register';
	export default {
		components: {
		},
		data () {
			return {
				userAdmin: '',
				userPassword: '',
				userVerificationCode: '',
			}
		},
		methods: {
			goBack(){
				this.$router.back(-1);
			},
			signOut(){
					console.log('已退出');
					this.$router.push({path:'/Recommend'});
					location.reload();
			},
			GetVC(){
				if(this.userAdmin.length != 11 || !/^\d+$/.test(this.userAdmin)){
					return alert('请输入正确格式的手机号!');
				}else{
					//发送post请求获取验证码
					var data = {"userAdmin":this.userAdmin};
					axios.post('http://localhost:8081/post/VerificationCode',data)
						//then获取成功；response成功后的返回值（对象）
					.then(response=>{
						this.userVerificationCode = response.data;
						console.log(this.userVerificationCode);
						return
					})
						//获取失败
					.catch(error=>{
						console.log(error);
						alert('网络错误，不能访问');
					});
				}
			},
			//点击注册按钮,向接口发送注册信息
			registerBtn(){
				//如果为空返回错误信息
				if(this.userPassword.length == 0 || this.userVerificationCode.length == 0){
					return alert('请输入完整!');
				}else{
					localStorage.clear();
					//发送post请求
					let data = {"userAdmin":this.userAdmin,"userPassword":this.userPassword};
					axios.post('http://localhost:8081/post/Register',data)
					.then(response=>{
						console.log(response.data);
						//将响应数据存储至localStorage
						localStorage.userStr = response.data;
						this.$router.back(-1);
						location.reload();
					})
					//获取失败
					.catch(error=>{
						console.log(error);
						alert('网络错误，不能访问');
					});
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
				li{
					width: 100%;
					height: 45px;
					font-size: 14px;
					line-height: 45px;
					color: rgb(33,33,33);
					background-color: #fff;
					border-top: 1px solid rgb(231,231,231);
					border-bottom: 1px solid rgb(231,231,231);
					padding: 0 5%;
					margin-top: 15px;
					position: relative;
					input{
						top: 0;
						left: 70px;
						margin: 0;
						border: 0;
						width: 50%;
						height: 43px;
						font-size: 13px;
						line-height: 43px;
						position: absolute;
						color: rgb(192,192,192);
						background-color: #fff;
					}
				}
				.VC{
					margin: 0;
					border-top: 0;
				}
				.GetVC{
						top: 0;
						right: 10px;
						margin: 5px 0;
						padding-left: 10px;
						width: 25%;
						height: 33px;
						font-size: 13px;
						line-height: 33px;
						position: absolute;
						background-color: #fff;
						color: rgb(192,192,192);
						border-left: 1px solid rgb(231,231,231);
				}
			}
			.registerBtn {
				width: 90%;
				height: 45px;
				margin: 0 5%;
				color: #fff;
				font-size: 14px;
				text-align: center;
				line-height: 45px;
				border-radius: 8px;
				background-color: rgb(251,114,153);
			}
			p{
				width: 100%;
				margin-top: 15px;
				text-align: center;
				color: rgb(33,33,33);
				a{
					color: rgb(251,114,153);
				}
			}
		}
		
	}
	
	
	
	

</style>
