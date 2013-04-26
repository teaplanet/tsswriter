var ILS;
(function (ILS) {
    var Slalom = (function () {
        function Slalom(start, distance, width, ghosts) {
            this.start = start;
            this.distance = distance;
            this.width = width;
            this.ghosts = ghosts;
            this.pylons = this.countPylons(this.ghosts);
            this.drawLane();
            this.spaceOut(this.pylons);
            this.reflect();
        }
        Slalom.prototype.drawLane = function () {
            var length = this.distance * (this.pylons.length - 1);
            switch(this.start) {
                case "left":
                case "right":
                    this.width = [
                        length, 
                        length = this.width
                    ][0];
            }
            this.lane = new Lane(this.width, length, this.start);
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
                var y = this.distance * (pylon.pos - 1) + (this.distance / 2);
                switch(this.start) {
                    case "top":
                        break;
                    case "bottom":
                        y = this.lane.length - y;
                        break;
                    case "left":
                        x = [
                            y, 
                            y = x
                        ][0];
                        break;
                    case "right":
                        x = [
                            y, 
                            y = x
                        ][0];
                        x = this.lane.length - x;
                        break;
                }
                pylons[i].x = x;
                pylons[i].y = y;
            }
        };
        Slalom.prototype.reflect = function () {
            for(var i in this.ghosts) {
                var ghost = this.ghosts[i];
                var p = this.pylons[ghost.pos];
                ghost.blades.left.x = p.x + ghost.blades.left.x;
                ghost.blades.left.y = p.y + ghost.blades.left.y;
                ghost.blades.right.x = p.x + ghost.blades.right.x;
                ghost.blades.right.y = p.y + ghost.blades.right.y;
            }
        };
        return Slalom;
    })();
    ILS.Slalom = Slalom;    
    var Lane = (function () {
        function Lane(width, length, start) {
            this.width = width;
            this.length = length;
            this.start = start;
        }
        return Lane;
    })();
    ILS.Lane = Lane;    
})(ILS || (ILS = {}));
//@ sourceMappingURL=slalom.js.map
