(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$filter', 'hotkeys', 'currentAuth', 'AuthenticationService'];

  function HomeCtrl($scope, $firebaseArray, $firebaseObject, $filter, hotkeys, currentAuth, AuthenticationService) {

    $scope.logout = function() {
      console.log('logout at home');
      AuthenticationService.logout();
    }


    // var Ref = firebase.database().ref();
    // $scope.predicate = 'date';
    // $scope.reverse = true;
    // $scope.order = function(predicate) {
    //   $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    //   $scope.predicate = predicate;
    // };

    hotkeys.add({
      combo: 'alt+t',
      description: 'Add New Transaction',
      callback: function() {
        $scope.newTransaction();
      }
    });

    hotkeys.add({
      combo: 'alt+c',
      description: 'Manage Categories',
      callback: function() {
        $scope.manageCategories();
      }
    });

  }

})();