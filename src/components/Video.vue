<template>
	<div class="main">
		<div class="header">
			<video-player  class="video-player vjs-custom-skin"
				ref="videoPlayer"
				:playsinline="true"
				:options="playerOptions"
			></video-player>
			<p class="introduceBox">
				<input type="text" placeholder="发个友善的弹幕见证一下当下">
			</p>
		</div>
		
		<div class="content">
			<div class="subnav">
				<div class="left" @click="showIntroduce" :class="{showstyle:show}">简介</div>
				<div class="right" @click="showComment" :class="{showstyle:!show}">评论</div>
			</div>
		</div>
		
		<div class="footer">
			<video-introduce v-if="show" :id='this.id'></video-introduce>
			<video-comment v-if="!show"></video-comment>
		</div>
	</div>
</template>

<script>
		import videoComment from './VideoComment.vue'//播放组件子路由
		import videoIntroduce from './VideoIntroduce.vue'//播放组件子路由
		import axios from 'axios';
		name: 'video';
		export default{			
			components: {
				//声明组件
				videoComment,
				videoIntroduce,
			},
			data() {
				return {
					//底部简介评论显示与隐藏
					show: true,
					id: '',
					//播放组件data部分
					playerOptions : {
						playbackRates: [0.5, 0.75, 1.0, 1.5, 1.75, 2.0], //播放速度
						autoplay: false, //如果true,浏览器准备好时开始回放。
						muted: false, // 默认情况下将会消除任何音频。
						loop: false, // 导致视频一结束就重新开始。
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
						sources: [{
							type: "",
							src:"../../public/video/movie.mp4" //url地址
						}],
						poster: "../../public/image/01.jpg", //你的封面地址
						// width: document.documentElement.clientWidth,
						notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
						controlBar: {
							timeDivider: true,
							durationDisplay: true,
							remainingTimeDisplay: false,
							fullscreenToggle: true  //全屏按钮
						}
					},
				}
			},
			methods: {
				showIntroduce(){
					this.show = true;
				},
				showComment(){
					this.show = false;
				}
			},
			created () { 
				this.id = this.$route.params.id;
				console.log(this.id);
			},
			beforcreated(){
				
			}
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
		background-color: rgb(255,255,255);
		.header{
			width: 100%;
			height: 250px;
			overflow: hidden;
			background-color: rgb(51,51,51);
			.introduceBox{
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				input{
					width: 90%;
					height: 70%;
					border: 0;
					font-size: 12px;
					padding: 0 5%;
					border-radius: 40px;
					color: rgb(153,153,153);
					background-color: rgb(90,90,90);
				}
			}
		}
		.content{
			/*标题栏*/
			.subnav {
				width: 100%;
				height: 46px;
				font-size: 14px;
				padding: 0 20%;
				z-index: 5;
				box-shadow: 0px 3px 10px #CCC;
				color: rgb(117,117,117);
				background-color: rgb(255,255,255);
				border-bottom: 2px solid rgb(255,255,255);
				div{
					text-align: center;
					line-height: 38px;
					margin:3px 5% 3px 5%;
				}
				.showstyle{
					color: rgb(251,114,153);
					border-bottom: 2px solid rgb(251,114,153);
					margin-bottom: 0px;
				}
			}
		}
		.footer{
			width: 100%;
			padding: 20px 4%;
		}
	}
</style>
