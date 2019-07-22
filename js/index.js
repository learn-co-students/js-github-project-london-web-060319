document.addEventListener("DOMContentLoaded", () => {
    searchUser();
})

function searchUser() {
    const form = document.querySelector("form#github-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const userName = event.target.search.value;
        fetchUsers(`https://api.github.com/search/users?q=${userName}`);
    })
}

function fetchUsers(userUrl) {
    fetch(userUrl, {headers: {"Accept": "application/vnd.github.v3+json"}})
    .then(users => users.json())
    .then(allUsersObj => showUsers(allUsersObj["items"]));
}

function showUsers(allUsersObj) {
    allUsersObj.forEach(function(userObject) {
    const usersUl = document.querySelector("ul#user-list");
    
    const userName = document.createElement("h4");
    userName.innerText = userObject["login"];
    usersUl.appendChild(userName);
    
    const userAvatar = document.createElement("div");
    userAvatar.innerHTML = `<img src=${userObject["avatar_url"]}>`;
    usersUl.appendChild(userAvatar);
    
    const userLink = document.createElement("a");
    userLink.href = `${userObject["html_url"]}`;
    userLink.innerText = `${userObject["html_url"]}`;
    usersUl.appendChild(userLink);
    
    const seeRepos = document.createElement("li");
    seeRepos.innerText = `View ${userObject["login"]}'s repositories`;
    usersUl.appendChild(seeRepos);
    seeRepos.addEventListener("click", (event) => {fetchRepos(`https://api.github.com/users/${userObject["login"]}/repos`)})});
}

function fetchRepos(repoUrl) {
    fetch(repoUrl)
    .then(resp => resp.json())
    .then(repoArr => showRepos(repoArr));
}

function showRepos(repoArr) {
    reposDiv = document.querySelector("ul#repos-list");
    repoArr.forEach(function(repoObj) {
        repoLi = document.createElement("li");
        repoLi.innerText = repoObj.name;
        reposDiv.appendChild(repoLi);
    })
}
