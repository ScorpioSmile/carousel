
/*banner*/
var banner = document.querySelector(".banner");

/*banner ul*/
var banUl = document.querySelector(".banner .list");

/*banner ul li*/
var banLi = document.querySelectorAll(".banner .list li");

/*定义下标*/
var index = 1;

/*获取banner宽度*/
var width = banner.clientWidth;

/*克隆第一个元素插入到最后面*/
banUl.appendChild(banLi[0].cloneNode(true));

/*克隆最后一个元素插入到最前面*/
banUl.insertBefore(banLi[banLi.length - 1].cloneNode(true),banLi[0]);

/*从新获取li的 length*/
var banLi = document.querySelectorAll(".banner .list li");

/*获取ul的宽度*/
banUl.style.width = 100 * banLi.length + "%";

/*获取每个li的宽度*/
for(var i = 0; i < banLi.length; i++){
	banLi[i].style.width = 100 / banLi.length + "%";
}

/*显示当前第一个li*/
banUl.style.transform = "translateX(-" + banLi[0].style.width + ")";

/*获取小点*/
var lis = document.querySelectorAll(".banner .controls li");

/*定义锁*/
var lock = true;

/*手指按下事件*/
var stratX;
banner.addEventListener("touchstart", function (e){
	stratX = e.touches[0].clientX;
	/*关闭自动轮播*/
	clearInterval(timers);
});

/*手指离开事件*/
banner.addEventListener("touchend", function (e){
	/*锁为true执行*/
	if(lock){
		lock = false;
		var endX = e.changedTouches[0].clientX;
		if(Math.abs(stratX - endX) > 100){
			lis[index - 1].className = "";
			/*判断手指滑动的方向*/
			if(stratX - endX > 0){
				index++;
			}else if(stratX - endX < 0){
				index--;
			}
		}
		/*获取滑动距离*/
		var v = -index * width;
		banUl.style.transform = "translateX(" + v + "px)";
		/*开启过渡*/
		banUl.style.transition = "0.2s";
		/*对应小点的位置*/
		if(index == banLi.length -1){
			lis[0].className = "active";
		}else{
			lis[index - 1].className = "active";
		}
		/*启动自动轮播*/
		autoPlay();
	}
});

/*过渡结束的状态*/
banner.addEventListener("transitionend", function (){
	/*循环滚动获取位置*/
	if(index == banLi.length -1){
		index = 1;
	}else if(index == 0){
		index = banLi.length -2;
	}
	/*获取滑动距离*/
	var v = -index * width;
	banUl.style.transform = "translateX(" + v + "px)";
	/*关闭过渡*/
	banUl.style.transition = "none";
	/*定义锁的状态*/
	lock = true;
})

/*手指滑动事件*/
banner.addEventListener("touchmove", function (e){
	if(lock){
		var moveX = e.changedTouches[0].clientX;
		/*获取滑动差值*/
		var chaX = moveX - stratX;
		var v = -index * width + chaX;
		banUl.style.transform = "translateX(" + v + "px)";
		banUl.style.transition = "none";
	}
});

/*自动轮播*/
var timers;
function autoPlay(){
	timers = setInterval(function(){
		if(index == banLi.length -1){
			index = 1;
		}else if(index == 0){
			index = banLi.length -2;
		}
		lis[index - 1].className = "";
		index++;
		var v = -index * width;
		banUl.style.transform = "translateX(" + v + "px)";
		banUl.style.transition = "0.2s";
		if(index == banLi.length -1){
			lis[0].className = "active";
		}else{
			lis[index - 1].className = "active";
		}
	}, 1000);
}
autoPlay();