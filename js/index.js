// document.addEventListener("DOMContentLoaded", () => {

// });

const gitHubForm= document.querySelector("#github-form")

gitHubUrl= "https://api.github.com/users"


const formSubmitHandler= event=>{
    event.preventDefault() 
    const user = event.target[0].value 
    fetch(gitHubUrl + `/` + user)
    .then(resp=>resp.json())
    .then(userObj=> showUserInfo(userObj))
}
gitHubForm.addEventListener("submit", formSubmitHandler)

function showUserInfo(userObj){
    let list= document.querySelector("#github-container")
    let header =document.createElement("h1")
    header.innerText= userObj.login
    let logName= userObj.login
    loginRepoFunctionlity(userObj,logName,header)  
    let link=document.createElement("p")
    link.innerText= userObj.html_url 
    list.appendChild(header)
    list.appendChild(link)
}
 
const loginRepoFunctionlity=(userObj,logName,header)=>{
   header.addEventListener("click", (event)=>{
    fetch(gitHubUrl + `/` + `${logName}/repos`)
   .then(resp=>resp.json())
   .then(userRepo=> showUserRepo(userRepo))
    })
}

function showUserRepo(userRepo){
    userRepo.forEach(element => {
       renderRepo(element)
    });
}

function renderRepo(element){
    let list= document.querySelector("#github-container")
    let repo= document.createElement("li")
    repo.innerText= element.name 
    list.appendChild(repo)
}

//Ask gabe about mapping through elements and setting limit







