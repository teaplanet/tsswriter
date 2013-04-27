var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVG = (function () {
    function SVG() { }
    SVG.SVG_NS = "http://www.w3.org/2000/svg";
    SVG.MakeElement = function MakeElement(type, values) {
        var svg = $(document.createElementNS(Figure.Elementable.SVG_NS, type));
        for(var i in values) {
            var value = values[i];
            var name = value.name;
            var value = value.value;
            if(value) {
                svg.attr(name, value);
            }
        }
        return svg;
    };
    SVG.svg = function svg() {
        return $(document.createElementNS(SVG.SVG_NS, "svg"));
    };
    SVG.rect = function rect(attr) {
        return new Figure.Rect(attr.width, attr.height, attr.fill, attr.rx, attr.rx, attr.deg);
    };
    SVG.circle = function circle(attr) {
        return new Figure.Circle(attr.r, attr.cx, attr.cy, attr.fill, attr.deg);
    };
    SVG.ellipse = function ellipse(attr) {
        return new Figure.Ellipse(attr.rx, attr.ry, attr.cx, attr.cy, attr.fill, attr.deg);
    };
    SVG.text = function text(attr) {
        return new Figure.Text(attr.text, attr.x, attr.y, attr.fontSize, attr.fontFamily, attr.anchor, attr.deg);
    };
    return SVG;
})();
var Figure;
(function (Figure) {
    var Elementable = (function () {
        function Elementable() { }
        Elementable.SVG_NS = "http://www.w3.org/2000/svg";
        Elementable.prototype.asElement = function () {
            throw new Error("must be override.");
        };
        Elementable.prototype.makeRotateAttrAsString = function (deg) {
            if(deg && deg[0]) {
                var d = deg[0];
                var x = deg[1] || 0;
                var y = deg[2] || 0;
                return "rotate(" + d + ", " + x + ", " + y + ")";
            }
            return null;
        };
        return Elementable;
    })();
    Figure.Elementable = Elementable;    
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(width, height, fill, x, y, deg) {
                _super.call(this);
            this.width = width;
            this.height = height;
            this.fill = fill;
            this.x = x;
            this.y = y;
            this.deg = deg;
            this.type = "rect";
        }
        Rect.prototype.asElement = function () {
            return SVG.MakeElement(this.type, [
                {
                    name: "width",
                    value: this.width
                }, 
                {
                    name: "height",
                    value: this.height
                }, 
                {
                    name: "fill",
                    value: this.fill
                }, 
                {
                    name: "x",
                    value: this.x
                }, 
                {
                    name: "y",
                    value: this.y
                }, 
                {
                    name: "transform",
                    value: _super.prototype.makeRotateAttrAsString.call(this, this.deg)
                }
            ]);
        };
        return Rect;
    })(Figure.Elementable);
    Figure.Rect = Rect;    
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(r, x, y, fill, deg) {
                _super.call(this);
            this.r = r;
            this.x = x;
            this.y = y;
            this.fill = fill;
            this.deg = deg;
            this.type = "circle";
        }
        Circle.prototype.asElement = function () {
            return SVG.MakeElement(this.type, [
                {
                    name: "r",
                    value: this.r
                }, 
                {
                    name: "cx",
                    value: this.x
                }, 
                {
                    name: "cy",
                    value: this.y
                }, 
                {
                    name: "fill",
                    value: this.fill
                }, 
                {
                    name: "transform",
                    value: _super.prototype.makeRotateAttrAsString.call(this, this.deg)
                }
            ]);
        };
        return Circle;
    })(Figure.Elementable);
    Figure.Circle = Circle;    
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        function Ellipse(rx, ry, x, y, fill, deg) {
                _super.call(this);
            this.rx = rx;
            this.ry = ry;
            this.x = x;
            this.y = y;
            this.fill = fill;
            this.deg = deg;
            this.type = "ellipse";
        }
        Ellipse.prototype.asElement = function () {
            return SVG.MakeElement(this.type, [
                {
                    name: "rx",
                    value: this.rx
                }, 
                {
                    name: "ry",
                    value: this.ry
                }, 
                {
                    name: "cx",
                    value: this.x
                }, 
                {
                    name: "cy",
                    value: this.y
                }, 
                {
                    name: "fill",
                    value: this.fill
                }, 
                {
                    name: "transform",
                    value: _super.prototype.makeRotateAttrAsString.call(this, this.deg)
                }
            ]);
        };
        return Ellipse;
    })(Figure.Elementable);
    Figure.Ellipse = Ellipse;    
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(text, x, y, fontSize, fontFamily, anchor, deg) {
                _super.call(this);
            this.text = text;
            this.x = x;
            this.y = y;
            this.fontSize = fontSize;
            this.fontFamily = fontFamily;
            this.anchor = anchor;
            this.deg = deg;
            this.type = "text";
        }
        Text.prototype.asElement = function () {
            var text = SVG.MakeElement(this.type, [
                {
                    name: "x",
                    value: this.x
                }, 
                {
                    name: "y",
                    value: this.y
                }, 
                {
                    name: "font-size",
                    value: this.fontSize
                }, 
                {
                    name: "font-family",
                    value: this.fontFamily
                }, 
                {
                    name: "text-anchor",
                    value: this.anchor
                }, 
                {
                    name: "transform",
                    value: _super.prototype.makeRotateAttrAsString.call(this, this.deg)
                }
            ]);
            text.text(this.text);
            return text;
        };
        return Text;
    })(Figure.Elementable);
    Figure.Text = Text;    
    var Use = (function (_super) {
        __extends(Use, _super);
        function Use(baseVal) {
                _super.call(this);
            this.baseVal = baseVal;
            this.type = "use";
        }
        Use.prototype.asElement = function () {
            var svg = $(document.createElementNS(Figure.Elementable.SVG_NS, this.type));
            if(this["href.baseVal"]) {
                svg.attr("href.baseVal", this.baseVal);
            }
            return $(svg);
        };
        return Use;
    })(Figure.Elementable);
    Figure.Use = Use;    
})(Figure || (Figure = {}));
//@ sourceMappingURL=svg.js.map
