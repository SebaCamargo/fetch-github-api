import { baseUrl, repositoriesQuantity } from "../variables.js"

async function eventUrl(userName){
    const event = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
    
    return await event.json()

}

export { eventUrl }
