(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .filter('categoryFilter', [
      function() {
        // if (category) {
        //     console.log('category');
        // } else {
        //     console.log('www');
        // }

        return function(category) {
          var categoryName;
          var Ref = firebase.database().ref();

          Ref.child('/categories/' + category).on('value', function(snapshot) {
            // console.log(snapshot.val().name);
            categoryName = snapshot.val().name;
          }, function(errorObject) {
            console.log('The read failed: ' + errorObject.code);
          });

          return categoryName;
        };
      }
    ]);
})();
