(function () {
    'use strict';

    angular
        .module('project')
        .directive('mainTable', mainTable);

    /** @ngInject */
    function mainTable() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/directives/mainTable/mainTable.html',
            scope: {},
            controller: MainTableController
        };

        return directive;

        /** @ngInject */
        function MainTableController(svcParser, SYSTEM, $scope, $timeout) {
            // var vm = this;
            var apiHost = SYSTEM.URL_CSV_DEF;
            var apiUpdateHost = SYSTEM.URL_CSV_DELTAS;
            $scope.model = [];
            $scope.updateData = [];

            svcParser.svcToJson(apiHost).then(function (data) {
                $scope.heading = data.slice(0, 1);
                $scope.model = data.slice(1);
            });

            $scope.startUpdate = function () {
                svcParser.svcToJson(apiUpdateHost).then(function (data) {
                    $scope.updateData = data;
                    updateTable();
                });
            };

            function updateTable(rowIndex, deffer) {
                if (!rowIndex || rowIndex >= $scope.updateData.length) {
                    rowIndex = 0;
                }
                $timeout(function () {
                    var nextSettings = renderTable(rowIndex);
                    updateTable(nextSettings.nextIndex, nextSettings.deffer);
                }, deffer)
            }

            function renderTable(rowIndex) {
                var tmp = 0;
                for (rowIndex; rowIndex < $scope.updateData.length; rowIndex++) {
                    if ($scope.updateData[rowIndex].length == 1) {
                        var deffer = $scope.updateData[rowIndex][0];
                        rowIndex++;
                        tmp = 0;
                        return {"nextIndex": rowIndex, "deffer": deffer}
                    }
                    for (var j = 0; j < $scope.updateData[rowIndex].length; j++) {
                        if ($scope.updateData[rowIndex][j]) {
                            $scope.model[tmp][j] = $scope.updateData[rowIndex][j];
                        }
                    }
                    tmp++;
                }
            }
        }
    }

})();
