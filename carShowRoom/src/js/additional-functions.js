'use strict';

function showEntities() {    
    $(document.createElement('div'))
    .addClass('entities')
    .html(`<div class="persons" data-entity="persons">Persons</div>
            <div class="companies" data-entity="companies">Companies</div>
            <div class="cars" data-entity="cars">Cars</div>`)
    .click(handleClickOnEntity)
    .appendTo('.container');    
}

function playSound(name) {
    const sound = new Audio();
    sound.src = `./audio/${name}.mp3`;
    sound.autoplay = true;
}

function showInfoOfSelectedEntity(entity, dataEntity) {
    refreshInfo('ul', '.info', '.info-cars', '.wrapper-info', '.purchase-info', '.sale-info', '.delete-confirmation', '.btn-add');

    const entityList = document.createElement('ul');
    $(entityList).addClass('entity__list').addClass('translated')
    .attr('data-entity', dataEntity);
    setTimeout(() => {
        $(entityList).removeClass('translated');
    }, 300);

    $(entity).each((i, item) => {
        $(entityList).append(`<li class="entity__item" data-id="${item.id}" data-entity="${dataEntity}">
                                    <div>${item.name}</div>
                                    <div btn-block">
                                       <button class="btn btn-success view">View</button>
                                       <button class="btn btn-secondary edit">Edit</button>
                                       <button class="btn btn-danger remove">Remove</button>
                                    </div>
                                </li>`);
    });
    
    $(entityList).appendTo('.container');
    
    createBtnAdd(dataEntity);

    setEventListenerOnBtn(); 
}

function setIdToOwners(owners) {    
    $(owners).each((index, owner) => {
        owner.setOwnerId(index + 1);
        owner.setCar([]);
    });
}

function setIdOfCars() {
    $(cars).each((index, car) => {
        car.id = index + 1;
    });
}

function refreshInfo(...selectors) {
    $(selectors).each((i, selector) => {
        if ($(selector)) {
            $(selector).remove();
        }
    });    
}

function showDetailsOfEntity(entity, entityId, disabled) {
    const indexOfSelectedEntity = getIndexOfSelectedEntity(entity, entityId);

    const entityProperties = Object.keys(entity[indexOfSelectedEntity]);
    const entityValues = Object.values(entity[indexOfSelectedEntity]);   

    const wrapperForInformations = document.createElement('div');

    $(wrapperForInformations).addClass('wrapper-info')
    .appendTo('.container');    

    const entityInformation = document.createElement('div');

    $(entityInformation).addClass('info')
    .appendTo(wrapperForInformations);

    const formInsideEntityInformation = document.createElement('form');

    $(formInsideEntityInformation)
    .attr('name', 'formInsideEntityInformation')
    .addClass('entity-form')
    .appendTo(entityInformation);    

    for (let i = 0; i < entityProperties.length; i++) {

        if (entityProperties[i] === 'id') {
            continue;
        }  else if (entityProperties[i] === 'balance') {
            $(formInsideEntityInformation).append(`<div class="form-group">
                                                        <input type="text" disabled class="form-control" id="inputNumber${i+1}" placeholder="Please, input ${entityProperties[i]}" value="${entityValues[i]}">
                                                      </div>`);
            continue;

        } else if (entityProperties[i] === 'cars') {
            const garage = entityValues[i].map((car) => {
                return car.name;
            });
            
            $(formInsideEntityInformation).append(`<div class="form-group">
                                                        <input type="text" disabled class="form-control" id="inputNumber${i+1}" placeholder="The car is missing" value="${garage || "The car is missing"}">
                                                      </div>`);

            continue;
        }

            $(formInsideEntityInformation).append(`<div class="form-group">                                              
                                                    <input type="text" ${disabled} class="form-control" id="inputNumber${i+1}" placeholder="Please, input ${entityProperties[i]}" value="${entityValues[i]}">
                                                  </div>`);
    }
}

