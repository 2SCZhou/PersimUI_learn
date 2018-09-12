var page = {
	data: {timer1:0,timer2:0,timer3:0},
	onbutton: function(e){
		var thiz = this
		this.data.timer1 = setTimeout(function()
		{
			thiz.setData({label1:{value:'Welcom Commander',refresh:true}});
		},  1000);

		this.data.timer2 = setTimeout(function()
		{
			thiz.setData({label1:{value:'',refresh:true}});
		},  1999);

		this.data.timer3 = setTimeout(function()
		{
			pm.navigateTo({url: "page2/page2"});
		},  2000);
	}
};

Page(page);
