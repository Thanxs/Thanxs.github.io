"use strict";
const contactsList = document.querySelector('.contacts__list_fixed');
const contactsItem = document.getElementById('contacts__item');
const headerDescription = document.querySelector('.header__description');
const headerLeft = document.querySelector('.header__left');
const headerRight = document.querySelector('.header__right');
const closeModal = document.querySelector('.close');

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

function showContacts() {
    contactsItem.addEventListener('click', handleClickToShowContacts);
    closeModal.addEventListener('click', handleClickToShowContacts);
}

function handleClickToShowContacts() {
    contactsList.classList.toggle('contacts__list_fixed-active');
    headerDescription.classList.toggle('header__description-hidden');
    closeModal.classList.toggle('close-active');
    headerLeft.classList.toggle('header__left-darken');
    headerRight.classList.toggle('header__right-darken');
    document.documentElement.classList.toggle('scroll-hidden');
}