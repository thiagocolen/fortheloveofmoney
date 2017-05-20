(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [
    '$firebaseArray',
    '$firebaseObject',
    '$filter',
    'hotkeys',
    'currentAuth'];

  function HomeCtrl(
    $firebaseArray,
    $firebaseObject,
    $filter,
    hotkeys,
    currentAuth
  ) {
    var vm = this;
    vm.currentAuth = currentAuth;

    hotkeys.add({
      combo: 'alt+t',
      description: 'Add New Transaction',
      callback: function () {
        $scope.newTransaction();
      }
    });

    hotkeys.add({
      combo: 'alt+c',
      description: 'Manage Categories',
      callback: function () {
        $scope.manageCategories();
      }
    });
  }
})();
