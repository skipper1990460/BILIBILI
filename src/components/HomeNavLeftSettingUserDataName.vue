<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">修改昵称</div>
			<div class="right" @click="save">
				保存
			</div>
		</div>

		<!-- 主体 -->
		<div class="content">
			<div class="getNewName">
				<input class="left" type="text" placeholder="请输入新昵称" v-model="newName"/>
				<span class="left" @click="clear">X</span>
			</div>
			
			<div class="footer">
				<span class="left">修改昵称需要消耗6枚硬币</span>
				<span class="right">如何获取硬币?</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'ChangeUserName';
	export default {
		components: {
		},
		data () {
			return {
				newName: '',
				userArr: [],
			}
		},
		methods: {
			goBack(){
				this.$router.push({path:'/UserData'});
			},
			clear(){
				this.newName = '';
			},
			save(){
				//发送post请求获取用户信息
				if(this.newName.length < 4){
					return alert('太短了');
				}
				let data = {"userAdmin":this.userArr[0],"userName":this.newName};
				axios.post('http://localhost:8081/post/changeName',data)
				.then(response=>{
					// console.log(response.data)
					if(response.data){
						console.log('修改成功!');
						this.newName = '';
						this.$router.push({path:'/UserData'});
						location.reload();
					}
				})
				//获取失败
				.catch(error=>{
					console.log(error);
					alert('网络错误，不能访问');
				});
			},
		},
		components:{
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
		background-color: rgb(234,234,234);
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
			.right{
				font-size: 16px;
				margin-right: 15px;
			}
		}
		
		/*主体*/
		.content {
			width: 100%;
			/*主体输入框*/ 
			.getNewName{
				width: 100%;
				height: 30px;
				padding: 0 3%;
				margin-top: 28px;
				background-color: rgb(234,234,234);
				input{
					width: 90%;
					height: 100%;
					border: 0;
					padding: 0 0 5px 3px;
					margin: 0;
					color: rgb(117,117,117);
					background-color: rgb(234,234,234);
					border-bottom: 4px solid rgb(251,114,153);
				}
				span{
					margin-left: 15px;
					color: rgb(193,193,193);
					font-weight: 200;
				}
			}
			.footer{
				width: 100%;
				height: 25px;
				padding: 0 3%;
				margin-top:15px;
				font-size: 14px;
				font-weight: 300;
				color: rgb(153,153,153);
			}
		}
	}
	
	
	
	
	

</style>
