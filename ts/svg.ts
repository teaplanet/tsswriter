/// <reference path="jquery.d.ts" />

class SVG {

	static SVG_NS = "http://www.w3.org/2000/svg";

	static MakeElement(type: string, attr?: {}): JQuery {
		var svg = $(document.createElementNS(Figure.Elementable.SVG_NS, type));
		for (var name in attr) {
			var value = attr[name];
			if (value) svg.attr(name ,value);
		}
		return svg;
	}

	static MakeElementOld(type: string, values: { name: string; value: any; }[]): JQuery {
		var svg = $(document.createElementNS(Figure.Elementable.SVG_NS, type));
		for (var i in values) {
			var value = values[i];
			var name = value.name;
			var value = value.value;
			if (value) svg.attr(name ,value);
		}
		return svg;
	}

	static svg() {
		return $(document.createElementNS(SVG_NS, "svg"));
	}

	static rect(attr: {
				width: number;
				height: number;
				fill?: string;
				rx?: number;
				ry?: number;
				deg?: number[];
			}): Figure.Rect {
		return new Figure.Rect(attr.width, attr.height, attr.fill, attr.rx, attr.rx, attr.deg);
	}

	static circle(attr: {
				r: number;
				cx?: number;
				cy?: number;
				fill?: string;
				deg?: number[];
			}): Figure.Circle {
		return new Figure.Circle(attr.r, attr.cx, attr.cy, attr.fill, attr.deg);
	}

	static ellipse(attr: {
				rx: number;
				ry: number;
				cx?: number;
				cy?: number;
				fill?: string;
				deg?: number[];
			}): Figure.Ellipse {
		return new Figure.Ellipse(attr.rx, attr.ry, attr.cx, attr.cy, attr.fill, attr.deg);
	}

	static text(attr: {
				text?: string;
				x: number;
				y: number;
				fontSize?: number;
				fontFamily?: string;
				anchor?: string;
				deg?: number[];
			}): Figure.Text {
		return new Figure.Text(attr.text, attr.x, attr.y, attr.fontSize, attr.fontFamily, attr.anchor, attr.deg);
	}

}

module Figure {

	export interface Rotatable {
		deg: number[];
	}

	export interface Coord {
		x: number;
		y: number;
	}

	export class Elementable implements Coord, Rotatable {
		static SVG_NS = "http://www.w3.org/2000/svg";
		type: string;
		x: number;
		y: number;
		deg: number[];

		asElement(): JQuery {
			throw new Error("must be override.");
		}

		makeRotateAttrAsString(deg: number[]) {
			if (deg && deg[0]) {
				var d = deg[0];
				var x = deg[1] || 0;
				var y = deg[2] || 0;
				return "rotate(" + d + ", " + x + ", " + y + ")";
			}
			return null;
		}

	}

	export class Rect extends Figure.Elementable {
		type = "rect";

		constructor(public width: number,
					public height: number,
					public fill?: string,
					public x?: number,
					public y?: number,
					public deg?: number[]) {
			super();
		}

		asElement(): JQuery {
			return SVG.MakeElementOld(this.type, [
				{ name: "width", value: this.width },
				{ name: "height", value: this.height },
				{ name: "fill", value: this.fill },
				{ name: "x", value: this.x },
				{ name: "y", value: this.y },
				{ name: "transform", value: super.makeRotateAttrAsString(this.deg) }
			]);
		}
	}

	export class Circle extends Figure.Elementable {
		type = "circle";

		constructor(public r: number,
					public x?: number,
					public y?: number,
					public fill?: string,
					public deg?: number[]) {
			super();
		}

		asElement(): JQuery {
			return SVG.MakeElementOld(this.type, [
				{ name: "r", value: this.r },
				{ name: "cx", value: this.x },
				{ name: "cy", value: this.y },
				{ name: "fill", value: this.fill },
				{ name: "transform", value: super.makeRotateAttrAsString(this.deg) }
			]);
		}
	}

	export class Ellipse extends Figure.Elementable {
		type = "ellipse";

		constructor(public rx: number,
					public ry: number,
					public x?: number,
					public y?: number,
					public fill?: string,
					public deg?: number[]) {
			super();
		}

		asElement(): JQuery {
			return SVG.MakeElementOld(this.type, [
				{ name: "rx", value: this.rx },
				{ name: "ry", value: this.ry },
				{ name: "cx", value: this.x },
				{ name: "cy", value: this.y },
				{ name: "fill", value: this.fill },
				{ name: "transform", value: super.makeRotateAttrAsString(this.deg) }
			]);
		}
	}

	export class Text extends Figure.Elementable {
		type = "text";

		constructor(public text: string,
					public x: number,
					public y: number,
					public fontSize?: number,
					public fontFamily?: string,
					public anchor?: string,
					public deg?: number[]) {
			super();
		}

		asElement(): JQuery {
			var text = SVG.MakeElementOld(this.type, [
				{ name: "x", value: this.x },
				{ name: "y", value: this.y },
				{ name: "font-size", value: this.fontSize },
				{ name: "font-family", value: this.fontFamily },
				{ name: "text-anchor", value: this.anchor },
				{ name: "transform", value: super.makeRotateAttrAsString(this.deg) }
			]);
			text.text(this.text);
			return text;
		}
	}

	export class Use extends Figure.Elementable {
		type = "use";

		//		use.href.baseVal = linkId;
		constructor(public baseVal: string) {
			super();
		}

		asElement(): JQuery {
			var svg = $(document.createElementNS(Figure.Elementable.SVG_NS, this.type));
			if (this["href.baseVal"]) svg.attr("href.baseVal", this.baseVal);
			return $(svg);
		}
	}

}
