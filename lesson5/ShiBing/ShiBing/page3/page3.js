var json_obj = 0;
var	temp_max = [];

var page = {
	onLoad: function(){
		this.getWeatherInfo();
	},
	
	onBtn: function(e){
		pm.navigateBack();
	},
	
	draw: function(data){
		var index = 0;
		var thiz = this;
		var context = pm.createCanvasContext('Canvas1', thiz)           //获取画布对象
		if (context)
		{
    		var max = 0;

    		for( index = 0; index < data.length; index++ )
    		{
        		max = data[index] > max ? data[index] : max;
    		}

    		max = Math.floor(max / 3);

    		/* 画横纵坐标刻度 */
    		context.setStrokeStyle('black') //设置边框颜色
    		context.setTextBaseline('middle')         //设置文本绘制纵坐标对齐方式
    
    		for( index = 0; index < 4; index++ )
    		{
        		var y = 30 + index * 50;
        		var value = max * (4 - index);
        		/*纵坐标刻度*/
        		context.moveTo(55, y)
        		context.lineTo(60, y)
        		context.fillText(value.toString(), 20, y)
    		}
    
    		context.moveTo(55, 30 + index * 50)
    		context.lineTo(60, 30 + index * 50)
    		context.fillText('0', 20, 30 + index * 50)

    		context.moveTo(60, 30)
    		context.lineTo(60, 30 + index * 50)
	
    		context.moveTo(60, 30 + index * 50)
    		context.lineTo(60 + 3 * 100 + 10, 30 + index * 50)

    		context.setTextAlign('center')  //设置文本绘制横坐标对齐方式

    		for( index = 1; index <= 3; index++ )
    		{
        		var x = 60 - 14 + index * 100;
        		/*横坐标刻度*/
        		context.moveTo(x, 230)
        		context.lineTo(x, 235)
        		switch(index){
        			case 1:
        			context.fillText('Jin', x, 245);
        			break;
        		case 2:
        			context.fillText('Ming', x, 245);
        			break;
        		case 3:
        			context.fillText('Hou', x, 245);
        			break;		
        		}    
    		}
    
    		context.setTextAlign('left')    //设置文本绘制横坐标对齐方式
    		context.stroke()
    		context.closePath();

    		/* 画折线 */
    		context.beginPath();
    		context.setStrokeStyle('#0094FF')
    		context.setLineWidth(2)        //设置线条宽度
			var dot_x = [];
			var dot_y = [];
	
    		for( index = 0; index < data.length; index++ )
    		{
        		var x = 60 - 14 + 100 + index * 100;
        		var y = data[index] * 200 / (max * 4)
				dot_x[index] = x;
				dot_y[index] = 230 - y;
    		}
    
    		context.setFillStyle('red');
    		context.fillRect(dot_x[0]-5,dot_y[0]-5,10,10);
    		context.moveTo(dot_x[0],dot_y[0]);
    		context.lineTo(dot_x[1], dot_y[1]);
    		context.fillRect(dot_x[1]-5,dot_y[1]-5,10,10);
    		context.moveTo(dot_x[1], dot_y[1]);
    		context.lineTo(dot_x[2], dot_y[2]);
    		context.fillRect(dot_x[2]-5,dot_y[2]-5,10,10);
    
    		context.stroke();
    		context.closePath();
    		context.draw();
		}
	},
	
	
	getWeatherInfo: function(e) {
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
			     console.log(res.data.toString('utf8'));	//从开发者服务器收到的数据,data的类型是Buffer，可以通过指定API转换成我们需要的编码格式
				 console.log(res.statusCode);       //从开发者服务器收到的状态码
				 console.dir(res.header);           //从开发者服务器收到的header
				 str = res.data.toString('utf8');
				 json_obj = JSON.parse(str);
				 temp_max[0] = json_obj.results[0].daily[0].high;
				 temp_max[1] = json_obj.results[0].daily[1].high;
				 temp_max[2] = json_obj.results[0].daily[2].high;
				 thiz.draw(temp_max);
				 
				 thiz.setData({label3: { value : json_obj.results[0].daily[0].text_day , refresh : true}});
				 thiz.setData({label5: { value : json_obj.results[0].daily[0].high , refresh : true}});
				 thiz.setData({label7: { value : json_obj.results[0].daily[0].low , refresh : true}});
				 thiz.setData({label9: { value : json_obj.results[0].daily[0].wind_direction , refresh : true}});
				 thiz.setData({label11: { value : json_obj.results[0].daily[0].wind_scale , refresh : true}});
			  },
			  complete: function(){                 //当http request操作完成后，执行的回调函数，无论连接成功还是失败都会执行
				console.log('request complete')  
			  },
			  fail: function(){                     //与开发者服务器连接失败后，执行的回调函数
				console.log('request failed')
			  }
			});
	}
};

Page(page);
