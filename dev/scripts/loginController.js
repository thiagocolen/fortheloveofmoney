(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'authenticationFactory'];

  function LoginCtrl($scope, authenticationFactory) {
    $scope.partialFooter = "/htmls/partials/footer.html";
    $scope.partialNavbar = "/htmls/partials/navbar.html";
    $scope.partialLogin = "/htmls/partials/login.html";

    console.log('LoginCtrl');

    $scope.factoryTest = function(valorRecebido) {
      authenticationFactory.login();
    }
  }

})();