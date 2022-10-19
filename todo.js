const loader = document.getElementById('loader');

window.addEventListener('load',function(){
  loader.style.display = 'none';
});





showtodo();


let addtodobtn = document.getElementById('todoaddbtn');

addtodobtn.addEventListener('click',function(){
  
  let inputtext = document.getElementById('inputbox');
  
  if (inputtext.value == '') {
    alert('Please Enter To Do First');
    return;
  } else {
    
  
  
  
  let todo = localStorage.getItem('todo');
  
  if(todo == null){
    todoobj = [];
  }else{
    todoobj = JSON.parse(todo);
  }
  
  todoobj.push(inputtext.value);
  
  localStorage.setItem('todo',JSON.stringify(todoobj));
  
  inputtext.value = '';
  showtodo();
  }
});


function showtodo(){
  let todo = localStorage.getItem('todo');
  
  if (todo == null) {
    todoobj = [];
  } else {
   todoobj = JSON.parse(todo); 
  }
  
  let tododata = '';
  
  todoobj.forEach(function(element,index){
    
    tododata += `
     <div class="row">
        <div class="todotext">
          <input type="text" placeholder="${element}" readonly disabled>
        </div>
        <div class="todobtn">
          <button class="btn border border-secondary" id="${index}" type="button" onclick="deletetodo(this.id)">Delete</button>
        </div>
    </div>
    
    `
  });
  
  let showdiv = document.getElementById('showoutputdiv');
  
  if (todoobj.length != 0) {
    showdiv.innerHTML = tododata;
  } else {
    showdiv.innerHTML = 'Nothing To Show Here Add Some ToDo';
  }
  
} 


function deletetodo(id){
  let todo = localStorage.getItem('todo');
  
  if (todo == null) {
    todoobj = [];
  } else {
   todoobj = JSON.parse(todo); 
  }
  
  todoobj.splice(id, 1);
  
  localStorage.setItem('todo',JSON.stringify(todoobj));
  
  showtodo();
}


let tododeleteall = document.getElementById('tododeleteall');

tododeleteall.addEventListener('click',function(){
  
    let ch = confirm('Are you sure you want to delete all todos');
    if (ch == true) {
      localStorage.removeItem('todo');
    } else {
      return;
    }
  
  
  showtodo();
});
