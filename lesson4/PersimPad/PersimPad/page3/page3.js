var page = {
	data:{result: ''},
	op: 'null',
	left:0,
	
	onButton: function(e){
		var result = this.data.result;
		console.dir(e);
		
		switch(e.target.id){
			case "num0":
			case "num1":
			case "num2":
			case "num3":
			case "num4":
			case "num5":
			case "num6":
			case "num7":
			case "num8":
			case "num9":
			
				var num = e.target.id.substring(3,4); //To get the number from the string
				console.log(num);
				
				if(result != '0') 
					result += num;
				else result = num;
				this.setData({label1:{value:result,refresh:true}}); 
				break;
			
			case "button1":
				pm.navigateBack();
				break;
			
			case "numdot":
				if(result.indexOf(".") > 0) break;
				else if(result.length == 0) result = "0";
				else result += ".";
				this.setData({label1:{value:result,refresh:true}});
				break;
				
			case "btnback":
				if (result.length == 1) result = '';
				else result = result.substring(0, result.length - 1);
				this.setData({label1:{value:result,refresh:true}});
				break;
			
			case "btnDiv":
				if (result != '') {
					this.op = "div";
					this.left = Number(result);
					result = '';
					}
				break;
				
			case "btnMul":
				if (result != '') {
					this.op = "mul";
					this.left = Number(result);
					result = '';
					}
				break;
			
			case "btnSub":
				if (result != '') {
					this.op = "minus";
					this.left = Number(result);
					result = '';
					}
				break;
				
			case "btnAdd":
				if (result != '') {
					this.op = "plus";
					this.left = Number(result);
					result = '';
					}
				break;
				
			case "btnClear":
				result = '';
				this.setData({label1:{value:result,refresh:true}});
				break;
				
			case "btnEqu":
				if (this.op == 'null') break;
				switch(this.op){
					case 'div':
						var num = Number(result);
						if (num == 0) result = 'SyntaxError'; //Show SyntaxError instead of '0'
						
						/*
						 * The process changed below aims that you can get a right result.
						 */
						else{
							result = this.left / num;
							result = result.toFixed(3);
							this.setData({label1:{value:result,refresh:true}});
						}
						break;
						
					case 'mul':
						result = this.left * Number(result);
						
						/*
						 * Transform the result into string firstly,so you can retrieve the '.' from it. 
						 */
						result = String(result);
						if(result.indexOf('.') > 0)
							result = Number(result).toFixed(3);
						else
							result = Number(result);
						this.setData({label1:{value:result,refresh:true}});
						break;
					
					case 'minus':
						result = this.left - Number(result);
						result = String(result);
						if(result.indexOf('.') > 0)
							result = Number(result).toFixed(3);
						else
							result = Number(result);
						this.setData({label1:{value:result,refresh:true}});
						break;
						
					case 'plus':
						result = this.left + Number(result);
						result = String(result);
						if(result.indexOf('.') > 0)
							result = Number(result).toFixed(3);
						else
							result = Number(result);
						this.setData({label1:{value:result,refresh:true}});
						break;
				}		
			this.left = 0;
			result = String(result);
			result = '';   //You will get a new empty input block when you begin a new turn 
			this.op = 'null';
			break;
		}
			
			if (this.data.result != result) {
			this.data.result = result;
			this.setData({ result: { value: this.data.result, refresh: true } });
		}	
	},	
};

Page(page);