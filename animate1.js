
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var left=document.getElementById('left');
var right=document.getElementById('right');
var index=1;
function next(){
index++;
animate(top2,{left:-800*index},function(){

	if(index===5){
		top2.style.left="-800px";
		index=1;
	}
});
}
function qian(){
index--;
animate(top2,{left:-800*index},function() {
	if (index===0) {
		top2.style.left="-4000px";
		index=5;
	}
});
}
right.onclick=next;
left.onclick=qian;
