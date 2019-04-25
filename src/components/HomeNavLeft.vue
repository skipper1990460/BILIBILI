<template>
	<!-- 屏蔽蒙版时底层滑动 -->
	<div class="main">
		
		<transition  name="nav-content">
			<div class="leftNav" v-if="show" >
				<div class="mask"></div>
				<div class="leftContent">

					<div class="navHader">
						<div class="boxImg">
							<img :src= "'public/'+this.user[3]" v-if="userShow">
							<img src= "public/image/defaultUser.png" v-if="!userShow" class="defaultIcon" @click="goLogin">
						</div>
						<div class="headerIcon">
							<img src="public/image/headerIcon.png">
						</div>
						<p class="username" v-if="userShow">{{ this.user[2] }}</p>
						<p class="usercoin" v-if="userShow">B币: {{ this.user[4] }} &nbsp;&nbsp; 硬币: {{ this.user[5] }}</p>
					</div>

					<div class="navbody">
						<div class="navbanner" v-if="userShow">
							<p class="bannernumber">
								<span>{{ this.user[6] }}</span>
								<span>{{ this.user[7] }}</span>
								<span>{{ this.user[8] }}</span>
							</p>
							<p class="bannertitle">
								<span>动态</span>
								<span>关注</span>
								<span>粉丝</span>
							</p>
						</div>
						<ul class="first" v-if="userShow">
							<li>
								<span class="glyphicon glyphicon-home"></span>
								首页
							</li>
							<li>
								<span class="glyphicon glyphicon-time"></span>
								历史记录
							</li>
							<li>
								<span class="glyphicon glyphicon-cloud-download"></span>
								离线缓存
							</li>
							<li>
								<span class="glyphicon glyphicon-heart-empty"></span>
								我的收藏
							</li>
							<li>
								<span class="glyphicon glyphicon-hourglass"></span>
								稍后再看
							</li>
						</ul>
						<ul class="second">
							<li>
								<span class="glyphicon glyphicon-open"></span>
								投稿
							</li>
							<li>
								<span class="glyphicon glyphicon-scissors"></span>
								创作中心
							</li>
							<li>
								<span class="glyphicon glyphicon-flag"></span>
								热门活动
							</li>
						</ul>
						<ul class="third">
							<li>
								<span class="glyphicon glyphicon-facetime-video"></span>
								直播中心
							</li>
							<li>
								<span class="glyphicon glyphicon-user"></span>
								我的大会员
							</li>
							<li>
								<span class="el-icon-mobile-phone"></span>
								免流量服务
							</li>
							<li>
								<span class="el-icon-document"></span>
								我的订单
							</li>
							<li>
								<span class="el-icon-goods"></span>
								会员购中心
							</li>
							<li>
								<span class="el-icon-service"></span>
								联系客服
							</li>
						</ul>
					</div>
				</div>
				<div class="navfooter">
						<div @click="toSetting">设置</div>
						<div>主题</div>
						<div>夜间</div>
				</div>
			</div>
		</transition>
		<div @touchmove.prevent>
			<transition  name="nav-mark"  @touchmove.prevent>
				<div class="leftNavMark"  @click="show = false" v-if="show"></div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'navLeft',
		components: {
			
		},
		data () {
			return {
				show: false,
				user: [],
				userShow: false,
			}
		},
		methods: {
			navShow () {
				return this.show = true;
			},
			toSetting(){
				this.$router.push({path:'/Setting'});
			},
			goLogin(){
				if(this.userShow == false){
				this.$router.push({path:'/Login'});
				}
			},
		},
		beforeCreate() {
			
		},
		created () {
			if(localStorage.userStr){
				var str = localStorage.userStr;
				this.user = (str).split(',');
				this.userShow = true;
			};
    },
	}
