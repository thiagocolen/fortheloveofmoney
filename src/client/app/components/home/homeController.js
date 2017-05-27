(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [
    '$rootScope',
    'hotkeys',
    'currentAuth'];

  function HomeCtrl(
    $rootScope,
    hotkeys,
    currentAuth
  ) {
    var vm = this;
    vm.currentAuth = currentAuth;

    hotkeys.add({
      combo: 'alt+t',
      description: 'Add New Transaction',
      callback: function () {
        $rootScope.$broadcast('newTransaction');
      }
    });

    hotkeys.add({
      combo: 'alt+c',
      description: 'Manage Categories',
      callback: function () {
        $rootScope.$broadcast('manageCategories');
      }
    });
  }
})();
