(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('navbarDirective', navbarDirective);

  navbarDirective.$inject = ['$location', 'AuthenticationService'];

  function navbarDirective($location, AuthenticationService) {
    var directive = {
      bindToController: true,
      controller: navbarController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: '/htmls/directives/navbar.html',
      scope: {}
    };

    navbarController.$inject = ['$scope'];

    function navbarController($scope) {
      var vm = this;

      vm.newTransaction = newTransaction;
      vm.manageCategories = manageCategories;
      vm.logout = logout;
      vm.signOutNavbarState = signOutNavbarState;

      //////////////

      function newTransaction() {
        $scope.$parent.transactionType = 'add';

        $('#transactionModal').modal('show');
        $('#transactionModal').on('shown.bs.modal', function(e) {
          $('#transactionForm-firstField').focus();
        });
      }

      function manageCategories() {
        $scope.$parent.categoryType = 'add';

        $('#categoryModal').modal('show');
        $('#categoryModal').on('shown.bs.modal', function(e) {
          $('#categoryForm-firstField').focus();
        });
      }

      function logout() {
        AuthenticationService.logout();
      }

      function signOutNavbarState () {
        if ($location.url() === '/login') {
          return true;
        }
      }
    }

    return directive;

  }
})();
