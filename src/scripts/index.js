import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'
import { eventUrl } from './services/event.js'


import { user } from './objects/user.js'
import { screen } from './objects/screen.js'


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if (validateEmptyInpur(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (validateEmptyInpur(userName)) return

    if(isEnterKeyPressed){
        getUserData(userName)
    }
})

function validateEmptyInpur(userName){
    if(userName.length === 0){
        alert('Introdusca un nombre de usuario de GitHub')
        return true
    }
}

async function getUserData(userName){
    
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await eventUrl(userName)
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)


}