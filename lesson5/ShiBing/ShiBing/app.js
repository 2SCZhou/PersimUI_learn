var app = {
page : "page1/page1",
serialData: '',
i : 2,

onLaunch: function (event)  //app���ػص�����
{
    console.log('app onLaunch');
    uart = pm.openSerialPort({device: "uart5"});    //�򿪴����豸uart5
    if (uart)
    {
        console.log('pm.openSerialPort OK');
        uart.write(Buffer("Please enter the date(e.g. 2018-01-01)\n", 'ascii'));     //���ڷ������ݣ�һ��ascii�ַ�������BUFF
        uart.onData(this.onUart, this);     //���ô��ڽ��պ���Ϊ onUart 
              
    }
},

getWeatherInfo: function(serialData) {
	var thiz = this;
	var rq1 = pm.request({
	url: 'http://api.seniverse.com/v3/weather/daily.json?key=hfvxxp7oq0w4dmso&location=shanghai&language=zh-Hans&unit=c&start=0&days=5', 	//�����߷������ӿڵ�ַ
	method : 'GET',						//����ʽ
	header:{								//���������header
		"Content-Type":"application/json"
	},
	success: function(res) {              //�뿪���߷��������ӳɹ���ִ�еĻص�����
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
	complete: function(){                 //��http request������ɺ�ִ�еĻص��������������ӳɹ�����ʧ�ܶ���ִ��
		console.log('request complete')  
		},
	fail: function(){                     //�뿪���߷���������ʧ�ܺ�ִ�еĻص�����
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
