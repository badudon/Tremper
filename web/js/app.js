/**
 * Created by Ben on 10-Aug-15.
 */
var myApp = angular.module('myApp', [
    'ngRoute',
    'tremperControllers'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

        when('/details_tremper/:itemId' ,{
            templateUrl: 'partials/details_tremper.html',
            controller: 'TremperDetailsController'
        }).
        when('/details_trempist/:itemId' ,{
            templateUrl: 'partials/details_trempist.html',
            controller: 'TrempistDetailsController'
        }).
        when('/', {
            templateUrl: 'partials/login.html',
            controller: 'UserDetailsController'
        }).
        when('/typeSelect', {
            templateUrl: 'partials/typeSelect.html',
            controller: 'landingPageController'
        }).
        when('/trempist', {
            templateUrl: 'partials/trempist.html',
            controller: 'TrempistController'
        }).
        when('/tremper', {
            templateUrl: 'partials/tremper.html',
            controller: 'TremperController'
        }).
        otherwise({
            redirectTo: 'partials/login.html'
    });
}]);

myApp.user = {
    name : '',
    phone : '',
    gender : '',
    exists : false
};


myApp.factory('Data', function() {
        return myApp.user;
    });


