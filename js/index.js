const githubUrl = 'https://api.github.com/users/';

const githubForm = document.querySelector('#github-form');
const userList = document.querySelector('#user-list');

const formSubmit = event => {
  event.preventDefault();
  const user = event.target[0].value;

  return fetch('http://api.github.com/search/users?q=' + user)
  .then(resp => resp.json())
  .then(resp => renderUsers(json));
}

githubForm.addEventListener('submit', formSubmit);

function renderUsers(json) {
  console.log(json.items);
  userList.innerHTML = '';
  json.items.forEach(item => {
    renderUser(item);
  })
}

function renderUser(item) {
  const card = document.createElement('div');
  let header = document.createElement('h2');
  const img = document.createElement('img');
  const link = document.createElement('p');
  const btn = document.createElement('button');

  header.innerText = item.login;
  img.src = item.avatar_url;
  link.innerHTML = `<a href='${item.url}'>Check out their profile here</a>`;
  btn.innerText = 'Repositories';
  btn.id = item.login;
  card.appendChild(header);
  card.appendChild(img);
  card.appendChild(link);
  card.appendChild(btn);
  userList.appendChild(card);
  btn.addEventListener('click', fetchRepos);
}

function fetchRepos() {
  console.log(this.id);
  return fetch(githubUrl + this.id + '/repos')
    .then(resp => resp.json())
    .then(resp => renderRepos(json));
}

function renderRepos(json) {
  console.log(json);
  userList.innerHTML = '';
  json.items.forEach(item => {
    renderRepo(item);
  })
}

// not working
function renderRepo(item) {
  const card = document.createElement('div')
  let newLi = document.createElement('p')
  newLi.innerHTML = `<a href="${item.url}">${item.url}</a>`
  card.appendChild(newLi)
}