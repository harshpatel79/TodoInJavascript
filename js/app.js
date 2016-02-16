var app = {};
var Todotask = [];
app.status = function(){
	setInterval(function(){
		for (var i = 0; i < Todotask.length; i++) {
		   if(Todotask[i].status == false){
		   	  var taskendTime = Todotask[i].endTime;
		   	  var Endtime = Date.parse(taskendTime);
		   	  var currentTime = Date();
		   	  currentTime =Date.parse(currentTime);
		   	  var difference = Endtime-currentTime;
		   	  if(difference < -1){
		   	  	 var d = document.getElementById("task"+i);
                 d.className += " timegone";
		   	  }
		   	  else if(difference < 24*60*60*1000){
		   	  	 var d = document.getElementById("task"+i);
                 d.className += " onedaytogo";
		   	  }
		   }
		 }(i);
	 }, 100);
}
app.appenddonetask = function(taskid){
	console.log(taskid);
	var taskelement = document.getElementById('donetasks');
    var newdiv = document.createElement('div');
    var divIdName = 'donetask'+ taskid;
    newdiv.setAttribute('id',divIdName);
    newdiv.setAttribute('class','donetask');
    var Innercontent = '<div class="tasktitle"><h4>Task title</h4><p id="tasktitle'+taskid+'">'+Todotask[taskid].title+'</p></div>';
    	Innercontent +='<div class="taskdescription"><h4>Task Description</h4><p id="taskdescription'+taskid+'">'+Todotask[taskid].Description+'</p></div>' ;
    	Innercontent += '<div class="taskstartTime"><h4>Task start time</h4><p id="taskstartTime'+taskid+'">'+Todotask[taskid].startTime+'</p></div>' ;
    	Innercontent += '<div class="taskendTime"><h4>Task end time</h4><p id="taskendTime'+taskid+'">'+Todotask[taskid].endTime+'</p></div>' ;
    newdiv.innerHTML = Innercontent;
    taskelement.appendChild(newdiv);
    var list = document.getElementById("pendingtasks");
    var childNodes = document.getElementsByClassName("task");
    for (var i = 0; i < childNodes.length; i++) {
	    var childNodesid = childNodes[i].id.match(/\d+$/)[0];
	    if(childNodesid == taskid){
		    list.removeChild(list.childNodes[i]);
		    break
	    }
	};
};
app.completeFunction =function(e){
	var taskid = e;
	Todotask[taskid].status = true;
	app.appenddonetask(taskid);
}
app.EditFunction =function(e){
	var taskid = e;
	document.getElementById('ToDoTitle').value = Todotask[taskid].title;
	document.getElementById('Description').value = Todotask[taskid].Description;
	document.getElementById('datetimepicker11').value = Todotask[taskid].startTime;
	document.getElementById('datetimepicker22').value = Todotask[taskid].endTime;
	document.getElementById('hiddenid').value = Todotask[taskid].id;
	$('#myModalHorizontal').modal('show');
};
app.appendtask =function(task){
	var taskelement = document.getElementById('pendingtasks');
    var newdiv = document.createElement('div');
    var divIdName = 'task'+ task.id;
    newdiv.setAttribute('id',divIdName);
    newdiv.setAttribute('class','task');
    var Innercontent = '<div class="tasktitle"><h4>Task title</h4><p id="tasktitle'+task.id+'">'+task.title+'</p></div>';
    	Innercontent +='<div class="taskdescription"><h4>Task Description</h4><p id="taskdescription'+task.id+'">'+task.Description+'</p></div>' ;
    	Innercontent += '<div class="taskstartTime"><h4>Task start time</h4><p id="taskstartTime'+task.id+'">'+task.startTime+'</p></div>' ;
    	Innercontent += '<div class="taskendTime"><h4>Task end time</h4><p id="taskendTime'+task.id+'">'+task.endTime+'</p></div>' ;
    	Innercontent += '<div class="EditTask" id="EditTask'+task.id+'" onclick="app.EditFunction('+ task.id+')">Edit</div>' ;
    	Innercontent += '<div class="completedtask" id="taskid'+task.id+'" onclick="app.completeFunction('+ task.id+')">Completed</div>' ;
    newdiv.innerHTML = Innercontent;
    taskelement.appendChild(newdiv);
};
app.addtask = function(){
	var task = {};
    task.title = document.getElementById('ToDoTitle').value;
	task.Description = document.getElementById('Description').value;
	task.startTime = document.getElementById('datetimepicker11').value;
	task.endTime = document.getElementById('datetimepicker22').value;
	task.hiddenid = document.getElementById('hiddenid').value;
	if((task.title == '') || (task.Description == '') || (task.startTime == '') || (task.endTime == '')){
		alert("Please fill in all fields.");
	}
	else{
		if(task.hiddenid == ''){
			task.id=Todotask.length;
			task.status=false;
			Todotask.push(task);
			var imputsElement = document.getElementsByClassName("verify");
			for (var i = 0; i < imputsElement.length; i++) {
			    imputsElement[i].value='';
			}
			$('#myModalHorizontal').modal('hide');
			app.appendtask(task);
			app.status();
		}
		else{
			Todotask[task.hiddenid].title = task.title;
			Todotask[task.hiddenid].Description = task.Description;
			Todotask[task.hiddenid].startTime = task.startTime;
			Todotask[task.hiddenid].endTime = task.endTime;
			document.getElementById('tasktitle'+task.hiddenid).innerHTML= task.title;
			document.getElementById('taskdescription'+task.hiddenid).innerHTML= task.Description;
			document.getElementById('taskstartTime'+task.hiddenid).innerHTML= task.startTime;
			document.getElementById('taskendTime'+task.hiddenid).innerHTML= task.endTime;
			var imputsElement = document.getElementsByClassName("verify");
			for (var i = 0; i < imputsElement.length; i++) {
			    imputsElement[i].value='';
			}
			$('#myModalHorizontal').modal('hide');
			console.log(Todotask)
		}
	}
};
$( document ).ready(function() {
	$('#datetimepicker1,#datetimepicker2').datetimepicker();
});

