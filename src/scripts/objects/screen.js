const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto de Perfil del Usuario" />
                                        <div class="data" >
                                            <h1> ${user.name ?? 'No tiene nombre registrado 😥'}</h1>
                                            <p>${user.bio ?? 'No tiene bio registrada 😥'}</p>
                                            <div class="follow">
                                                <h4>👥 Followers: ${user.followers} </h4>
                                                <h4>👥 Following: ${user.following} </h4>
                                            </div>          
                                        </div>
                                    </div>` 

        let repositoriesItens = ''
        user.repositories.forEach(function (repo){
            repositoriesItens += `<li> 
                                     <a href="${repo.html_url}" target="_blank">${repo.name}
                                        <div class="about">
                                            <ul>
                                                <li><p>🍴 ${repo.forks_count}</p></li>

                                                <li><p>⭐ ${repo.stargazers_count} </p></li>

                                                <li><p>👀 ${repo.watchers_count}</p></li>

                                                <li><p>📝 ${repo.language ?? 'Não tem'}</p></li>
                                            </ul>
                                        </div>
                                    </a>
                                </li>`

        })


        if(user.repositories.length > 0){
            this.userProfile.innerHTML +=  `<div class="repositories section">
                                                <h2> Repositorios </h2>
                                                <ul> ${repositoriesItens} </ul>
                                            </div>`
       }
       
       let eventsCreate = ''
       user.events.forEach(event =>{
            const PushEvent = event.type === 'PushEvent'
            const CreateEvent = event.type === 'CreateEvent'
            
            if (PushEvent){
                eventsCreate += `<li><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a> <p> - ${event.payload.commits[0].message}</p></li> `
            }    
            else if(CreateEvent){
                eventsCreate += `<li><a href="${event.repo.url}" target="_blank">${event.repo.name}</a> <p> - Sem Mensagem de Commit </p></li>`
            }
       })
       
       if(user.events.length > 0){
                this.userProfile.innerHTML += ` 
                                            <div class="event">
                                                    <h2>Eventos</h2>
                                                <div class="box-events">
                                                    <ul> ${eventsCreate} </ul>
                                                </div> 
                                            </div>  `
            }
    },
    
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>"Usuario no encontrado"</h3>`
    }
}
export { screen }