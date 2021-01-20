var employeeName = document.getElementById("name"),
  employeeAge = document.getElementById("age"),
  employeeSalary = document.getElementById("salary"),
  employeePhone = document.getElementById("phone"),
  btnAdd = document.getElementById("btnAdd"),
  updateBtn = document.getElementById("btnUpdate"),
  alertName = document.getElementById("alertName"),
  alertAge = document.getElementById("alertAge"),
  alertSalary = document.getElementById("alertSalary"),
  alertPhone = document.getElementById("alertPhone"),
  employeeInputs = document.getElementsByClassName("form-control"),
  alertUpdate = document.getElementById("alertUpdate"),
  alertAdd = document.getElementById("alertAdd"),
  search = document.getElementById("search"),
  table = document.getElementById("table"),
  employees;

if (localStorage.getItem("myEmployee") == null) {
  employees = [];
} 
else {
  employees = JSON.parse(localStorage.getItem("myEmployee"));
  displayEmployees();
}

hideButton(updateBtn);

btnAdd.onclick = function () {
  if (checkName() && checkAge() && checkSalary() && checkPhone()) {
    addEmployee();
    displayEmployees();
    clearForm();
    alertAdd.classList.add("d-none");
  } else {
    alertAdd.classList.remove("d-none");
    alertAdd.innerHTML = "Not added ! please check all inputs are correct";
  }
};

function addEmployee() {
  var employee = {
    name: employeeName.value.trim(),
    age: employeeAge.value.trim(),
    salary: employeeSalary.value.trim(),
    phone: employeePhone.value.trim(),
  };
  employees.push(employee);
  localStorage.setItem("myEmployee", JSON.stringify(employees));
}

function displayEmployees() {
  var trs = "";
  for (var i = 0; i < employees.length; i++) {
    trs += `<tr>
                    <td>${employees[i].name}</td>
                    <td>${employees[i].age}</td>
                    <td>${employees[i].salary}</td>
                    <td>${employees[i].phone}</td>
                    <td><button class = "btn btn-danger" onclick = 'deleteEmployee(${i})'>Delete</button></td>
                    <td><button class = "btn btn-success" onclick = 'showData(this,${i})'>Update</button></td>
                </tr>`;
  }
  document.getElementById("tbody").innerHTML = trs;
}

function clearForm() {
  for (var i = 0; i < employeeInputs.length; i++) {
    employeeInputs[i].value = "";
    employeeInputs[i].classList.remove("is-valid");
  }
}

function deleteEmployee(Index) {
  employees.splice(Index, 1);
  localStorage.setItem("myEmployee", JSON.stringify(employees));
  displayEmployees();
}

function showData(btn, Index) {
  var tableRow = btn.parentElement.parentElement;
  employeeName.value = tableRow.cells[0].innerHTML;
  employeeAge.value = tableRow.cells[1].innerHTML;
  employeeSalary.value = tableRow.cells[2].innerHTML;
  employeePhone.value = tableRow.cells[3].innerHTML;
  var Id = Index;
  showButton(updateBtn);
  hideButton(btnAdd);
  updateBtn.setAttribute("onclick", `updateEmployee(${Id})`);
}

function showButton(button) {
  button.style.display = "block";
}

function hideButton(button) {
  button.style.display = "none";
}

function updateEmployee(Index) {
  if (checkName() && checkAge() && checkSalary() && checkPhone()) {
    employees[Index].name = employeeName.value;
    employees[Index].age = employeeAge.value;
    employees[Index].salary = employeeSalary.value;
    employees[Index].phone = employeePhone.value;
    localStorage.setItem("myEmployee", JSON.stringify(employees));
    displayEmployees();
    showButton(btnAdd);
    hideButton(updateBtn);
    clearForm();
    alertUpdate.classList.add("d-none");
  } else {
    alertUpdate.classList.remove("d-none");
    alertUpdate.innerHTML = "Not Updated ! please check all inputs are correct";
  }
}

employeeName.oninput = function () {
  checkName();
};

function checkName() {
  var regexName = /^([a-zA-Z]+\s*[A-Z]*)+$/;
  if (regexName.test(employeeName.value.trim())) {
    inputValid(employeeName , alertName);
    return true;
  } 
  else {
    employeeName.value.trim() == "" ? getErrorMessage(employeeName , 'please fill input Name' , alertName) : (getErrorMessage(employeeName , 'Enter Name in characters only' , alertName));
    return false;
  }
}

employeeAge.oninput = function () {
  checkAge();
};

function checkAge() {
  var regexAge = /^[1-9]\d$/;
  if (regexAge.test(employeeAge.value.trim())) {
    inputValid(employeeAge , alertAge)
    return true;
  } 
  else {
    employeeAge.value.trim() == "" ? (getErrorMessage(employeeAge , 'please fill input Age' , alertAge))  : (getErrorMessage(employeeAge , 'Enter Age Numbers Only (2 digit)' , alertAge));
    return false;
  }
}

employeeSalary.oninput = function () {
  checkSalary();
};

function checkSalary() {
  var regexSalary = /^[1-9][0-9]+$/;
  if (regexSalary.test(employeeSalary.value.trim())) {
    inputValid(employeeSalary , alertSalary);
    return true;
  } 
  else {
    employeeSalary.value.trim() == "" ? (getErrorMessage(employeeSalary , 'please fill input Salary',alertSalary)) : (getErrorMessage(employeeSalary,'Enter Salary Numbers Only',alertSalary));
    return false;
  }
}

employeePhone.oninput = function () {
  checkPhone();
};
function checkPhone() {
  var regexPhone = /^(010|011|012|015)\d{8}$/;
  if (regexPhone.test(employeePhone.value.trim())) {
    inputValid(employeePhone,alertPhone);
    return true;
  } 
  else {
    employeePhone.value.trim() == "" ? (getErrorMessage(employeePhone,'please fill input Phone Number',alertPhone)): (getErrorMessage(employeePhone , 'please enter phone number start with 010 or 011 012 015 and 8 numbers', alertPhone));
    return false;
  }
}

search.onkeyup = function(){
   searchEmployee(this.value);
}

function searchEmployee(value){
  var trs = "";
    for(var i = 0; i < employees.length; i++){
      if( employees[i].name.toLowerCase().includes(value.toLowerCase().trim())){
        trs += `<tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button class = "btn btn-danger" onclick = 'deleteEmployee(${i})'>Delete</button></td>
        <td><button class = "btn btn-success" onclick = 'showData(this,${i})'>Update</button></td>
        </tr>`;
      }
    }
    document.getElementById("tbody").innerHTML=trs;
}

function getErrorMessage(userInput , errorMessage , alertInput){
  userInput.classList.add("is-invalid");
  userInput.classList.remove("is-valid");
  alertInput.classList.remove("d-none");
  alertInput.innerHTML = errorMessage;
}

function inputValid(userInput , alertInput){
  userInput.classList.remove("is-invalid");
  userInput.classList.add("is-valid");
  alertInput.classList.add("d-none");
}