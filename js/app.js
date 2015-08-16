/**
 * Created by Ben on 10-Aug-15.
 */
var myApp = angular.module('myApp', [
    'ngRoute',
    'tremperControllers'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).
        when('/details/:itemId' ,{
            templateUrl: 'partials/details.html',
            controller: 'DetailsController'
    }).
        when('/', {
            templateUrl: 'partials/login.html',
            controller: 'UserDetailsController'
        }).
        when('/typeSelect', {
            templateUrl: 'partials/typeSelect.html',
            controller: 'UserDetailsController'
        }).
        otherwise({
            redirectTo: '/list'
    });
}]);