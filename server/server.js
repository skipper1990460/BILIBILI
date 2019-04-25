var express = require('express');//express框架模块
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var formidable = require('formidable');

//------------------解析post请求中数据内容
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

app.set('port',process.env.PORT || 8081);

// --------------------跨域处理
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
    else
      next();
});
// --------------------

var listRecommend = [];
var listPopular = [];
var UserMessage = [];
var avList = [];
var flag = false;

//数据库基本信息
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'BILI'
});

connection.connect();

	//SQL查询语句---------------------1.推荐列表数据
function RecommendQuery(){
	var sql = 'SELECT* FROM ' + 'homerecommend';

	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		return listRecommend = result;
	});
};

//SQL查询语句---------------------2.热门列表数据
function PopularQuery(){
	var sql = 'SELECT* FROM ' + 'homepopular';

	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		return listPopular = result;
	});
};


//SQL查询语句---------------------3.用户登录
function UserQuery(userAdmin,userPassword){
	var sql = "SELECT* FROM user WHERE UserAdmin = '"+ userAdmin +"' AND UserPassword = '"+ userPassword + "'";
	
	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		let List = '';
		let obj = result[0];
		for(let i in obj){
		List += obj[i] + ',';
		}
		List = List.substr(0, List.length - 1); 
		// console.log(List);
		UserMessage = [];
		return UserMessage = List;
	});
}


//SQL查询语句---------------------4.用户数据注册
function UserRegister(userAdmin,userPassword){
	//插入数据至数据库
	var sql = "INSERT INTO `bili`.`user`(`UserAdmin`, `UserPassword`, `UserName`, `UserImgUrl`, `UserB`, `UserCoin`, `UserDynamic`, `UserFollow`, `UserFans`) VALUES ('"+ userAdmin +"', '"+ userPassword +"', 'B站新用户', 'image/defaultUser.jpg', 0, 0, 0, 0, 0)";
	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		console.log('注册成功');
	});
}

//SQL查询语句---------------------5.用户昵称更改
function ChangeUserName(userAdmin,userName){
	//修改数据至数据库
	var sql = "UPDATE user SET UserName = '"+ userName +"' WHERE UserAdmin = '" + userAdmin + "'";
	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//成功更改数据
		console.log('修改成功!');
		return flag = true;
	});
}

//SQL查询语句---------------------6.用户头像更改
function ChangeUserImg(userAdmin,userImgUrl){
	//插入数据至数据库
	var sql = "UPDATE user SET UserImgUrl = '"+ userImgUrl +"' WHERE UserAdmin = '" + userAdmin + "'";
	console.log(sql);
	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		console.log('修改成功!');
	});
}

//SQL查询语句---------------------7.视频全部数据查询
function AVQuery(min,max){
	var sql = ' SELECT * FROM ' + ' av ' + ' limit ' + min +', 10';

	//执行
	connection.query(sql,function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		//查询成功获取数据
		return avList = result;
	});
};

//SQL查询语句---------------------8.用户是否已存在
function GetVerificationCode(userAdmin){
	var sql = "SELECT* FROM user WHERE UserAdmin = '"+ userAdmin +"'";
	connection.query(sql,function(err,result){
		// console.log(result.length);
		if(result.length == 0 ){
			console.log(result.length);
			return flag = true;
		}else{
			return false;
		}
	});
}



//1.发送推荐数据接口
app.get('/api/Recommend',function(req,res){
	//返回首页推荐列表数据
	
	const promise = new Promise ((resolve,reject)=>{
		RecommendQuery();
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			res.json(listRecommend);
		},100)
	})
});

//2.发送热门数据接口
app.get('/api/Popular',function(req,res){
	//返回首页热门列表
	const promise = new Promise ((resolve,reject)=>{
		PopularQuery();
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			res.json(listPopular);
		},100)
	})
});

//3.数据接口获取验证码
app.post('/post/VerificationCode',function(req,res){
	//检验账号是否已经存在
	const promise = new Promise ((resolve,reject)=>{
		GetVerificationCode(req.body.userAdmin);
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			//不存在则生成随机码
			if (flag) {
				var arr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
				for(var i=0;i<arr.length;i++){
					var end = arr.length - 1 ;
					var index = (Math.random()*(end + 1)) >> 0;
					var t = arr[end];
					arr[end] = arr[index];
					arr[index] = t;
				}
				return res.send(arr.slice(0,6));
			}else{
				return res.send('用户已存在');
			}
		},100)
	})
	
});

//4.登录接口
app.post('/post/Login', function (req, res) {
	//数据库查询
	const promise = new Promise ((resolve,reject)=>{
		UserQuery(req.body.userAdmin,req.body.userPassword);
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			res.send(UserMessage);
		},100)
	})
	
});

//5.注册接口
app.post('/post/Register', function (req, res) {
	//插入数据
	
	//查询是否插入
	
	// console.log(UserMessage);
	
	
	const promise = new Promise ((resolve,reject)=>{
		UserRegister(req.body.userAdmin,req.body.userPassword);
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			UserQuery(req.body.userAdmin,req.body.userPassword);
			return Promise.resolve();
		},50);
	}).then(()=>{
		setTimeout(()=>{
			res.send(UserMessage);
		},50);
	})
});


//6.图片上传接口
app.post('/post/GetImg', function (req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = "../image/temp/"; //改变临时目录
	form.parse(req, function(error, fields, files) {
		
		var userAdmin = Object.keys(files)[0];
		console.log("上传者: "+Object.keys(files)[0]);
		
		for (var key in files) {
			var file = files[key];
			var fName = userAdmin;
			// var fName = (new Date()).getTime();
			switch (file.type) {
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/png":
					fName = fName + ".png";
					break;
				default:
					fName = fName + ".jpg";
					break;
			}
			var uploadDir = "image/" + fName;
			ChangeUserImg(userAdmin,uploadDir);
			
			uploadDir = "../image/" + fName;
			fs.rename(file.path, uploadDir, function(err) {
				if (err) {
					res.write(err + "\n");
					res.end();
				}
				res.write("<img src='/upload/" + fName + "' />");
				res.end();
			})
		}
	});
});

//7.修改用户昵称接口
app.post('/post/changeName', function (req, res) {
	// console.log(req.body.userAdmin,req.body.userName);
	//插入数据
	//查询是否插入
	const promise = new Promise ((resolve,reject)=>{
		ChangeUserName(req.body.userAdmin,req.body.userName);
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			res.send(flag);
		},100)
	})
});

//8.发送视频数据接口
app.post('/api/AVdata',function(req,res){
	//返回首页热门列表
	const promise = new Promise ((resolve,reject)=>{
		AVQuery(req.body.min);
		resolve();
	}).then(()=>{
		setTimeout(()=>{
			res.send(avList);
		},100)
	})
});



//监听端口
app.listen(8081, function(){
	console.log('原始数据接口 http://localhost:' + '8081');
});