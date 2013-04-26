/// <reference path="jquery.d.ts" />

module ILS {

	export class Slalom {

		constructor(public ghosts: Ghost[]) {
		}

		pylons(): Pylon[] {
			var ps = [];
			for (var i in this.ghosts) {
				ps.push({ pos: this.ghosts[i].pos });
			}
			return ps;
		}

	}

	/**
	 * 残像
	 */
	export interface Ghost {
		pos: number;		// パイロン番号
		blades: {
			left: Blade;	// 左足
			right: Blade;	// 右足
		};

	}

	export interface Blade {
		x: number;
		y: number;
		deg: number;
	}

	export interface Pylon {
		pos: number;	// パイロンの位置
		x?: number;		// 描画座標
		y?: number;		// 描画座標
	}

	export class Field {

		lanes = {};			// { name, lane }

		useLane(distance: number, name?: string, start?: string = "bottom") {
			name = name || String(distance);
			this.lanes[name] = new Lane(distance, start);
		}

	}

	export class Lane {

		width: number = 200;	// 幅
		length: number;			// 長さ

		pylons: Pylon[] = [];	// パイロン
		ghosts: Ghost[] = [];	// 残像

		/**
		 * レーン
		 * @param distance 間隔
		 * @param start 開始位置
		 */
		constructor(
			public distance: number,
			public start?: string = "bottom") {
		}

		reproduce(slalom: ILS.Slalom): void {
			this.setup(slalom.pylons());
			this.mirror(slalom.ghosts);
		}

		setup(dupPylon: Pylon[]): void {
			for (var i in dupPylon) {
				var pylon = dupPylon[i];
				var pos = pylon.pos;
				this.pylons[pos] = pylon;
			}

			var qty = this.countPylons();
			this.calcArea(qty);		// レーンの領域を決定

			if (this.pylons.length != qty) {
				for (var n = 1; n <= qty; ++n) {
					this.pylons[n] || (this.pylons[n] = { pos: n });
				}
			}
			this.spaceOut();		// パイロンの位置を決定
		}

		mirror(ghosts: Ghost[]): void {
			this.ghosts = ghosts;
			for (var i in ghosts) {
				var ghost = ghosts[i];
				var p = this.pylons[ghost.pos];
				ghost.blades.left.x = p.x + ghost.blades.left.x;
				ghost.blades.left.y = p.y + ghost.blades.left.y;
				ghost.blades.right.x = p.x + ghost.blades.right.x;
				ghost.blades.right.y = p.y + ghost.blades.right.y;
			}
		}

		private spaceOut(): void {
			for (var i in this.pylons) {
				var pylon = this.pylons[i];

				var x = this.width / 2;
				var y = this.distance * (pylon.pos - 1) + (this.distance / 2);

				switch (this.start) {
					case "top":
						// do nothing.
						break;

					case "bottom":
						y = this.length - y;
						break;

					case "left":
						x = [y, y = x][0];
						break;

					case "right":
						x = [y, y = x][0];
						x = this.length - x;
						break;
				}
				this.pylons[i].x = x;
				this.pylons[i].y = y;
			}
		}

		private countPylons() {
			var keys = Object.keys(Object(this.pylons));	// ObjectにキャストすることでTypeScriptの文法エラー回避
			var max = Math.max.apply(null, keys);
			var min = Math.min.apply(null, keys);
			return max - min + 1;
		}

		private calcArea(qty: number) {
			this.length = this.distance * qty;

			switch (this.start) {
				case "left":
				case "right":
					this.width = [ this.length, this.length = this.width][0];
			}
		}
	}

}
