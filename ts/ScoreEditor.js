var Score;
(function (Score) {
    var scoreEditor = angular.module("scoreEditor", []).controller("EditorCtrl", [
        "$scope", 
        function ($scope) {
            $scope.config = {
                pylon: {
                    num: 10,
                    nums: [
                        1, 
                        2, 
                        3, 
                        4, 
                        5, 
                        6, 
                        7, 
                        8, 
                        9, 
                        10, 
                        11, 
                        12, 
                        13, 
                        14, 
                        15, 
                        16, 
                        17, 
                        18, 
                        19, 
                        20
                    ],
                    interval: 150,
                    intervals: [
                        140, 
                        150
                    ]
                }
            };
            $scope.slalom = {
                lanes: [
                    {
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 0
                    }
                ],
                field: {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 200
                },
                pylons: [],
                footmarks: []
            };
            var updateLaneHeight = function ($scope) {
                if($scope.config && $scope.config.pylon) {
                    var interval = $scope.config.pylon.interval;
                    $scope.slalom.lanes[0].height = $scope.config.pylon.num * interval + interval;
                }
            };
            var updateField = function ($scope) {
                if($scope.slalom.lanes && $scope.slalom.field) {
                    $scope.slalom.field.height = $scope.slalom.lanes[0].height;
                }
            };
            var updatePylons = function ($scope) {
                var num = $scope.config.pylon.num;
                var interval = $scope.config.pylon.interval;
                var x = 100;
                var y = num * interval;
                var newPylons = [];
                for(var i = 0; i < num; ++i) {
                    newPylons[i] = {
                        x: x,
                        y: y
                    };
                    y -= interval;
                }
                $scope.slalom.pylons = newPylons;
            };
            var targets = [
                "config.pylon.num", 
                "config.pylon.interval"
            ];
            for(var i in targets) {
                $scope.$watch(targets[i], function (oldValue, newValue) {
                    updateLaneHeight($scope);
                    updateField($scope);
                    updatePylons($scope);
                });
            }
            updateLaneHeight($scope);
        }    ]).directive("masterFootmark", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem.draggable({
                    cursor: "move",
                    scroll: true,
                    grid: [
                        5, 
                        5
                    ],
                    helper: "clone",
                    stop: function (e, item) {
                        var x = item.position.left;
                        var y = item.position.top;
                        scope.$apply(function () {
                            scope.slalom.footmarks.push({
                                foot: attr.masterFootmark,
                                x: x,
                                y: y,
                                deg: [
                                    0, 
                                    0, 
                                    0
                                ]
                            });
                        });
                    }
                });
            }
        };
    }).directive("footmark", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                $(elem).click(function () {
                    $(this).toggleClass("anglable");
                });
                $(elem).draggable({
                    cursor: "move",
                    scroll: true,
                    grid: [
                        5, 
                        5
                    ],
                    stop: function (e, item) {
                        var x = item.position.left;
                        var y = item.position.top;
                        scope.$apply(function () {
                        });
                    }
                });
            }
        };
    });
})(Score || (Score = {}));
//@ sourceMappingURL=ScoreEditor.js.map
