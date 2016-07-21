var canvas_number1 = Raphael("number_1", 200, 300);
var canvas_cal_method = Raphael("cal_method", 200, 300);
var canvas_number2 = Raphael("number_2", 200, 300);
var canvas_equal_sign = Raphael("equal_sign", 200, 300);
var canvas_result = Raphael("result", 200, 300);
var canvas_correct = Raphael("correct", 200, 300);

var canvas_selection_1 = Raphael("select_1", 200, 300);
var canvas_selection_2 = Raphael("select_2", 200, 300);
var canvas_selection_3 = Raphael("select_3", 200, 300);
var canvas_selection_4 = Raphael("select_4", 200, 300);

var selectionTexts = new Array();
		
var sumLimit = 20;
var timeLimit = 5;
var itemLimit = 10;
var correctedItemNumber = 0;
var resultShowTime = 3;
var testItems = new Array();

$(function(){
	var tmp = 1;
	var testTimer;
	initTestItems(itemLimit, sumLimit, timeLimit, resultShowTime);
	console.log(testItems);
	startTimer();
	
	$( ".selection" ).click(function() {
		$(this).animate({
			backgroundColor: "#aa0000",
			color: "#fff"			
        }, 500);
		var selected = $(this).data("selected");
		var selectedValue = testItems[0].selections[selected];
		if (selectedValue != "-") {
			testItems[0].selected = selectedValue;
			testItems[0].timeLeft = 0;
			
			testItems[0].correct = testItems[0].sum;
			if (selectedValue == testItems[0].correct) {
				testItems[0].selected = "〇";
			} else {
				testItems[0].selected = "×";
			}
		}
	});	
	
	function clearAll() {
		canvas_number1.clear();
		canvas_cal_method.clear();
		canvas_number2.clear();
		canvas_equal_sign.clear();
		canvas_result.clear();
		canvas_correct.clear();

		canvas_selection_1.clear();
		canvas_selection_2.clear();
		canvas_selection_3.clear();
		canvas_selection_4.clear();
	}
	
	function processAll() {
		if (testItems == null || testItems.length <=0 ) {
			console.log("stop:" + testItems.length);
			stopTimer();
			return;
		}
		var item = testItems[0];
		if (item.timeLeft <= 0 && item.resultShowTime <= 0) {
			console.log("shift!!");
			var itemNew = testItems.shift();
			console.log("After shift, length=" + testItems.length);
			return;
		}
		
	
		if (item.timeLeft > 0) {
			item.timeLeft = item.timeLeft - 1;
		} else {
			item.correct = item.sum;
			item.selections[0] = "-";
			item.selections[1] = "-";
			item.selections[2] = "-";
			item.selections[3] = "-";
			item.resultShowTime = item.resultShowTime - 1;
		}
		
		console.log("In process all length=" + testItems.length);
		console.log(item.timeLeft + "," + item.resultShowTime);
	}
	
	function doIntervalAction() {
		drawAll(testItems[0]);
		processAll();
		console.log(testItems.length);
	};
	function startTimer(){
		testTimer=setInterval(function(){
			doIntervalAction();
		} , 1000);
	}
	function stopTimer(){
		clearInterval(testTimer);
	}
	
	function initTestItems(itemNumber, sumLimit, timeLimit, resultShowTime) {
		for (var i=0;i<itemNumber;i++) {
			var summary = Math.ceil( Math.random()*sumLimit);
			var val = Math.ceil( Math.random()*summary - 1);
			var item = { number1:val, number2:summary-val, sum:summary, timeLeft:timeLimit, correct:"", resultShowTime:resultShowTime, 
			selections:initSelection(summary, sumLimit), selected:"?" };
			
			testItems[i] = item;
		}
	}
	
	function drawNumber1(val) {
		//canvas_number1.rect(0, 0, 50, 100);
		var text = canvas_number1.text(100, 100, val).attr({
			"fill": "#5a11ff", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	
	function drawCalMethod(val) {
		var text = canvas_cal_method.text(100, 100, val).attr({
			"fill": "#5aff11", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	
	function drawNumber2(val) {
		//canvas_number1.rect(0, 0, 50, 100);
		var text = canvas_number2.text(100, 100, val).attr({
			"fill": "#5a11ff", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	

	function drawEqualSign(val) {
		var text = canvas_equal_sign.text(100, 100, val).attr({
			"fill": "#5aff11", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	
	function drawResult(val) {
		var text = canvas_result.text(100, 100, val).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	
	function drawCorrect(val) {
		var text = canvas_correct.text(100, 100, val).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}	
	
	function drawSelections(selections) {
		var text1 = canvas_selection_1.text(100, 100, selections[0]).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
		
		var text2 = canvas_selection_2.text(100, 100, selections[1]).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
		var text3 = canvas_selection_3.text(100, 100, selections[2]).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
		var text4 = canvas_selection_4.text(100, 100, selections[3]).attr({
			"fill": "#ff1111", //塗りつぶす色
			"font-size": 150, //フォントサイズ
			"font-family": "Meiryo", //フォントファミリー
			"font-weight": "bold", //フォントウェイト
			"stroke": "none", //輪郭設定
		});		
	}
	
	function initSelection(correctNumber, sumLimit) {
		var selections = new Array();
		selections[0] = correctNumber;		
		selections[1] = Math.ceil( Math.random()*sumLimit);
		selections[2] = Math.ceil( Math.random()*sumLimit);
		selections[3] = Math.ceil( Math.random()*sumLimit);
		selections.sort();
		
		return selections;
	}
	
	function drawLeftTime(timeLeft, total) {
		var leftPercent = timeLeft / total * 100;
		$("#progress").css({'width':leftPercent+'%'});
	}
	
	function drawFinshedItem() {
		var leftCount = testItems.length;
		var finishedCount = itemLimit - leftCount;
		$("#item_left").text( finishedCount + "/" + itemLimit);
	}
	
	function drawAll(item) {	
		clearAll();
		
		drawNumber1(item.number1);
		drawCalMethod("+");
		drawNumber2(item.number2);
		drawEqualSign("=");
		drawResult(item.selected);
		drawCorrect(item.correct);
		drawSelections(item.selections);
		
		drawLeftTime(item.timeLeft, timeLimit);		
		drawFinshedItem();
	}
});