function getIndexOfSelectedEntity(entity, indexOfSelectedEntity) {
    return entity.findIndex((item) => {
        return item.id === indexOfSelectedEntity;
    });
}

function getArrayOfValuesInsideForm(form) {    
    let arrayOfValues = [];

    for (let i = 0; i < form.length; i++) {
        arrayOfValues.push(form[i].value);
    }
    return arrayOfValues;
}

function removeEntity(entity, entityWhoCanBeDeleted, entityId) {
    for (let i = 0; i < entity.length; i++) {

        if (entity[i].id === entityId) {
            entity.splice(i, 1);
            $(entityWhoCanBeDeleted).remove();     
            $(event.target).closest('.delete-confirmation')
            .remove();
            break;
        }
    }
}

function createInfoAboutCars(dataEntityId, dataEntity, createListOfCarsToMakeDeal) {
    playSound('engine-sound-3');

    $('.info').addClass('tranlated_sixty');

    const infoAboutCars = document.createElement('div');

    $(infoAboutCars).addClass('info-cars');

    setTimeout(() => {
        refreshInfo('.info-cars');

        $(infoAboutCars).appendTo('.wrapper-info');        
        createListOfCarsToMakeDeal(dataEntityId, dataEntity);
    }, 1000);
}

function generateIdOfNewEntity(entity) {
    return Math.max(...entity.map(({id}) => id + 1));    
}

function checkLocalStorage() {
    if (localStorage.getItem('persons') !== null) {
        persons = JSON.parse(localStorage.getItem('persons'));
        
    } else {
        persons[0].setBalance(1200);
        persons[1].setBalance(7500000);        
    }

    if (localStorage.getItem('companies') !== null) {
        companies = JSON.parse(localStorage.getItem('companies'));        
    } else {
        companies[0].setBalance(900000);
    }
    
    if (localStorage.getItem('cars') !== null) { 
        cars = JSON.parse(localStorage.getItem('cars'));                     
    }   
}

function showError(selectorOfForm, errorMessage) {
    const form = $(selectorOfForm);
    const error = document.createElement('div');
    $(error).addClass('error')
    .text(errorMessage)
    .appendTo(form);    
}

function createFormInsideInformationOfCars() {
    const formInsideInfoOfCars = document.createElement('form');

    $(formInsideInfoOfCars).addClass('cars-form')
    .appendTo('.info-cars');    

    return formInsideInfoOfCars;
}

function createElementSelectToMakeDealWithCars() {
    const formInsideInfoOfCars = createFormInsideInformationOfCars(); 

    const selectCars = document.createElement('select');

    $(selectCars).addClass('select-for-deal')
    .appendTo(formInsideInfoOfCars);

    return selectCars;
}

function getOwnerWhoGonnaMakeDeal(dataEntityId, dataEntity) {
    let selectedOwner;   

    if (dataEntity === 'persons') {
        let indexOfPerson = getIndexOfSelectedEntity(persons, parseInt(dataEntityId));
        selectedOwner = persons[indexOfPerson];        
        
    } else if (dataEntity === 'companies') {
        let indexOfCompany = getIndexOfSelectedEntity(companies, parseInt(dataEntityId));
        selectedOwner = companies[indexOfCompany];
    }

    return selectedOwner;
}

function createListOfCarsToBuy(dataEntityId, dataEntity) {
    const selectCars = createElementSelectToMakeDealWithCars();

    const selectedOwner = getOwnerWhoGonnaMakeDeal(dataEntityId, dataEntity);    

    if (cars.length === 1) {
        $(selectCars).attr('size', (cars.length + 1));

        createBtnConfirmBuyCar(dataEntityId, dataEntity);

    } else if (cars.length === 0) {        
        $('.info-cars').html(`<div class="notification-missing">Dear, ${selectedOwner.name}, unfortunately, our agency is not able to                               provide you with cars for purchase at the moment. Have a nice day=!)</div>
                                <button type="button" class="btn btn-outline-info btn-deal-cancel">Ok</button>`);
        
        setEventListenerOnBtn();
    } 
     else {
        $(selectCars).attr('size', cars.length);
        
        createBtnConfirmBuyCar(dataEntityId, dataEntity);
    }    

    $(cars).each((i, car) => {
       $(selectCars).append(`<option class="car-option" data-car-id="${car.id}" data-car-price="${car.price}">${car.name}</option>`); 
    });
    
    setEventListenerOnOptions();    
}

