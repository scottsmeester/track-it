angular.module("TrackIt",[]).controller("MainCtrl",function(t){t.hello="world"}),$(document).on("ready",function(){{var t=document.querySelector(".activities");new Packery(t,{itemSelector:".activity",gutter:20})}$(document).on("click",".activity",logActivity),$(".activity").mouseenter(function(){$(this).addClass("mouseOver")}).mouseleave(function(){$(this).removeClass("mouseOver")})});var logActivity=function(){$(this).removeClass("mouseOver"),$(this).addClass("mouseClick"),that=this,setTimeout(function(){$(that).removeClass("mouseClick"),$(that).addClass("mouseOver")},40);var t=$(this).find(".activityName").text(),e=$(this).find(".activityPoints").text().split("").slice(0,1),i=$(this).parent().attr("data-id"),a={activity:t,points:parseInt(e)},o=$("span#goal").text();$.post("/logActivity/"+i,a,function(t){$("#todaysPoints").text(t.todaysTotal);var e=t.todaysTotal/o*100;$(".progress-bar").css("width",Math.floor(e)+"%").html(Math.floor(e)+"% complete!")})},timeStamp,tracked,targetCount=0,Tracked=function(t,e,i){this.name=t,this.description=e,this.points=i,this.index=targetCount,targetCount++},Day=function(t){this.day=t||setDate(day),this.runningTotal=0,this.runningPercent=0,this.log=[]},User=function(t,e){this.name=t||"",this.goal=e||25,this.activities=[]};Tracked.prototype.render=function(){return this.$el=$("#activityTemplate").clone().attr("id","").addClass(this.name.length>16?"w2":"").data("tracked",this),this.$el.find(".activityName").text(this.name),this.$el.find(".activityDesc").text(this.description),this.$el.find(".activityPoints").html("<p>"+this.points+" <span>pts.<span></p>"),this.$el},Day.prototype.renderProgress=function(t){var e=this.runningTotal+" points today - your goal: "+t+" points";return this.$el=$("<div>").addClass("goalProgress").append(e),this.$el},Day.prototype.updatePoints=function(t,e,i){return this.runningTotal=this.runningTotal+t,this.log.push({points:t,activity:e,timeStamp:i}),this.runningTotal},Day.prototype.renderLog=function(t,e,i){return this.$el=$("#logItems").clone().attr("id",""),this.$el.find(".logActivity").text(e),this.$el.find(".logTime").text(moment(i).format("h:mm a")),this.$el.find(".logPoints").text(t+" points"),this.$el},$(document).on("ready",function(){for(var t=theUser.goal,e=0;e<objTracked.length;e++)$(".activities").append(objTracked[e].render());{var i=document.querySelector(".activities");new Packery(i,{itemSelector:".activity",gutter:20})}$(".progress").append(today.renderProgress(t)),$(".activity").mouseenter(function(){$(this).addClass("mouseOver")}).mouseleave(function(){$(this).removeClass("mouseOver")}).click(function(){$(this).removeClass("mouseOver"),$(this).addClass("mouseClick"),that=this,setTimeout(function(){$(that).removeClass("mouseClick")},100),timeStamp=new Date,tracked=$(this).data("tracked"),runningTotal=today.updatePoints(tracked.points,tracked.name,timeStamp),$(".goalProgress").remove(),$(".progress").append(today.renderProgress(t)),todaysPercent=runningTotal/t*100,$(".progress-bar").css("width",todaysPercent+"%").html(parseInt(todaysPercent)+"% complete"),$(".list-group").append(today.renderLog(tracked.points,tracked.name,timeStamp))})}).on("click",".logRemove",function(){var t=theUser.goal,e=$(this).parent(),i=e.index();timeStamp=new Date;var a=today.updatePoints(-Math.abs(today.log[i].points),today.log[i].name,timeStamp);console.log("newTotal: ",a),e.remove(),$(".progress").children(".goalProgress").remove(),$(".progress").append(today.renderProgress(t)),todaysPercent=a/t*100,$(".progress-bar").css("width",todaysPercent+"%").html(parseInt(todaysPercent)+"% complete")});var theUser=new User("Scott",25),todaysDate=new Date,today=new Day(todaysDate),i,objTracked=[];for(i=0;i<arrActivities.length;i++)objTracked[i]=new Tracked(arrActivities[i].name,arrActivities[i].description,arrActivities[i].points);