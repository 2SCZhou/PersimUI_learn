var page = {
	data: {timer1:0},
	
	onLoad: function(data){
		this.data.timer1 = setTimeout(function()
		{
			pm.navigateTo({url:'page3/page3'});
		},	2000);
	}
};

Page(page);