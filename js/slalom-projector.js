$(function () {
    var distance = 150;
    var width = 200;
    var start = "bottom";
    var ghosts = [
        {
            pos: 1,
            blades: {
                left: {
                    x: -20,
                    y: 0,
                    deg: -30
                },
                right: {
                    x: 20,
                    y: 0,
                    deg: 30
                }
            }
        }, 
        {
            pos: 2,
            blades: {
                left: {
                    x: -40,
                    y: 0
                },
                right: {
                    x: 40,
                    y: 0
                }
            }
        }, 
        {
            pos: 4,
            blades: {
                left: {
                    x: 20,
                    y: 0
                },
                right: {
                    x: -20,
                    y: 0
                }
            }
        }
    ];
    var slalom = new ILS.Slalom(start, distance, width, ghosts);
    var projector = new Projector($("#lane1"), slalom);
    projector.reflect();
});
var Projector = (function () {
    function Projector(area, slalom) {
        this.area = area;
        this.slalom = slalom;
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
        this.area.append(rect.asElement());
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
            this.area.append(circle.asElement());
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
            var left = blade(blades.left, "lightblue");
            var right = blade(blades.right, "indianred");
            this.area.append(left.asElement());
            this.area.append(right.asElement());
        }
    };
    return Projector;
})();
//@ sourceMappingURL=slalom-projector.js.map
