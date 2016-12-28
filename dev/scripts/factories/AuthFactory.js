(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .factory('Auth', Auth);

  Auth.$inject = ['$firebaseAuth'];

  function Auth($firebaseAuth) {
    return $firebaseAuth();
  }

})();
