(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('chartDirective', chartDirective);

  function chartDirective() {
    var directive = {
      link: link,
      restrict: 'EA',
      templateUrl: '/htmls/directives/chart.html',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

      console.log('chart - directive');

      var Ref = firebase.database().ref();
      scope.currentBalance = 0;

      Ref.child('/transactions').orderByChild("date").on("value", function(snapshot, $filter) {
        // chart-labels="labels" 
        scope.labels = [];
        // chart-series="series"
        scope.series = ["Conta-Corrente"];
        // chart-data="data" 
        scope.data = [];
        // chart-legend="true" 
        scope.chartColours = ['#333745', '#77C4D3', '#DAEDE2', '#F6F792', '#EA2E49', '#333745', '#77C4D3'];
        // chart-colours

        var line = [];
        scope.values = [];

        scope.currentBalance = 0;

        snapshot.forEach(function(data) {
          // console.log("The " + data.key + " score is " + data.val().date);

          var chave = data.key;
          scope.currentBalance = data.val().value + scope.currentBalance;
          var label = data.val().date;

          line.push(scope.currentBalance);
          scope.labels.push(label.substr(0, 10));
          console.log(scope.currentBalance);
        });

        scope.data.push(line);
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    }
  }
})();