function createListOfCarsToSell(dataEntityId, dataEntity) {
    const selectCars = createElementSelectToMakeDealWithCars();    

    const selectedOwner = getOwnerWhoGonnaMakeDeal(dataEntityId, dataEntity);

    let ownerCars = selectedOwner.cars;       

    if (ownerCars.length === 1) {
        $(selectCars).attr('size', (ownerCars.length + 1));

        createBtnConfirmSaleCar(dataEntityId, dataEntity);

    } else if (ownerCars.length === 0) {        
        $('.info-cars').html(`<div class="notification-missing">Dear, ${selectedOwner.name}, you don't have any cars for sale! Have a nice day =)</div>
                                <button type="button" class="btn btn-outline-info btn-deal-cancel">Ok</button>`);
        
        setEventListenerOnBtn();
    } 
     else {
        $(selectCars).attr('size', ownerCars.length);
        
        createBtnConfirmSaleCar(dataEntityId, dataEntity);
    }  

    $(ownerCars).each((i, car) => {
        $(selectCars).append(`<option class="car-option" data-car-id="${car.id}" data-car-price="${car.price}">${car.name}</option>`); 
     });
     
     setEventListenerOnOptions();     
}

function createInfoToMakeDeal(cssClass) {
    $('.wrapper-info').addClass('translated');

    const dealInformation = document.createElement('div');
    $(dealInformation).addClass(cssClass).addClass('translated')
    .appendTo($('.container'));

    setTimeout(() => {
        refreshInfo('.wrapper-info', '.error');        
        $(dealInformation).removeClass('translated');
    }, 600);

    return dealInformation;
}

function createInfoAboutSelectedCarToBuy(dataCarId, dataCarPrice, dataOwnerId, dataEntity) {
    const purchaseInformation = createInfoToMakeDeal('purchase-info'); 

    let selectedCarIndex = getIndexOfSelectedEntity(cars, dataCarId);    
    let selectedPersonIndex = getIndexOfSelectedEntity(persons, dataOwnerId);
    let selectedCompanyIndex = getIndexOfSelectedEntity(companies, dataOwnerId);

    $(purchaseInformation).html(`<div>
                                        <div class="purchase-confirmation"><b>Model:</b> ${cars[selectedCarIndex].name}</div>
                                        <div class="purchase-confirmation"><b>Price:</b> ${dataCarPrice} $</div>
                                        <div class="purchase-confirmation"><b>Customer:</b> ${(dataEntity === 'persons' ? persons[selectedPersonIndex].name : companies[selectedCompanyIndex].name)}</div>
                                        <div class="buy-buttons-block">
                                            <button type="button" data-owner-id="${dataOwnerId}" data-entity="${dataEntity}" data-car-id="${dataCarId}" class="btn btn-info btn-buy-accept">Confirm purchase</button>
                                            <button type="button" class="btn btn-info btn-buy-decline">Decline</button>
                                        </div>
                                </div>`);

    setEventListenerOnBtn();
}

