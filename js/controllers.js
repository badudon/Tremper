/**
 * Created by Ben on 10-Aug-15.
 */
var tremperControllers = angular.module('tremperControllers', ['ngAnimate']);

tremperControllers.controller('ListController', ['$scope', '$http', function ($scope, $http) {
    $http.get('js/data.json').success(function(data) {
        $scope.trempers = data;
    });
}]);

tremperControllers.controller('DetailsController', ['$scope', '$http', '$routeParams' ,function ($scope, $http, $routeParams) {
    $http.get('js/data.json').success(function(data) {
        $scope.trempers = data;
        $scope.whichItem = $routeParams.itemId;
    });
}]);

tremperControllers.controller('UserDetailsController', ['$scope', '$http', '$location' ,function ($scope, $http, $location) {
    $scope.user = {
        name: '',
        phone: '',
        gender: ''
    };

    $scope.updateUser = function(user, fromMain) {
        window.alert("UpdateUser invoked");
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userPhone", user.phone);
        localStorage.setItem("userGender", user.gender);
        localStorage.setItem("userDetailsSet", true);
        if (fromMain == true) {
            $location.path("/typeSelect");
        };

    }


    if (localStorage.getItem("userDetailsSet") != null) {
        $scope.user.name = localStorage.getItem("userName");
        $scope.user.phone = localStorage.getItem("userPhone");
        $scope.user.gender = localStorage.getItem("userGender");
        //window.alert("Details found in memory");
        //$scope.updateUser($scope.user);

    };



}]);

