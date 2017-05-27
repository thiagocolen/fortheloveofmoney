(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('navbarDirective', navbarDirective);

  navbarDirective.$inject = ['$location', '$rootScope', 'AuthenticationService'];

  function navbarDirective($location, $rootScope, AuthenticationService) {
    var directive = {
      bindToController: true,
      controller: navbarController,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: 'assets/htmls/shared/navbar/navbar.html',
      scope: {
        currentAuth: '='
      }
    };

    navbarController.$inject = ['$scope'];

    function navbarController($scope) {
      /* eslint no-invalid-this: 0*/
      var vm = this;

      vm.newTransaction = newTransaction;
      vm.manageCategories = manageCategories;
      vm.openHelperModal = openHelperModal;
      vm.logout = logout;
      vm.signOutNavbarState = signOutNavbarState;

      // ////////////

      function newTransaction() {
        $rootScope.$broadcast('newTransaction');
      }

      function manageCategories() {
        $rootScope.$broadcast('manageCategories');
      }

      function logout() {
        AuthenticationService.logout();
      }

      function openHelperModal() {
        $rootScope.$broadcast('openHelperModal');
      }

      function signOutNavbarState() {
        if ($location.url() === '/login') {
          return true;
        }
      }
    }

    return directive;
  }
})();
