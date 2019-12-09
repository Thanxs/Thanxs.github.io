function searchRepositories() {
    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const isValidated = validateSearch(searchInput.value);
        if (isValidated) {            
            const searchText = `https://api.github.com/search/repositories?q=${searchInput.value}`;
            repositoryList.innerHTML = '';
            searchInput.value = '';
            const request = getRequest('GET', searchText);
            setReadyStateChange(request);
            } else {
                repositoryList.innerHTML = `<li class="error">Please, type the name of repository.</li>`
            }   
    });   
}

function setReadyStateChange(request) {        
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const foundedRepositories = JSON.parse(request.responseText);
            
            if (foundedRepositories.total_count === 0) {                    
                repositoryList.innerHTML = `<li class="error">Unfortunately, no results were found for your request.</li>`;
                dropDown.classList.remove('active');
            } else {
                dropDown.classList.add('active');

                showRepositories(foundedRepositories.items);                
                
                getArrayOfLanguages(foundedRepositories);

                const dropDownItems = document.querySelectorAll('.dropdown-language');
                dropDownItems.forEach(item => {
                    item.addEventListener('click', handleClickOnLanguage);
                });

                btnSort.addEventListener('click', () => {                    
                    const filteredRepositoriesByAuthorName = sortByAuthorName(foundedRepositories.items);                    
                    showRepositories(filteredRepositoriesByAuthorName);
                });             
            }
        }

        else if (request.status === 422) {
            repositoryList.innerHTML = `<li class="error">No results were found for your request!</li>`;
        }

        else if (request.status !== 422 && request.status !== 200) {
            repositoryList.innerHTML = `<li class="error">Error ${request.status}. Try later.</li>`;
        }
    });
}

function getRequest(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    request.send();
    return request;
}

function showRepositories(repositories) {
    repositoryList.innerHTML = '';
    repositories.forEach(repository => {
        repositoryList.innerHTML += `
            <li class="repository__item" data-language="${repository.language}">
                <h5>Name of repository: <a href="${repository.html_url}" target="blank">${repository.name}</a></h5>
                <h6>Author of repository: <a href="${repository.owner.html_url}" target="blank">${repository.owner.login}</a></h6>
                <div class="repository__avatar">
                    <img src="${repository.owner.avatar_url}" alt="avatar">
                </div>
                <div class="repository__item-language">Language: <strong class="lang">${repository.language || "information is absent"}</strong></div>
            <li>
        `;
    });
}

function getArrayOfLanguages(repositories) {
    let languages = repositories.items.map(item => {
        return item.language;
    }).filter(language => {
        return language !== null;
    });                

    languages = unique(languages);    
   
    const repositoriesLang = document.querySelector('.repositories-lang');
    repositoriesLang.innerHTML = '';

    languages.forEach(language => {
       repositoriesLang.innerHTML += `
       <a class="dropdown-item dropdown-language" href="#">${language}</a>`
   });

   return languages;
}

function unique(arr) {
    return Array.from(new Set(arr));
}

function handleClickOnLanguage() {    
    const repositoryItems = document.querySelectorAll('.repository__item');
    
    for (let i = 0; i < repositoryItems.length; i++) {
        if (repositoryItems[i].dataset.language === event.target.innerText) {
            repositoryItems[i].classList.remove('hide');
            continue;
        } else {
            repositoryItems[i].classList.add('hide');
        }  
    }
}

function sortByAuthorName(arr) {
    return arr.sort((a, b) => a.owner.login > b.owner.login ? 1 : -1);
}

function validateSearch(value) {
    const searchText = /^.+$/;

    if (searchText.test(value)) {
        return true;
    }
        return false;    
}