var fortheloveofmoneyControllers = angular.module('fortheloveofmoneyControllers', ['firebase', 'firebase.ref', 'chart.js']);


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


fortheloveofmoneyControllers.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref", "$filter", 
    function($scope, $firebaseArray, $firebaseObject, Ref, $filter) {

        console.log('HomeCtrl');



        Ref.child('/transactions').orderByChild("date").on("value", function(snapshot, $filter) {

            // chart-labels="labels" 
            $scope.labels = [];
            // chart-series="series"
            $scope.series = ["Series A"];
            // chart-data="data" 
            $scope.data = [];

            // chart-legend="true" 

            var line = [];
            $scope.values = [];
  

            snapshot.forEach(function(data, $filter) {                                                    
                // console.log("key: " + data.key() + " : " + data.val().date + " : " + data.val().value);

                var chave = data.key();
                var valor = data.val().value;
                var label = data.val().date;

                line.push(valor);
                console.log(line);

                // $filter('date "yyyy/MM/dd"')(label);

                $scope.labels.push(label);
                console.log($scope.labels);

            });

            $scope.data.push(line);

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });















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
                $('#tabindex-first').focus();
            });
        };

        $scope.deletetransaction = function(transaction) {
            $scope.transactions.$remove(transaction);
        };


        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.transactions.length; i++) {
                var transaction = $scope.transactions[i];
                total += transaction.value;
            }
            return total;
        };


        $scope.predicate = 'date';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };



    }
]);


fortheloveofmoneyControllers.filter('categoryFilter', ['Ref',
    function(Ref) {

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
    }
]);
