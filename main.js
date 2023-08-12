/* let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
data = {};
function update(){
    data["textInput"] = textInput.value;
    data["dateInput"] = dateInput.value;
    data["textArea"] = textArea.value;
}
function add(){
update();
tasks.innerHTML += `
<div>
                <span class="fw-bold">${data.textInput}</span>
                <span class="small text-secondary">${data.dateInput}</span>
                <p>${data.textArea}</p>

                <span class="options">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash-alt"></i>
                </span>
            </div>`;
            textInput.value="";
            dateInput.value="";
            textArea.value="";
        
} */

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    textInput: textInput.value,
    dateInput: dateInput.value,
    textArea: textArea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
    tasks.innerHTML="";
    data.map((x,y)=>{
        return( tasks.innerHTML += `
        <div id=${y}>
                    <span class="fw-bold">${x.textInput}</span>
                    <span class="small text-secondary">${x.dateInput}</span>
                    <p>${x.textArea}</p>
    
                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                    </span>
                </div>
        `);
    });
    resetForm();
}

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data",JSON.stringify(data));
};
let editTask = (e) => {
  let selectTask = e.parentElement.parentElement;
  textInput.value = selectTask.children[0].innerHTML;
  dateInput.value = selectTask.children[1].innerHTML;
  textArea.value = selectTask.children[2].innerHTML;

  deleteTask(e);
  
};
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

(()=>{
    data = JSON.parse(localStorage.getItem("data"));
    createTasks();
})()
