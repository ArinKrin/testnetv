(function() {
    'use strict';

    angular
        .module('project')
        .factory('receiver', receiver);

    /** @ngInject */
    function receiver($log, $http) {

        var service = {
            getFile: getFile
        };

        return service;

        function getFile(apiHost) {

            return $http.get(apiHost)
                .then(getFileComplete)
                .catch(getFileFailed);

            function getFileComplete(response) {
                return response.data;
            }

            function getFileFailed(error) {
                $log.error('XHR Failed for getFile.\n' + angular.toJson(error.data, true));
            }
        }
    }
})();
