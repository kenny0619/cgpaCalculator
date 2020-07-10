// const COURSE = document.querySelector("#courseName");
// const GRADE = document.querySelector("#grade");
// const UNIT = document.querySelector("#unit");
const ADDCOURSE = document.querySelector("#addCourse");
const CALCULATEGPA = document.querySelector("#calculate");
const ENTEREDINPUTS = document.querySelector("#enteredInputs");
const LISTCOURSES = document.querySelector("#listCourses");

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
  }
}

const courseDetails = [];

ADDCOURSE.addEventListener("click", (e) => {
  e.preventDefault();

  const COURSE = document.querySelector("#courseName");
  const GRADE = document.querySelector("#grade");
  const UNIT = document.querySelector("#unit");

  const courseVal = COURSE.value;
  const gradeVal = GRADE.value;
  const unitVal = UNIT.value;

  if (!(gradeVal && unitVal)) {
    return console.log("Grade and Input field cannot be empty");
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
  (COURSE.value = ""), (GRADE.value = ""), (UNIT.value = "");
  // console.dir(courseDetails);
  console.log(courseDetails);
});

LISTCOURSES.addEventListener("click", (e) => {
  e.preventDefault();
  courseDetails.forEach((el, index) => {
    ENTEREDINPUTS.innerHTML += `
    <h4>
      ${courseDetails[index].courseVal}&ensp;&ensp;&ensp;${courseDetails[index].gradeVal} &ensp;&ensp;&ensp; ${courseDetails[index].unitVal}
    </h4>
    `;
  });
});

function calculateGPA(courseDetails) {
  let totalCreditsUnit = 0;
  let totalGPA = 0;
  courseDetails.forEach((element, index) => {
    let currentGradePoint = getGradePoint(courseDetails[index].gradeVal);
    let currentUnit = Number(courseDetails[index].unitVal);
    // console.log(currentGradePoint);
    // console.log(currentUnit);
    totalGPA += currentGradePoint * currentUnit;
    totalCreditsUnit += currentUnit;
    const CGPA = totalGPA / totalCreditsUnit;
    console.log(CGPA.toFixed(2));
  });
}
