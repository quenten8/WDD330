let list = document.getElementById('list');

/*Stores last clicked filter*/
let setFilter = '';

if(localStorage.getItem('items')==null) {
    /*Create empty array and local storage*/
    var items = [];
    localStorage.setItem("items", JSON.stringify(items));
} else {
    /*Reload list from local storage*/
    items = JSON.parse(localStorage.getItem("items"));
    display(items)
}

/*Adds new tasks*/
function add() {

    /*Stops page from reloading on form submit*/
    event.preventDefault();
    
    /*Get form text*/
    let item = document.getElementById("newTask").value

    let time = Date();

    /*Drop if form is empty*/
    if (item != '') {
    let a = {
        timestamp: time,
        task: item,
        complete: 'no'
    }
    /*Move new task to array*/
    items.push(a);
    } else return;

    /*clear input text*/
    document.getElementById("newTask").value = ''

    /*Saves to local storage*/
    localStorage.setItem("items", JSON.stringify(items));

    /*Display all tasks to list*/
    display(items)
}

/*Removes task*/
function remove(array) {
    const index = array.indexOf(array[event.target.previousElementSibling.previousElementSibling.id]);
    array.splice(index, 1);

    /*Saves to local storage*/
    localStorage.setItem("items", JSON.stringify(items));

    /*Keep using last clicked filter*/
    if(setFilter == 'active') {
        active(items)
    } else if(setFilter == 'completed') {
        completed(items)
    } else display(items)
}

/*Dsiplays list of tasks from given array*/
function display(array) {

    /*Reset list*/
    list.innerHTML = '';

    /*Loop through all tasks*/
    for (i = 0; i < array.length; i++) {

        /*Create elements for task*/
        let doneButton = document.createElement("button");
        let a = document.createElement("div");
        let name = document.createElement("div");
        let delButton = document.createElement("button");
        
        /*Add task name and button icon*/
        a.classList.add('task')
        name.innerHTML = array[i].task;
        doneButton.innerHTML = "Complete"
        delButton.innerHTML = "X"

        /*Number each task iteration*/
        doneButton.setAttribute('id', [i])

        /*Strike through if task is already complete*/
        if (array[i].complete == 'yes') {
            name.style.setProperty("text-decoration", "line-through");
        }

        /*Add listener for complete button and undo complete if already done*/
        doneButton.addEventListener('click', function() {
            if(array[event.target.id].complete == 'yes') {
                event.target.nextElementSibling.style.setProperty("text-decoration", "none");
                array[event.target.id].complete = 'no';
                doneButton.innerHTML = "Complete"
                localStorage.setItem("items", JSON.stringify(items));

                if(setFilter == 'active') {
                    active(items)
                } else if(setFilter == 'completed') {
                    completed(items)
                }
                
            } else {
                event.target.nextElementSibling.style.setProperty("text-decoration", "line-through");
                array[event.target.id].complete = 'yes';
                doneButton.innerHTML = "Undo"
                localStorage.setItem("items", JSON.stringify(items));

                if(setFilter == 'active') {
                    active(items)
                } else if(setFilter == 'completed') {
                    completed(items)
                }
            }
        })
        /*Add undo button text*/
        if(array[i].complete == 'no') {
            doneButton.innerHTML = "Complete"
        } else {
            doneButton.innerHTML = "Undo"
        }

        /*Add listener for delete button*/
        delButton.addEventListener('click', () => {
            remove(items)
        })

        /*Append task to list*/
        a.appendChild(doneButton)
        a.appendChild(name)
        a.appendChild(delButton)
        list.appendChild(a)
        
        /*Count total tasks*/
        let number = document.getElementById("tasksLeft");
        number.innerHTML = `Tasks: ${array.length}`;

        /*Set last used filter*/
        setFilter = 'all'

        document.getElementById('display').style.backgroundColor = "#34CB39"
        document.getElementById('active').style.backgroundColor = ""
        document.getElementById('complete').style.backgroundColor = ""
    };
}

/*Filter array by active tasks and rebuild list*/
function active(items) {
    let active = items.filter(item => {
        return item.complete == 'no'
    })
    /*Rebuild new filtered list*/
    display(active)

    /*Set last used filter*/
    setFilter = 'active'

    document.getElementById('display').style.backgroundColor = ""
    document.getElementById('active').style.backgroundColor = "#34CB39"
    document.getElementById('complete').style.backgroundColor = ""
}

/*Filter array by completed tasks and rebuild list*/
function completed(items) {
    let completed = items.filter(item => {
        return item.complete == 'yes'
    })
    /*Rebuild new filtered list*/
    display(completed)

    /*Set last used filter*/
    setFilter = 'completed'

    document.getElementById('display').style.backgroundColor = ""
    document.getElementById('active').style.backgroundColor = ""
    document.getElementById('complete').style.backgroundColor = "#34CB39"
}
