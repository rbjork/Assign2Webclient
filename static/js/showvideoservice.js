// JavaScript Document
var app = angular.module('httpmodule', []);
app.controller("VideoController",['$scope','$http','$q',
	function($scope, $http, $q){
		$scope.method = 'GET';
    	$scope.url = 'http://localhost:8080/video';
		$scope.generatevideolist = function(){
			var request = $http({
                        method: "get",
                        url: "http://localhost:8080/video/generatelikes",
                        params: {
                            action: "get"
                        }
                    });
 
           $scope.data = request.then( handleSuccess, handleError ) ;
		};
		
		$scope.getvideolist = function(){
					$http({
                        method: "get",
                        url: "http://localhost:8080/video",
                        params: {
                            action: "get"
                        }
                    }).success(function(data, status) {
						  $scope.status = status;
						  $scope.data = data;
						  chartrender(data);
						  drawpiechartlabeled(data);
						}).
						error(function(data, status) {
						  $scope.data = data || "Request failed";
						  $scope.status = status;
					  });
 
           //$scope.data = request.then( handleSuccess, handleError ) ;
		   //chartrender($scope.data);
		  // drawpiechartlabeled($scope.data);
		};
		
		function handleError( response ) {
 
                    // The API response from the server should be returned in a
                    // nomralized format. However, if the request was not handled by the
                    // server (or what not handles properly - ex. server error), then we
                    // may have to normalize it on our end, as best we can.
                    if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) {
 
                        return( $q.reject( "An unknown error occurred." ) );
 
                    }
 
                    // Otherwise, use expected error message.
                    return( $q.reject( response.data.message ) );
 
          };
 
 
                // I transform the successful response, unwrapping the application data
                // from the API response payload.
         function handleSuccess( response ) {
 				
                return( response.data );
 
         };
	}
]);