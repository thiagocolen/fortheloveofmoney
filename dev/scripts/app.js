//app.js 
console.log('I\'m a app.js and i was loaded, and it\'s for de love of money app');


var fortheloveofmoney = angular.module('fortheloveofmoney', [
    'ngRoute',
    'fortheloveofmoneyControllers'
]);


fortheloveofmoney.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'htmls/views/home.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);