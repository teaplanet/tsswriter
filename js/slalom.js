var ILS;
(function (ILS) {
    var Slalom = (function () {
        function Slalom(interval, width, ghosts) {
            this.interval = interval;
            this.width = width;
            this.ghosts = ghosts;
            this.pylons = this.countPylons(this.ghosts);
            if(this.pylons.length) {
                this.drawLane();
                this.spaceOut(this.pylons);
                this.reflect();
            }
        }
        Slalom.prototype.drawLane = function () {
            var length = this.interval * (this.pylons.length - 1);
            this.lane = new Lane(this.width, length);
        };
        Slalom.prototype.countPylons = function (ghosts) {
            var count = 0;
            var pylons = [];
            for(var i in this.ghosts) {
                var pos = this.ghosts[i].pos;
                pylons[pos] = {
                    pos: pos
                };
                if(pos > count) {
                    count = pos;
                }
            }
            if(pylons.length != count) {
                for(var n = 1; n <= count; ++n) {
                    pylons[n] || (pylons[n] = {
                        pos: n
                    });
                }
            }
            return pylons;
        };
        Slalom.prototype.spaceOut = function (pylons) {
            for(var i in pylons) {
                var pylon = pylons[i];
                var x = this.width / 2;
                var y = this.interval * (pylon.pos - 1) + (this.interval / 2);
                y = this.lane.length - y;
                pylons[i].x = x;
                pylons[i].y = y;
            }
        };
        Slalom.prototype.reflect = function () {
            for(var i in this.ghosts) {
                var ghost = this.ghosts[i];
                var p = this.pylons[ghost.pos];
                ghost.blades.left.x = p.x + ghost.blades.left.x;
                ghost.blades.left.y = p.y - ghost.blades.left.y;
                ghost.blades.right.x = p.x + ghost.blades.right.x;
                ghost.blades.right.y = p.y - ghost.blades.right.y;
            }
        };
        return Slalom;
    })();
    ILS.Slalom = Slalom;    
    var Ghost = (function () {
        function Ghost(pos, blades) {
            this.pos = pos;
            this.blades = blades;
        }
        return Ghost;
    })();
    ILS.Ghost = Ghost;    
    var Lane = (function () {
        function Lane(width, length) {
            this.width = width;
            this.length = length;
        }
        return Lane;
    })();
    ILS.Lane = Lane;    
})(ILS || (ILS = {}));
//@ sourceMappingURL=slalom.js.map
