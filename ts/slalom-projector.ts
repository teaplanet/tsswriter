/// <reference path="jquery.d.ts" />
/// <reference path="svg.ts" />
/// <reference path="slalom.ts" />

$(() => {
	var area = $(".ils-slalom");
	area.each(function(){
		var field = $(this);
		var recorder = new ILS.View.Recorder(field);
		var interval = Number(field.attr("data-interval")) || 150;
		var width = Number(field.attr("data-lane-width")) || 200;
		var ghosts = recorder.ghosts;

		field.find("p[data-pos]").attr("style", "display: none");
		var slalom = new ILS.Slalom(interval, width, ghosts);
		var projector = new ILS.View.Projector(field, slalom);
		projector.reflect();
	});

});

module ILS {

	export module View {

		export class Recorder {

			ghosts: ILS.Ghost[];

			constructor(field: JQuery) {
				this.ghosts = this.cut(field);
			}

			private cut(field: JQuery): ILS.Ghost[] {
				var ghosts: ILS.Ghost[] = [];
				var pylons = field.find("p[data-pos]");

				var mineBlades = (p: JQuery): { left: ILS.Blade; right: ILS.Blade; } => {
					var bladeInfo = (blade: string) => {
						var info = blade.split(",");
						return {
							x: Number(info[0]),
							y: Number(info[1]),
							deg: Number(info[2] || 0)
						}

					};
					var left = bladeInfo(p.data("bladeLeft"));
					var right = bladeInfo(p.data("bladeRight"));
					return {
						left: { x: left.x, y: left.y, deg: left.deg || 0 },
						right: { x: right.x, y: right.y, deg: right.deg || 0 }
					}
				};

				pylons.each(function() {
					var pylon = $(this);
					var pos = pylon.data("pos");
					var blades = mineBlades(pylon);

					var ghost = new ILS.Ghost(pos, blades);
					ghosts.push(ghost);
				});
				return ghosts;
			}

		}

		export class Projector {

			private svg: JQuery;

			constructor(private field: JQuery, private slalom: ILS.Slalom) {
				this.svg = SVG.svg();
				this.field.prepend(this.svg);
			}

			public reflect() {
				this.reflectLane(this.slalom.lane);
				this.reflectStart(this.slalom.lane);
				this.reflectPylon(this.slalom.pylons);
				this.reflectGhost(this.slalom.ghosts);
			}

			private reflectLane(lane: ILS.Lane) {
				var rect = SVG.rect({
					width: lane.width,
					height: lane.length,
					fill: "beige",
					rx: 0,
					ry: 0
				});
				this.svg.append(rect.asElement());
			}

			private reflectStart(lane: ILS.Lane) {
				var start = SVG.text({
					text: "START",
					x: lane.width / 2,
					y: lane.length + 15,
					anchor: "middle"
				});
				this.svg.append(start.asElement());
			}

			private reflectPylon(pylons: ILS.Pylon[]) {
				for (var i in pylons) {
					var pylon = pylons[i];
					var circle = SVG.circle({
						r: 10,
						cx: pylon.x,
						cy: pylon.y,
						fill: "maroon"
					});
					this.svg.append(circle.asElement());
				}
			}

			private reflectGhost(ghosts: ILS.Ghost[]) {
				var blade = (blade: ILS.Blade, color: string) => {
					var lcx = blade.x;
					var lcy = blade.y;
					return SVG.ellipse({
						rx: 5,
						ry: 10,
						cx: lcx,
						cy: lcy,
						fill: color,
						deg: [blade.deg, lcx, lcy]
					});
				};

				var gear = new ILS.View.GearFactory();
				for (var i in ghosts) {
					var ghost = ghosts[i];
					var bladesElem = gear.blades(ghost.blades);

					this.svg.append(bladesElem.left);
					this.svg.append(bladesElem.right);
				}
			}

		}

		export class GearFactory {

			blades(blades: { left: ILS.Blade; right: ILS.Blade; }): { left: JQuery; right: JQuery; } {
				var makeBladeElement = (b: ILS.Blade, color: string) => {
					var deg = (() => {
						if (!deg) {
							return null;
						}
						var d = Number(b.deg);
						return "rotate(" + d + ", " + b.x + ", " + b.y + ")";
					});

					// グループ
					var g = SVG.MakeElement("g", {
						transform: deg(b.deg)
					});

					// ブレード
					var blade = SVG.MakeElement("ellipse", {
						rx: 5,
						ry: 10,
						cx: b.x,
						cy: b.y,
						fill: color
					});

					// 踵側
					var hole = SVG.MakeElement("circle", {
						r: 4,
						cx: b.x,
						cy: b.y + 4,
						fill: "black"
					})

					// 構造化
					g.append(blade);
					g.append(hole);
					return g;
				};
				var left = makeBladeElement(blades.left, "indianred");
				var right = makeBladeElement(blades.right, "lightblue");

				return { left: left, right: right };
			}

		}
	}

}
