/// <reference path="jquery.d.ts" />

module ILS {

	export class Slalom {

		lane: Lane;
		pylons: Pylon[];

		/**
		 * コンストラクタ
		 * @param distance パイロンの間隔
		 * @param width スラロームに必要なレーンの幅
		 * @param ghosts スラロームの残像
		 */
		constructor(
				private distance: number,
				private width: number,
				public ghosts: Ghost[]) {

			// パイロンを数える
			this.pylons = this.countPylons(this.ghosts);

			if (this.pylons.length) {
				// レーンを引く
				this.drawLane();

				// パイロンを配置
				this.spaceOut(this.pylons);

				// 残像を投影する
				this.reflect();
			}

		}

		/**
		 *
		 */
		private drawLane() {
			var length = this.distance * (this.pylons.length - 1);
			this.lane = new Lane(this.width, length);
		}

		/**
		 * 残像からパイロンを数える。
		 * @param ghosts 残像
		 * @returns Pylon[] パイロン
		 */
		private countPylons(ghosts: Ghost[]): Pylon[] {
			var count = 0;
			var pylons: Pylon[] = [];
			for (var i in this.ghosts) {
				var pos = this.ghosts[i].pos;
				pylons[pos] = { pos: pos };
				if (pos > count) {
					count = pos;
				}
			}

			if (pylons.length != count) {
				for (var n = 1; n <= count; ++n) {
					pylons[n] || (pylons[n] = { pos: n });
				}
			}
			return pylons;
		}

		/**
		 * パイロンを配置する。
		 * @param pylons
		 */
		private spaceOut(pylons: Pylon[]): void {
			for (var i in pylons) {
				var pylon = pylons[i];

				var x = this.width / 2;
				var y = this.distance * (pylon.pos - 1) + (this.distance / 2);

				// 開始位置をbottomに変更。
				y = this.lane.length - y;

				pylons[i].x = x;
				pylons[i].y = y;
			}
		}

		// 残像の座標を決定する
		private reflect(): void {
			for (var i in this.ghosts) {
				var ghost = this.ghosts[i];
				var p = this.pylons[ghost.pos];
				ghost.blades.left.x = p.x + ghost.blades.left.x;
				ghost.blades.left.y = p.y + ghost.blades.left.y;
				ghost.blades.right.x = p.x + ghost.blades.right.x;
				ghost.blades.right.y = p.y + ghost.blades.right.y;
			}
		}
	}

	/**
	 * 残像
	 */
	export class Ghost {

		/**
		 * コンストラクタ
		 * @param pos パイロン番号
		 * @param blades ブレード(1足)
		 */
		constructor(
			public pos: number,
			public blades: { left: Blade; right: Blade; }) {
		}
	}

	export interface Blade {
		x: number;
		y: number;
		deg?: number;
	}

	export interface Pylon {
		pos: number;	// パイロンの位置
		x?: number;		// 描画座標
		y?: number;		// 描画座標
	}

	export class Lane {

		/**
		 * レーン
		 * @param width 幅
		 * @param length 長さ
		 */
		constructor(
				public width: number,
				public length: number) {
		}

	}

}
