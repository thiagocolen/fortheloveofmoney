var fortheloveofmoneyControllers = angular.module('fortheloveofmoneyControllers', ['firebase', 'firebase.ref']);





fortheloveofmoneyControllers.controller("CategoriesCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref",
    function($scope, $firebaseArray, $firebaseObject, Ref) {

        $scope.categories = $firebaseArray(Ref.child('/categories'));

        $scope.saveCategory = function() {
            var list = $firebaseArray(Ref.child('/categories'));

            list.$add($scope.newCategory).then(function(ref) {
                var id = ref.key();
                list.$indexFor(id); // returns location in the array
                $scope.newCategory = '';
            });
        };

        $scope.deleteCategory = function(category) {
            $scope.categories.$remove(category);
        }

    }
]);






fortheloveofmoneyControllers.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref",
    function($scope, $firebaseArray, $firebaseObject, Ref) {

        $scope.categories = $firebaseArray(Ref.child('/categories'));
        $scope.transactions = $firebaseArray(Ref.child('/transactions'));

        $scope.saveTransaction = function() {
            var list = $firebaseArray(Ref.child('/transactions'));
            // console.log($scope.newTransaction.date.getTime());
            $scope.newTransaction.date = $scope.newTransaction.date.getTime();

            list.$add($scope.newTransaction).then(function(ref) {
                var id = ref.key();
                // list.$indexFor(id); // returns location in the array
                // console.log(id);
                $scope.newTransaction = '';
            });
        };

        $scope.deletetransaction = function(transaction) {
            $scope.transactions.$remove(transaction);
        }


        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.transactions.length; i++) {
                var transaction = $scope.transactions[i];
                total += transaction.value;
            }
            return total;
        }


        $scope.predicate = 'date';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };



    }
]);



fortheloveofmoneyControllers.filter('categoryFilter', ['Ref', function(Ref) {

    // if (category) {
    //     console.log('category');
    // } else {
    //     console.log('www');
    // }

    return function(category) {
        var categoryName;

        Ref.child('/categories/' + category).on("value", function(snapshot) {
            // console.log(snapshot.val().name);
            categoryName = snapshot.val().name;

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        return categoryName;
    };

}]);








fortheloveofmoneyControllers.controller("HomeCtrlxx", ["$scope", "$firebaseObject", "Ref",
    function($scope, $firebaseObject, Ref) {

        var syncObject = $firebaseObject(Ref.child('/categories'));
        syncObject.$bindTo($scope, "categories");

        $scope.newCategory = {};

        $scope.saveCategory = function() {

            console.log('saveCategory');
            console.log($scope.categories);
        };

    }
]);


// inject $firebaseArray into our controller
fortheloveofmoneyControllers.controller("HomeCtrlX", ["$scope", "$firebaseArray", "$firebaseObject", "Ref",
    function($scope, $firebaseArray, $firebaseObject, Ref) {

        $scope.transaction = {};

        $scope.registros = $firebaseArray(Ref);
        $scope.newValue = { "newValue-default": "NEW!" };



        $scope.saveNewRegister = function() {
            console.log('saveNewRegister');
            var list = $firebaseArray(Ref);
            list.$add($scope.newValue).then(function(ref) {
                var id = ref.key();
                console.log("added record with id " + id);
                // list.$indexFor(id); // returns location in the array
            });
        };

        // Ref.once("value", function(snapshot) {
        //     // var data = snapshot.val();
        //     // console.log('data: ', data);
        //     var categories = snapshot.child('/categories').val();
        //     console.log('categories:', categories);

        //     $scope.categories = categories;
        // });







        $scope.saveTransaction = function() {

            console.log('saveTransaction');

            var transactionList = $firebaseArray(Ref.child('Transactions'));

            console.log('transactionObjectAdded: ', $scope.transaction);
            transactionList.$add(
                $scope.transaction.date,
                $scope.transaction.description,
                $scope.transaction.selectedCategory,
                $scope.transaction.value
            );

        };







        $scope.newCategory = {};

        var categories = $firebaseArray(Ref.child('categories'));

        $scope.saveCategory = function() {
            // console.log('...savingCategory');

            categories = $firebaseArray(Ref.child('categories'));
            // console.log('categories: ', categories);

            categories.$add($scope.newCategory.name).then(function(ref) {

                categories.$add($scope.newCategory.childOf).then(function(Ref) {

                    console.log($scope.newCategory.childOf);

                    // console.log('categories...', categories);
                    // console.log('adddd.....');
                });

            });
        };




        $scope.deleteCategory = function($scope, $firebaseArray) {
            console.log('deleteCategory');
        }

    }
]);


// ##parei aqui

//     precisa fazer:
//     gravar nova categoria
//     popular select com nova categoria
//     grava nova transação
