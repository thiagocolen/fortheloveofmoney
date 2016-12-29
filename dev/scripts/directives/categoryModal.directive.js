(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('categoryModalDirective', categoryModalDirective);

  categoryModalDirective.$inject = ['$firebaseArray'];

  function categoryModalDirective($firebaseArray) {
    var directive = {
      bindToController: true,
      controller: categoryModalController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        categoryType: '='
      },
      templateUrl: '/htmls/directives/category-modal.html'
    };

    categoryModalController.$inject = ['$scope'];

    function categoryModalController($scope) {
      var vm = this;

      var Ref = firebase.database().ref();
      vm.categories = $firebaseArray(Ref.child('/categories'));

      vm.panelCategory = {};
      vm.panelCategoryAux = {};
      vm.categoryType = '';
      vm.editCategory = editCategory;
      vm.saveCategory = saveCategory;
      vm.deleteCategory = deleteCategory;
      vm.cleanCategoryForm = cleanCategoryForm;

      ////////////

      function editCategory(category) {
        vm.categoryType = 'edit';
        vm.panelCategory.name = category.name;
        vm.panelCategoryAux.id = category.$id;

        $('#categoryForm-firstField').focus();
      };

      function saveCategory() {
        if (vm.categoryType == 'add' && $scope.categoryForm.$valid == true) {
          var list = $firebaseArray(Ref.child('/categories'));

          list.$add(vm.panelCategory).then(function() {
            vm.cleanCategoryForm();
            $('#categoryForm-firstField').focus();
          });
        }

        if (vm.categoryType == 'edit' && $scope.categoryForm.$valid == true) {
          var categoryRecord = vm.categories.$getRecord(vm.panelCategoryAux.id);
          categoryRecord.name = vm.panelCategory.name;
          vm.categories.$save(categoryRecord).then(function() {
            vm.panelCategoryAux = {};
            vm.panelCategory = {};
          });
        }

        vm.categoryType = 'add';
      };

      function deleteCategory(category) {
        vm.categories.$remove(category);        
      };

      function cleanCategoryForm() {
        console.log('cleanCategoryForm');
        vm.panelCategory = {};
        vm.panelCategoryAux = {};
      };
    }

    return directive;

  }
})();
