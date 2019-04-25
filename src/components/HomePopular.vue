<template>
	<!-- <h3>热门</h3> -->
	<div class="container">

		<!-- 顶部排行榜 -->
		<div class="popularTitle">
			<p class="left">当前热门</p>
			<p class="right">
				<span class="glyphicon glyphicon-signal"></span>
				排行榜 >
			</p>
		</div>

		<!-- 列表 -->
		<div class="cards left" v-for="item in this.PopularList">
			<div class="cardImg" :key="item.PopIndex">
				<img :src="'public/'+item.PopImgUrl">
				<!-- <img src='./src/image/01.jpg'> -->
				<p>{{ TimePut(item.PopTime) }}</p>
			</div>
			<div class="cardContent clearfloat right">
				<div class="title left">{{ TitlePut(item.PopTitle) }}</div>
				<div class="someData">
					<div class="flag left">{{ item.PopFlag }}</div>
					<div class="author">{{ item.PopAuthor }}</div>
					<div class="videoView">{{ item.PopVideoView }}万播放·{{ item.PopDay }}天前</div>
					<span class="glyphicon glyphicon-option-vertical"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	name: 'HomeRecommend';
	export default {
		data() {
			return {
				PopularList: []
			}
		},
		methods: {
			// 如果title过长
			TitlePut(title){
				if (title.length>=24) {
					title = title.substr(0, 23) + '...'
				}
				return title;
			},
			TimePut(time){
				if (time>3600) {
					time = parseInt(time/3600) +':'+ parseInt((time-parseInt(time/3600)*3600)/60) + ':' + time%60;
				}else if(time>60){
					time = parseInt(time/60) +':'+ time%60;
				}
				return time;
			},
		},
		beforeCreate() {
			
		},
		created(){
	    axios.get('http://localhost:8081/api/Popular')
	      //then获取成功；response成功后的返回值（对象）
	    .then(response=>{
	      this.PopularList = response.data;
	    })
	      //获取失败
	    .catch(error=>{
	      console.log(error);
	      alert('网络错误，不能访问');
	    })
	  },
	}
</script>

<style scoped lang="less">
	/*头部主体部分*/
	.container {
		width: 100%;
		background-color: #fff;
		padding: 0 12px 50px 12px;
		/*头部排行榜*/
		.popularTitle {
			width: 100%;
			padding-top: 12px;
			font-size: 14px;
			color: rgb(142,142,142);
			p{
				span {
					font-size: 16px;
					margin-right: 3px;
				}
				&:nth-child(2) {
					color: rgb(251,114,153);
				}
			}
		}
	
		/*列表卡片*/
		.cards {
			width: 100%;
			height: 120px;
			margin: 0;
			padding: 12px 0;
			border-bottom: 1px solid rgb(231,231,231);
			.cardImg {
				width: 42%;
				height: 97px;
				border-radius: 5px;
				overflow: hidden;
				position: relative;
				img {
					width: 120%;
				}
				p {
					color: #fff;
					height: 18px;
					padding : 0 5px;
					line-height: 18px;
					border-radius: 3px;
					font-size: 12px;
					position: absolute;
					right: 5px;
					bottom: -5px;
					background-color: rgba(0,0,0,0.5);
				}
			}
			.cardContent {
				width: 55%;
				height: 100%;
				font-size: 12px;
				color: rgb(153,153,153);
				position: relative;
				top: -96px;
				right: 0;
				.title {
					width: 100%;
					height: 34px;
					color: #333;
					font-size: 14px;
					line-height: 17px;
				}
				.someData {
					position: relative;
					.flag {
						height: 14px;
						color: #fff;
						line-height: 14px;
						font-size: 10px;
						border-radius: 3px;
						padding: 0 3px;
						margin-top: 8px;
						background-color: rgb(251,158,96);
					}
					.author{
						position: absolute;
						top: 58px;
						left: 0px;
					}
					.videoView{
						position: absolute;
						top: 76px;
						left: 0px;
					}
					span{
						height: 14px;
						font-size: 14px;
						position: absolute;
						top: 75px;
						right: 6px;
					}
				}
			}	
		}
	}
</style>

