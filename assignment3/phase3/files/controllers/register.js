var myApp = angular.module('registerApp', []);

myApp.controller('userctrl', ['$scope', function($scope) {
   console.log("Hello");
    
    var user = {
        name:"will", 
        email:"will@gmail.com", 
        pass:"123"
    }

    $scope.name = user.name;
    $scope.email = user.email;

    $scope.registerbt = function(){
        console.log("register function called");
        $scope.name = 'Wenfeng';
        $scope.email = "wenfeng@gmail.com";
      
    };

     
}]);
