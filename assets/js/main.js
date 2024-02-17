var tasks = [];
const input = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
var itemLeft = document.querySelector("#itemLeft")
var tasksDiv = document.querySelector("#tasksDiv");
var container = document.querySelector("#container");
var arrow = document.querySelector("#arrow")
var counter = 0;
var itemLeftCounter = 0;
var arrowClick = false;

setInterval(function () {
    itemLeft.innerHTML = `${itemLeftCounter} items left!`
    if (itemLeftCounter === 0 && tasks.length === 0) {
        document.querySelector("#infoDiv").style.display = "none";
        arrow.style.display = "none";
    }
}, 1)

function activatingAddBtn() {
    if (input.value.trim() !== "") {
        addBtn.style.display = "block"

    }
    else {
        addBtn.style.display = "none"
    }
}

setInterval(activatingAddBtn, 5);

addBtn.addEventListener("click", function () {
    document.querySelector("#infoDiv").style.display = "flex"
    var inpValue = input.value
    createNewTask(inpValue);
    input.value = ""
})

window.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
        document.querySelector("#infoDiv").style.display = "flex"
        var inpValue = input.value
        createNewTask(inpValue);
        input.value = ""
    }
    else if (e.key === "Enter" && input.value.trim() === "") {
        alert("Please write your todos")
    }
})

clearCompletedBtn.onclick = function () {
    clearCompleted()
}


activeBtn.onclick = function () {
    showActiveTasks()
}

completedBtn.onclick = function () {
    showCompletedTasks()
}

allBtn.onclick = function () {
    showAllTasks()
}

arrow.addEventListener("click", function () {
    if (arrowClick === false) {
        var taskDivAll = document.querySelectorAll(".taskDiv");
        var radioBtnAll = document.querySelectorAll(".radioBtn");
        var textOfTaskAll = document.querySelectorAll(".textOfTask");
        for (let i in taskDivAll) {
            arrowClick = true;
            tasks[i].completed = true;
            textOfTaskAll[i].style.textDecoration = "line-through";
            radioBtnAll[i].innerHTML = "✓";
            itemLeftCounter = 0;
        }
    }
    else if (arrowClick === true) {
        var taskDivAll = document.querySelectorAll(".taskDiv");
        var radioBtnAll = document.querySelectorAll(".radioBtn");
        var textOfTaskAll = document.querySelectorAll(".textOfTask");
        for (let i in taskDivAll) {
            arrowClick = false;
            tasks[i].completed = false;
            textOfTaskAll[i].style.textDecoration = "none";
            radioBtnAll[i].innerHTML = "";
            itemLeftCounter++;
        }
    }
})


function createNewTask(text) {
    arrow.style.display = "block"
    counter++;
    itemLeftCounter++;
    const task = {
        text: text,
        completed: false
    }
    tasks.push(task);
    var h1 = document.createElement("h1");
    h1.classList.add("textOfTask")
    var radioBtn = document.createElement("div");
    radioBtn.classList.add("radioBtn")
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    var xBtn = document.createElement("h1")
    xBtn.classList.add("xBtn");
    xBtn.innerHTML = "x"
    h1.innerHTML = text;
    taskDiv.append(radioBtn, h1, xBtn)
    tasksDiv.appendChild(taskDiv);
    tasksDiv.appendChild(document.querySelector("#infoDiv"))
    removeTask()
    completeActivate()
}

function completeActivate() {
    var radioBtnAll = document.querySelectorAll(".radioBtn");
    var textOfTaskAll = document.querySelectorAll(".textOfTask")
    for (let i in radioBtnAll) {
        radioBtnAll[i].onclick = function () {
            if (tasks[i].completed === false) {
                textOfTaskAll[i].style.textDecoration = "line-through"
                radioBtnAll[i].innerHTML = "✓"
                if (itemLeftCounter > 0) {
                    itemLeftCounter--;
                }
                tasks[i].completed = true;
            }
            else {
                textOfTaskAll[i].style.textDecoration = "none"
                radioBtnAll[i].innerHTML = ""
                itemLeftCounter++;
                tasks[i].completed = false;
            }
        }
    }
}

function removeTask() {
    var taskDivAll = document.querySelectorAll(".taskDiv");
    var xBtnAll = document.querySelectorAll(".xBtn");
    for (let i in taskDivAll) {
        taskDivAll[i].onmouseenter = function () {
            xBtnAll[i].style.display = "block"
            xBtnAll[i].onclick = function () {
                console.log(tasks)
                if (counter > 0 && itemLeftCounter > 0) {
                    if (!tasks[i].completed) {
                        itemLeftCounter--;
                    }
                    counter--;
                }

                tasksDiv.removeChild(taskDivAll[i])
                tasks.splice(i, 1);
                removeTask()
                completeActivate()
            }
        }
        taskDivAll[i].onmouseleave = function () {
            xBtnAll[i].style.display = "none"
        }
    }
}

function clearCompleted() {
    var taskDivAll = document.querySelectorAll(".taskDiv");
    for (let i in tasks) {
        if (tasks[i].completed === true) {
            tasksDiv.removeChild(taskDivAll[i])
        }
    }
    tasks = tasks.filter(task => task.completed == false);
}

function showAllTasks() {
    var taskDivAll = document.querySelectorAll(".taskDiv");
    for (let i in taskDivAll) {
        taskDivAll[i].style.display = "flex"
    }
}

function showActiveTasks() {
    var taskDivAll = document.querySelectorAll(".taskDiv");
    for (let i in tasks) {
        if (tasks[i].completed === true) {
            taskDivAll[i].style.display = "none"
        }
        else {
            taskDivAll[i].style.display = "flex"
        }
    }
    var activeTasks = tasks.filter(task => !task.completed == false);
}

function showCompletedTasks() {
    var taskDivAll = document.querySelectorAll(".taskDiv");
    for (let i in tasks) {
        if (tasks[i].completed === false) {
            taskDivAll[i].style.display = "none"
        }
        else {
            taskDivAll[i].style.display = "flex"
        }
    }
    var completedTasks = tasks.filter(task => task.completed == false);

}

