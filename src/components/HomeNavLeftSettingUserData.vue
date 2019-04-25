<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">账号资料</div>
		</div>

		<!-- 主体 -->
		<div class="content">
			<ul v-if="userShow">
				<li class="userImgBox">
					<span>头像</span>
					<span class="right glyphicon glyphicon-chevron-right" @click="goChangeImg"></span>
					<img :src= "'src/'+this.userArr[3]" class="right" @click="goChangeImg">
				</li>
				<li>
					<span>昵称</span>
					<span class="right glyphicon glyphicon-chevron-right"  @click="goChangeName"></span>
					<span class="data"  @click="goChangeName">{{ this.userArr[2] }}</span>
				</li>
				<li>
					<span>UID</span>
					<span class="data">{{ this.userArr[0] }}</span>
				</li>
				<li>
					<span>二维码名片</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
					<span class="data glyphicon glyphicon-qrcode QRCode"></span>
				</li>
				<li>
					<span>头像挂件</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
				</li>
				<li>
					<span>性别</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
					<span class="data">保密</span>
				</li>
				<li>
					<span>出生年月</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
					<span class="data">保密</span>
				</li>
				<li>
					<span>个性签名</span>
					<span class="right glyphicon glyphicon-chevron-right"></span>
					<span class="data">这家伙很懒...</span>
				</li>
			</ul>
			
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'UserData';
	export default {
		components: {
		},
		data () {
			return {
				userArr: [],
			}
		},
		methods: {
			goBack(){
				this.$router.push({path:'/Setting'});
			},
			goChangeName(){
				this.$router.push({path:'/ChangeUserName'});
			},
			goChangeImg(){
					this.$router.push({path:'/ChangeUserImg'});
			}
		},
		beforeCreate() {
			this.PublicMethod.LoginVerification();
		},
		created () {
			if(localStorage.userStr){
				var str = localStorage.userStr;
				this.userArr = (str).split(',');
				this.userShow = true;
			}else{
					this.$router.push({path:'/Login'});
			};
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
					padding: 0 5%;
					border-top: 1px solid rgb(231,231,231);
					.glyphicon{
						color: rgb(170,170,170);
						margin: 4% 2%;
					}
					.data{
						color: rgb(170,170,170);
						font-size: 14px;
						float: right;
					}
					.QRCode{
						margin: 3% 0 0 0;
						font-size: 20px;
					}
				}
				.userImgBox{
					height: 80px;
					overflow: hidden;
					line-height: 80px;
					.glyphicon{
						margin: 9% 2%;
					}
					img{
						width: 70px;
						height: 70px;
						margin-top: 5px;
					}
				}
			}
		}
	}
	

</style>
