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
    $http.get('/getTrempers').success(function(data) {
        $scope.trempers = data;
        $scope.whichItem = $routeParams.itemId;
    });
}]);

tremperControllers.controller('TremperDetailsController', ['$scope', '$http', '$routeParams' ,function ($scope, $http, $routeParams) {
    $http.get('/getTrempers').success(function(data) {
        $scope.trempers = data;
        $scope.whichItem = $routeParams.itemId;
    });
}]);

tremperControllers.controller('TrempistDetailsController', ['$scope', '$http', '$routeParams' ,function ($scope, $http, $routeParams) {
    $http.get('/getTrempists').success(function(data) {
        $scope.trempists = data;
        $scope.whichItem = $routeParams.itemId;
    });
}]);

tremperControllers.controller('UserDetailsController', ['$scope', '$http', '$location', 'Data' ,function ($scope, $http, $location, Data) {

    $scope.user = Data;

    if (localStorage.getItem("userDetailsSet") != null) {
        $scope.user.name = localStorage.getItem("userName");
        $scope.user.phone = localStorage.getItem("userPhone");
        $scope.user.gender = localStorage.getItem("userGender");
        $scope.user.exists = true;
        Data.name =  $scope.user.name;
        Data.phone = $scope.user.phone;
        Data.gender = $scope.user.gender;
        Data.exists = true;
        //window.alert("Details found in memory");
        //$scope.updateUser($scope.user);

    };

//    if (!$scope.user.exists) {
//        $scope.user = {
//            name: '',
//            phone: '',
//            gender: ''
//        };
//        window.alert("user was undefined");
//
//    } else {
//
//    }


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
}]);

tremperControllers.controller('TremperController', ['$scope', '$http', '$routeParams', 'Data' ,function ($scope, $http, $routeParams, Data) {

    $http.get('/getTrempists').success(function(data) {
        $scope.trempists = data;


        $scope.whichItem = $routeParams.itemId;
    });

    $scope.user = Data;

    $scope.datetime = new Date();

    $scope.myTremper = {
        name : $scope.user.name,
        gender : $scope.user.gender,
        phone : $scope.user.phone,
        from : '',
        to : '',
        details : '',
        type : 'tremper',
        hour : $scope.datetime.getHours(),
        minutes : $scope.datetime.getMinutes(),
        date : $scope.datetime,
        time : ''
    }

    $scope.updateTremperList = function(myTremper) {
        myTremper.time = new Date(myTremper.date.getFullYear(), myTremper.date.getMonth(), myTremper.date.getDate(), myTremper.hour, myTremper.minutes, 0,0);
        if (myTremper.time < $scope.datetime) {
            window.alert("You cannot add a tremp in the past \n(Until further development in quantum physics)");
        }
        else {
            $http.post('/newTremper', $scope.myTremper).
                then(function(response) {
                    window.alert("Post added");
                }, function(response) {
                    window.alert("Error: " + response);
                });
        }

    };
}]);

tremperControllers.controller('TrempistController', ['$scope', '$http', '$routeParams', 'Data' ,function ($scope, $http, $routeParams, Data) {

    $http.get('/getTrempers').success(function(data) {
        $scope.trempers = data;


        $scope.whichItem = $routeParams.itemId;
    });

    $scope.user = Data;

    $scope.datetime = new Date();

    $scope.myTrempist = {
        name : $scope.user.name,
        gender : $scope.user.gender,
        phone : $scope.user.phone,
        from : '',
        to : '',
        details : '',
        type : 'trempist',
        hour : $scope.datetime.getHours(),
        minutes : $scope.datetime.getMinutes(),
        date : $scope.datetime,
        time : ''
    }

    $scope.updateTrempistsList = function(myTrempist) {
        myTrempist.time = new Date(myTrempist.date.getFullYear(), myTrempist.date.getMonth(), myTrempist.date.getDate(), myTrempist.hour, myTrempist.minutes, 0,0);
        if (myTrempist.time < $scope.datetime) {
            window.alert("You cannot request a tremp in the past \n(Until further development in quantum physics)");
        }
        else {
            $http.post('/newTrempist', $scope.myTrempist).
                then(function(response) {
                    window.alert("Post added");
                }, function(response) {
                    window.alert("Error: " + response);
            });
        }

    };
}]);

