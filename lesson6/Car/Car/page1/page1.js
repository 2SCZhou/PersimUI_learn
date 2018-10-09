var page = {
	data: {timer1:0},
	
	onLoad: function(data){
		this.data.timer1 = setTimeout(function()
		{
			pm.navigateTo({url:'page2/page2'});
		},	2500);
	}
};

Page(page);
