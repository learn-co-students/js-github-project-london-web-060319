const form = document.querySelector("#github-form");
const fetchURL = {
  users: "https://api.github.com/search/users",
  repos: "n/a"
};
const repo = document.querySelector("#repo-list");
const user = document.querySelector("#user-list");

const submitForm = e => {
  e.preventDefault();
  //   let querySelection = document.querySelector("#query-select");
  let searchQuery = document.querySelector("#search").value;
  return fetch(fetchURL.users + "?q=" + searchQuery)
    .then(data => data.json())
    .then(userData => processData(userData));
};

const processData = data => data.items.forEach(d => userList(d));
// const processRepoData = data => data.items.forEach(d => console.log(d));

const userList = data => {
  let name = data.login,
    avatar = data.avatar_url,
    profileLink = data.html_url,
    repoURL = data.repos_url;

  // rest inner html so content doesn't duplicate
  //   user.innerHTML = "";

  // show avatar
  let userImage = document.createElement("IMG");
  userImage.className = "user-avatar";
  userImage.src = avatar;

  // show user name
  let userName = document.createElement("H3");
  let userNameText = document.createTextNode(name);
  userName.appendChild(userNameText);

  // create link to user account
  let userLink = document.createElement("a");
  let linkText = document.createTextNode(`@${name}`);
  userLink.appendChild(linkText);
  userLink.href = profileLink;

  // create link to show user repo
  let repoLink = document.createElement("a");
  let linkTextRepo = document.createTextNode("Show Repo");
  repoLink.appendChild(linkTextRepo);
  repoLink.href = "#";
  repoLink.className = "repo-link";
  repoLink.addEventListener("click", showRepo);
  repoLink.dataRepo = repoURL;

  user.appendChild(userImage);
  user.appendChild(userName);
  user.appendChild(userLink);
  user.appendChild(repoLink);
};

const repoList = () => {
  let repoURL = data.html_url,
    repoName = data.name,
    langage = data.language

  let li = document.createElement("li");

  let name = document.createElement("H5");
  let nametext = document.createTextNode(repoName);
  name.appendChild(nametext);
  li.appendChild(name)

  let repoLink = document.createElement("a");
  let repoText = document.createTextNode(`@${repoURL}`);
  repoLink.appendChild(repoText);
  repoLink.href = profileLink;
  li.appendChild(repoLink)

  let repoLanguage = document.createElement("p");
  let languageText = document.createTextNode(`@${langage}`);
  repoLanguage.appendChild(languageText);
  li.appendChild(repoLanguage)

  repo.appendChild(li)

};

// const showRepo = e => {
//     e.preventDefault();
//     return fetch(e.target.dataRepo)
//       .then(data => console.log(data.json()))
//     //   .then(repoData => repoList(repoData));
//   };

form.addEventListener("submit", submitForm);
