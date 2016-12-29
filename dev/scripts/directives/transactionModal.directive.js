(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('transactionModalDirective', transactionModalDirective);

  transactionModalDirective.$inject = ['$firebaseArray'];

  function transactionModalDirective($firebaseArray) {
    var directive = {
      bindToController: true,
      controller: transactionModalController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        transactionType: '='
      },
      templateUrl: '/htmls/directives/transaction-modal.html'
    };

    transactionModalController.$inject = ['$scope'];

    function transactionModalController($scope) {
      var vm = this;

      var Ref = firebase.database().ref();

      vm.categories = $firebaseArray(Ref.child('/categories'));
      vm.transactions = $firebaseArray(Ref.child('/transactions'));
      vm.panelTransaction = {};
      vm.panelTransactionAux = {};
      vm.saveTransaction = saveTransaction;
      vm.cleanTransactionForm = cleanTransactionForm;
      vm.deleteTransaction = deleteTransaction;
      vm.editTransaction = editTransaction;
      vm.panelTitle = 'New Transaction';
      vm.transactionType = '';

      ////////////

      function saveTransaction(type) {
        console.log('saveTransaction');
        if (type == 'add' && $scope.transactionForm.$valid == true) {
          vm.panelTransaction.date = vm.panelTransactionAux.dateInput.toJSON();
          vm.transactions.$add(vm.panelTransaction).then(function(ref) {
            vm.panelTransactionAux = {};
            vm.panelTransaction = {};
            $('#transactionModal').modal('hide');
          });
        }
        if (type == 'edit' && $scope.transactionForm.$valid == true) {
          var transactionRecord = vm.transactions.$getRecord(vm.panelTransactionAux.id);
          transactionRecord.date = vm.panelTransactionAux.dateInput.toJSON();
          transactionRecord.description = vm.panelTransaction.description;
          transactionRecord.value = vm.panelTransaction.value;
          transactionRecord.category = vm.panelTransaction.category;

          vm.transactions.$save(transactionRecord).then(function() {
            vm.panelTransactionAux = {};
            vm.panelTransaction = {};
            $('#transactionModal').modal('hide');
          });
        }
      }

      function cleanTransactionForm() {
        $('#transactionModal').on('hidden.bs.modal', function(e) {
          vm.panelTransactionAux = {};
          vm.panelTransaction = {};
        });
      }

      function deleteTransaction(transaction) {
        vm.transactions.$remove(transaction);
      }

      function editTransaction(transaction) {
        vm.transactionType = 'edit';
        vm.panelTitle = 'Edit Transaction';

        vm.panelTransactionAux.id = transaction.$id;

        var ano = Number(transaction.date.substr(0, 4));
        var mes = Number(transaction.date.substr(5, 2)) - 1;
        var dia = Number(transaction.date.substr(8, 2));
        vm.panelTransactionAux.dateInput = new Date(ano, mes, dia);

        vm.panelTransaction.description = transaction.description;
        vm.panelTransaction.value = transaction.value;
        vm.panelTransaction.category = transaction.category;

        $('#transactionModal').modal('show');
        $('#transactionModal').on('shown.bs.modal', function(e) {
          $('#transactionForm-firstField').focus();
        });
      }
    }

    return directive;

  }
})();
