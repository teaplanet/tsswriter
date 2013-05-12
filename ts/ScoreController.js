var Score;
(function (Score) {
    var WriteController = (function () {
        function WriteController($scope) {
            var _this = this;
            this.updateField = function ($scope) {
                if($scope.slalom.lanes && $scope.slalom.field) {
                    $scope.slalom.field.height = $scope.slalom.lanes[0].height;
                }
            };
            this.updateLaneHeight = function ($scope) {
                if($scope.config && $scope.config.pylon) {
                    var interval = $scope.config.pylon.interval;
                    $scope.slalom.lanes[0].height = $scope.config.pylon.num * interval + interval;
                }
            };
            this.updatePylons = function ($scope) {
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
                footmark: []
            };
            this.updateLaneHeight($scope);
            var targets = [
                "config.pylon.num", 
                "config.pylon.interval"
            ];
            for(var i in targets) {
                $scope.$watch(targets[i], function (oldValue, newValue) {
                    _this.updateLaneHeight($scope);
                    _this.updateField($scope);
                    _this.updatePylons($scope);
                });
            }
        }
        return WriteController;
    })();
    Score.WriteController = WriteController;    
})(Score || (Score = {}));
//@ sourceMappingURL=ScoreController.js.map
