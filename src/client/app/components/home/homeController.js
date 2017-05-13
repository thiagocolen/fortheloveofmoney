(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$filter',
    'hotkeys',
    'currentAuth',
    'AuthenticationService',
    'FirebaseService'];

  function HomeCtrl(
    $scope,
    $firebaseArray,
    $firebaseObject,
    $filter,
    hotkeys,
    currentAuth,
    AuthenticationService,
    FirebaseService
  ) {
    $scope.logout = function () {
      console.log('logout at home');
      AuthenticationService.logout();
    };

    FirebaseService.loggedUserId();

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
