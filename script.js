const year = document.querySelector('.year')
const monthSec1 = document.querySelector('.month .sec1')
const monthSec2 = document.querySelector('.month .sec2')
const addButton = document.querySelector('.addButton')
const addTask = document.querySelector('.addTask')
const addTaskDone = document.querySelector('.addTask button')
const addTaskInput = document.querySelector('.addTask input')
const taskListContainer = document.querySelector('.taskListContainer')
const taskUl = document.querySelector('.taskUl')


function setCookie(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());document.cookie=c_name + "=" + c_value;}

function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1){c_start = c_value.indexOf(c_name + "=");}if (c_start == -1){c_value = null;}else{c_start = c_value.indexOf("=", c_start) + 1;var c_end = c_value.indexOf(";", c_start);if (c_end == -1){c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}

checkSession();

function checkSession(){
   var c = getCookie("visited");
   if (c === "yes") {
    document.querySelector('.welcomePage').style.display = 'none'
   } else {
    document.querySelector('.welcomePage').style.display = 'inline'
   }
   setCookie("visited", "yes", 365); // expire in 1 year; or use null to never expire
}

document.querySelector('.welcomePage').addEventListener('click', () => {
    document.querySelector('.welcomePage').style.display = 'none'

})

//Functions
function addTaskInContainer() {
    taskUl.innerHTML += `
        <li>
            <div class="taskDoneSec">
                <div class="tick">
                    
                </div>
                ${addTaskInput.value}
            </div>

            <svg class='delTask' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </li>`

    // This will make the Add Task popup invisible
    addTask.style.opacity = 0
    addTask.style.zIndex = -1
}

function saveData() {
    localStorage.data = taskUl.innerHTML
}

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    document.querySelector('.cursor').style.left = `${e.clientX}px`
    document.querySelector('.cursor').style.top = `${e.clientY}px`
})





// Update Date
const date = new Date()
const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
year.innerHTML = date.getFullYear()
monthSec1.innerHTML = (date.getDate() < 10) ? '0' + date.getDate(): date.getDate()
monthSec2.innerHTML = monthsList[date.getMonth()]

//Add Task Button


//if addTask = 0 then 'add task section' is closed else it's open
let addTaskOpened = 0
addButton.addEventListener('click', () => {
    if (addTaskOpened === 0) {
        addButton.style.transform = 'rotate(45deg)' //change in button

        // This will make the Add Task popup visible
        addTask.style.opacity = 1
        addTask.style.zIndex = 20

        addTaskOpened = 1
    }else {
        addButton.style.transform = '' //change in button

        // This will make the Add Task popup invisible
        addTask.style.opacity = 0
        addTask.style.zIndex = -1

        addTaskOpened = 0
    }
})

// this will make the 'add task section' is close if we click anywhere else than this section
if (addTaskOpened === 1) {
    document.querySelector('.container').addEventListener('click', (e)=>{
        console.log(e.target.className);
        if (e.target.tagName !== 'addTask') {
            addButton.style.transform = '' //change in button

            // This will make the Add Task popup invisible
            addTask.style.opacity = 0
            addTask.style.zIndex = -1

            addTaskOpened = 0
        }
    })
}



//Add Task Pop Up, Done Button
addTaskDone.addEventListener('click', () => {
    addTaskInContainer()
    saveData()
})

addTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskInContainer()
        saveData()
    }
})

let reverseTickVar = 0
taskUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'svg') {
        e.target.parentElement.remove()
    }else if(e.target.classList[0] === 'taskDoneSec'){
        // if user click again on the task it will again get unchecked
        if (reverseTickVar === 0) {
            e.target.classList.toggle('checked')
            console.log(e.target.classList);
            e.target.children[0].innerHTML = '<svg class="insideTick" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
            reverseTickVar = 1
        }else {
            e.target.children[0].innerHTML = ''
            e.target.classList.toggle('checked')
            reverseTickVar = 0
        }
    }

    saveData()
})



taskUl.innerHTML = localStorage.data