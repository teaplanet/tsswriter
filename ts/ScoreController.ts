/// <reference path="../d.ts/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

module ILS {

	export interface Point {
		x: number;
		y: number;
	}

	export interface Field extends Point {
		width: number;
		height: number;
	}

	export interface Lane extends Point {
		width: number;
		height: number;
	}

	export interface Pylon extends Point {
	}

	export interface Blades {
		left: Blade;
		right: Blade;
	}

	export interface Blade extends Point {
		deg: number[];	// [角度, 中心座標x, 中心座標y]
	}

}

module Score {

	export interface Scope extends ng.IScope {
		config: {
			pylon: {
				num: number;
				nums: number[];
				interval: number;
				intervals: number[];
			};
		};
		slalom: {
			field: ILS.Field;
			lanes: ILS.Lane[];
			pylons: ILS.Pylon[];
			footmark: ILS.Blades[];
		};

		update: (pylonNum: number) => void;
		onChangePylonNum: ($scope: Scope, pylonNum: number) => void;
	}

	export class WriteController {

		constructor($scope: Scope) {
			$scope.config = {
				pylon: {
					num: 10,
					nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
					interval: 150,
					intervals: [140, 150]
				}
			};
			$scope.slalom = {
				lanes: [{ x: 0, y: 0, width: 200, height: 0 }],
				field: {
					x: 0,
					y: 0,
					width: 200,
					height: 200
				},
				pylons: [],
				footmark: []
			};
			this.updateLaneHeight($scope);

			var targets = ["config.pylon.num", "config.pylon.interval"];
			for (var i in targets) {
				$scope.$watch(targets[i], (oldValue: number, newValue: number) => {
					this.updateLaneHeight($scope);
					this.updateField($scope);
					this.updatePylons($scope);
				});
			}
//			$scope.$watch("config.pylon.num", (oldValue: number, newValue: number) => {
//				this.updateLaneHeight($scope);
//				this.updateField($scope);
//				this.updatePylons($scope);
//			});
//
//			$scope.$watch("config.pylon.interval", (oldValue: number, newValue: number) => {
//				this.updateLaneHeight($scope);
//				this.updateField($scope);
//				this.updatePylons($scope);
//			});
		}

		private updateField = ($scope: Scope) => {
			if ($scope.slalom.lanes && $scope.slalom.field) {
				$scope.slalom.field.height = $scope.slalom.lanes[0].height;
			}
		};

		private updateLaneHeight = ($scope: Scope) => {
			if ($scope.config && $scope.config.pylon) {
				var interval = $scope.config.pylon.interval;
				$scope.slalom.lanes[0].height = $scope.config.pylon.num * interval + interval;
			}
		};

		private updatePylons = ($scope: Scope) => {
			var num = $scope.config.pylon.num;
			var interval = $scope.config.pylon.interval;
			var x = 100;
			var y = num * interval;

			var newPylons = [];
			for (var i=0; i<num; ++i) {
				newPylons[i] = { x: x, y: y };
				y -= interval;
			}
			$scope.slalom.pylons = newPylons;
		};

	}

}
