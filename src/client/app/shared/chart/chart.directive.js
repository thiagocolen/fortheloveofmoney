(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('chartDirective', chartDirective);

  chartDirective.$inject = ['$firebaseArray', '$rootScope', 'FirebaseService'];

  function chartDirective($firebaseArray, $rootScope, FirebaseService) {
    var directive = {
      bindToController: true,
      controller: chartDirectiveController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        currentAuth: '='
      },
      templateUrl: 'assets/htmls/shared/chart/chart.html'
    };

    chartDirectiveController.$inject = ['$scope'];

    function chartDirectiveController($scope) {
      var vm = this;

      vm.predicate = 'date';
      vm.reverse = true;

      vm.editTransaction = editTransaction;
      vm.deleteTransaction = deleteTransaction;
      vm.order = order;
      vm.renderChart = renderChart;

      $scope.$watch('vm.currentAuth', function (current, original) {
        vm.renderChart();
      });

      $scope.$on('renderChart', function (event, arg) {
        vm.renderChart();
      });

      // //////////////

      function editTransaction(transaction) {
        $rootScope.$broadcast('editTransaction', transaction);
      }

      function deleteTransaction(transactionId) {
        $rootScope.$broadcast('deleteTransaction', transactionId);
      }

      function order(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
      }

      function renderChart() {
        console.log('renderChart()');
        // issue - será que tem um jeito melhor de fazer isso?
        FirebaseService.chartData(vm.currentAuth).then(function (data) {
          vm.series = ['Conta-Corrente'];
          vm.chartColors = [
            '#333745',
            '#77C4D3',
            '#DAEDE2',
            '#F6F792',
            '#EA2E49',
            '#333745',
            '#77C4D3'
          ];
          vm.line = [];
          vm.line.push(data.line);
          vm.currentBalance = data.currentBalance;
          vm.labels = data.labels;
        });
        // issue - será que tem um jeito melhor de fazer isso?
        FirebaseService.allTransactions(vm.currentAuth).then(function (data) {
          vm.transactions = data;
        });
      }
    }

    return directive;
  }
})();
