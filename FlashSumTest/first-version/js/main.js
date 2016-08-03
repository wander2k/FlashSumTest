$(function() {
	// 計算合計値の最大値
	var sumLimit = 20;
	// 答え時間　秒
	var timeLimit = 5;
	// 設問数
	var itemLimit = 10;
	// 正解数
	var correctedItemNumber = 0;
	// 結果表示時間　秒
	var resultShowTime = 2;
	// 設問配列
	var testItems = new Array();
	
	// 処理タイマー
	var processTimer;
	// 表示処理タイマー
	var drawTimer;
	
	// 回答中設問Index
	var currentItemIndex = 0;

	initTestItems(itemLimit, sumLimit, timeLimit, resultShowTime);
	startProcessTimer();
	startDrawTimer()

	$(".rippler").rippler({
		effectClass : 'rippler-effect',
		effectSize : 50 // Default size (width & height)
		,
		addElement : 'div' // e.g. 'svg'(feature)
		,
		duration : 200
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

	$(".selection").mousedown(function() {
		var item = testItems[currentItemIndex];
		var selectedValue = $(this).text();
		$("#debug").text("clicked:" + selectedValue);
		if (selectedValue != "-") {
			item.selected = selectedValue;
			item.timeLeft = 0;

			if (selectedValue == item.sum) {
				item.correct = "〇";
			} else {
				item.correct = "×";
			}
		}
	});

	
	/********Process engine starts********************/
	
	function processAll() {
		// ゲーム終了か
		if (currentItemIndex >= itemLimit) {
			console.log("stop:" + testItems.length);
			stopProcessTimer();

			if (correctedItemNumber != itemLimit) {
				setTimeout(function() {
					window.location.href = 'fail.html';
				}, 1000);
			} else {
				setTimeout(function() {
					window.location.href = 'success.html';
				}, 1000);
			}

			return;
		}
		var item = testItems[currentItemIndex];
		// 次のItemへ進む
		if (item.timeLeft <= 0 && item.resultShowTime <= 0) {
			currentItemIndex = currentItemIndex + 1;
			console.log("Shift to next :" + currentItemIndex);
			return;
		}

		// 答え時間が残るか
		if (item.timeLeft > 0) {
			item.timeLeft = item.timeLeft - 1;
		} else {
			if (item.selected == "?") {
				item.correct = "×";
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
	};
	
	function initSelection(correctNumber, sumLimit) {
		var selections = new Array();
		selections[0] = correctNumber;
		selections[1] = Math.ceil(Math.random() * sumLimit);
		selections[2] = Math.ceil(Math.random() * sumLimit);
		selections[3] = Math.ceil(Math.random() * sumLimit);
		selections.sort();

		return selections;
	};	

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
	

	/********Draw engine starts********************/

	function drawNumber1(val) {
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

	function drawLeftTime(timeLeft, total) {
		var leftPercent = timeLeft / total * 100;
		$("#progress").css({
			'width' : leftPercent + '%'
		});
	}

	function drawFinshedItem() {
		var finished = currentItemIndex + 1;
		$("#item_left").text(finished + "/" + itemLimit);
	}

	function drawAll(item) {
		drawNumber1(item.number1);
		drawCalMethod("+");
		drawNumber2(item.number2);
		drawEqualSign("=");
		drawResult(item.selected);
		drawCorrect(item.correct);
		drawSelections(item.selections);

		drawLeftTime(item.timeLeft, timeLimit);
		drawFinshedItem();
		
		if (currentItemIndex >= testItems.length) {
			stopDrawTimer();
			return;
		}
	}
});