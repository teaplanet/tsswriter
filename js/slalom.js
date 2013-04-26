var ILS;
(function (ILS) {
    var Slalom = (function () {
        function Slalom(ghosts) {
            this.ghosts = ghosts;
        }
        Slalom.prototype.pylons = function () {
            var ps = [];
            for(var i in this.ghosts) {
                ps.push({
                    pos: this.ghosts[i].pos
                });
            }
            return ps;
        };
        return Slalom;
    })();
    ILS.Slalom = Slalom;    
    var Field = (function () {
        function Field() {
            this.lanes = {
            };
        }
        Field.prototype.useLane = function (distance, name, start) {
            if (typeof start === "undefined") { start = "bottom"; }
            name = name || String(distance);
            this.lanes[name] = new Lane(distance, start);
        };
        return Field;
    })();
    ILS.Field = Field;    
    var Lane = (function () {
        function Lane(distance, start) {
            if (typeof start === "undefined") { start = "bottom"; }
            this.distance = distance;
            this.start = start;
            this.width = 200;
            this.pylons = [];
            this.ghosts = [];
        }
        Lane.prototype.reproduce = function (slalom) {
            this.setup(slalom.pylons());
            this.mirror(slalom.ghosts);
        };
        Lane.prototype.setup = function (dupPylon) {
            for(var i in dupPylon) {
                var pylon = dupPylon[i];
                var pos = pylon.pos;
                this.pylons[pos] = pylon;
            }
            var qty = this.countPylons();
            this.calcArea(qty);
            if(this.pylons.length != qty) {
                for(var n = 1; n <= qty; ++n) {
                    this.pylons[n] || (this.pylons[n] = {
                        pos: n
                    });
                }
            }
            this.spaceOut();
        };
        Lane.prototype.mirror = function (ghosts) {
            this.ghosts = ghosts;
            for(var i in ghosts) {
                var ghost = ghosts[i];
                var p = this.pylons[ghost.pos];
                ghost.blades.left.x = p.x + ghost.blades.left.x;
                ghost.blades.left.y = p.y + ghost.blades.left.y;
                ghost.blades.right.x = p.x + ghost.blades.right.x;
                ghost.blades.right.y = p.y + ghost.blades.right.y;
            }
        };
        Lane.prototype.spaceOut = function () {
            for(var i in this.pylons) {
                var pylon = this.pylons[i];
                var x = this.width / 2;
                var y = this.distance * (pylon.pos - 1) + (this.distance / 2);
                switch(this.start) {
                    case "top":
                        break;
                    case "bottom":
                        y = this.length - y;
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
                        x = this.length - x;
                        break;
                }
                this.pylons[i].x = x;
                this.pylons[i].y = y;
            }
        };
        Lane.prototype.countPylons = function () {
            var keys = Object.keys(Object(this.pylons));
            var max = Math.max.apply(null, keys);
            var min = Math.min.apply(null, keys);
            return max - min + 1;
        };
        Lane.prototype.calcArea = function (qty) {
            this.length = this.distance * qty;
            switch(this.start) {
                case "left":
                case "right":
                    this.width = [
                        this.length, 
                        this.length = this.width
                    ][0];
            }
        };
        return Lane;
    })();
    ILS.Lane = Lane;    
})(ILS || (ILS = {}));
//@ sourceMappingURL=slalom.js.map
