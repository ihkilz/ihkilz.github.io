var svg = d3.select("#content").append("svg:svg").style("pointer-events", "all");
var colors = d3.scale.category20b();
var ci=0;
var debug = false;

function log(msg) {if (debug) {console.log(msg);}}

function mouseHandler(visualName) {
	return function() {
		var m = d3.mouse(svg[0][0]);
		var w = window.innerWidth, h = window.innerHeight;
		var fmx = m[0]/w, fmy = m[1]/h;
		if (window.recorder) {recorder.record([visualName, fmx, fmy]);}
		return doVisual(visualName, fmx, fmy);
	};
}

function doVisual(visualName, fmx, fmy, timeScale) {
	if (!timeScale) {timeScale=1;}
	var w = window.innerWidth, h = window.innerHeight;
	var visual = visuals[visualName];
	return visual(w*fmx, h*fmy, w, h, timeScale);
}

function setEventHandler(visualName, eventName) {
	// log(visualName, eventName);
	svg.on(eventName, mouseHandler(visualName));
}

function setEventHandlerFromMenuOption(element, eventName) {
	var visualName = element.value;
	setEventHandler(visualName, eventName);
}

$(document).ready(function() {
	setEventHandler('jazz', 'mousemove');
	setEventHandler('confetti', 'mousedown');
});
