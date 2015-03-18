var salesTools=angular.module("SalesTools",["ngRoute","ngResource","ui.bootstrap","ngMaterial"]);salesTools.config(function(t){t.when("/",{templateUrl:"/templates/activities",controller:"activitiesController"}).when("/changeUser/",{templateUrl:"/templates/user-profile",controller:"userMgmtController"})}),salesTools.factory("Activities",function(t){var e=t("api/activities/:id",{id:"@_id"});return{model:e,items:e.query()}}),salesTools.controller("activitiesController",function(t,e,o){t.activities=o.items,t.item={},t.logActivity=function(){var t=new o.model(this.activity);t.$save(function(){e.update()})}}),salesTools.controller("userMgmtController",function(t,e){e.item={},e.item.firstname=null,e.item.lastname=null,e.item.email=null,e.item.defaultGoal=25,t.get("/api/getUser/").success(function(t){e.item.firstname=t.firstname,e.item.lastname=t.lastname,e.item.email=t.email,e.item.defaultGoal=t.defaultGoal}),e.editUser=function(){console.log(e),t.post("/api/updateUser/",this.item).success(function(){console.log("Success!")})}}),salesTools.factory("todayFactory",function(t){var e={};return e.today=null,e.goal=0,e.todaysTotal=0,e.update=function(){t.get("/api/todaysStuff").success(function(t){e.today=t,e.goal=t.goal,e.todaysTotal=t.loggedItems.filter(function(t){return t.legit}).reduce(function(t,e){return t+e.points},0),e.valueProgress=Math.floor(e.todaysTotal/e.goal*100)})},e.update(),e}),salesTools.directive("goalprogress",function(){return{restrict:"E",templateUrl:"/templates/progressBar",controller:function(t,e){t.today=e}}}),salesTools.directive("todaysstuff",function(){return{restrict:"E",templateUrl:"/templates/todaysStuff",controller:function(t,e,o){t.today=e,t.isCollapsed=!1,t.updateActivity=function(){o.put("/api/updateActivity/",{id:this.log._id}).success(function(){e.update()})}}}});