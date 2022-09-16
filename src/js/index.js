import '../sass/styles.scss';
import jsonData from '../data.json';


if(localStorage.getItem("isInitialDataLoaded") == "true"){
  jsonData = JSON.parse(localStorage.getItem("jsonData"));
}

if(!localStorage.getItem("isInitialDataLoaded")){
  localStorage.setItem("jsonData", JSON.stringify(jsonData));
  localStorage.setItem("isInitialDataLoaded", true);
}


function requireAll(r) {
    r.keys().forEach(r);
}
  
requireAll(require.context('../assets/icons/', true, /\.svg$/));

fetch(`https://mitopeci.sirv.com/sprite.svg`).then(res => {
  return res.text();
}).then(data => {
  document.getElementById('svg-icons').innerHTML = data;
});

const headerProfileUser = document.querySelector(".header__profile-user");
const headerDropdown = document.querySelector(".header__profile-dropdown");

const tasksDiv = document.querySelector(".tasks");
const chatDiv = document.querySelector(".chat");
const collapseBtn = document.querySelector(".collapse-btn");

const addBtns = document.querySelectorAll(".add-btn");
const newCard = document.querySelector(".new-card");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");

const selectLabelWrapper = document.querySelector(".new-card__info-label");
const labelSelect = document.querySelector(".label-select");
const labelSelectSpan = document.querySelector(".label-select__span");
const labels = document.querySelectorAll(".label");

const selectedLabel = document.querySelector(".selected-label");
const selectedLabelSpan = document.querySelector(".selected-label__span");
const removeBtn = document.querySelector(".remove-btn");

const imageUrlInput = document.getElementById("image-url");
const cardTitleInput = document.getElementById("card-title");
const cardDescInput = document.getElementById("card-desc");

const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");

displayCards(jsonData);              //displaying all cards of the lists

headerProfileUser.addEventListener("click", () => headerProfileUser.classList.toggle("active"));

collapseBtn.addEventListener("click", () => {
  chatDiv.classList.toggle("collapse");
  collapseBtn.classList.toggle("collapse");
  tasksDiv.classList.toggle("expand");
})


let clickedButtonIndex = -1;

addBtns.forEach((addBtn, index) => {
  addBtn.addEventListener("click", () => {
    newCard.classList.toggle("show");
    newCard.listIndex = index;
    overlay.style.display = "block";
    clickedButtonIndex = index;
  });
})

function clearInputs() {
  labelSelectSpan.innerText = "Choose a Label";
  selectedLabel.style.display = "none";
  imageUrlInput.value = "";
  cardTitleInput.value = "";
  cardDescInput.value = "";
}

closeBtn.addEventListener("click", () => {
  newCard.classList.remove("show");
  overlay.style.display = "none";
  clearInputs();
});


labelSelect.addEventListener("click", () => selectLabelWrapper.classList.toggle("active"));

labels.forEach(label => {

    label.addEventListener("click", () => {
        labelSelectSpan.innerText = label.innerText;
        selectLabelWrapper.classList.remove("active");

        let bgColorClass = `label-${label.innerText.toLowerCase()}`;

        selectedLabel.style.display = "block";
        selectedLabel.classList.add(bgColorClass);
        selectedLabelSpan.innerText = labelSelectSpan.innerText;
    })
})

removeBtn.addEventListener("click", () => {
  selectedLabel.style.display = "none";
  labelSelectSpan.innerText = "Choose a Label";
})


document.addEventListener('click', function(e) {
  if (!headerDropdown.contains(e.target) && !headerProfileUser.contains(e.target)) {
    headerProfileUser.classList.remove("active");
  }

  let clickedAddButton = addBtns[clickedButtonIndex];
  if (!newCard.contains(e.target) && !clickedAddButton.contains(e.target)) {
    newCard.classList.remove("show");
    overlay.style.display = "none";
    clearInputs();
  }
});

saveBtn.addEventListener("click", () => {

  const newCardLabel = selectedLabelSpan.innerText;
  const newCardImageUrl = imageUrlInput.value;
  const newCardTitle = cardTitleInput.value;
  const newCardDesc = cardDescInput.value;

  const date = new Date();
  const month = date.toLocaleString('default', { month: 'short' });

  const newCardDate = `${month} ${date.getDate()}, ${date.getFullYear()}`;

  let newTask = {
    "label": newCardLabel,
    "imageUrl": newCardImageUrl,
    "title": newCardTitle,
    "desc": newCardDesc,
    "createdAt": newCardDate
  }

  if (newCard.listIndex == 0) {
    newTask.stage = "backlog";
  }
  else if(newCard.listIndex == 1) {
    newTask.stage = "todo";
  }
  else if(newCard.listIndex == 2) {
    newTask.stage = "in progress";
  }
  else {
    newTask.stage = "review";
  }

  jsonData.tasks.push(newTask);
  newCard.classList.remove("show");
  overlay.style.display = "none";
  displayCards(jsonData);   

  localStorage.setItem("jsonData", JSON.stringify(jsonData));

  clearInputs();
});

