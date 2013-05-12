/// <reference path="../d.ts/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../d.ts/DefinitelyTyped/jqueryui/jqueryui.d.ts" />

module ILS {

	$(() => {
		var foot = ["#left-foot", "#right-foot"];
		foot.map((f) => {
			var isLeft = f.indexOf("left") != -1;

			$(f).draggable({
				// properties
				cursor: "move",
				scroll: true,
				grid: [5, 5],
				helper: "clone",

				// functions
				stop: function(){
					var offset = $(this).offset();
					var x = offset.left;
					var y = offset.top;
					console.log(x);
					console.log(y);
				}
			});
		});

	});

}
