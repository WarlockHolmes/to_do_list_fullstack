$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var indexTasks = function (errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response) {
      var active = response.tasks.map(function(task) {
        if (!task.completed) {
          return '<li class="list-group-item" id='+task.id+'>'+task.content+'<div class="float-right">'+btnRemove+btnDone+'</div></li>';
        }
      });
      var complete = response.tasks.map(function(task) {
        if (task.completed) {
          return '<li class="list-group-item" id='+task.id+'>'+task.content+'<div class="float-right">'+btnRemove+btnNotDone+'</div></li>';
        }
      });
      $('#active').html(active);
      $('#complete').html(complete);
      totalTasks();
    },
    error: errorCB
  }

  $.ajax(request);
};

var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

var deleteTask = function (id, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: 'api/tasks/'+id+'?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

var markComplete = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/'+id+'/mark_complete?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

var markActive = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/'+id+'/mark_active?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}