</script>
<style scoped lang="less">
	/*侧边栏*/
	.leftNav {
		width: 75%;
		top: 0;
		bottom: 0;
		position: fixed;
		overflow-y:scroll;
		overflow-x:hidden;
		z-index: 20;
		background-color: rgb(255,255,255);
		.leftContent{
			/*侧边栏头部粉色部分*/
			.navHader {
				width: 100%;
				height: 170px;
				position: relative;
				padding: 30px 0 0 16px;
				background-color: rgb(251,114,153);
				/*侧边栏头部粉色部分用户头像*/
				.boxImg {
					width: 64px;
					height: 64px;
					overflow: hidden;
					border-radius: 50%;
					border: 2px solid #fff;
					background-color: #fff;
					.defaultIcon{
						margin-left: -12%;
					}
					/*侧边栏头部粉色部分用户头像图片大小*/
					img{
						width: 125%;
					}
				}
				/*侧边栏头部粉色部分右上角图标*/
				.headerIcon {
					position: absolute;
					top: 30px;
					right: 15px;
					img{
						height: 32px;
					}
				}
				/*侧边栏头部粉色部分用户名*/
				.username {
					width: 100%;
					height: 18px;
					color: #fff;
					margin-top: 15px;
					line-height: 18px;
					font-size: 16px;
				}
				/*侧边栏头部粉色部分用户硬币数量*/
				.usercoin{
					width: 100%;
					height: 18px;
					color: rgb(253,199,214);
					margin-top: 10px;
					line-height: 18px;
					font-size: 14px;
				}
			}
			/*侧边栏主体底部*/
			.navbody {
				padding-bottom: 50px;
				/*侧边栏头部动态数量*/
				.navbanner {
					width:100%;
					height: 65px;
					border-bottom: 1px solid rgb(231,231,231);
					/*侧边栏头部动态*/
					.bannernumber {
						width: 100%;
						height: 16px;
						line-height: 16px;
						font-size: 14px;
						margin-top:15px;
						color: rgb(80,80,80);
						span{
							margin: 0 13%;
						}
					}
					.bannertitle {
						width: 100%;
						color: rgb(121,121,121);
						font-size: 14px;
						margin-top: 14px;
						span{
							margin: 0 10%;
						}
					}
				}
				ul {
					padding: 8px 0;
					li {
						width: 100%;
						height: 50px;
						font-size: 16px;
						line-height: 50px;
						padding-left: 21px;
						font-weight: 500;
						color: rgb(51,51,51);
						span{
							margin-right: 10%;
							color: rgb(127,127,127);
							font-size: 18px;
						}
					}
				}
			}
		}
		/*侧边栏底部三个钮*/
		.navfooter {
			width: 75%;
			height: 50px;
			z-index: 25;
			left: 0;
			bottom: 0;
			position: fixed;
			line-height: 50px;
			color: rgb(51,51,51);
			background-color: rgb(255,255,255);
			border-top: 1px solid rgb(220,220,220);
			background-size: 220px 36px;
			background-repeat: no-repeat;
			background-position: 13px 8px;
			background-image: url('../../public/image/footerIcon.png');
			div{
				float: left;
				font-size: 15px;
				margin-left: 18%;
			}
			div:nth-child(2){
				margin-left: 22%;
			}
			div:nth-child(3){
				margin-left: 22%;
			}
		}
	}

	/*侧边栏蒙版*/
	.leftNavMark {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 15;
		background-color: rgba(0,0,0,0.65);
	}
	
	/*顶部蒙版*/
	.mask {
		width: 100%;
		height: 25px;
		background-color: rgb(251,114,153);
	} 
	
	
	
	
	
	
	
	

	








	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.nav-content-enter-active {
	  transition: all .3s ease;
	}
	.nav-content-leave-active {
	  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.nav-content-enter, .nav-content-leave-to {
	  transform: translateX(-100%);
	}


	.nav-mark-enter-active {
	  transition: all .5s ease;
	}
	.nav-mark-leave-active {
	  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.nav-mark-enter, .nav-mark-leave-to {
	  opacity: 0;
	}
</style>