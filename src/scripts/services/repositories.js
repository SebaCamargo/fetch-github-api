import { baseUrl, eventsQuantity } from "../variables.js"

async function getRepositories(userName){
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${eventsQuantity}`)
    return await response.json()
    
}

export { getRepositories }