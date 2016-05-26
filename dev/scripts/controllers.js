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

        Ref.child('/transactions').orderByChild("date").on("value", function(snapshot, $filter) {

            // chart-labels="labels" 
            $scope.labels = [];
            // chart-series="series"
            $scope.series = ["CC"];
            // chart-data="data" 
            $scope.data = [];

            // chart-legend="true" 

            var line = [];
            $scope.values = [];

            snapshot.forEach(function(data) {
                // console.log("key: " + data.key() + " : " + data.val().date + " : " + data.val().value);

                var chave = data.key();
                var valor = data.val().value;
                var label = data.val().date;

                line.push(valor);
                $scope.labels.push(label.substr(0, 10));
            });

            $scope.data.push(line);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $scope.categories = $firebaseArray(Ref.child('/categories'));
        $scope.transactions = $firebaseArray(Ref.child('/transactions'));

        $scope.saveTransaction = function(type) {

            if (type == 'add') {
                console.log('adding new transaction...');

                $scope.transaction.date = $scope.dateInput.toJSON();

                $scope.transactions.$add($scope.transaction).then(function(ref) {
                    var id = ref.key();
                    // list.$indexFor(id); // returns location in the array
                    // console.log(id);
                    $scope.transaction = '';
                    $scope.dateInput = '';
                    $('#tabindex-first').focus();
                });
            }

            if (type == 'edit') {

                // var list = $firebaseArray(Ref.child('/transactions'));
                
                // var transactionRecord = $scope.transactions.getRecord($scope.transaction.$id);

            

                // var item = messages.$getRecord(someRecordKey);
                // item.user = "alanisawesome";
                // messages.$save(item).then(function() {
                  // data has been saved to our database
                // });

                console.log('saveTransaction - type: edit');
                console.log($scope.transaction.$id);            
            }
        };

        $scope.deleteTransaction = function(transaction) {
            // -----------------------------------------------
            $scope.transactions.$remove(transaction);
        };

        $scope.editTransaction = function(transaction) {
            $scope.panelControl('edit');
            
            $scope.transaction = transaction;

            var ano = Number(transaction.date.substr(0, 4));
            var mes = Number(transaction.date.substr(5, 2))-1;
            var dia = Number(transaction.date.substr(8, 2));
            $scope.dateInput = new Date(ano, mes, dia);
        };

        $scope.panelControl = function(type) {

            $scope.panelType = type;

            if (type == 'add') {
                $scope.transaction = '';
                $scope.dateInput = '';
                $scope.panelTitle = 'Add Transaction';
                $scope.openedPanel = true;
            }

            if (type == 'edit') {
                $scope.panelTitle = 'Edit Transaction';
                $scope.openedPanel = true;
            }

            if (type == 'close') {
                $scope.openedPanel = false;
                $scope.panelTitle = '';
            }

            var setFocus = function() {
                $('#tabindex-first').focus();
                console.log('openPanel');
            }

            setTimeout(setFocus, 500);
        }

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
