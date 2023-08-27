// Model
let grades;
//Retrieve Data from localStorage
const savedGrades = JSON.parse(localStorage.getItem("grades"));

//Check Array
if (Array.isArray(savedGrades)) {
  grades = savedGrades;
} else {
  grades = [];
}

display();

function inputToArray() {
  //for each row, take all td into the obkect -> array
  let table = document.getElementById("table");
  let rowNum = table.rows.length;

  grades = [];

  for (let i = 1; i < rowNum; i++) {
    let assignmentTypeValue = table.rows[i].cells[0].children[0].value;
    let weightValue = parseFloat(table.rows[i].cells[1].children[0].value);
    let gradeValue = parseFloat(table.rows[i].cells[2].children[0].value);

    if (isNaN(weightValue)) {
      weightValue = 0.0;
    }

    if (isNaN(gradeValue)) {
      gradeValue = 0.0;
    }

    let newGrade = {
      assignmentType: assignmentTypeValue,
      weight: weightValue,
      grade: gradeValue,
    };

    grades.push(newGrade);
  }
  saveGrade();
}

function calOverallGrade() {
  inputToArray();

  let sum = 0.0;
  let totalWeight = 0.0;

  for (let i = 0; i < grades.length; i++) {
    sum = sum + (grades[i].weight / 100) * grades[i].grade;
    totalWeight = totalWeight + grades[i].weight / 100;
  }

  if (totalWeight === 1) {
    return sum;
  } else {
    return -1;
  }
}

function saveGrade() {
  localStorage.setItem("grades", JSON.stringify(grades));
}

//View
//displaying grades

function display() {
  for (let i = 0; i < grades.length; i++) {
    let assignment = document.getElementById("assignment-type" + (i + 1));
    let weight = document.getElementById("weight" + (i + 1));
    let grade = document.getElementById("grade" + (i + 1));

    assignment.value = grades[i].assignmentType;
    weight.value = grades[i].weight;
    grade.value = grades[i].grade;
  }
}

function displayOverall() {
  let overallDisplay = document.getElementById("overall-grade");
  overallDisplay.innerHTML = "";

  let overallGrade = calOverallGrade().toFixed(2);
  let element = document.createElement("div");

  if (overallGrade === "-1.00") {
    element.innerText = "Error: Please make sure weights add up to 100%";
    element.classList.add("error-message");
    overallDisplay.appendChild(element);
  } else {
    element.innerText = "Overall Grade: " + overallGrade;
    element.classList.add("grade-message");
    overallDisplay.appendChild(element);
  }
}

function clearTable() {
  grades = [];

  let table = document.getElementById("table");
  let rowNum = table.rows.length;

  for (let i = 1; i < rowNum; i++) {
    table.rows[i].cells[0].children[0].value = "";
    table.rows[i].cells[1].children[0].value = "";
    table.rows[i].cells[2].children[0].value = "";
  }
}

//Control
function addRow() {
  let table = document.getElementById("table");
  let newRow = document.createElement("tr");
  let rowNum = grades.length + 1;
  newRow.setAttribute("id", "row" + rowNum);

  let assignmentCell = document.createElement("td");
  let assignmentInput = document.createElement("input");
  assignmentInput.setAttribute("type", "text");
  assignmentInput.setAttribute("id", "assignment-type" + rowNum);
  assignmentCell.appendChild(assignmentInput);
  newRow.appendChild(assignmentCell);

  let weightCell = document.createElement("td");
  let weightInput = document.createElement("input");
  weightInput.setAttribute("type", "number");
  weightInput.setAttribute("min", "0");
  weightInput.setAttribute("max", "100");
  weightInput.setAttribute("step", "10");
  weightInput.setAttribute("id", "weight" + rowNum);
  weightCell.appendChild(weightInput);
  newRow.appendChild(weightCell);

  let gradeCell = document.createElement("td");
  let gradeInput = document.createElement("input");
  gradeInput.setAttribute("type", "number");
  gradeInput.setAttribute("min", "0");
  gradeInput.setAttribute("max", "100");
  gradeInput.setAttribute("id", "grade" + rowNum);
  gradeCell.appendChild(gradeInput);
  newRow.appendChild(gradeCell);

  table.appendChild(newRow);
}
