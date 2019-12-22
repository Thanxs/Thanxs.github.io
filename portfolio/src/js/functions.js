"use strict";

// function createSlides(amount) {        
//     for (let i = 0; i < amount; i++) {
//         let slide = document.createElement('img');
//         $(slide).addClass('slide');
//         slide.src = `./images/slides/${i+1}.jpg`;
//         $('.carousel__inner').append(slide);
//     }
// }

let projects;
function showProjects(projects) {
    const projectsList = document.querySelector('.projects__list');
    sendRequest('GET', 'js/projects.json', projects).then(projects => {
        projects.forEach(project => {
            projectsList.innerHTML += `<li class="projects__item">
                                        <div class="projects__image ${project.name}">
                                            <div class="description">${project.description}</div>
                                            <div class="btn-block">
                                                <a href="${project.webSiteLink}" target="blank" class="btn btn-light view-site">View site</a>
                                                <a href="${project.gitHubLink}" target="blank" class="btn btn-light view-git">View GitHub</a> 
                                            </div>                                                              
                                        </div>                    
                                        </li>`;
        });
    });     
}

function sendRequest(method, url, projects) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status <= 400) {
                projects = xhr.response;                
                resolve(projects);
            } else {
                reject(xhr.response);
            }
        });
        xhr.send();
    });    
}

function activateHamburger() {    
    const headerList = document.querySelector('.header__list'),
          headerItem = document.querySelectorAll('.header__item'),   
          hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger__active');
        headerList.classList.toggle('header__list__active');
        playSound('menu-open');
    });
    
    headerItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger__active');
            headerList.classList.toggle('header__list__active');
        });
    });    
}

function playSound(name) {
    const sound = new Audio();
    sound.src = `./audio/${name}.mp3`;
    sound.autoplay = true;
}