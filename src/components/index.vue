<template>
	<div class="app">

		<!-- 路由视图 -->
		<router-view></router-view>
		
		<!-- 底部导航栏 -->
		<div class="nav">
			<router-link @click.native="activeing(0)" :class="{selection:index == 0}" class="col-xs-3" tag="div" to="/Home">
				<span class="glyphicon glyphicon-home"></span>
				<p>首页</p>
			</router-link>
			<router-link @click.native="activeing(1)" :class="{selection:index == 1}" class="col-xs-3" tag="div" to="/Channel">
				<span class="glyphicon glyphicon-calendar"></span>
				<p>频道</p>
			</router-link>
			<router-link @click.native="activeing(2)" :class="{selection:index == 2}" class="col-xs-3" tag="div" to="/Dynamic">
				<span class="glyphicon glyphicon-dashboard"></span>
				<p>动态</p>
			</router-link>
			<router-link @click.native="activeing(3)" :class="{selection:index == 3}" class="col-xs-3" tag="div" to="/MemberPurchase">
				<span class="glyphicon glyphicon-briefcase"></span>
				<p>会员购</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'theIndex',
		data() {
			return {
				index: 0
			}
		},
		methods:{
			activeing: function(p){
				return this.index = p;
			}
		}
	} 

</script>

<style scoped lang="less">

	/*底部导航栏*/
	.nav	{
		width: 100%;
		height: 50px;
		font-size: 10px;
		text-align: center;
		color: rgb(117,117,117);
		background-color: rgb(255,255,255);
		border-top: 2px solid rgb(231,231,231);
		position: fixed;
		bottom: -1px;
		div {
			line-height: 50px;
			position: relative;
			&:nth-child(2) span{
				left: 33px;
			}
			&:nth-child(3) span{
				left: 33px;
			}
			&:nth-child(4) span{
				left: 34px;
			}
			&:nth-child(4) p{
				left: 27px;
			}
			p{
				position: absolute;
				left: 30px;
				bottom: -69px;
				font-size: 12px;
			}
			span{
				position: absolute;
				left: 30px;
				top: 5px;
				font-size: 20px;
			}
		}
		/*底部被选中时*/
		.selection{
			span{
				color: rgb(251,114,153);
			}
			p{
				color: rgb(251,114,153);
			}
		}
	}
</style>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		letter-spacing: 1px;
	}
	body {
		background-color: rgb(244,244,244);
	}
	.left {
		float: left;
	}
	.right {
		float: right;
	}

	/*清除浮动*/
 .clearfloat:after{
 		display: block;
 		clear: both;
 		content: "";
 		visibility: hidden;
 		height: 0;
 	}
</style> 