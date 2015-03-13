
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
  };
});

salesTools.controller('activitiesController', function($scope, todayFactory, Activities){
  $scope.activities = Activities.items;
  $scope.item = {};

  $scope.logActivity = function(){
    var newItem = new Activities.model(this.activity);
    // console.log('newItem ',newItem);
    newItem.$save(function(loggedActivity){
      // Make sure to convert the JSON from the server
      // into a useable resource instance,
      // then push it into the model list
      todayFactory.update();
    });
  };
});


salesTools.factory('todayFactory', function($http){
  var module = {};
  module.today = null;
  module.goal = 0;
  module.todaysTotal = 0;
  module.update = function(){
    $http.get('/api/todaysStuff')
      .success(function(data){
        module.today = data;
        module.goal = data.goal;
        module.todaysTotal = data.loggedItems
        .reduce(function(total, item){
            return total + item.points;
          },0);
        module.valueProgress = Math.floor((module.todaysTotal/module.goal)*100);
        // console.log(module);
      });
  };
  module.update();
  return module;
});

// goalProgres Directive:
salesTools.directive('goalprogress', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/progressBar',
    controller: function ($scope, todayFactory, $http) {
      $scope.today = todayFactory;
    }
  };
});

salesTools.directive('todaysstuff', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/todaysStuff',
    controller: function ($scope, todayFactory, $http) {
      $scope.today = todayFactory;
    }
  };
});

