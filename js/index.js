// document.addEventListener("DOMContentLoaded", () => {

// })
const usersSearchUrl = "https://api.github.com/search/users?q="
const userReposUrl = username => "https://api.github.com/users/" + username + "/repos"
const searchForm = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")
const reposList = document.querySelector("#repos-list")

searchForm.addEventListener('submit', event => {
    event.preventDefault()
    const username = event.target.search.value
    fetch(usersSearchUrl + username, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then( resp => resp.json() )
    .then( searchResults => renderAllUserCards(searchResults.items) )
})

const renderAllUserCards = (userArray) => {
    userList.innerHTML = ""
    userArray.forEach( renderUserCard )
}

const renderUserCard = userObj => {
    const userCard = document.createElement("div")

    const usernameEl = document.createElement("h3")
    usernameEl.innerText = userObj.login

    const avatarEl = document.createElement("img")
    avatarEl.src = userObj.avatar_url

    const profileLinkEl = document.createElement("a")
    profileLinkEl.href = userObj.html_url
    profileLinkEl.innerText = userObj.login + "'s Profile"

    const brEl = document.createElement('br')

    const buttonEl = document.createElement('button')
    buttonEl.innerText = "Repos"
    buttonEl.addEventListener('click', () => handleReposClick(userObj.login))

    userCard.append(usernameEl, avatarEl, brEl, profileLinkEl, buttonEl)
    userList.append(userCard)

    
}

const handleReposClick = username => {
    const url = userReposUrl(username)
    fetch(url, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then( resp => resp.json() )
    .then( renderAllUserRepos )
}

const renderAllUserRepos = reposArray => {
    userList.innerHTML = ""
    reposArray.forEach( renderUserRepo )
}

const renderUserRepo = repoObj => {
    const reposCard = document.createElement("li")

    const  reposEl = document.createElement("h2")
    reposEl.innerText = repoObj.full_name

    reposCard.append(reposEl)
    reposList.append(reposCard)
}