var page = {
	onLoad : function(e) 
	{
		console.log("add item!");
		console.dir(this);
		
		this.setData({listctrl1 : { page : this,
                           		    xml  : 'Panels/CustomPanel1',
                           		    items: [{imagebox1 : "wifi.png", label1 : {value:'WLAN',refresh:true}},
                           		    		{imagebox1 : "power.png", label1 : {value:'Power Mode',refresh:true}},
                           		    		{imagebox1 : "sd.png", label1 : {value:'Storage',refresh:true}},
                           		    		{imagebox1 : "sound.png", label1 : {value:'Sound',refresh:true}},
                           		    		{imagebox1 : "light.png", label1 : {value:'Screen Light',refresh:true}},
                           		    		{imagebox1 : "ble.png", label1 : {value:'Bluetooth',refresh:true}},]}});
	},

    onbutton: function(e)
    {
        switch(e.target.id){
           case "button1":
               pm.navigateBack();
               break;
        }      
    }
};

Page(page);
