import '../sass/styles.scss';
import jsonData from '../data.json';

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

displayCards(jsonData);              //displaying all cards of the lists

headerProfileUser.addEventListener("click", () => headerProfileUser.classList.toggle("active"));

collapseBtn.addEventListener("click", () => {
  chatDiv.classList.toggle("collapse");
  collapseBtn.classList.toggle("collapse");
  tasksDiv.classList.toggle("expand");
})

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", () => {
    newCard.classList.toggle("show");
    overlay.style.display = "block";

    document.addEventListener('click', function(e) {
      if (!newCard.contains(e.target) && !addBtn.contains(e.target)) {
        newCard.classList.remove("show");
        overlay.style.display = "none";
      }
    });

  });
})

closeBtn.addEventListener("click", () => {
  newCard.classList.remove("show");
  overlay.style.display = "none";
});

document.addEventListener('click', function(e) {
  if (!headerDropdown.contains(e.target) && !headerProfileUser.contains(e.target)) {
    headerProfileUser.classList.remove("active");
  }

  // if (!newCard.contains(e.target) && !addBtn.contains(e.target)) {
  //     newCard.classList.toggle("show");
  // }
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
    // backlogList.appendChild(backlogCard);
    backlogList.innerHTML += backlogCard;
  });

  toDoTasks.forEach(data => {
    const toDoCard = createCard(data);
    // toDoList.appendChild(toDoCard);
    toDoList.innerHTML += toDoCard;
  });

  inProgressTasks.forEach(data => {
    const inProgressCard = createCard(data);
    // inProgressList.appendChild(inProgressCard);
    inProgressList.innerHTML += inProgressCard;
  });

  reviewTasks.forEach(data => {
    const reviewCard = createCard(data);
    // reviewList.appendChild(reviewCard);
    reviewList.innerHTML += reviewCard;
  });
}

// function createCard(data){

//   const li = document.createElement("li");
//   const cardLabel = document.createElement("span");
//   const cardFigure = document.createElement("figure");
//   const cardImage = document.createElement("img");
//   const cardTitle = document.createElement("h3");
//   const cardDesc = document.createElement("h4");
//   const cardDate = document.createElement("time");
//   const cardBottom1 = document.createElement("div");
//   const usersDiv = document.createElement("div");
//   const cardBottom1Right = document.createElement("div");
//   const checkSvg = document.createElement("svg");
//   const checkUse = document.createElement("use");
//   const checklistSpan = document.createElement("span");
//   const cardBottom2 = document.createElement("div");
//   const commentsLink = document.createElement("a");
//   const commentSvg = document.createElement("svg");
//   const commentUse = document.createElement("use");
//   const commentsSpan = document.createElement("span");
//   const filesLink = document.createElement("a");
//   const attachmentSvg = document.createElement("svg");
//   const attachmentUse = document.createElement("use");
//   const filesSpan = document.createElement("span");

//   li.classList.add("tasks__list-card", "mb-2");

//   cardLabel.classList.add("card-label");
//   if(data.label == "Design"){
//     cardLabel.classList.add("card-label-purple");
//   }
//   else if(data.label == "Research"){
//     cardLabel.classList.add("card-label-blue");
//   }
//   else if(data.label == "Planning"){
//     cardLabel.classList.add("card-label-orange");
//   }
//   else{
//     cardLabel.classList.add("card-label-yellow");
//   }
//   cardLabel.innerText = data.label;
//   li.appendChild(cardLabel);

//   if(data.imageUrl != ""){
//     cardFigure.classList.add("design-img", "mt-2");
//     cardImage.src = data.imageUrl;
//     cardFigure.appendChild(cardImage);

//     li.appendChild(cardFigure);

//     cardTitle.classList.add("mt-1");
//   }
//   else{
//     cardTitle.classList.add("mt-2");
//   }

//   cardTitle.classList.add("heading-sm");
//   cardTitle.innerText = data.title;
//   li.appendChild(cardTitle);

//   cardDesc.classList.add("heading-xsm");
//   cardDesc.innerText = data.desc;
//   li.appendChild(cardDesc);

