/// <reference path="../d.ts/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../d.ts/DefinitelyTyped/jqueryui/jqueryui.d.ts" />
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

	export interface Blade extends Point {
		foot: string;	// "left" or "right"
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
			footmarks: ILS.Blade[];
		};

		update: (pylonNum: number) => void;
		onChangePylonNum: ($scope: Scope, pylonNum: number) => void;
	}

	var scoreEditor = angular
		.module("scoreEditor", [])
		.controller("EditorCtrl", [<any>"$scope", function($scope: Scope){
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
				footmarks: []
			};
			var updateLaneHeight = ($scope: Scope) => {
				if ($scope.config && $scope.config.pylon) {
					var interval = $scope.config.pylon.interval;
					$scope.slalom.lanes[0].height = $scope.config.pylon.num * interval + interval;
				}
			};

			var updateField = ($scope: Scope) => {
				if ($scope.slalom.lanes && $scope.slalom.field) {
					$scope.slalom.field.height = $scope.slalom.lanes[0].height;
				}
			};


			var updatePylons = ($scope: Scope) => {
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

			var targets = ["config.pylon.num", "config.pylon.interval"];
			for (var i in targets) {
				$scope.$watch(targets[i], (oldValue: number, newValue: number) => {
					updateLaneHeight($scope);
					updateField($scope);
					updatePylons($scope);
				});
			}

			updateLaneHeight($scope);
		}])
	.directive("footmark", function(){
		return {
			restrict: "A",
			link: function(scope, elem, attr) {
				elem.draggable({
					// properties
					cursor: "move",
					scroll: true,
					grid: [5, 5],
					helper: "clone",

					// functions
					stop: function(e, item){
						var x = item.position.left;
						var y = item.position.top;

						scope.$apply(() => {
							scope.slalom.footmarks.push({
								foot: attr.footmark,
								x: x,
								y: y,
								deg: [0, 0, 0]
							});
						});
					}
				});
			}
		};
	});

}
