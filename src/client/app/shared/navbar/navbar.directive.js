(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('navbarDirective', navbarDirective);

  navbarDirective.$inject = ['$location', 'AuthenticationService', '$rootScope'];

  function navbarDirective($location, AuthenticationService, $rootScope) {
    var directive = {
      bindToController: true,
      controller: navbarController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: 'assets/htmls/shared/navbar/navbar.html',
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
        $rootScope.$broadcast('newTransaction');
      }

      function manageCategories() {
        $rootScope.$broadcast('manageCategories');
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
