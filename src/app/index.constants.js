(function() {
  'use strict';

  angular
    .module('project')
    .constant('SYSTEM', {
          URL_CSV_DEF: 'csv/snapshot.csv',
          URL_CSV_DELTAS: 'csv/deltas.csv'
    });
})();
