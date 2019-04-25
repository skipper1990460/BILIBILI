<template>
	<div class="mian">
		<div class="upMessageBox">
			<div class="upImg left">
				<img src="" alt="">
			</div>
			<div class="updata left">
				<p class="upName">up姓名</p>
				<p class="upNumber">up粉丝数</p>
			</div>
			<div class="FollowBtn right">+关注</div>
		</div>
		
		<div class="avMessageBox">
			
			
			<div class="avtitle">
				视频title部分
				<span 
				class="glyphicon right" 
				:class="{'glyphicon-chevron-right':this.dataShow, 'glyphicon-chevron-down':!this.dataShow}" 
				@click="transform">
				</span>
			</div>
			
			<div class="titleHidden" :class="{hidden:this.dataShow}">
				<div>
					<p>隐藏的内容</p>
					<p>隐藏的内容</p>
					<p>隐藏的内容</p>
				</div>
			</div>
			
			<div class="avData">
				<span class="glyphicon glyphicon-expand number"></span>
				<span>555</span>
				<span class="glyphicon glyphicon-edit number"></span>
				<span>999</span>
				<span>3-18</span>
				<span>{{ this.id }}</span>
			</div>
			
			<div class="avDataHidden"  :class="{hidden:this.dataShow}">
				<div>
					隐藏的内容
				</div>
			</div>
			
			<div class="IconBox">
				<ul>
					<li>
						<span class="glyphicon glyphicon-hand-right"></span><br>
						111
					</li>
					<li>
						<span class="glyphicon glyphicon-thumbs-down"></span><br>
						222
					</li>
					<li>
						<span class="glyphicon glyphicon-piggy-bank"></span><br>
						333
					</li>
					<li>
						<span class="glyphicon glyphicon-star-empty"></span><br>
						444
					</li>
					<li>
						<span class="glyphicon glyphicon-send"></span><br>
						555
					</li>
				</ul>
			</div>
			
			<div class="otherReommend">
				<!-- 列表 -->
				<div class="cards left" v-for="item in this.AVList">
					<div class="cardImg" :key="item.vdHref">
						<img src='../../public/image/05.jpg'>
					</div>
					<div class="cardContent clearfloat right">
						<div class="title left">{{ TitlePut(item.vdTitle) }}</div>
						<div class="someData">
							<div class="author">{{ item.vdUp }}</div>
							<div class="videoView">
								<span class="glyphicon glyphicon-expand"></span>
								<span> {{ videoPut(item.vdVideoView) }} </span>
								<span class="glyphicon glyphicon-edit Barrage"></span>
								<span>111</span>
							</div>
							<span class="glyphicon glyphicon-option-vertical"></span>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'videoIntroduce',
		components: {
		},
		data () {
			return {
				id: '',
				dataShow: true,
				AVList: [],
			}
		},
		methods: {
			transform(){
				this.dataShow = !this.dataShow;
			},
			videoPut(vdVideoView){
				return vdVideoView > 10000 ? (vdVideoView/10000)+'万' : vdVideoView
			},
			// 如果title过长
			TitlePut(title){
				if (title.length>=30) {
					title = title.substr(0, 29) + '...'
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
			GetAv(){
				var num = Math.random();//Math.random()：得到一个0到1之间的随机数
				num = Math.ceil(num * 450);//num*80的取值范围在0~80之间,使用向上取整
				let data = {"min": num };
				axios.post('http://localhost:8081/api/AVdata',data)
				  //then获取成功；response成功后的返回值（对象）
				.then(response=>{
					this.AVList = response.data;
				})
				  //获取失败
				.catch(error=>{
				  console.log(error);
				  alert('网络错误，不能访问');
				})
			},
		},
		beforeCreate() {
			
		},
		created () { 
			this.id = this.$route.params.id;
			console.log(this.id);
			this.GetAv();
		},
	}
</script>

<style scoped lang="less">
	.main{
		.upMessageBox{
			width: 100%;
			height: 40px;
			.upImg{
				width: 36px;
				height: 36px;
				border-radius: 50%;
				margin-top: 3px;
				background-color: Red;
			}
			.updata{
				height: 100%;
				margin-left: 5%;
				p{
					margin: 0;
					height: 20px;
					line-height: 20px;
				}
				.upName{
					font-size: 16px;
					color: rgb(251,114,153);
				}
				.upNumber{
					font-size: 14px;
					color: rgb(153,153,153);
				}
			}
			.FollowBtn{
				width: 68px;
				height: 25px;
				color: #fff;
				font-size: 12px;
				margin-top: 7px;
				text-align: center;
				line-height: 25px;
				border-radius: 5px;
				background-color: rgb(251,114,153);
			}
		}
		.avMessageBox{
			width: 100%;
			.avtitle{
				width: 100%;
				height: 38px;
				line-height: 38px;
				font-size: 18px;
				margin: 7px 0 3px 0;
				color: rgb(51,51,51);
			}
			.avData{
				font-size: 12px;
				line-height: 12px;
				margin: 5px 0;
				color: rgb(153,153,153);
				span{
					margin-right: 3%;
				}
				.number{
					margin-right: 1px;
				}
			}
			.avDataHidden{
				width: 100%;
				overflow: hidden;
			}
			.titleHidden{
				width: 100%;
				overflow: hidden;
			}
			.hidden{
				height: 0;
			}
			.IconBox{
				width: 100%;
				height: 70px;
				padding: 10px 0;
				margin: 10px 0;
				color: rgb(117,117,117);
				border-bottom: 1px solid rgb(231,231,231);
				li{
					width: 20%;
					height: 30px;
					float: left;
					font-size: 12px;
					text-align: center;
					span{
						font-size: 24px;
						margin-bottom: 5px;
					}
				}
			}
			.otherReommend{
				/*列表卡片*/
				.cards {
					width: 100%;
					height: 97px;
					margin: 0;
					padding: 12px 0;
					border-bottom: 1px solid rgb(231,231,231);
					.cardImg {
						width: 35%;
						height: 100%;
						border-radius: 5px;
						overflow: hidden;
						img {
							width: 107%;
						}
					}
					.cardContent {
						width: 61%;
						height: 100%;
						font-size: 12px;
						color: rgb(153,153,153);
						position: relative;
						top: -76px;
						right: 0;
						.title {
							width: 100%;
							height: 34px;
							color: #333;
							font-size: 14px;
							line-height: 17px;
						}
					}	
				}
			}
		}	
	}
	.someData {
		height: 32px;
		width: 100%;
		position: relative;
		top: 34px;
	}
	
	.someData>span{
		height: 14px;
		font-size: 14px;
		position: absolute;
		top: 33px;
		right: 0px;
	}
	.author{
		position: absolute;
		top: 30px;
		left: 0px;
	}
	.videoView{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 15px;
		left: 0px;
	}
	.Barrage{
		margin-left: 25px;
	}
	
	
</style>
