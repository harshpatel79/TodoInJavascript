myapp.controller('TodoController',['$scope','$rootScope','forms',function($scope,$rootScope,forms){
	$scope.showModal = false;
    $rootScope.loading = true;
    $scope.Todos = [];
    $scope.todo ={};
    $scope.getentries = function(){
        forms.getentries().then(function(result){
            $scope.Todos = [];
            var entries = result.data.entries;
            for(var i=0; i<entries.length;i++) {
                $scope.Todos.push({'title':entries[i].title,'uid':entries[i].uid,'done':entries[i].status,'text':entries[i].tododescription});
            };
           $rootScope.loading = !$rootScope.loading;
        });
    }
    $scope.getentries();
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.addOrUpdatetodo = function(todo){
        $rootScope.loading = !$rootScope.loading;
        if(todo.uid == null){
            $scope.showModal = false;
            forms.postNewEnteries(todo).then(function(result){
                $scope.getentries();
            });
            todo.todoTitle =null;
            todo.todoText =null;
        }
        if(todo.uid != null){
            $scope.showModal = false;
            forms.editEnteries(todo).then(function(result){
                $scope.getentries();
            });
            todo.todoTitle =null;
            todo.todoText =null;
        }
    };
    $scope.editTodo = function(todo,$index){
    	$scope.todo.todoTitle = todo.title;
    	$scope.todo.todoText =todo.text;
    	$scope.todo.uid =todo.uid;
    	$scope.showModal = !$scope.showModal;

    };
    $scope.doneTodo = function(todo,$index){
        $rootScope.loading = !$rootScope.loading;
    	forms.completeEnteries(todo.uid).then(function(result){
            $scope.getentries();
        });
    }
    $scope.deleteTodo = function(todo,$index){
        $rootScope.loading = !$rootScope.loading;
        forms.deleteEnteries(todo.uid).then(function(result){
            $scope.getentries();
        });
    }

}]);
