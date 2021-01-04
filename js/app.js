const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const feedBack = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let toDoItems = [];

const handleItem = function(itemName) {
    const items = itemList.querySelectorAll('.item');
   
    items.forEach(function(item) {
     if(item.querySelector('.item-name').textContent === itemName) {
          // TODO complete event listener
         item.querySelector('.complete-item').addEventListener('click', function () {
              item.querySelector('.item.name').classList.toggle('completed');
             this.calssList.toggle('visibility');
         })
          // TODO edit event listener
         item.querySelector('.edit-item').addEventListener('click', function () {
             itemInput.value = itemName;
             itemList.removeChild(item);
             
             toDoItems = toDoItems.filter(function (item) {
                 return item !== itemName;
             });
         });
          // TODO delete event listener
         item.querySelector('.delete-item').addEventListener('click', function () {
             debugger;
             itemList.removeChild(item);
             
             toDoItems = toDoItems.filter(function (item) {
                 return item !== itemName;
             });
             
              //showFeedback('item delete', 'success');
         });
     }   
        
   });
};

const removeItem = function(item) {
    console.log(item);
    const removeIndex = toDoItems.indexOf(item);
    console.log(removeIndex);
    toDoItems.splice(removeIndex, 1);
};

const getList = function (toDoItems) {
    itemList.innerHTML = '';
    
    toDoItems.forEach(function(item) {
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);
        handleItem(item);
    })
    
}

const getLocalStorage = function () {
const toDoStorage = localStorage.getItem('toDoItems');
if(toDoStorage === 'undefined' || toDoStorage === null) {
    toDoItems = [];
  } else {
    toDoItems = JSON.parse(toDoStorage);
    getList(toDoItems);
  }
};

const setLocalStorage = function(toDoItems) {
localStorage.setItem('toDoItems', JSON.stringify(toDoItems));    
};

getLocalStorage();

// function - add item to the List including local storage
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = itemInput.value;
    
    if(itemName.length === 0) {
        feedBack.innerHTML = 'Please enter valid value';
        feedBack.classList.add('showItem', 'alert-danger');
        setTimeout(function () {
            feedBack.classList.remove('showItem');
        }, 3000)
    } else {
        toDoItems.push(itemName);
        setLocalStorage(toDoItems);
        getList(toDoItems);
        
        // add event listener to icons
        handleItem(itemName);
    }
//    itemInput.value = '';
});

clearButton.addEventListener('click', function () {
    toDoItems = [];
    localStorage.clear();
    getList(toDoItems);
});