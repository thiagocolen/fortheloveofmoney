(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('transactionManagerDirective', transactionManagerDirective);

  transactionManagerDirective.$inject = [
    '$firebaseArray',
    'FirebaseService'
  ];

  function transactionManagerDirective(
    $firebaseArray,
    FirebaseService
  ) {
    var directive = {
      bindToController: true,
      controller: transactionModalController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        currentAuth: '='
      },
      templateUrl: 'assets/htmls/shared/transactions/transactions.html'
    };

    transactionModalController.$inject = ['$scope'];

    function transactionModalController($scope) {
      var vm = this;

      vm.panelTransaction = {};
      vm.panelTransactionAux = {};
      vm.panelTitle = 'New Transaction';

      // issue - será que tem um jeito melhor de fazer isso?
      $scope.$watch('vm.currentAuth', function (current, original) {
        FirebaseService.allCategories(vm.currentAuth).then(function (data) {
          vm.categories = data;
        });
      });

      vm.newTransaction = newTransaction;
      vm.editTransaction = editTransaction;
      vm.saveTransaction = saveTransaction;
      vm.deleteTransaction = deleteTransaction;
      vm.closeTransactionModal = closeTransactionModal;

      $scope.$on('newTransaction', function (event, arg) {
        vm.newTransaction();
      });

      $scope.$on('editTransaction', function (event, arg) {
        vm.editTransaction(arg);
      });

      $scope.$on('deleteTransaction', function (event, arg) {
        vm.deleteTransaction(arg);
      });

      $scope.$on('closeTransactionModal', function (event, arg) {
        vm.closeTransactionModal();
      });


      // //////////


      function newTransaction() {
        vm.panelTitle = 'New Transaction';
        vm.transactionType = 'newTransaction';
        openTransactionModal();
      }

      function editTransaction(transaction) {
        vm.panelTitle = 'Edit Transaction';
        vm.transactionType = 'editTransaction';

        vm.panelTransactionAux.id = transaction.$id;

        var ano = Number(transaction.date.substr(0, 4));
        var mes = Number(transaction.date.substr(5, 2)) - 1;
        var dia = Number(transaction.date.substr(8, 2));
        vm.panelTransactionAux.dateInput = new Date(ano, mes, dia);

        vm.panelTransaction.description = transaction.description;
        vm.panelTransaction.value = transaction.value;
        vm.panelTransaction.category = transaction.category;

        openTransactionModal();
      }

      function saveTransaction(type) {
        if ($scope.transactionForm.$valid == true) {
          var transaction = {};
          transaction.panelTransaction = vm.panelTransaction;
          transaction.panelTransactionAux = vm.panelTransactionAux;
          FirebaseService.saveTransaction(type, transaction, vm.currentAuth);
        }
      }

      function deleteTransaction(transactionId) {
        FirebaseService.deleteTransaction(transactionId);
      }

      function closeTransactionModal() {
        $('#transactionModal').modal('hide');
        vm.panelTransaction = {};
        vm.panelTransactionAux = {};
      }

      function openTransactionModal() {
        $('#transactionModal').modal('show');
        $('#transactionModal').on('shown.bs.modal', function (e) {
          $('#transactionForm-firstField').focus();
        });
      }
    }

    return directive;
  }
})();
