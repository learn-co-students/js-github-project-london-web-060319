const form = document.querySelector("#github-form")
const user_list = document.querySelector("#user-list")

function fetchData(username) {
    
    fetch(`https://api.github.com/search/users?q=${username}`, {
        method: "GET"
    })
    .then(resp => resp.json())
    .then(user => {
        arrayUsers(user.items)
    })
    .catch(error => console.error(error));
}


form.addEventListener("submit", submitHandler)


function submitHandler(event) {
    user_list.innerHTML = ""
    event.preventDefault()
    const username = event.target.search.value
    fetchData(username)
}

function createUser(user) {

    const create_div_card = document.createElement("div")
    create_div_card.className = user.login
    create_div_card.dataset.id = user.id


    const create_user = document.createElement("li")
    create_user.innerText = `login: ${user.login}`

    const create_img = document.createElement("img")
    create_img.src = user.avatar_url

    const create_p = document.createElement("p")

    const create_link = document.createElement("a")
    create_link.href = user.html_url
    create_link.innerText = "Link to repo!"

    const div_card = user_list.appendChild(create_div_card)
    div_card.appendChild(create_user)
    div_card.appendChild(create_p)
    create_p.appendChild(create_link)
    div_card.appendChild(create_img)
    div_card.appendChild(document.createElement("br"))
}

function arrayUsers(array) {
    array.forEach(element => {
        createUser(element)
    })
}
// ---------------------------

const repoHandler = event => { 
    const username = event.target.parentElement.attributes.class.value
    fetchRepo(username)
    }

const fetchRepo = (username) => {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(arrayRepos)
}

user_list.addEventListener("click", repoHandler)

const appendRepo = element => {
    const username = element.full_name.split("/")[0]
    const selected_item = document.querySelector("." + username)
    making_repo = document.createElement("div")
    making_repo.innerText = `Repo: ${element.name}`

    selected_item.appendChild(making_repo)
}

const arrayRepos = (repo) => {
    repo.forEach(element => {
        appendRepo(element)
    });
}