//   cardDate.innerText = data.createdAt;
//   li.appendChild(cardDate);

//   if(data.userUrls.length !== 0){
//     cardBottom1.classList.add("card-bottom1");

//     usersDiv.classList.add("users");

//     data.userUrls.forEach(userUrl => {
//       const userFigure = document.createElement("figure");
//       const userImage = document.createElement("img");

//       userImage.src = userUrl;
//       userFigure.appendChild(userImage);

//       usersDiv.appendChild(userFigure);
//     });

//     cardBottom1Right.classList.add("card-bottom1-right");

//     checkSvg.classList.add("icon", "check-icon");
//     checkUse.setAttribute("href", "#check-icon");
//     checkSvg.appendChild(checkUse);

//     checklistSpan.innerText = data.completedSubTasks + "/" + data.totalSubTasks;

//     cardBottom1Right.appendChild(checkSvg);
//     cardBottom1Right.appendChild(checklistSpan);

//     cardBottom1.appendChild(usersDiv);
//     cardBottom1.appendChild(cardBottom1Right);

//     li.appendChild(cardBottom1);
//   }
//   else {
//     cardBottom2.classList.add("card-bottom2");

//     commentsLink.setAttribute("href", "javascript:void(0)");

//     commentSvg.classList.add("icon", "comment");
//     commentUse.setAttribute("href", "#comment");
//     commentSvg.appendChild(commentUse);

//     commentsSpan.innerText = data.comments.length + " comments";

//     commentsLink.appendChild(commentSvg);
//     commentsLink.appendChild(commentsSpan);

//     filesLink.setAttribute("href", "javascript:void(0)");

//     attachmentSvg.classList.add("icon", "attachment");
//     attachmentUse.setAttribute("href", "#attachment");
//     attachmentSvg.appendChild(attachmentUse);

//     filesSpan.innerText = data.files.length + " files";

//     filesLink.appendChild(attachmentSvg);
//     filesLink.appendChild(filesSpan);

//     cardBottom2.appendChild(commentsLink);
//     cardBottom2.appendChild(filesLink);

//     li.appendChild(cardBottom2);
//   }

//   return li;

// }

function createCard(data) {
 
  let li = `<li class="tasks__list-card mb-2">`;

  if(data.label == "Design"){
    li += `<span class="card-label card-label-purple">${data.label}</span>`;
  }
  else if(data.label == "Research")
  {
    li += `<span class="card-label card-label-blue">${data.label}</span>`;
  }
  else if(data.label == "Planning"){
    li += `<span class="card-label card-label-orange">${data.label}</span>`;
  }
  else{
    li += `<span class="card-label card-label-yellow">${data.label}</span>`;
  }

  if(data.imageUrl !== ""){
    li += `<figure class="design-img mt-2">
      <img src="${data.imageUrl}" alt="">
    </figure>
    <h3 class="heading-sm mt-1">${data.title}</h3>`
  }
  else{
    li += `<h3 class="heading-sm mt-2">${data.title}</h3>`;
  }

  li += `<h4 class="heading-xsm">${data.desc}</h4>
  <time datetime="2021-08-20">${data.createdAt}</time>`;

  if(data.userUrls.length !== 0){
    li += `<div class="card-bottom1">
    <div class="users">`;

    data.userUrls.forEach(userUrl => {
      li += `<figure>
          <img src="${userUrl}" alt="">
      </figure>`;
    });

    li += `</div>
        <div class="card-bottom1-right">
            <svg class="icon check-icon">
                <use href="#check-icon"></use>
            </svg>
            <span>${data.completedSubTasks}/${data.totalSubTasks}</span>
        </div>
    </div>
    </li>`;
  }
  else{
    li += `<div class="card-bottom2">
        <a href="javascript:void(0)">
            <svg class="icon comment"><use href="#comment"></use></svg> <span>${data.comments.length} Comments</span>
        </a>
        <a href="javascript:void(0)">
            <svg class="icon attachment"><use href="#attachment"></use></svg> <span>${data.files.length} files</span>
        </a>
    </div>`;
  }

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