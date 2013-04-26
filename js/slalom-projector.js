$(function () {
    var distance = 150;
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
    var slalom = new ILS.Slalom(ghosts);
    var field = new ILS.Field();
    field.useLane(distance, "150", start);
    var lane = field.lanes["150"];
    lane.reproduce(slalom);
    var projector = new Projector($("#lane1"));
    projector.reflect(field);
});
var Projector = (function () {
    function Projector(area) {
        this.area = area;
    }
    Projector.prototype.reflect = function (field) {
        var lanes = field.lanes;
        for(var i in lanes) {
            var lane = lanes[i];
            this.reflectLane(lane);
            this.reflectPylon(lane.pylons);
            this.reflectGhost(lane.ghosts);
        }
    };
    Projector.prototype.reflectLane = function (lane) {
        var rect = SVG.rect({
            width: lane.width,
            height: lane.length,
            fill: "beige",
            rx: 20,
            ry: 20
        });
        this.area.append(rect.asElement());
    };
    Projector.prototype.reflectPylon = function (pylons) {
        for(var i in pylons) {
            var pylon = pylons[i];
            console.log("x: " + pylon.x + " y: " + pylon.y);
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
        console.log(ghosts);
        for(var i in ghosts) {
            var ghost = ghosts[i];
            var blade = ghost.blades;
            var lcx = blade.left.x;
            var lcy = blade.left.y;
            var left = SVG.ellipse({
                rx: 5,
                ry: 10,
                cx: blade.left.x,
                cy: blade.left.y,
                fill: "lightblue",
                deg: [
                    blade.left.deg, 
                    lcx, 
                    lcy
                ]
            });
            var rcx = blade.right.x;
            var rcy = blade.right.y;
            var right = SVG.ellipse({
                rx: 5,
                ry: 10,
                cx: rcx,
                cy: rcy,
                fill: "indianred",
                deg: [
                    blade.right.deg, 
                    rcx, 
                    rcy
                ]
            });
            this.area.append(left.asElement());
            this.area.append(right.asElement());
        }
    };
    return Projector;
})();
//@ sourceMappingURL=slalom-field.js.map
