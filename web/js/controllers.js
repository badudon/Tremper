/**
 * Created by Ben on 10-Aug-15.
 */
var tremperControllers = angular.module('tremperControllers', ['ngAnimate']);

tremperControllers.controller('TremperDetailsController', ['$scope', '$http', '$routeParams', 'Data','State', '$location' ,function ($scope, $http, $routeParams, Data,State, $location) {

    $scope.user = Data;
    $scope.isDeleteButtonVisible = false;
    State.TrempistSearchActive = true;


    $http.get('/getTrempers').success(function(data) {
        $scope.trempers = data;
        $scope.whichItem = $routeParams.itemId;
        $scope.isDeleteButtonVisible = ($scope.trempers[$scope.whichItem].name == $scope.user.name) &&
            ($scope.trempers[$scope.whichItem].phone == $scope.user.phone);
    });


    $scope.deleteFromServer = function() {

        $http.post('/deleteTremper', $scope.trempers[$scope.whichItem]).
            then(function(response) {
                alertify.log("Post Removed");
            }, function(response) {
                alertify.log("Error: " + response.data);
            });

        $location.path("/trempist");
    };
}]);

tremperControllers.controller('TrempistDetailsController', ['$scope', '$http', '$routeParams', 'Data','State', '$location', function ($scope, $http, $routeParams, Data,State, $location) {

    $scope.user = Data;
    $scope.isDeleteButtonVisible = false;
     State.TremperSearchActive = true;


    $http.get('/getTrempists').success(function(data) {
        $scope.trempists = data;
        $scope.whichItem = $routeParams.itemId;
        $scope.isDeleteButtonVisible = ($scope.trempists[$scope.whichItem].name == $scope.user.name) &&
            ($scope.trempists[$scope.whichItem].phone == $scope.user.phone);
    });


    $scope.deleteFromServer = function() {
        //details = {
        //    "user" : $scope.user.name,
        //    "time" : $scope.trempists[$scope.whichItem].time
        //};
        $http.post('/deleteTrempist', $scope.trempists[$scope.whichItem]).
            then(function(response) {
                alertify.log("Post Removed");
            }, function(response) {
                alertify.log("Error: " + response.data);
            });

        $location.path("/tremper");
    };
}]);

