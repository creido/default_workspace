"use_strict";

$&&(!$.log)&&($.log=function(a){console&&console.log(a)});
$&&(!$.debug)&&($.debug=function(a){window.location.hash=="#debug"&&$.log(a);return false;});

var ua = navigator.userAgent.toLowerCase(),
_ = {
	ie6: $('html').hasClass('ie6'),
	nonResponsive: $('html').is('.ie6, .ie7, .ie8'),
	iOS: ua.match(/(iphone|ipod|ipad)/),
	iPad: ua.match(/ipad/),
	iPhone: ua.match(/(iphone|ipod)/),
	android: ua.match(/android|htc/),
	touch: (typeof(window.ontouchstart) != 'undefined'),
	RGBA: (function(){var b=document.createElement("div"),a=!1;try{b.style.color="rgba(1,1,1,.5)",a=/^rgba/.test(b.style.color)}catch(c){}a||$("html").addClass("no-rgba");return a})(),
	supports: function(p){return document.createElement("detect").style[p] === "";}
},
cookie = {
	create: function(b,d,c){var a="";c&&(a=new Date,a.setTime(a.getTime()+864E5*c),a="; expires="+a.toGMTString());document.cookie=b+"="+d+a+"; path=/"},
 	read: function(b){for(var d=null,c=document.cookie.replace(/; /g,";").split(";"),a=0;a<c.length;a++){var e=c[a].split("=");if(e[0]==b){d=e[1];break}}return d},
	delete: function(b){document.cookie=b+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}
};

(_.iPhone) && (document.getElementsByTagName('body')[0].className+=' iPhone');
(_.iPad) && (document.getElementsByTagName('body')[0].className+=' iPad');

var config = {
	responsive: true,
	$pageWidthHook: $("body"),
	responsiveBreaks: {
		desktop: 998,
		tablet: 768,
		mobile: 320
	}
}

var response = {
	main: function(){
		if(!config.responsive) return;

		for(var name in config.responsiveBreaks){
			if(name.length){
				this.breaks[this.breaks.length+1] = [name, config.responsiveBreaks[name]];
			}
		}
		this.breaks.sort(function(a, b){
			return a[1]-b[1];
		});

		$(window).resize(this.resize).trigger('resize');
	},
	resize: function(){
		var bodyWidth = parseInt(config.$pageWidthHook.css('min-width'), 16) ? parseInt(config.$pageWidthHook.css('min-width'), 16) : config.$pageWidthHook.width();
		var size;
		for(var i=0;i<response.breaks.length/2;i++){
			if(bodyWidth <= response.breaks[i][1]){
				size = response.breaks[i];
				break;
			}
		}
		if(!size) size = response.breaks[response.breaks.length/2-1];
		if($("html").hasClass(size[0])) return;
		for(var i=0;i<response.breaks.length/2;i++){
			$("html").removeClass(response.breaks[i][0]);
		}
		$("html").addClass(size[0]);
		if(typeof response[size[0]] == "function") response[size[0]]();
	},
	desktop: function(){},
	tablet: function(){},
	mobile: function(){},
	/* Other responsive break functions here */
	breaks: []
};


$(function(){
	response.main();
});