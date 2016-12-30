(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('footerDirective', footerDirective);

  function footerDirective() {
    var directive = {
      link: link,
      restrict: 'EA',
      templateUrl: '/htmls/directives/footer.html',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
