// JavaScript Document
angular.module('httpmodule', [])
.controller('VideoController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {
    $scope.method = 'GET';
    $scope.url = 'http://localhost:8080/video';

    $scope.getvideolist = function() {
      $scope.code = null;
      $scope.response = null;

      $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
		  chartrender(data);
		  drawpiechartlabeled(data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
    };
	
	$scope.generatelikes = function(){
		$scope.code = null;
      	$scope.response = null;
		//$scope.url = 'http://localhost:8080/video/generatelikes';
		$http({method: $scope.method, url: ($scope.url + "/generatelikes"), cache: $templateCache}).
        success(function(data, status) {
          $scope.status = status;
		}).
		error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
		});
	};
    $scope.updateModel = function(method, url) {
      $scope.method = method;
      $scope.url = url;
    };
  }]);