$(function () {
    var area = $(".ils-slalom");
    area.each(function () {
        var recorder = new Recorder($(this));
        var start = "bottom";
        var distance = 150;
        var width = 200;
        var ghosts = recorder.ghosts;
        var slalom = new ILS.Slalom(distance, width, ghosts);
        var projector = new Projector(area, slalom);
        projector.reflect();
    });
});
var Recorder = (function () {
    function Recorder(area) {
        this.ghosts = this.cut(area);
    }
    Recorder.prototype.cut = function (area) {
        var ghosts = [];
        var pylons = area.find("p[data-pos]");
        var mineBlades = function (p) {
            var bladeInfo = function (blade) {
                var info = blade.split(",");
                return {
                    x: Number(info[0]),
                    y: Number(info[1]),
                    deg: Number(info[2] || 0)
                };
            };
            var left = bladeInfo(p.data("bladeLeft"));
            var right = bladeInfo(p.data("bladeRight"));
            return {
                left: {
                    x: left.x,
                    y: left.y,
                    deg: left.deg || 0
                },
                right: {
                    x: right.x,
                    y: right.y,
                    deg: right.deg || 0
                }
            };
        };
        pylons.each(function () {
            var pylon = $(this);
            var pos = pylon.data("pos");
            var blades = mineBlades(pylon);
            var ghost = new ILS.Ghost(pos, blades);
            ghosts.push(ghost);
        });
        return ghosts;
    };
    return Recorder;
})();
var Projector = (function () {
    function Projector(area, slalom) {
        this.area = area;
        this.slalom = slalom;
        this.svg = SVG.svg();
        this.area.prepend(this.svg);
    }
    Projector.prototype.reflect = function () {
        this.reflectLane(this.slalom.lane);
        this.reflectPylon(this.slalom.pylons);
        this.reflectGhost(this.slalom.ghosts);
    };
    Projector.prototype.reflectLane = function (lane) {
        var rect = SVG.rect({
            width: lane.width,
            height: lane.length,
            fill: "beige",
            rx: 0,
            ry: 0
        });
        this.svg.append(rect.asElement());
    };
    Projector.prototype.reflectPylon = function (pylons) {
        for(var i in pylons) {
            var pylon = pylons[i];
            var circle = SVG.circle({
                r: 10,
                cx: pylon.x,
                cy: pylon.y,
                fill: "maroon"
            });
            this.svg.append(circle.asElement());
        }
    };
    Projector.prototype.reflectGhost = function (ghosts) {
        var blade = function (blade, color) {
            var lcx = blade.x;
            var lcy = blade.y;
            return SVG.ellipse({
                rx: 5,
                ry: 10,
                cx: lcx,
                cy: lcy,
                fill: color,
                deg: [
                    blade.deg, 
                    lcx, 
                    lcy
                ]
            });
        };
        for(var i in ghosts) {
            var ghost = ghosts[i];
            var blades = ghost.blades;
            var left = blade(blades.left, "indianred");
            var right = blade(blades.right, "lightblue");
            this.svg.append(left.asElement());
            this.svg.append(right.asElement());
        }
    };
    return Projector;
})();
//@ sourceMappingURL=slalom-projector.js.map