cancelBtn.addEventListener("click", () => {
  newCard.classList.remove("show");
  overlay.style.display = "none";
  clearInputs();
});


// ----------- Populating and Displaying Cards using Json File-----------------


function displayCards(jsonData) {
  let backlogTasks = jsonData.tasks.filter(task => task.stage === "backlog");
  let toDoTasks = jsonData.tasks.filter(task => task.stage === "todo");
  let inProgressTasks = jsonData.tasks.filter(task => task.stage === "in progress");
  let reviewTasks = jsonData.tasks.filter(task => task.stage === "review");
  createLists(backlogTasks, toDoTasks, inProgressTasks, reviewTasks);
}

function createLists(backlogTasks, toDoTasks, inProgressTasks, reviewTasks){
  const lists = document.querySelectorAll(".tasks__list-wrapper");
  const backlogList = lists[0];
  const toDoList = lists[1];
  const inProgressList = lists[2];
  const reviewList = lists[3];

  backlogTasks.forEach(data => {
    const backlogCard = createCard(data);
    backlogList.innerHTML += backlogCard;
  });

  toDoTasks.forEach(data => {
    const toDoCard = createCard(data);
    toDoList.innerHTML += toDoCard;
  });

  inProgressTasks.forEach(data => {
    const inProgressCard = createCard(data);
    inProgressList.innerHTML += inProgressCard;
  });

  reviewTasks.forEach(data => {
    const reviewCard = createCard(data);
    reviewList.innerHTML += reviewCard;
  });
}

function getLabelColor(label) {

  switch (label) {
    case "Design":
      return "purple";
    case "Research":
      return "blue";
    case "Planning":
      return "orange";
    case "Content":
      return "yellow";
  }
}

function getCommentsDiv(data) {
	if ((data.comments && data.comments.length > 0) || (data.files && data.files.length > 0)) {
		return `<div class="card-bottom2">
			<a href="javascript:void(0)">
				<svg class="icon comment"><use href="#comment"></use></svg> <span>${data.comments.length} Comments</span>
			</a>
			<a href="javascript:void(0)">
				<svg class="icon attachment"><use href="#attachment"></use></svg> <span>${data.files.length} files</span>
			</a>
		</div>`;
	}
	return ``;
}

function getUsersImages(userUrl){
		return  `<figure>
				<img src="${userUrl}" alt="">
		</figure>`;
}

function getUsersDiv(data){

	if (!data.userUrls || data.userUrls.length == 0) return ``;

	return `<div class="card-bottom1">
    			<div class="users">
					  ${data.userUrls.map(userUrl => getUsersImages(userUrl))}
          </div>
          <div class="card-bottom1-right">
            <svg class="icon check-icon">
              <use href="#check-icon"></use>
            </svg>
            <span>${data.completedSubTasks}/${data.totalSubTasks}</span>
          </div>
        </div>`;
}

function createCard(data) {
 
  let li = `<li class="tasks__list-card mb-2">
    <span class="card-label card-label-${getLabelColor(data.label)}">${data.label}</span>
      ${data.imageUrl && data.imageUrl !== "" ?
      	(
		  `<figure class="design-img mt-2">
         		<img src="${data.imageUrl}" alt="${data.imageUrl}">
    		</figure>
    		<h3 class="heading-sm mt-1">${data.title}</h3>`
		)
      :
      	(
        	`<h3 class="heading-sm mt-2">${data.title}</h3>`
      	)
      }
	
	<h4 class="heading-xsm">${data.desc}</h4>
  <time datetime="2021-08-20">${data.createdAt}</time>
	${
	  getCommentsDiv(data)
	}
	
	${
		getUsersDiv(data)
	}
  
  </li>`;

  return li;
}


const chatMsgInput = document.getElementById("chat-msg-input");
const chatBox = document.querySelector(".chat__gc-box");

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
hours = hours < 10 ? `0${hours}` : hours;
minutes = minutes < 10 ? `0${minutes}` : minutes;
let chatTime = `${hours}.${minutes} ${ampm}`;

chatMsgInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    chatBox.innerHTML += `<div class="chat-msg-user mb-3">
    <div class="chat-text">
        <p class="p-1">${event.target.value}</p>
        <span><svg class="icon seen-icon"><use href="#seen-icon"></use></svg> ${chatTime}</span>
    </div>
    <figure>
        <img src="images/person6.png" alt="user-2">
    </figure>
    </div>`;
    event.target.value = "";
  }
});