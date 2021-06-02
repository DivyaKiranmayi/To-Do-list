const taskInput = document.querySelector('#new-task');

const addTask = document.querySelector('#add-task');
const tasksList = document.querySelector('.collection');
const taskForm = document.querySelector('#task-form');
const clearTasksEle = document.querySelector('#clear-tasks');
const searchTerm = document.querySelector('#filter-term');


loadEventListeners();
function loadEventListeners()
{

  document.addEventListener('DOMContentLoaded',getTasks);
  taskForm.addEventListener('submit', addTasks);
  tasksList.addEventListener('click', removeTasks);
  clearTasksEle.addEventListener('click', clearTasks);
  searchTerm.addEventListener('keyup',filterTask);
}


function addTasks(e)
{
  
  createLiAndAppendToUI(taskInput.value);
  e.preventDefault();
  storeToLocalStorage(taskInput.value);
  taskInput.value = '';
}


function storeToLocalStorage(taskName)
{
  let tasks=[];
  if(localStorage.getItem('tasks') === null)
  {
    tasks= []; 
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(taskName);
  console.log(taskName);
  localStorage.setItem('tasks',JSON.stringify(tasks));

}
function removeFromLocalStorage(taskName)
{
  let tasks=[];
  if(localStorage.getItem('tasks') === null)
  {
    tasks= []; 
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task, index)
    {
      if(task==taskName)
      {
        tasks.splice(index,1);
      }
    });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));


}

function getTasks()
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks= []; 
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    createLiAndAppendToUI(task);
  });
}



function createLiAndAppendToUI(taskName) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskName));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  link.href = '#';

  li.appendChild(link);

  tasksList.appendChild(li);

  
}
function removeTasks(e)
{
 
  const elementClicked = e.target;
  if(elementClicked.classList.contains('fa-remove'))
  {
      const link= elementClicked.parentElement;
      console.log(link);
      const linkItem =link.parentElement;
      
      removeFromLocalStorage(linkItem.textContent);
      linkItem.remove();      
  }
  

}

function clearTasks(e)
{
  while(tasksList.firstChild)
  {
    // removeFromLocalStorage(tasksList.firstChild.textContent);
    tasksList.removeChild(tasksList.firstChild);
  }
  localStorage.clear();
}

function filterTask(e)
{
    const searchItem = e.target.value.toLowerCase();

   const tasksListItems = document.querySelectorAll('.collection-item');
   tasksListItems.forEach(function(task){
     const item = task.textContent.toLowerCase();
     if(item.indexOf(searchItem) != -1)
     {
        task.style.display = 'block';
     }
     else {
        task.style.display ='none';
     }
   })
}