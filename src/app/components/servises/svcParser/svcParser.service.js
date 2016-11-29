(function () {
    'use strict';

    angular
        .module('project')
        .service('svcParser', svcParser);

    /** @ngInject */
    function svcParser(receiver) {

        this.svcToJson = svcToJson;

        function svcToJson(apiHost) {
            return receiver.getFile(apiHost).then(function (result) {
                return csvToObj(result);
            });
        }

        function csvToObj(csv) {

            var lines = csv.split("\n");

            var result = [];

            for (var i = 0; i < lines.length; i++) {

                var currentline = lines[i].split(",");
				currentline[currentline.length-1] = currentline[currentline.length-1].replace(/(?:\r\n|\r|\n)/g, '');

                if(i == lines.length - 1 && currentline[0].length == 0) {
                    continue;
                }
                result.push(currentline);
            }

            return result; //JavaScript object
        }
    }

})();
