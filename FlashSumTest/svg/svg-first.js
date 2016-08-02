//var canvas_number1 = Raphael("number_1", 100, 100);
//var canvas_cal_method = Raphael("cal_method", 100, 100);
//var canvas_number2 = Raphael("number_2", 100, 100);
//var canvas_equal_sign = Raphael("equal_sign", 100, 100);
//var canvas_result = Raphael("result", 100, 100);
//var canvas_correct = Raphael("correct", 100, 100);
//
//var canvas_selection_1 = Raphael("select_1", 100, 100);
//var canvas_selection_2 = Raphael("select_2", 100, 100);
//var canvas_selection_3 = Raphael("select_3", 100, 100);
//var canvas_selection_4 = Raphael("select_4", 100, 100);


$(function() {
	var selectionTexts = new Array();

	var sumLimit = 20;
	var timeLimit = 5;
	var itemLimit = 10;
	var correctedItemNumber = 0;
	var resultShowTime = 2;
	var testItems = new Array();
	
	var processTimer;
	var drawTimer;
	
	var currentItemIndex = 0;

	initTestItems(itemLimit, sumLimit, timeLimit, resultShowTime);
	startProcessTimer();
	startDrawTimer()

	$(".rippler").rippler({
		effectClass : 'rippler-effect',
		effectSize : 32 // Default size (width & height)
		,
		addElement : 'div' // e.g. 'svg'(feature)
		,
		duration : 200
	});

	$(".selection").click(function() {
		// $(this).animate({
		// backgroundColor: "#aa0000",
		// color: "#fff"
		// }, 500);
		//var selected = $(this).data("selected");
		//var selectedValue = testItems[0].selections[selected];
		var item = testItems[currentItemIndex];
		var selectedValue = $(this).text();
		if (selectedValue != "-") {
			item.selected = selectedValue;
			item.timeLeft = 0;

			if (selectedValue == item.sum) {
				item.correct = "〇";
				correctedItemNumber = correctedItemNumber + 1;
			} else {
				item.correct = "×";
			}
			testItems[currentItemIndex] = item;
		}
	});

	function startProcessTimer() {
		processTimer = setInterval(function() {
			doIntervalAction();
		}, 1000);
	}
	function stopProcessTimer() {
		clearInterval(processTimer);
	}

	function startDrawTimer() {
		drawTimer = setInterval(function() {
			doDrawAction();
		}, 200);
	}
	function stopDrawTimer() {
		clearInterval(drawTimer);
	}

	function processAll() {
		//if (testItems == null || testItems.length <= 0) {
		if (currentItemIndex >= itemLimit) {
			console.log("stop:" + testItems.length);
			stopProcessTimer();

			if (correctedItemNumber != itemLimit) {
				setTimeout(function() {
					window.location.href = 'fail.html';
				}, 2000);
			} else {
				setTimeout(function() {
					window.location.href = 'success.html';
				}, 1000);
			}

			return;
		}
		var item = testItems[currentItemIndex];
		if (item.timeLeft <= 0 && item.resultShowTime <= 0) {
			console.log("shift!!");
			currentItemIndex = currentItemIndex + 1;
			return;
		}

		if (item.timeLeft > 0) {
			item.timeLeft = item.timeLeft - 1;
		} else {
			if (item.selected != item.sum) {
				item.correct = "×";
				item.selected = item.sum;
			}
			item.selections[0] = "-";
			item.selections[1] = "-";
			item.selections[2] = "-";
			item.selections[3] = "-";
			item.resultShowTime = item.resultShowTime - 1;
		}
	}

	function doIntervalAction() {
		processAll();
	}
	;

	function doDrawAction() {
		drawAll(testItems[currentItemIndex]);
	}
	;

	function initTestItems(itemNumber, sumLimit, timeLimit, resultShowTime) {
		for (var i = 0; i < itemNumber; i++) {
			var summary = Math.ceil(Math.random() * sumLimit);
			var val = Math.ceil(Math.random() * summary - 1);
			var item = {
				number1 : val,
				number2 : summary - val,
				sum : summary,
				timeLeft : timeLimit,
				correct : "",
				resultShowTime : resultShowTime,
				selections : initSelection(summary, sumLimit),
				selected : "?"
			};

			testItems[i] = item;
		}
	}

	/** ******Draw engine starts******************* */

	function drawNumber1(val) {
		// canvas_number1.clear();
		$("#number_1").text(val);
	}

	function drawCalMethod(val) {
		$("#cal_method").text(val);
	}

	function drawNumber2(val) {
		$("#number_2").text(val);
	}

	function drawEqualSign(val) {
		$("#equal_sign").text(val);
	}

	function drawResult(val) {
		$("#result").text(val);
	}

	function drawCorrect(val) {
		$("#correct").text(val);
	}

	function drawSelections(selections) {
		$("#select_1").text(selections[0]);
		$("#select_2").text(selections[1]);
		$("#select_3").text(selections[2]);
		$("#select_4").text(selections[3]);
	}

	function initSelection(correctNumber, sumLimit) {
		var selections = new Array();
		selections[0] = correctNumber;
		selections[1] = Math.ceil(Math.random() * sumLimit);
		selections[2] = Math.ceil(Math.random() * sumLimit);
		selections[3] = Math.ceil(Math.random() * sumLimit);
		selections.sort();

		return selections;
	}

	function drawLeftTime(timeLeft, total) {
		var leftPercent = timeLeft / total * 100;
		$("#progress").css({
			'width' : leftPercent + '%'
		});
	}

	function drawFinshedItem() {
		var leftCount = testItems.length;
		var finishedCount = itemLimit - leftCount + 1;
		$("#item_left").text(finishedCount + "/" + itemLimit);
	}

	function clearAll() {
	}

	function drawAll(item) {
		if (currentItemIndex >= testItems.length) {
			stopDrawTimer();
			return;
		}

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