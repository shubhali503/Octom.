import '../sass/styles.scss';

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

const userName = document.querySelector(".user-name");
const tooltipUserName = document.querySelector(".tooltip-username");
const userEmail = document.querySelector(".user-email");
const tooltipEmail = document.querySelector(".tooltip-email");

headerProfileUser.addEventListener("click", () => headerProfileUser.classList.toggle("active"));

let userNameText = document.createTextNode(userName.textContent);
tooltipUserName.appendChild(userNameText);

let userEmailText = document.createTextNode(userEmail.textContent);
tooltipEmail.appendChild(userEmailText);