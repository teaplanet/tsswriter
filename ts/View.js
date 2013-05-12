var ILS;
(function (ILS) {
    $(function () {
        var foot = [
            "#left-foot", 
            "#right-foot"
        ];
        foot.map(function (f) {
            var isLeft = f.indexOf("left") != -1;
            $(f).draggable({
                cursor: "move",
                scroll: true,
                grid: [
                    5, 
                    5
                ],
                helper: "clone",
                stop: function () {
                    var offset = $(this).offset();
                    var x = offset.left;
                    var y = offset.top;
                    console.log(x);
                    console.log(y);
                }
            });
        });
    });
})(ILS || (ILS = {}));
//@ sourceMappingURL=View.js.map
