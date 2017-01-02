(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .config(['ChartJsProvider', function(ChartJsProvider) {
      // Configure all charts
      ChartJsProvider.setOptions({
        chartColors: ['red', 'green'],
        responsive: true
      });
      // Configure all line charts
      ChartJsProvider.setOptions('line', {
        showLines: false
      });
    }]);

})();
