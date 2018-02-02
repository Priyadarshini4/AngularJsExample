var app = angular.module("myApp", ["ngRoute"]);
//factory
app.factory('GetData',function($http)
{
    return{
        movieData:function(type,passdata,response){
            var urlLink="https://app.cinemalytics.com/v1/mview/"+type+"/"+passdata+"/?auth_token=1EFAE82FE7F4F8E6813FD4FA429E5170";
        }
    }
});

//controller
app.controller('all movie',function($scope,GetData,$routeParams,$location){
    $scope.year=$routeParams.year;
    GetData.movieData('year',$routeParams.year,function(response)
    {
        $scope.movie=response;
    });
    //redirect to page
    $scope.gotoMovie=function(id){$location.path("/id"+id);
    };

    //redirect to page
    $scope.gotoMovieYear=function(year){$location.path("/year/"+year);
    };
});
//Controller
app.controller('singleMovie',function($scope,GetData,$routeParams){
    GetData.MovieData('id',$routeParams.id,function(response)
    {
        $scope.movie=response;
    });
});

//routes
app.config(function($routeProvider){
    $routeProvider
    .when("/year/:year",{
        templateUrl:"template:main.html", controller:"allmovie"

    })
    .when("/id:ID",{
        templateUrl:"template/Single.htm",controller:"SingleMovie"
    })
    .otherwise({redirectTo :'/Year/2016'});
});


