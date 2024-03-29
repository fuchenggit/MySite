// JavaScript Document<script type="text/javascript">
// <![CDATA[
	var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds(); 
    var weekday={0:'星期日',1:'星期一',2:'星期二',3:'星期三',4:'星期四',5:'星期五',6:'星期六'};
    h=h>12?(h-12)*5+parseInt(m/12):h*5+parseInt(m/12); //时针 初始位置
    //=====================================
    var x=200,y=200,sAngle=0; //x y 原点 秒针角度变量

    function draw()
	{
    	var c=document.getElementById("myCanvas");
    	var ctx=c.getContext("2d");
     	ctx.clearRect(0,0,c.width,c.height);
     	s++;//秒针

     	//背景
    	ctx.fillStyle = '#eee'       // Make changes to the settings  
    	ctx.globalAlpha = 0.8; 

    	ctx.fillRect(0,0,c.width,c.height);   // Draw a rectangle with new settings  

		//===填充(表明)原点===
		ctx.beginPath();
		ctx.arc(x,y,4,8,true);
		ctx.fill();
		ctx.closePath();

		var grd=ctx.createLinearGradient(x,y,50,350);
		grd.addColorStop(0,"#FF0000");
		grd.addColorStop(0.5,"#00FF00");
		grd.addColorStop(1,"#0000FF");
		ctx.fillStyle=grd;
		ctx.font = "20pt Arial"; 
		ctx.fillText("html5",50,350);
		ctx.save();

    	// 时间刻度
    	for(var i=0;i<60;i++)
		{
         	var angle=(Math.PI*2)/60;
         	ctx.beginPath();
         	var b=i==0||i==15||i==30||i==45 
         	if(i%5==0){
             	if(b){
              		ctx.fillStyle="red";
              		radius=6;
             	}
				else{
              		ctx.fillStyle="blue";
              		radius=4.5;
             	}
         		ctx.font="12px Arial";
         		ctx.fillText(i/5==0?12:i/5,x-5,y-80); //x大-右 小-左 y大小 数字刻度
         	}
			else
			{
         		ctx.fillStyle="#000";
             	radius=2;
         	}

         	if(s==i)radius=radius+1;
         	ctx.arc(x,y-100,radius,10,true);
         	ctx.fill();
         	transform(ctx,x,y,angle,true);                
     	}
     	ctx.restore();

     	//==========================
     	sAngle=(Math.PI*2)/60*s; //秒度
     	ctx.save(); //时针
     	ctx.fillStyle="red";
		//   ctx.strokeStyle="red";
     	ctx.lineWidth=2;
     	transform(ctx,x,y,(Math.PI*2)/60*h,true); 
     	sj(ctx,x,y,x-8,y-30,x+8,y-45);
     	ctx.restore();

		 ctx.save();//分针转动
		 ctx.fillStyle="blue";
		 ctx.lineWidth=2;
		 transform(ctx,x,y,(Math.PI*2)/60*m,true); 
		 sj(ctx,x,y,x-10,y-50,x+10,y-65);
		 ctx.restore();

		 //秒针转动
		 ctx.save();
		 ctx.fillStyle="#000";
		 transform(ctx,x,y,sAngle,true);  
		 sj(ctx,x,y,x-5,y-70,x+5,y-80);
		 ctx.restore();  

     	//数据整理
    	if(s%60==0){
			sAngle=0,s=0,m++;
        	if(m%12==0){ //每十二分 时针旋转一次
            	if(m!=0)h++;
            	if(m%60==0)m=0;
        	}
     		if(h%60==0)h=0;    
    	};   
		//*注:如果是放到外面 判断分针或时针转动 则满足条件时 都重复会运行 原因 每执行一遍 只有秒针 在时刻变动  *//

     	var dateString=time.getFullYear()+"年"+(time.getMonth()+1)+"月"+time.getDate()+"日 "+weekday[time.getDay()]+" h:"+time.getHours()+" m:"+m+" s:"+s;
     	document.getElementById("d").innerHTML=dateString;
 	}

 
 	//指针三角!
 	function sj(ctx,x,y,x1,y1,x2,y2){
		//====例====
	
		//     ctx.beginPath();
		//     ctx.moveTo(x,y);
		//     ctx.lineTo(x,y-30);
		//     ctx.stroke();
		//     ctx.beginPath();
		//    
		//     ctx.moveTo(x-10,y-30);
		//     ctx.lineTo(x+10,y-30);
		//     ctx.lineTo(x,y-30-10);
		//     ctx.fill();

     	ctx.beginPath();
     	ctx.moveTo(x,y);
     	ctx.lineTo(x,y1);
     	ctx.stroke();
     	ctx.beginPath();
     	ctx.moveTo(x1,y1);
     	ctx.lineTo(x2,y1);
     	ctx.lineTo(x,y2);
     	ctx.fill();
 	}

 //据坐标旋转

 	function transform(ctx,x,y,angle,b){
  		if(b){// 顺时针
     		ctx.transform(Math.cos(angle), Math.sin(angle), 
        	-Math.sin(angle), Math.cos(angle), 
        	x*(1-Math.cos(angle)) + x*Math.sin(angle), 
      	 	y*(1-Math.cos(angle)) - y*Math.sin(angle))
     	}
  	}

	//=====每秒执行============(执行事件自选)
	window.setInterval(function(){draw()},1000);
	// window.onload=function(){ //效果同上
	// setInterval("draw()",1000);
	// };
	// ]]>