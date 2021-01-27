var totalTasks =  function () {
  var num;
  if ($('#complete').hasClass('d-none')) {
    num = $('#active li').length;
  } else {
    num = $('#complete li').length;
  }
  $('#total').text(' '+num);
}

btnDone = '<button class="btn btn-outline-success btn-sm py-0 mx-1 complete">Done!</button>';
btnNotDone = '<button class="btn btn-outline-secondary btn-sm float-right py-0 incomplete">Not done</button>';
btnRemove = '<div class="float-right"><button class="btn btn-outline-danger btn-sm mx-1 py-0 remove">x</button>';

$(document).on("turbolinks:load", function () {
  //Index all tasks
  if ($('.static_pages.index').length > 0) {
    indexTasks();
  }

  //Add new task
  $(window).keydown('input', function(){
    if(event.key === "Enter") {
      var newTask = $('input').val();
      if (newTask){
        postTask(newTask, function(response){
          var htmlString = '<li class="list-group-item" id='+response.task.id+'>'+newTask+'<div class="float-right">'+btnRemove+btnDone+'</div></li>'
          $('#active').html(htmlString);

          totalTasks();

          $('input').val('');
        });
      }
    }
  });
  $(document).on('click', '.remove', function(){
    var id = $(this).closest('li').attr('id');
    deleteTask(id);
    $(this).closest('li').remove();
    totalTasks();
  });


  $(document).on('click', '.complete', function(){
    var task = $(this).closest('li').text().slice(0, $(this).closest('li').text().indexOf('x'));
    var id = $(this).closest('li').attr('id');
    var htmlString = '<li class="list-group-item" id="' + id + '">' + task + '<div class="float-right">'+btnRemove+btnNotDone+'</div></li>';
    markComplete(id);
    $('#complete').html(htmlString);

    $(this).closest('li').remove();
    totalTasks();
  });

  $(document).on('click', '.incomplete', function(){
    var task = $(this).closest('li').text().slice(0, $(this).closest('li').text().indexOf('x'));
    var id = $(this).closest('li').attr('id');
    var htmlString = '<li class="list-group-item" id='+id+'">'+task+'<div class="float-right">'+btnRemove+btnDone+'</div></li>';
    markActive(id);
    $('#active').html(htmlString);

    $(this).closest('li').remove();
    totalTasks();
  });

  var input = false;
  $(document).on('click', '#foot div:last-child p', function(){
    $('ul').toggleClass('d-none');
    var span1 = $('span:first').text();
    var span2 = $('span:last').text();
    $('span:first').text(span2);
    $('span:last').text(span1);
    if (!input) {
      input = $('input').detach();
    } else {
      $('#foot').before(input);
      input = false;
    }
    indexTasks();
    totalTasks();
  })
});
