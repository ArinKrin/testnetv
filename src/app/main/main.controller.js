(function() {
  'use strict';

  angular
    .module('project')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, svcParser, toastr) {
    var vm = this;
  }
})();
