const btnAddNewTask = document.getElementById("btn-add");
const tableBodyTasks = document.getElementById("result");
const inputTask = document.getElementById("new-task-input");
const btnSortTasks = document.getElementById("btn-sort-tasks");
const btnClearTasks = document.getElementById("btn-clear-tasks");

let arrTasks = [];

btnAddNewTask.addEventListener("click", (e) => {
    e.preventDefault();

    if (inputTask.value == "") {
        alert("Please input task!");
        inputTask.focus();
        return false;
    }
    
    addTaskToArray(inputTask);
    showNewTaskIntoTable(inputTask.value);
    clearInput();

});

const addTaskToArray = (inputTask) => {
    const today = new Date();
    let newTask = {
        name: inputTask.value,
        createdAt: today.getFullYear() 
                    + "/" + today.getMonth() 
                    + "/" + today.getDay()
                    + " "
                    + today.getHours()
                    + ":" + today.getMinutes()
                    + ":" + today.getSeconds()
    }

    arrTasks.push(newTask);
    console.log(arrTasks);
}

// let showTask = (msg) => {
//     alert(`you clicked ${msg}`);
// }

function showTask(msg) {
    return () => {
        alert(`you clicked ${msg}`);
    }
    
}

const showNewTaskIntoTable = (inputTaskValue) => {
    const newRow = document.createElement("tr");
    const newColumn = document.createElement("td");
    newColumn.textContent = inputTaskValue;
    newRow.appendChild(newColumn);

    // newColumn.addEventListener("click", ((e) => {
    //     alert(`you clicked ${newColumn.textContent}`);
    // }));
    newColumn.addEventListener("click", showTask(newColumn.textContent));
    newColumn.classList.add("draggable");

    tableBodyTasks.append(newRow);
};

const clearInput = () => {
    inputTask.value = "";
    inputTask.focus();
}

btnSortTasks.addEventListener("click", (e) => {
    e.preventDefault();

    sortTasks();
    clearTable();
    showDataToTable();

});

const sortTasks = () => {
    // console.log("before sort", arrTasks);

    // sort name ascending
    arrTasks.sort((t1, t2) => {
        if (t1.name > t2.name) {
            return 1;
        }

        if (t2.name > t1.name) {
            return -1;
        }

        return 0;
    });

    console.log("after sort", arrTasks);
}

const clearTable = () => {
    // remove listeners first

    arrTasks.forEach(task => {
        
    });

    tableBodyTasks.innerHTML="";
}

const showDataToTable = () => {
    arrTasks.forEach(t => {
        showNewTaskIntoTable(t.name);
    });

}

btnClearTasks.addEventListener("click", (e) => {
    e.preventDefault();

    clearTable();
});