$(document).ready(function(){
  
  //add html function
function appendToList(blocks) {
var list = [];
var content, block;
for(var i in blocks){
block = blocks[i];
content = '<a href="#" data-block="'+block+'"><img src="delete.png" width="15px"></a>'+'<a href="/blocks/' +block+'">'+block+'</a>'
;
list.push($('<li>', { html: content }));
}

$('.block-list').append(list);

}


//get initial residents
$.get('/blocks', appendToList);

  
//add new block jquery
$('form').on('submit',function(event){
  event.preventDefault();
  var form = $(this);
  var blockData = form.serialize();

//post new name to server
  $.ajax({
  type: 'POST', url: '/blocks', data: blockData
})
.error(function(){
  alert("Invalid entry")
  })
.success(function(blockName){
  appendToList([blockName]);
  form.trigger('reset');
});
});


//delete blocks
$('.block-list').on('click', 'a[data-block]', function(event){
  if(!confirm('Are you sure ?')){
    return false;
  }
  var target = $(event.currentTarget);

  $.ajax({
    type: "DELETE", url:'/blocks/' + target.data('block')
  }).done(function() {
    target.parents('li').remove();

  });

});

});
