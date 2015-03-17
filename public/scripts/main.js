
var salesTools = angular.module('SalesTools', ['ngRoute','ngResource', 'ui.bootstrap']);

salesTools.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/activities',
      controller: 'activitiesController'
    })
    .when('/changeUser/', {
      templateUrl: '/templates/user-profile',
      controller: 'userMgmtController'
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

// salesTools.factory('GetUser', function($resource){
//   var model = $resource(
//     'api/getUser/:id',
//     {id: '@_id'}
//     );
//   return {
//     model: model,
//     items: model.query(),
//   };
// });

salesTools.controller('activitiesController', function($scope, todayFactory, Activities){
  $scope.activities = Activities.items;
  $scope.item = {};

  $scope.logActivity = function(){
    var newItem = new Activities.model(this.activity);
    newItem.$save(function(loggedActivity){
      // Make sure to convert the JSON from the server
      // into a useable resource instance,
      // then push it into the model list
      todayFactory.update();
    });
  };
});

salesTools.controller('userMgmtController', function($http, $scope){
  // $scope.user = GetUser.items;
  // $scope.item = {};
  $scope.item = {};
  $scope.item.firstname = null;
  $scope.item.lastname = null;
  $scope.item.email = null;
  $scope.item.defaultGoal = 25;
  $http.get('/api/getUser/:id')
    .success(function(data){
      $scope.item.firstname = data.firstname;
      $scope.item.lastname = data.lastname;
      $scope.item.email = data.email;
      $scope.item.defaultGoal = data.defaultGoal;
    });
    $scope.editUser = function(){
      // $http.post('/api/updateUser/', )
      console.log('this.user: ',this.item);

    };
  // $scope.item = ChangeUser.model.get({_id: $routeParams.id});
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
        // console.log(module.today);
        module.goal = data.goal;
        module.todaysTotal = data.loggedItems
        .filter(function(item){
          return item.legit;
        })
        .reduce(function(total, item){
            return total + item.points;
          },0);

        module.valueProgress = Math.floor((module.todaysTotal/module.goal)*100);
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
      $scope.isCollapsed = false;
      $scope.updateActivity = function(){
          // console.log('hello',this);
        $http.put('/api/updateActivity/', {id: this.log._id})
          .success(function(data){
            todayFactory.update();
          });
      };
    }
  };
});