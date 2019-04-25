//公共方法
import axios from 'axios';
export default{
	LoginVerification(){
		if(localStorage.userStr){
			var str = localStorage.userStr;
			var arr = (str).split(',');
			//发送post请求获取用户信息
			var data = {"userAdmin":arr[0],"userPassword":arr[1]};
			axios.post('http://localhost:8081/post/Login',data)
			.then(response=>{
				if(response.data.length == 0){
					console.log('效验失败!');
				};
				if(localStorage.userStr != response.data){
					console.log(localStorage.userStr);
					arr = [];
					str = '';
					// localStorage.clear();
					console.log('正在更新!');
					localStorage.userStr = response.data;
					console.log(localStorage.userStr);
					return true;
				};
			})
			//获取失败
			.catch(error=>{
				console.log(error);
				console.log('网络错误，不能访问');
			});
		};
	}
}