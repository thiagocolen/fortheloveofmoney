(function() {
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
      scope: {},
      templateUrl: '/htmls/directives/chart.html'
    };

    chartDirectiveController.$inject = ['$scope'];

    function chartDirectiveController($scope) {
      var vm = this;

      // issue - será que tem um jeito melhor de fazer isso?
      FirebaseService.allTransactions().then(function (data) {
        vm.transactions = data;
      });

      vm.currentBalance = 0;
      vm.predicate = 'date';
      vm.reverse = true;

      vm.order = order;
      vm.editTransaction = editTransaction;
      vm.deleteTransaction = deleteTransaction;
      vm.order = order;

      var Ref = firebase.database().ref();
      Ref.child('/transactions').orderByChild("date").on("value", function(snapshot, $filter) {
        // chart-labels="labels" 
        vm.labels = [];
        // chart-series="series"
        vm.series = ["Conta-Corrente"];
        // chart-data="data" 
        vm.data = [];
        // chart-legend="true" 
        vm.chartColours = ['#333745', '#77C4D3', '#DAEDE2', '#F6F792', '#EA2E49', '#333745', '#77C4D3'];
        // chart-colours

        var line = [];
        vm.values = [];

        vm.currentBalance = 0;

        snapshot.forEach(function(data) {
          // console.log("The " + data.key + " score is " + data.val().date);

          var chave = data.key;
          vm.currentBalance = data.val().value + vm.currentBalance;
          var label = data.val().date;

          line.push(vm.currentBalance);
          vm.labels.push(label.substr(0, 10));
          // console.log(vm.currentBalance);
        });

        vm.data.push(line);
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      ////////////////

      function order(predicate) {
        vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
        vm.predicate = predicate;
      }

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

    }

    return directive;

  }
})();
