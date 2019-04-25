<template>
	<div class="container">
		<div ref="scrollBox">
			<div class="cards" v-for="item in this.AVList">
				<div class="cardImg" :key="item.vdHref"  @click="goVideo(item.vdHref)">
					<img src='public/image/02.jpg'>
					<div>
						<span class="glyphicon glyphicon-expand"></span>
						<span>{{ videoPut(item.vdVideoView) }}</span>
						<span class="glyphicon glyphicon-edit"></span>
						<span>{{ item.vdBarrage }}</span>
						<span class="right">{{ item.vdLongTime }}</span>
					</div>
				</div>
			
				<div class="cardContent">
					<p class="title">{{ TitlePut(item.vdTitle) }}</p>
					<p class="content">
						<span class="left">{{ item.vdType }}</span>
						<span class="glyphicon glyphicon-option-vertical right"></span>
					</p>
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
				AVList: [],
				IndexNext: 0,
				clientHeight: 0,
			}
		},
		methods: {
			// 如果title过长
			TitlePut(title){
				if (title.length>=17) {
					title = title.substr(0, 16) + '...'
				}
				return title;
			},
			videoPut(vdVideoView){
				return vdVideoView > 10000 ? (vdVideoView/10000)+'万' : vdVideoView
			},
			goVideo(index){
				this.$router.push({path:'/Video/'+index});
			},
			//当屏幕卷曲数值达到预定值触发加载更多
			handleScroll () {
				//获取屏幕可视高度clientHeight
				this.getClientHeight();
				//获取屏幕卷曲高度scrollTop
			  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//获取预定值IndexNext
				this.IndexNext = (125+50)+970*(this.AVList.length/10) - this.clientHeight;
				//如果达到预定值
			  if (scrollTop >= this.IndexNext) {
					console.log('active');
					console.log(this.IndexNext);
					//触发GetAv方法，加载更多
					this.GetAv();
					//将min与max分别+10，获取之后的数据
			  };
			},
			//获取设备可视高度  内容总高度为 125px+970*x/10+50px  减去设备屏幕高度，剩余即为卷曲高度
			getClientHeight() {
				this.clientHeight = 0;
				if(document.body.clientHeight && document.documentElement.clientHeight) {
					this.clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				} else {
					this.clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				}
			},
			//发送请求，获取数据
			GetAv(){
				var num = Math.random();//Math.random()：得到一个0到1之间的随机数
				num = Math.ceil(num * 450);//num*80的取值范围在0~80之间,使用向上取整
				let data = {"min": num };
				axios.post('http://localhost:8081/api/AVdata',data)
				  //then获取成功；response成功后的返回值（对象）
				.then(response=>{
				  // (this.AVList).push(response.data);
					this.AVList = [...(this.AVList), ...(response.data)];
				})
				  //获取失败
				.catch(error=>{
				  console.log(error);
				  alert('网络错误，不能访问');
				})
			},
		},
		mounted () {
			//监听屏幕滚动事件，触发handleScroll方法
		  window.addEventListener('scroll', this.handleScroll)
		},
		beforeCreate() {
		},
		created(){
			this.GetAv();
	  },
	}
</script>

<style scoped>
	/*主体*/
	.container {
		width: 100%;
		padding: 0 12px 50px 12px;
	}

	/*卡片*/
	.cards {
		width: 47%;
		height: 184px;
		margin: 5px;
		float: left;
		border-radius: 8px;
		background-color: rgb(255,255,255);
		border: 1px solid rgb(236,236,236);
	}

	/*右浮卡片*/
	.right_card {
		float: right;
	}

	/*图片主体*/
	.cardImg {
		width: 100%;
		height: 57%;
		overflow: hidden;
		position: relative;
	}
	/*图片*/
	.cardImg img{
		width: 110%;
	}
	/*图片信息*/
	.cardImg>div{
		width: 100%;
		height: 16px;
		position: absolute;
		bottom: 4px;
		padding-right: 6px;
		line-height: 16px;
	}
	/*图片字体设置*/
	.cardImg>div span {
		height: 14px;
		padding: 0;
		font-size: 12px;
		margin:0 0 0 6px;
		color: rgb(255,255,255);
	}
	/*内容主体*/
	.cardContent {
		width: 100%;
		height: 42%;
		color: #333;
		padding:8px 10px;
		font-size: 12px;
		line-height: 17px;
		position: relative;
	}

	/*卡片title部分字体颜色*/
	.cardContent p{
		color: #333;
	}

	/*卡片左侧便签*/
	.cardContent .content{
		width: 90%;
		position: absolute;
		bottom: 0;
		padding: 0;
	}
	/*卡片三个小图标*/
	.cardContent span{
		height: 11px;
		font-size: 12px;
		color: rgb(152,152,152);
	}
</style>