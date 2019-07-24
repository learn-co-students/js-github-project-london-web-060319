const form = document.querySelector("#github-form");
const fetchURL = {
  users: "https://api.github.com/search/users",
  repos: "https://api.github.com/search/repositories"
};

const repo = document.querySelector("#repos-list");
const user = document.querySelector("#user-list");

const submitForm = e => {
  e.preventDefault();
  user.innerHTML = "";
  repo.innerHTML = "";

  let querySelection = document.querySelector("#query-select");
  if (querySelection.value === "user") userSearch();
  else if (querySelection.value === "repo") repoSearch();
};

const userSearch = () => {
  let searchQuery = document.querySelector("#search").value;
  return fetch(fetchURL.users + "?q=" + searchQuery)
    .then(data => data.json())
    .then(userData => processData(userData));
};

const processData = data => data.items.forEach(d => userList(d));
const processRepoData = data => data.items.forEach(d => repoList(d));

const userList = data => {
  let name = data.login,
    avatar = data.avatar_url,
    profileLink = data.html_url,
    repoURL = data.repos_url;

  // show avatar
  let userImage = document.createElement("IMG");
  userImage.className = "user-avatar";
  userImage.src = avatar;

  // show user name
  let userName = document.createElement("H3");
  let userNameText = document.createTextNode(name);
  userName.appendChild(userNameText);

  // create link to user account
  let userLinkP = document.createElement("p");
  let userLink = document.createElement("a");
  let linkText = document.createTextNode(`@${name}`);
  userLink.appendChild(linkText);
  userLink.href = profileLink;
  userLinkP.appendChild(userLink);

  // create link to show user repo
  let repoLinkP = document.createElement("p");
  let repoLink = document.createElement("a");
  let linkTextRepo = document.createTextNode("Show Repos");

  repoLink.appendChild(linkTextRepo);
  repoLink.href = "#";
  repoLink.className = "repo-link";
  repoLink.addEventListener("click", showRepo);
  repoLink.dataRepo = repoURL;
  repoLinkP.appendChild(repoLink);

  user.appendChild(userName);

  user.appendChild(userImage);
  user.appendChild(userLinkP);
  user.appendChild(repoLinkP);
};

const repoList = data => {
  let repoURL = data.html_url,
    repoName = data.name,
    language = data.language === null ? "unknown" : data.language,
    description = data.description;

  let li = document.createElement("li");
  li.className = "repo-list-item";

  let repoLink = document.createElement("a");
  repoLink.href = repoURL;
  let name = document.createElement("H3");
  let nametext = document.createTextNode(repoName);
  name.appendChild(nametext);
  repoLink.appendChild(name);
  li.appendChild(repoLink);

  let repoDescription = document.createElement("p");
  let descriptionText = document.createTextNode(`${description}`);
  repoDescription.appendChild(descriptionText);
  
  let languageImage = document.createElement("i");
  languageImage.innerText = language;

  if (language === "HTML") {
    language = "html5";
  }
  if (language === "C++") {
    language = "cplusplus";
  }
  if (language === "C#") {
    language = "csharp";
  }
  if (language === "CSS") {
    language = "css3";
  }
  
  languageImage.className = `devicon-${language}-plain-wordmark colored`;

  li.appendChild(repoDescription);
  li.appendChild(languageImage);

  repo.appendChild(li);
};

const showRepo = e => {
  user.innerHTML = "";
  e.preventDefault();
  return fetch(e.target.dataRepo)
    .then(data => data.json())
    .then(repoData => repoData.forEach(d => repoList(d)));
};

const repoSearch = () => {
  let searchQuery = document.querySelector("#search").value;
  return (
    fetch(fetchURL.repos + "?q=" + searchQuery.split(" ").join("+"))
      .then(data => data.json())
      //   .then(console.log)
      .then(repoData => processRepoData(repoData))
  );
};

form.addEventListener("submit", submitForm);
