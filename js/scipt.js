const Input = document.getElementById("input");
const add = document.getElementById("add");
const updata = document.getElementById("updata");
const tablebody = document.getElementById("tablebody");
const searchInput = document.getElementById("searchInput");

let toDos = [];
let finishedTasks = [];

//CHECK IF LOCAL STORAGE IS ENMPTY (FROM THE TASKS)OR NOT + DISPLAY TASKS
if (localStorage.getItem("tasks") == null) {
  toDos = [];
} else {
  toDos = JSON.parse(localStorage.getItem("tasks"));
  displaytasks();
}

//ADD TASKS
function addTask() {
  let toDo = Input.value;
  if (toDo != "") {
    toDos.push(toDo);
    localStorage.setItem("tasks", JSON.stringify(toDos));
    displaytasks();
    clearInputs();
  }
}

//DISPLAY TASKS
function displaytasks() {
  container = "";
  for (let i = 0; i < toDos.length; i++) {
    container += `<tr>
                  <td class="text-center" onclick='updatetable(${i})'>${toDos[i]}</td>
                  <td><button onclick='done(${i})' class=" finish_btn"><i class="fa-regular fa-circle-check"></i></button></td>
                  <td><button onclick='deleteTask(${i})' class=" remove_btn"><i class="fa-solid fa-trash-can"></i></button></td>
             </tr>
          `;
  }
  document.getElementById("tablebody").innerHTML = container;
}

//CLEAR INPUT
function clearInputs() {
  Input.value = "";
}

//DELETE TASK
function deleteTask(i) {
  toDos.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(toDos));
  displaytasks();
}

// MOVE DATA FROM TABLE TO INPUT
function updatetable(i) {
  Input.value = toDos[i];
  add.classList.add("d-none");
  updata.classList.remove("d-none");
  updata.setAttribute("onclick", `upadate(${i})`);
}

//TO CHANGE THE DATA IN THE TABLE
function upadate(i) {
  toDos[i] = Input.value;
  if (toDos[i] != "") {
    localStorage.setItem("tasks", JSON.stringify(toDos));
    updata.classList.add("d-none");
    add.classList.remove("d-none");
    displaytasks();
    clearInputs();
  }
}

//SEARCH
function searchTask(input) {
  let container = "";
  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].toLowerCase().includes(input.toLowerCase())) {
      container += `<tr>
                    <td class="text-center" onclick='updatetable(${i})'>${toDos[i]}</td>
                    <td><button onclick='done(${i})' class="finish_btn"><i class="fa-solid fa-check"></i></button></td>
                    <td><button onclick='deleteTask(${i})' class="remove_btn"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
      `;
    }
  }
  document.getElementById("tablebody").innerHTML = container;
}

//CHECK IF LOCAL STORAGE IS ENMPTY (FROM THE FINISHED TASKS) OR NOT + DISPLAY TASKS
if (localStorage.getItem("done") == null) {
  finishedTasks = [];
} else {
  finishedTasks = JSON.parse(localStorage.getItem("done"));
  displayFinished();
}

//DONE TASKS
function done(i) {
  let finished = toDos.splice(i, 1)[0];
  finishedTasks.push(finished);
  localStorage.setItem("tasks", JSON.stringify(toDos));
  localStorage.setItem("done", JSON.stringify(finishedTasks));
  displaytasks();
  displayFinished();
}

//DISPALY FINISHED TASKS
function displayFinished() {
  let Box = "";
  for (let i = 0; i < finishedTasks.length; i++) {
    Box += `
    <tr>
      <td class="w-75">${finishedTasks[i]}</td>
      <td class=""><button onclick='deleteDone(${i})' class=" remove_done "><i class="fa-solid fa-xmark"></i></button></td>
      <td class=""><button onclick='backTask(${i})' class=" return_done "><i class="fa-solid fa-rotate-left"></i></button></td>
      </tr>
          `;
  }
  document.getElementById("finish").innerHTML = Box;
}
//DELETE FINISHED TASKS
function deleteDone(i) {
  finishedTasks.splice(i, 1);
  localStorage.setItem("done", JSON.stringify(finishedTasks));
  displayFinished();
}

//RETURN FINISHED TASK TO THE TABLE (UNFINISHED)
function backTask(i) {
  let backTask = finishedTasks.splice(i, 1)[0];
  toDos.push(backTask);
  localStorage.setItem("tasks", JSON.stringify(toDos));
  localStorage.setItem("done", JSON.stringify(finishedTasks));
  displaytasks();
  displayFinished();
}
