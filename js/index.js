// When a form is submitted, take the value of the input and search GitHub for user matches using the User Search Endpoint.
//
// Display results of the search on the page incuding username, avatar and link to profile.
//
// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that use.
//
// Display all the respositories for that user on the page.

const form = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")

form.addEventListener('submit', formSubmit)

function formSubmit(event){
userList.innerHTML = ""
event.preventDefault()
const userName = event.target.search.value
fetchUsers(userName)
}

function fetchUsers(userName){
  fetch(`https://api.github.com/search/users?q=${userName}`,{
    method: "GET",
    accept: "application/vnd.github.v3+json"
  })
  .then (resp => resp.json())
  .then (user => {
    renderAllUsers(user.items)
})
}

function renderAllUsers(array){
  array.forEach(element => {
    createUser(element)
  })
}

function createUser(user){
  const userCard = document.createElement('div')

  const userNameEl = document.createElement('h4')
  userNameEl.innerText = user.login

  const linkEl = document.createElement('a')
  linkEl.href = user.html_url
  linkEl.innerHTML = `${user.login}'s profile`

  const brEl = document.createElement('br')

  const avatarEl = document.createElement('img')
  avatarEl.src = user.avatar_url

  const seeRepos = document.createElement("li")
  seeRepos.innerText = `View ${user.login}'s repositories`;
  userCard.appendChild(seeRepos)
  seeRepos.addEventListener('click', (event) => {fetchRepos(`https://api.github.com/users/${user.login}/repos`)});



  userCard.append(userNameEl, linkEl, brEl, avatarEl)
  userList.append(userCard)
}


function fetchRepos(repoUrl){
  fetch(repoUrl)
  .then(resp => resp.json())
  .then(repoArray => showRepos(repoArray));
}

function showRepos(repoArray){
  reposDiv = document.querySelector("ul#repos-list");
  repoArray.forEach(function(repoObj){
    repoLi = document.createElement("li");
    repoLi.innerText = repoObj.name;
    reposDiv.appendChild(repoLi);
  })
}
