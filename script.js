const ADDCOURSE = document.querySelector("#addCourse");
const CALCULATEGPA = document.querySelector("#calculate");
const ENTEREDINPUTS = document.querySelector('#enteredInputs')
const LISTCOURSES = document.querySelector("#listCourses");
const DISPLAYGPA = document.querySelector("#displayGPA");
const RESET = document.querySelector("#reset");

// function to get grade point
function getGradePoint(grade) {
  switch (grade) {
    case "A":
      return 5;
      break;
    case "B":
      return 4;
      break;
    case "C":
      return 3;
      break;
    case "D":
      return 2;
      break;
    case "E":
      return 1;
      break;
    default:
      return 0;
  };
}

const courseDetails = [];

ADDCOURSE.addEventListener('click', (e) => {
  e.preventDefault();

  const COURSE = document.querySelector("#courseName");
  const GRADE = document.querySelector("#grade");
  const UNIT = document.querySelector("#unit");

  const courseVal = COURSE.value;
  const gradeVal = GRADE.value;
  const unitVal = UNIT.value;

  if (!(gradeVal && unitVal)) {
    return console.log('Grade and Input field cannot be empty');
  }
  courseDetails.forEach((element, index) => {
    if (courseVal === courseDetails[index].courseVal) {
      alert("course has already been entered");
      courseVal = "";
    }
  });

  let obj = {};
  obj.courseVal = courseVal;
  obj.gradeVal = gradeVal;
  obj.unitVal = unitVal;

  courseDetails.push(obj);
  COURSE.value = "",
    GRADE.value = "",
    UNIT.value = ""
  // console.dir(courseDetails);
  console.log(courseDetails);
  ENTEREDINPUTS.innerHTML = `<h4>Click the "view courses" button to see the list of courses you have entered!</h4>`;
})

LISTCOURSES.addEventListener('click', (e) => {
  e.preventDefault();
  ENTEREDINPUTS.innerHTML = '';
  if (courseDetails.length === 0) {
    ENTEREDINPUTS.innerHTML = 'No courses added yet';
  }
  for (let i = 0; i < courseDetails.length; i++) {
    ENTEREDINPUTS.innerHTML += `<h4> ${courseDetails[i].courseVal}&ensp;&ensp;&ensp;${courseDetails[i].gradeVal} &ensp;&ensp;&ensp; ${courseDetails[i].unitVal}</h4>`;
  }
  // courseDetails.forEach((el, index) => {
  //   ENTEREDINPUTS.innerHTML += `<h4> ${courseDetails[index].courseVal}&ensp;&ensp;&ensp;${courseDetails[index].gradeVal} &ensp;&ensp;&ensp; ${courseDetails[index].unitVal}</h4>`;
  // })
})



function calculateGPA(courseDetails) {
  let totalCreditsUnit = 0;
  let totalGPA = 0;
  let cgpa;
  courseDetails.forEach((element, index) => {
    let currentGradePoint = getGradePoint(courseDetails[index].gradeVal);
    let currentUnit = Number(courseDetails[index].unitVal);
    // console.log(currentGradePoint);
    // console.log(currentUnit);
    totalGPA += currentGradePoint * currentUnit;
    totalCreditsUnit += currentUnit;
    const CGPA = totalGPA / totalCreditsUnit;
    // console.log(CGPA.toFixed(2));
    cgpa = CGPA.toFixed(2);
  });
  return cgpa;
}

CALCULATEGPA.addEventListener('click', (e) => {
  e.preventDefault()
  DISPLAYGPA.innerText = ` Current CGPA: ${calculateGPA(courseDetails)}`;
  if (calculateGPA(courseDetails) === undefined) {
    DISPLAYGPA.innerText = `Sorry! you haven't added any courses yet.`
  }
})

document.querySelector("#courseName").addEventListener('input', () => {
  if (calculateGPA(courseDetails) === undefined) {
    DISPLAYGPA.innerText = `Current CGPA: 0`;
  }
})

function reset(e) {
  e.preventDefault();
  console.log('reset');
  courseDetails.length = 0;
  const COURSE = document.querySelector("#courseName");
  const GRADE = document.querySelector("#grade");
  const UNIT = document.querySelector("#unit");
  COURSE.value = "",
    GRADE.value = "",
    UNIT.value = ""
  DISPLAYGPA.innerText = `Current CGPA: 0`;
  ENTEREDINPUTS.innerHTML = `<h4>Click the "view courses" button to see the list of courses you have entered!</h4>`;
}

RESET.addEventListener('click', reset);