//front end logic
document.addEventListener('DOMContentLoaded', async () => {
   const students = await getStudents()
   populateStudents(students)
   handleSubmitForm()
   // handleSubmitStudent()
   displayStudentDetails(students)
   handleDelete()

})

function handleSubmitForm(){
   const form = document.getElementById("form-student");
   form.addEventListener("submit", (event)=> {
      event.preventDefault();
      const selectedStudentId = event.target.student_id.value;
      const newDetails = {
         name: event.target.new_name.value,
         age: event.target.new_age.value,
         gender: event.target.new_gender.value
      }

      updateStudent(selectedStudentId, newDetails)
   })
}

function handleDelete(){
   document.getElementById("btn-delete").addEventListener("click", function(){
         const form = document.getElementById("form-student");
         const id = form.student_id.value;
         deleteStudent(id)
   })
}

function displayStudentDetails(students){
   const selectBox = document.querySelector("select#students")
   selectBox.addEventListener("change", (event) => {
      const selectedStudent = students.find((student)=> {
         return student.id === event.target.value
      })

     const form = document.getElementById("form-student");
     form.new_name.value = selectedStudent.name;
     form.new_age.value = selectedStudent.age;
   //   form.new_gender.selected = selectedStudent.gender;
   })
}



function populateStudents(students){
   const selectBox = document.querySelector("select#students")
   students.forEach((student) => {
      selectBox.innerHTML += `
      <option value="${student.id}">${student.name}</option>
   `
   })
}

// function handleSubmitStudent(){
//    const form = document.getElementById("form-student");
//    form.addEventListener("submit", async function(event){
//       event.preventDefault();// is preventing tht default beahviour
//       const newStudent = {
//          name: this.studentname.value,
//          age: this.age.value,
//          gender: this.gender.value
//       }
//       addStudent(newStudent);
//       const students = await getStudents()
//       console.log(students);
//    })
// }

// backend // Businesss logic
function addStudent(newStudent) {
   fetch("http://localhost:4001/students",{
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
   }).then(data => data.json())
   .then(data => alert(`new student ${data.name} was add successfully!`))
}


function getStudents(){
   return fetch("http://localhost:4001/students").then(data => data.json()).then(data => data)
}


function updateStudent(id, student){
   fetch(`http://localhost:4001/students/${id}`,{
      method: "PATCH",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(student) 
   }).then(data => data.json())
   .then(data => {
      alert(`${data.name} was modified successfully!`)
   });
}

function deleteStudent(id){
   fetch(`http://localhost:4001/students/${id}`,{
      method: "DELETE"
   }).then(data => data.json())
   .then(data => {
      alert(`${data.name} was deleted successfully!`)
   });

}



