var json_obj = 0;

var page = {
	data:{time1:0},
	
	onLoad: function (data){
        var thiz = this;
        this.data.timer1 = setInterval(function()
        {
            console.log('timer1 timeout');
            thiz.getTimeInfo();
        }, 1000);
         
		this.setData({listctrl1 : { page : this,
                           		    xml  : 'Panels/CustomPanel1',
                           		    items: [{imagebox1 : "wether.png", button1 : {id:'weather',value:'Weather Forecast'}},
                           		            {imagebox1 : "today.png", button1 : {id:'today',value:'Today in History'}},
                           		            {imagebox1 : "huangli.png", button1 : {id:'huangli',value:'Old HuangLi'}},
                           		    		]}});        
    },
    
    cusBtn: function(e){ 
    	switch(e.target.id){
    		case 'weather':
    			pm.navigateTo({url : 'page3/page3'});
    			break;		
    		case 'today':
    			pm.navigateTo({url : 'page4/page4'});
    			break;
    		case 'huangli':
    			pm.navigateTo({url : 'page5/page5'});
    			break;
    	}
    },
       
	getTimeInfo: function(e) {
		var thiz = this;
		var rq1 = pm.request({
		url: 'http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json', 	//开发者服务器接口地址
		method : 'GET',						//请求方式
		header:{								//设置请求的header
			 "Content-Type":"application/json"
		},
		success: function(res) {              //与开发者服务器连接成功后，执行的回调函数
			     var str = 0;
				 console.log('request success'),
			     console.log(res.data.toString('utf8')),	//从开发者服务器收到的数据,data的类型是Buffer，可以通过指定API转换成我们需要的编码格式
				 console.log(res.statusCode),       //从开发者服务器收到的状态码
				 console.dir(res.header),           //从开发者服务器收到的header
				 str = res.data.toString('utf8');
				 json_obj = JSON.parse(str);
				 thiz.setData({label2: { value : json_obj.result.datetime_1 , refresh : true}})
			  },
			  complete: function(){                 //当http request操作完成后，执行的回调函数，无论连接成功还是失败都会执行
				console.log('request complete');  
			  },
			  fail: function(){                     //与开发者服务器连接失败后，执行的回调函数
				console.log('request failed');
			  }
			});
	}
};

Page(page);
