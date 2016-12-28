(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'AuthenticationService', '$firebaseAuth', 'currentAuth', '$location'];

  function LoginCtrl($scope, AuthenticationService, $firebaseAuth, currentAuth, $location) {

    $scope.partialFooter = "/htmls/partials/footer.html";
    $scope.partialNavbar = "/htmls/partials/navbar.html";
    $scope.partialLogin = "/htmls/partials/login.html";

    $scope.login = function() {
      var result = AuthenticationService.login();
    }

    $scope.logout = function() {
      AuthenticationService.logout();
    }

    if (currentAuth != null) {
      $location.url('/home');
    }

  }

})();
