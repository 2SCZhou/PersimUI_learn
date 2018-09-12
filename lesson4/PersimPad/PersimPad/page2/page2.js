var page = {
    onbutton: function(e)
    {
        switch(e.target.id){
           case "button1":
               pm.navigateTo({url: "page3/page3"});
               break;
           case "button2":
               pm.navigateTo({url: "page4/page4"});
               break;
           case "button3":
               pm.navigateTo({url: "page4/page4"});
               break;
           case "button4":
               pm.navigateBack();
               break;
           case "button5":
               pm.navigateTo({url: "page6/page6"});
               break;  
           case "button6":
               pm.navigateTo({url: "page7/page7"});
               break;  
        }      
    }
};

Page(page);
