// ================= LOGIN =================
function login(){
    let role = document.getElementById("role").value;

    // save role
    localStorage.setItem("role", role);

    // go to dashboard
    window.location.href = "dashboard.html";
}


// ================= BOOK ROOM =================
function bookRoom(id){
    let status = document.getElementById("status" + id);

    if(status.innerHTML === "Booked"){
        alert("Room already booked!");
        return;
    }

    status.innerHTML = "Booked";
    status.style.color = "red";
}


// ================= CANCEL ROOM =================
function cancelRoom(id){
    let status = document.getElementById("status" + id);

    status.innerHTML = "Free";
    status.style.color = "green";
}


// ================= POPUP VIEW =================
function viewRoom(){
    document.getElementById("popup").style.display = "block";
}

function closeview(){
    document.getElementById("popup").style.display = "none";
}


// ================= SEARCH =================
function searchRoom(){
    let input = document.getElementById("search").value.toLowerCase();

    let rooms = document.getElementsByClassName("room");

    for(let i = 0; i < rooms.length; i++){
        let text = rooms[i].innerText.toLowerCase();

        if(text.includes(input)){
            rooms[i].style.display = "flex";
        } else {
            rooms[i].style.display = "none";
        }
    }
}


// ================= ROLE CONTROL =================
function applyRoleControl(){

    let role = localStorage.getItem("role");

    // show role text if exists
    let roleText = document.getElementById("roleText");
    if(roleText){
        roleText.innerText = "Logged in as: " + role;
    }

    // STUDENT
    if(role === "student"){
        document.querySelectorAll(".book-btn").forEach(btn => btn.style.display="none");
        document.querySelectorAll(".cancel-btn").forEach(btn => btn.style.display="none");

        let adminSection = document.querySelector(".admin-only");
        if(adminSection) adminSection.style.display="none";
    }

    // FACULTY
    if(role === "faculty"){
        let adminSection = document.querySelector(".admin-only");
        if(adminSection) adminSection.style.display="none";
    }
}


// ================= ADD STUDENT =================
function setupStudentForm(){

    let form = document.getElementById("form");

    if(!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let course = document.getElementById("course").value;

        let student = {name, age, course};

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        alert("Student Added Successfully");

        form.reset();

        loadStudents();
    });
}


// ================= LOAD STUDENTS =================
function loadStudents(){

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let list = document.getElementById("list");

    if(!list) return;

    list.innerHTML = "";

    students.forEach(function(s){
        let li = document.createElement("li");
        li.innerText = s.name + " | Age: " + s.age + " | Course: " + s.course;
        list.appendChild(li);
    });
}


// ================= INITIAL LOAD =================
window.onload = function(){
    applyRoleControl();
    setupStudentForm();
    loadStudents();
};