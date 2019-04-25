<template>
	<div class="main" @touchmove.prevent>
		<!-- 头部 -->
		<div class="head">
			<span class="glyphicon glyphicon-chevron-left left" @click="goBack"></span>
			<div class="left">修改头像</div>
		</div>

		<!-- 主体 -->
		<div class="content">
			<el-upload
				class="avatar-uploader"
				action="http://localhost:8081/post/GetImg"
				:show-file-list="false"
				:name="this.userArr[0]"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'ChangeUserImg';
	export default {
		components: {
		},
		data () {
			return {
				newName: '',
				userArr: [],
				imageUrl: '',
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			goBack(){
				this.$router.push({path:'/UserData'});
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
		}
		.avatar-uploader{
			.el-upload {
			  border: 1px dashed #d9d9d9;
			  border-radius: 6px;
			  cursor: pointer;
			  position: relative;
			  overflow: hidden;
			}
			.el-upload:hover {
			  border-color: #409EFF;
			}
			.avatar-uploader-icon {
			  font-size: 28px;
			  color: #8c939d;
			  width: 178px;
			  height: 178px;
			  line-height: 178px;
			  text-align: center;
			}
			.avatar {
			  width: 178px;
			  height: 178px;
			  display: block;
			}
		}
	}
</style>
