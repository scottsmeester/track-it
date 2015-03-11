
var salesTools = angular.module('SalesTools', ['ngRoute','ngResource']);

salesTools.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/activities',
      controller: 'activitiesController'
    });
});

salesTools.factory('Activities', function($resource){
  var model = $resource(
    'api/activities/:id',
    {id: '@_id'}
    );
  return {
    model: model,
    items: model.query(),
    // update: function (id, update) { model.update(id, )}
  };
});

salesTools.controller('activitiesController', function($scope, Activities){
  $scope.activities = Activities.items;
  // Activites.update()
});

salesTools.factory('progressFactory', function($http){
  $http.get('/api/progress')
    .success(function(data, status, headers, config) {
      console.log(arguments);
    });
    return {};
});

salesTools.controller('progressController', function($scope, progressFactory){
  console.log(progressFactory);
  $scope.progress = progressFactory.items;
});

// News Item Directive:
salesTools.directive('progress', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/progressBar',
    controller: function ($scope, $http) {
      $http.get('/api/progress')
        .success(function(data, status, headers, config) {
          console.log(arguments);
          $scope.progress = data;
          $scope.valueProgress = Math.floor((data.todaysTotal/data.goal)*100);
        });
    }
  };
});
