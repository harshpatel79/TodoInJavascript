var app = {};
var Todotask = []
app.myFunction = function(){
	var task = {};
    task.title = document.getElementById('ToDoTitle').value;
	task.Description = document.getElementById('Description').value;
	task.startTime = document.getElementById('datetimepicker1').value;
	task.endTime = document.getElementById('datetimepicker2').value;
	if((task.title == '') || (task.Description == '') || (task.startTime == '') || (task.endTime == '')){
		alert("Please fill in all fields.");
	}
	else{
		Todotask.push(task);
		console.log("task",task);
		console.log("Main task",Todotask);
		//document.getElementsByClassName("verify").value = "";
		$(".verify").val('');
		$('#myModalHorizontal').modal('hide');
	}

};


$( document ).ready(function() {
	$('#datetimepicker1,#datetimepicker2').datetimepicker();
});

