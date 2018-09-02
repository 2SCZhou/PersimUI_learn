function generate2or4(){
	var num = Math.random() * 100;
	return num < 80 ? 2 : 4;
};

function generate0to3(){
	var num = Math.round(Math.random()*3);
	return num;
};

function randonEmpty(arry,num){
	var result = [];
	for(var i = 0;i < num;i++){
		var emptyIndex = Math.floor(Math.random()*(arry.length - i)) + i;
		result.push(arr[emptyIndex]);
		arr[emptyIndex] = arr[i];
	}
	return result;
};

function dimension1to2(num){
	var a = Array(2);
	var y = num % 4;
	var x = (num - y) / 4;
	a[0] = x;
	a[1] = y;
	return a;
};

function dimension2to1(x,y){
	var num = 4 * x + y;
	return num;
};

var page = {
	dir:'null',
	valueArray: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],

	isWin: function(array){
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 4;j++){
				if(this.valueArray[i][j] == 2048)
					return true;
				else
					return false;
			}
		}
	},
	
	isGameover: function(array){
		if(this.isWin)
			return false;
		else{
			for(var i=0;i<4;i++){
       			for(var j=0;j<3;j++){
            		if(this.valueArray[i][j] == this.valueArray[i][j+1]){
                	return false;
            		}
        		}
    		}
    		for(var j=0;j<4;j++){
        		for(var i=0;i<3;i++){
            		if(this.valueArray[i][j] == this.valueArray[i+1][j]){
                	return false;
            		}
        		}
    		}
    		for(var j=0;j<4;j++){
        		for(var i=0;i<4;i++){
            		if(0 == this.valueArray[i][j]){
                	return false;
            		}
        		}
    		}
    		return true;
    	}
	},
	
	addNum: function(array){
		var a = [];
		var b = [];
		var t = 0;
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 4;j++){
				if(array[i][j] == 0){
					a[t] = 4*i + j;
					t++;
				}
			}
		}
		var Index = Math.round(Math.random()*(t-1));
		console.log(a);
		b = dimension1to2(Index);
		console.log('B'+b[0]);
		console.log('B'+b[1]);
		this.valueArray[b[0]][b[1]] = generate2or4()
		this.show(b[0],b[1],this.valueArray[b[0]][b[1]]);
	},
	
	moveLeft: function(array){
		for(var turn = 0;turn < 3;turn++){
    		for (var i = 0; i < 4;i++){
        		for (var j = 0;j < 4;j++){
        			if(j == 0)
        				continue;
		
                	if(array[i][j - 1] == 0){
                    	var temp = array[i][j];
                    	array[i][j - 1] = array[i][j];
                    	array[i][j] = 0;
                	}
                
                	if(array[i][j - 1] == array[i][j]){
                    	array[i][j - 1] *= 2;
                   		array[i][j] = 0;
                	}
            	}
       		}
       	}
       	
       	for(i = 0;i < 4;i++){
			for(j = 0;j < 4;j++)
				this.show(i,j,array[i][j]);
		};   
    },

	moveRight: function(array){
		for(var turn = 0;turn < 3;turn++){
    		for (var i = 3; i >=0;i--){
        		for (var j = 3;j >=0;j--){
        			if(j == 3)
        				continue;
		
                	if(array[i][j + 1] == 0){
                    	var temp = array[i][j];
                    	array[i][j + 1] = array[i][j];
                    	array[i][j] = 0;
                	}
                
                	if(array[i][j + 1] == array[i][j]){
                    	array[i][j + 1] *= 2;
                   		array[i][j] = 0;
                	}
            	}
       		}
       	}
       	
       	for(i = 0;i < 4;i++){
			for(j = 0;j < 4;j++)
				this.show(i,j,array[i][j]);
		};   
    },

	moveUp: function(array){
		for(var turn = 0;turn < 3;turn++){
    		for (var j = 0; j < 4;j++){
        		for (var i = 0;i < 4;i++){
        			if(i == 0)
        				continue;
		
                	if(array[i - 1][j] == 0){
                    	var temp = array[i][j];
                    	array[i - 1][j] = array[i][j];
                    	array[i][j] = 0;
                	}
                
                	if(array[i - 1][j] == array[i][j]){
                    	array[i - 1][j] *= 2;
                   		array[i][j] = 0;
                	}
            	}
       		}
       	}
       	
       	for(i = 0;i < 4;i++){
			for(j = 0;j < 4;j++)
				this.show(i,j,array[i][j]);
		};   
    },

	moveDown: function(array){
		for(var turn = 0;turn < 3;turn++){
    		for (var j = 3; j >=0;j--){
        		for (var i = 3;i >=0;i--){
        			if(i == 3)
        				continue;
		
                	if(array[i + 1][j] == 0){
                    	var temp = array[i][j];
                    	array[i + 1][j] = array[i][j];
                    	array[i][j] = 0;
                	}
                
                	if(array[i + 1][j] == array[i][j]){
                    	array[i + 1][j] *= 2;
                   		array[i][j] = 0;
                	}
            	}
       		}
       	}
       	
       	for(i = 0;i < 4;i++){
			for(j = 0;j < 4;j++)
				this.show(i,j,array[i][j]);
		};   
    },	
	
	show: function(indexX,indexY,labelValue){
		var labelIndex = dimension2to1(indexX,indexY);
		var result = labelValue;
		if(result == 0){
			result = String(result);
			result = '';
		}
		
		switch(labelIndex){
			case 0:
				this.setData({label0:{value:result,refresh:true}});
				break;
				
			case 1:
				this.setData({label1:{value:result,refresh:true}});	
				break;
				
			case 2:
				this.setData({label2:{value:result,refresh:true}});
				break;
				
			case 3:
				this.setData({label3:{value:result,refresh:true}});
				break;
					
			case 4:
				this.setData({label4:{value:result,refresh:true}});
				break;
					
			case 5:
				this.setData({label5:{value:result,refresh:true}});
				break;
					
			case 6:
				this.setData({label6:{value:result,refresh:true}});
				break;
					
			case 7:
				this.setData({label7:{value:result,refresh:true}});
				break;
					
			case 8:
				this.setData({label8:{value:result,refresh:true}});
				break;
					
			case 9:
				this.setData({label9:{value:result,refresh:true}});
				break;
					
			case 10:
				this.setData({label10:{value:result,refresh:true}});
				break;	
				
			case 11:
				this.setData({label11:{value:result,refresh:true}});
				break;
					
			case 12:
				this.setData({label12:{value:result,refresh:true}});
				break;
					
			case 13:
				this.setData({label13:{value:result,refresh:true}});
				break;
					
			case 14:
				this.setData({label14:{value:result,refresh:true}});
				break;
					
			case 15:
				this.setData({label15:{value:result,refresh:true}});
				break;							
		};
	},
	
	onstart: function(e){
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 4;j++){
			this.valueArray[i][j] = 0;
			this.show(i,j,'');
			}
		};
		var x = generate0to3();
		var y = generate0to3();
		var labelValue = generate2or4();
		console.log(x);
		console.log(y);
		console.log(labelValue);
		this.show(x,y,labelValue);
		this.valueArray[x][y] = labelValue;
		console.log(this.valueArray);
	},
		
	direction: function(e){
		console.dir(e);
		this.dir = 'null';
		switch(e.target.id){
			case 'slider1':
				var num = e.detail.value;
				console.log(num);
				if(num >= 50)
					this.dir = 'right';
				else this.dir = 'left';	
				console.log(this.dir);	
				break;
				
			case 'slider2':
				var num = e.detail.value;
				console.log(num);
				if(num >= 50)
					this.dir = 'up';
				else this.dir = 'down';	
				console.log(this.dir);	
				break;
		};
		
		switch(this.dir){
				case 'left':
					if(this.isWin(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else if(this.isGameover(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else{
						this.moveLeft(this.valueArray);
						this.addNum(this.valueArray)
					}
					break;
					
				case 'right':
					if(this.isWin(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else if(this.isGameover(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else{
						this.moveRight(this.valueArray);
						this.addNum(this.valueArray)
					}
					break;
				
				case 'up':
					if(this.isWin(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else if(this.isGameover(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else{
						this.moveUp(this.valueArray);
						this.addNum(this.valueArray)
					}
					break;
					
				case 'down':
					if(this.isWin(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else if(this.isGameover(this.valueArray)){
						//this.setData({label20:{value:'Win',refresh:true}});
						return;
					}
					else{
						this.moveDown(this.valueArray);
						this.addNum(this.valueArray)
					}
					break;					
		};

	},

};

Page(page);
