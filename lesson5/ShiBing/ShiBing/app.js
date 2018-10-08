var app = {
page : "page1/page1",
serialData: '',
i : 2,

onLaunch: function (event)  //app加载回调函数
{
    console.log('app onLaunch');
    uart = pm.openSerialPort({device: "uart5"});    //打开串口设备uart5
    if (uart)
    {
        console.log('pm.openSerialPort OK');
        uart.write(Buffer("Please enter the date(e.g. 2018-01-01)\n", 'ascii'));     //串口发送数据，一个ascii字符串数据BUFF
        uart.onData(this.onUart, this);     //设置串口接收函数为 onUart 
              
    }
},

getWeatherInfo: function(serialData) {
	var thiz = this;
	var rq1 = pm.request({
	url: 'http://api.seniverse.com/v3/weather/daily.json?key=hfvxxp7oq0w4dmso&location=shanghai&language=zh-Hans&unit=c&start=0&days=5', 	//开发者服务器接口地址
	method : 'GET',						//请求方式
	header:{								//设置请求的header
		"Content-Type":"application/json"
	},
	success: function(res) {              //与开发者服务器连接成功后，执行的回调函数
		var str = 0;
		console.log('request success');
		
		str = res.data.toString('utf8');
		json_obj = JSON.parse(str);
		
		switch(serialData){
			case json_obj.results[0].daily[0].date:
				var buf = json_obj.results[0].daily[0].date + '\r\n' + 'Max temperature:' + json_obj.results[0].daily[0].high + '\r\n' + 'Min temperature:' + json_obj.results[0].daily[0].low + '\r\n';
				uart.write(Buffer(buf, 'ascii')); 
				break;
			case json_obj.results[0].daily[1].date:
				var buf = json_obj.results[0].daily[1].date + '\r\n' + 'Max temperature:' + json_obj.results[0].daily[1].high + '\r\n' + 'Min temperature:' + json_obj.results[0].daily[1].low + '\r\n';
				uart.write(Buffer(buf, 'ascii'));
				break;
			case json_obj.results[0].daily[2].date:
				var buf = json_obj.results[0].daily[2].date + '\r\n' + 'Max temperature:' + json_obj.results[0].daily[2].high + '\r\n' + 'Min temperature:' + json_obj.results[0].daily[2].low + '\r\n';
				uart.write(Buffer(buf, 'ascii'));
				break;								
			default:
				console.log('Date Error!');
				uart.write(Buffer('Please enter the date from today to the day after tomorrow.\n', 'ascii'));
				break;
			}
		},
	complete: function(){                 //当http request操作完成后，执行的回调函数，无论连接成功还是失败都会执行
		console.log('request complete')  
		},
	fail: function(){                     //与开发者服务器连接失败后，执行的回调函数
		console.log('request failed')
		}
	});
},

onUart: function(data)
{	
	this.serialData += data.toString('ascii');
	this.i--;
	if(this.i == 0)
	{
		console.log(this.serialData);
		this.getWeatherInfo(this.serialData);
		this.i = 2;
		this.serialData = '';	
	}
}

};
App(app);