<<<<<<< HEAD
tremperControllers.controller('landingPageController', ['$scope', '$http', '$location', 'Data','State' , '$interval' ,function ($scope, $http, $location, Data,State,$interval) {
    var decrement = function(){ 
        $scope.landingPageOff = false;
    }
    if(State.landingPageActive){
        $scope.landingPageOff = true;
        $interval(decrement,2500,1);
    }
      
    
=======
tremperControllers.controller('landingPageController', ['$scope', '$http', '$location', 'Data' , '$interval' ,function ($scope, $http, $location, Data,$interval) {
    var decrement = function(){
        $scope.landingPageOff = false;
    }

    $scope.landingPageOff = true;
    $interval(decrement,2500,1);
>>>>>>> aryeh1/master




}]);
tremperControllers.controller('EmptyController', ['$scope', '$http', '$location', 'Data' ,function ($scope, $http, $location, Data) {}]);

tremperControllers.controller('UserDetailsController', ['$scope', '$http', '$location', 'Data' ,function ($scope, $http, $location, Data) {

    $scope.user = Data;


    $scope.updateUser = function (user, fromMain) {
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
        $scope.user.exists = true;
        Data.name = $scope.user.name;
        Data.phone = $scope.user.phone;
        Data.gender = $scope.user.gender;
        Data.exists = true;
        $scope.updateUser($scope.user, true);
    };

    $scope.userDataEntered = function() {
        return !(($scope.user.name != '') && ($scope.user.phone != '') && ($scope.user.gender != ''))
    }

}]);

tremperControllers.controller('TremperController', ['$scope', '$http', '$routeParams', 'Data','State', function ($scope, $http, $routeParams, Data,State) {



    $http.get('/getTrempists').success(function(data) {
        $scope.trempists = data;


        $scope.whichItem = $routeParams.itemId;
    });
    State.landingPageActive = false;


    $scope.updateUser = function (user) {
        localStorage.setItem("userName", $scope.myTremper.name);
        localStorage.setItem("userPhone", $scope.myTremper.phone);
        localStorage.setItem("userGender", $scope.myTremper.gender);
        localStorage.setItem("userDetailsSet", true);
        Data.name = $scope.myTremper.name;
        Data.phone = $scope.myTremper.phone;
        Data.gender = $scope.myTremper.gender;
        alertify.log("Details Saved");
    };

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
        minutes : $scope.datetime.getMinutes() + 1,
        date : $scope.datetime,
        time : ''
    };

    if (localStorage.getItem("userDetailsSet") != null) {
        $scope.myTremper.name = localStorage.getItem("userName");
        $scope.myTremper.phone = localStorage.getItem("userPhone");
        $scope.myTremper.gender = localStorage.getItem("userGender");
    };


    $scope.TremperActive = false;
<<<<<<< HEAD
    $scope.TremperSearchActive = State.TremperSearchActive;
    $scope.TremperUserUpdate = false;


=======
    $scope.TremperSearchActive = false;
    $scope.TremperUserUpdate = false;

>>>>>>> aryeh1/master
    $scope.trempDataEntered = function() {
        return !(($scope.myTremper.from != '') && ($scope.myTremper.to != ''));
    };

    $scope.userDataEntered = function() {
        return !(($scope.myTremper.name != '') && ($scope.myTremper.phone != '') && ($scope.myTremper.gender != ''));
    };


    $scope.updateTremperList = function(myTremper) {
        myTremper.time = new Date(myTremper.date.getFullYear(), myTremper.date.getMonth(), myTremper.date.getDate(), myTremper.hour, myTremper.minutes, 0,0);
        if (myTremper.time < $scope.datetime) {
            alertify.log("You cannot add a tremp in the past \n(Until further development in quantum physics)");
        }
        else {
            $http.post('/newTremper', $scope.myTremper).
                then(function(response) {
                    alertify.log("Post Added");
                }, function(response) {
                    alertify.log("Error: " + response.data);
                });
        }

    };
}]);

tremperControllers.controller('TrempistController', ['$scope', '$http', '$routeParams', 'Data' ,'State',function ($scope, $http, $routeParams, Data,State) {

    $http.get('/getTrempers').success(function(data) {
        $scope.trempers = data;


        $scope.whichItem = $routeParams.itemId;
    });
    State.landingPageActive = false;
    $scope.updateUser = function (user) {
        localStorage.setItem("userName", $scope.myTrempist.name);
        localStorage.setItem("userPhone", $scope.myTrempist.phone);
        localStorage.setItem("userGender", $scope.myTrempist.gender);
        localStorage.setItem("userDetailsSet", true);
        Data.name = $scope.myTrempist.name;
        Data.phone = $scope.myTrempist.phone;
        Data.gender = $scope.myTrempist.gender;
        alertify.log("Details Saved");
    };

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
        minutes : $scope.datetime.getMinutes() + 1,
        date : $scope.datetime,
        time : ''
    };

    if (localStorage.getItem("userDetailsSet") != null) {
        $scope.myTrempist.name = localStorage.getItem("userName");
        $scope.myTrempist.phone = localStorage.getItem("userPhone");
        $scope.myTrempist.gender = localStorage.getItem("userGender");
    };

    $scope.TrempistActive = false;
<<<<<<< HEAD
    $scope.TrempistUserUpdate = false;
    $scope.TrempistSearchActive = State.TrempistSearchActive;
=======
    $scope.TrempistSearchActive = false;
    $scope.TrempistUserUpdate = false;
>>>>>>> aryeh1/master

    $scope.trempDataEntered = function() {
        return !(($scope.myTrempist.from != '') && ($scope.myTrempist.to != ''));
    }

    $scope.userDataEntered = function() {
        return !(($scope.myTrempist.name != '') && ($scope.myTrempist.phone != '') && ($scope.myTrempist.gender != ''));
    }

    $scope.updateTrempistsList = function(myTrempist) {
        myTrempist.time = new Date(myTrempist.date.getFullYear(), myTrempist.date.getMonth(), myTrempist.date.getDate(), myTrempist.hour, myTrempist.minutes, 0,0);
        if (myTrempist.time < $scope.datetime) {
            alertify.log("You cannot request a tremp in the past \n(Until further development in quantum physics)");
        }
        else {
            $http.post('/newTrempist', $scope.myTrempist).
                then(function(response) {
                    alertify.log("Post Added");
                }, function(response) {
                    alertify.log("Error: " + response);
                });
        }

    };
}]);