function createInfoAboutSelectedCarToSell(dataCarId, dataCarPrice, dataOwnerId, dataEntity) {
    const saleInformation = createInfoToMakeDeal('sale-info');   

    let selectedPersonIndex = getIndexOfSelectedEntity(persons, dataOwnerId);
    let selectedCompanyIndex = getIndexOfSelectedEntity(companies, dataOwnerId);

    let arrayOfCarsInProperty, selectedCarIndex;

    if (dataEntity === 'persons') {
        arrayOfCarsInProperty = persons[selectedPersonIndex].cars;
        selectedCarIndex = getIndexOfSelectedEntity(arrayOfCarsInProperty, dataCarId);
    } else if (dataEntity === 'companies') {
        arrayOfCarsInProperty = companies[selectedCompanyIndex].cars;
        selectedCarIndex = getIndexOfSelectedEntity(arrayOfCarsInProperty, dataCarId);
    }   
    

    $(saleInformation).html(`<div>
                                    <div class="sale-confirmation"><b>Model:</b> ${arrayOfCarsInProperty[selectedCarIndex].name}</div>
                                    <div class="sale-confirmation"><b>Initial price:</b> ${dataCarPrice} $</div>
                                    <div class="sale-confirmation"> <b>Important notice:</b>
                                        In the case of a car sale, our agency withholds 20% of the initial cost of the car.
                                    </div>
                                    <div class="sale-confirmation"><b>Price after withholds:</b> ${dataCarPrice*0.8} $</div>
                                    <div class="sale-buttons-block">
                                        <button type="button" data-owner-id="${dataOwnerId}" data-entity="${dataEntity}" data-car-id="${dataCarId}" class="btn btn-info btn-sale-accept">Confirm sale</button>
                                        <button type="button" class="btn btn-info btn-sale-decline">Decline</button>
                                    </div>
                            </div>`);

    setEventListenerOnBtn();
}

function showInfoToMakeDeal(dataOwnerId, dataEntity, createInfoAboutSelectedCarToMakeDeal) {
    const carOptions = $('.car-option');

    for (let i = 0; i < carOptions.length; i++) {
        if ($(carOptions[i]).attr('selected')) {
            let dataCarId = parseInt($(carOptions[i]).attr('data-car-id'));
            let dataCarPrice = parseInt($(carOptions[i]).attr('data-car-price'));

            refreshInfo('.error');

            createInfoAboutSelectedCarToMakeDeal(dataCarId, dataCarPrice, dataOwnerId, dataEntity);
            playSound('engine-sound-2');                 
            break;

        } else {
            refreshInfo('.error');
            showError('.cars-form', 'Please, select a car to buy!');            
        }
    }
}

function changeBalanceOfEntityAfterBuyingCar(entityBalance, carPrice) {
    return entityBalance - carPrice;
}

function changeBalanceOfEntityAfterCarSold(entityBalance, carPrice) {
    const percentRetention = 0.8;
    return entityBalance + carPrice * percentRetention;
}

function checkAvailableCash(entityBalance) {
    if (entityBalance < 0) {
        return false;
    } return true;
}

function createNotificationWhenDealMade(customer, car, button, cssClass, handleFunction) {    
    const dealCongratulation = document.createElement('div');

    $(dealCongratulation).addClass(cssClass)
    .html(`Dear ${customer}, congratulations on your ${cssClass.split('-congratulation').join('')} "${car}"!<br><strong>Car purchase time:</strong> ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    
    $(button).unbind('click', handleFunction);

    return dealCongratulation;
}

function createNotificationAboutPurchaseFailure(customer, balance, button) {    
    $(document.createElement('div'))
    .addClass('purchase-failure')
    .html(`Unfortunately, there are not enough funds on the balance sheet of ${customer}.<br>Available balance: ${balance} $`)
    .appendTo('.purchase-info');   

    $(button).unbind('click', handleClickOnBtnBuyAcceptPurchase);
}

function dealInfoDisappearance(dealInformation, selector, firstTimer, secondTimer) {
    setTimeout(() => {
        $(dealInformation).addClass('translated');           
    }, firstTimer);
    
    setTimeout(refreshInfo, secondTimer, selector);
}

function declineDeal(selector) {
    playSound('engine-sound-2');

    $(selector).addClass('translated_light');

    setTimeout(refreshInfo, 500, selector);
}

function createNotificationAboutDepositMoney() {
    $(document.createElement('div'))
    .addClass('deposit-notification')
    .text('Please make your deposit. You can use Visa or MasterCard')
    .appendTo($('.info'));
}