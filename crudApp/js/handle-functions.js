'use strict';

function handleClickOnEntity(event) {
    const dataEntity = event.target.dataset.entity; 

    if (dataEntity === 'persons') {
        showInfoOfSelectedEntity(persons, dataEntity);
        playSound('engine-sound');
    }

    if (dataEntity === 'companies') {
        showInfoOfSelectedEntity(companies, dataEntity);
        playSound('engine-sound');
    }

    if (dataEntity === 'cars') {
        showInfoOfSelectedEntity(cars, dataEntity);
        playSound('engine-sound');
    }    
}

function handleClickOnBtnView(event) {
    refreshInfo('.info', '.info-cars', '.wrapper-info','.purchase-info', '.sale-info', '.delete-confirmation');

    const selectedEntity = event.target.closest('li');    
    const entityId = parseInt(event.target.closest('li').dataset.id);
    const dataEntity = selectedEntity.dataset.entity; 

    if (dataEntity === 'cars') {       
        showDetailsOfEntity(cars, entityId, 'disabled');
    } else if (dataEntity === 'persons') {
        showDetailsOfEntity(persons, entityId, 'disabled');        
    } else if (dataEntity === 'companies') {
        showDetailsOfEntity(companies, entityId, 'disabled');   
    }      
}

function handleClickOnBtnEdit(event) {
    refreshInfo('.info', '.info-cars', '.wrapper-info', '.purchase-info', '.sale-info', '.delete-confirmation');  

    const selectedEntity = event.target.closest('li');    
    const entityId = parseInt(event.target.closest('li').dataset.id);
    const dataEntity = selectedEntity.dataset.entity;
    
    if (dataEntity === 'cars') {       
        showDetailsOfEntity(cars, entityId, '');
    } else if (selectedEntity.dataset.entity === 'persons') {
        showDetailsOfEntity(persons, entityId, '');
        createButtonsToMakeDealsWithCars(entityId, selectedEntity.dataset.entity); 
    } else if (dataEntity === 'companies') {
        showDetailsOfEntity(companies, entityId, '');    
        createButtonsToMakeDealsWithCars(entityId, dataEntity); 
    }

    createBtnConfirm(entityId, dataEntity);
    setEventListenerOnBtn(entityId);
}

function handleClickOnBtnConfirm(event) {
    const selectedEntity = event.target;
    const indexOfSelectedEntity = parseInt(event.target.dataset.id);
    const dataEntity = selectedEntity.dataset.entity;

    const indexOfPersons = getIndexOfSelectedEntity(persons, indexOfSelectedEntity);    
    const indexOfCompanies = getIndexOfSelectedEntity(companies, indexOfSelectedEntity);
    const indexOfCars = getIndexOfSelectedEntity(cars, indexOfSelectedEntity);

    const formInsideEntityInformation = document.forms.formInsideEntityInformation;
    
    let editedValues = getArrayOfValuesInsideForm(formInsideEntityInformation);

    if (dataEntity === 'cars') {

        const isValidatedCarInfo = validateFormOfCar(editedValues);

        if (isValidatedCarInfo) {
            cars[indexOfCars].name = editedValues[0];
            cars[indexOfCars].year = editedValues[1];
            cars[indexOfCars].color = editedValues[2];
            cars[indexOfCars].price = editedValues[3];

            showInfoOfSelectedEntity(cars, 'cars');
            setEventListenerOnBtn();

            localStorage.setItem('cars', JSON.parse(cars));
        } else {
            refreshInfo('.error');
            showError('.entity-form', 'Please fill out the proper information!');
        }        
    }

    if (dataEntity === 'persons') {        
        
        const isValidatedPersonInfo = validateFormOfPerson(editedValues);

        if (isValidatedPersonInfo) {
            persons[indexOfPersons].name = editedValues[0];
            persons[indexOfPersons].age = editedValues[1];
            persons[indexOfPersons].profession = editedValues[2];

            showInfoOfSelectedEntity(persons, 'persons');
            setEventListenerOnBtn();

            localStorage.setItem('persons', JSON.stringify(persons));
        } else {
            refreshInfo('.error');
            showError('.entity-form', 'Please, fill out the proper information in all fields! The name must start with a capital letter and consist of at least two characters');
        } 
    }

    if (dataEntity === 'companies') {
        let isValidatedCompanyInfo = validateFormOfCompany(editedValues);
        if (isValidatedCompanyInfo) {
            companies[indexOfCompanies].name = editedValues[0];
            companies[indexOfCompanies].address = editedValues[1];

            showInfoOfSelectedEntity(companies, 'companies');
            setEventListenerOnBtn();

            localStorage.setItem('companies', JSON.stringify(companies));
        } else {
            refreshInfo('.error');
            showError('.entity-form', 'Please, fill out the proper information in all fields!');
        }        
    }    
}

function handleClickOnBtnRemove(event) {
    refreshInfo('.info', '.info-cars', '.wrapper-info', '.purchase-info', '.sale-info', '.delete-confirmation');
    
    const entityId = parseInt(event.target.closest('li').dataset.id);
    const dataEntity = event.target.closest('li').dataset.entity;    

    const container = document.querySelector('.container');

    const deleteConfirmation = document.createElement('div');
    deleteConfirmation.classList.add('delete-confirmation');

    let entityString;

    if (dataEntity === 'persons') {
        entityString = 'person';
    } else if (dataEntity === 'companies') {
        entityString = 'company';
    } else if (dataEntity === 'cars') {
        entityString = 'car';
    }
    
    deleteConfirmation.innerHTML = `<div>
                                        <p>Are you sure to delete this ${entityString}?<p>
                                        <button type="button" id="yes" class="btn btn-success">Yes</button>
                                        <button type="button" id="cancel" class="btn btn-danger">Cancel</button>
                                    </div>`;

    container.append(deleteConfirmation);

    const btnDeleteConfirmation = document.getElementById('yes');

    btnDeleteConfirmation.setAttribute('data-id', entityId);
    btnDeleteConfirmation.setAttribute('data-entity', dataEntity); 

    btnDeleteConfirmation.addEventListener('click', handleClickOnBtnConfirmToRemove);

    const btnDeleteCancel = document.getElementById('cancel');

    btnDeleteCancel.addEventListener('click', handleClickOnBtnCancelToRemove);
}

function handleClickOnBtnConfirmToRemove(event) {
    const entityId = parseInt(event.target.dataset.id);
    const dataEntity = event.target.dataset.entity;

    const entityWhoCanBeDeleted = document.querySelector(`li[data-id="${entityId}"][data-entity="${dataEntity}"]`);

    if (dataEntity === 'cars') {
        removeEntity(cars, entityWhoCanBeDeleted, entityId);

        localStorage.setItem('cars', JSON.stringify(cars));
    } else if (dataEntity === 'persons') {
        removeEntity(persons, entityWhoCanBeDeleted, entityId);        
        
        localStorage.setItem('persons', JSON.stringify(persons));
    } else if (dataEntity === 'companies') {
        removeEntity(companies, entityWhoCanBeDeleted, entityId);
        
        localStorage.setItem('companies', JSON.stringify(companies));     
    }      
}

function handleClickOnBtnCancelToRemove(event) {
    event.target.closest('.delete-confirmation').remove();
}

function handleClickOnBtnAdd(event) {
    refreshInfo('.info', '.info-cars', '.wrapper-info', '.purchase-info', '.sale-info', '.delete-confirmation');

    const dataEntity = event.target.dataset.entity;

    let entityProperties;

    if (dataEntity === 'cars') {
        entityProperties = ['name', 'year', 'color', 'price'];
    } else if (dataEntity === 'persons') {
        entityProperties = ['name', 'age', 'profession'];
    } else if (dataEntity === 'companies') {
        entityProperties = ['name', 'address'];
    }
    
    const container = document.querySelector('.container');

    const entityInformation = document.createElement('div');

    entityInformation.classList.add('info');

    container.append(entityInformation);

    const formInsideEntityInformation = document.createElement('form');

    formInsideEntityInformation.setAttribute('name', 'formInsideEntityInformation');

    formInsideEntityInformation.classList.add('entity-form');

    entityInformation.append(formInsideEntityInformation);
    
    for (let i = 0; i < entityProperties.length; i++) {
        if (entityProperties[i] === 'id' || entityProperties[i] === 'car' || entityProperties[i] === 'balance') {
            continue;
        }

        formInsideEntityInformation.innerHTML += `<div class="form-group">
                                                    <input type="text" class="form-control" id="inputNumber${i+1}" placeholder="Please, input ${entityProperties[i]}" value="">
                                                  </div>`;
    }

    createBtnConfirmAddingNewEntity(dataEntity);      
 }

 function handleClickOnBtnConfirmAdding(event) {  
    const dataEntity = event.target.dataset.entity;
    
    let idOfNewCar = generateIdOfNewEntity(cars);
    let idOfNewPerson = generateIdOfNewEntity(persons);
    let idOfNewCompany = generateIdOfNewEntity(companies);

    if (idOfNewCar === -Infinity) {
        idOfNewCar = 1;
    }

    if (idOfNewPerson === -Infinity) {
        idOfNewPerson = 1;
    }

    if (idOfNewCompany === -Infinity) {
        idOfNewCompany = 1;
    }    

    const formInsideEntityInformation = document.forms.formInsideEntityInformation;
    const inputCollection = formInsideEntityInformation.elements;

    let valuesOfNewEntity = getArrayOfValuesInsideForm(formInsideEntityInformation);

    let isValidatedPersonInfo = validateFormOfPerson(valuesOfNewEntity);
    let isValidatedCompanyInfo = validateFormOfCompany(valuesOfNewEntity);
    let isValidatedCarInfo = validateFormOfCar(valuesOfNewEntity);

    if (dataEntity === 'persons' && isValidatedPersonInfo) {
        persons.push(new Person(...valuesOfNewEntity));
        
        persons[persons.length - 1].setOwnerId(idOfNewPerson);
        persons[persons.length - 1].setCar([]);
        persons[persons.length - 1].setBalance(0);
    
        refreshInfo('.confirm-adding', '.error');
    
        for (let i = 0; i < inputCollection.length; i++) {
            inputCollection[i].setAttribute('disabled', true);
        }
    
        createNotificationAboutDepositMoney();
    
        createBtnRequestDepositMoney(dataEntity);
    
        setEventListenerOnBtn();
    
        localStorage.setItem('persons', JSON.stringify(persons));          
        
    } else if (dataEntity === 'companies' && isValidatedCompanyInfo) {
        companies.push(new Company(...valuesOfNewEntity));

        companies[companies.length - 1].setOwnerId(idOfNewCompany);
        companies[companies.length - 1].setCar([]);
        companies[companies.length - 1].setBalance(0);

        refreshInfo('.confirm-adding', '.error');

        for (let i = 0; i < inputCollection.length; i++) {
            inputCollection[i].setAttribute('disabled', true);
        }

        createNotificationAboutDepositMoney();

        createBtnRequestDepositMoney(dataEntity);
      
        setEventListenerOnBtn();

        localStorage.setItem('companies', companies);

    } else if (dataEntity === 'cars' && isValidatedCarInfo) {
        cars.push(new Car(...valuesOfNewEntity));
        cars[cars.length - 1].id = idOfNewCar;

        showInfoOfSelectedEntity(cars, dataEntity);
        setEventListenerOnBtn();

        localStorage.setItem('cars', JSON.stringify(cars));
    }    else {
        refreshInfo('.error');
        showError('.entity-form', 'Please, fill out the proper information in all fields! The name must start with a capital letter and consist of at least two characters');   
    }   
}

function handleClickOnBtnRequestDeposit(event) {
    refreshInfo('#deposit-form', '.btn-make-deposit', '.deposit-notification');

    const dataEntity = event.target.dataset.entity;

    const btnRequestDepositMoney = document.querySelector('.btn-deposit');

    const depositForm = document.createElement('div');

    depositForm.innerHTML = `<form id='deposit-form'>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="credit-card" placeholder="Enter credit card number">
                                    <small class="form-text text-muted">We'll never share your credit card number with anyone else.</small>
                                </div>
                                <div class="form-group">                                
                                    <input type="text" class="form-control" id="deposit-amount" placeholder="Enter amount of deposit">                                
                                </div>
                            </form>
                            <button type="button" class="btn btn-success btn-make-deposit" data-entity="${dataEntity}">make a deposit</button>`;
                            
    btnRequestDepositMoney.after(depositForm);

    setEventListenerOnBtn();
}

function handleClickOnBtnMakeDeposit(event) {
    const dataEntity = event.target.dataset.entity; 

    const depositForm = document.getElementById('deposit-form');

    const moneyValues = getArrayOfValuesInsideForm(depositForm);

    const isValidatedDepositInfo = validateFormOfDeposit(moneyValues);

    if (isValidatedDepositInfo && dataEntity === 'persons') {
        persons[persons.length - 1].balance = parseInt(moneyValues[1]);

        showInfoOfSelectedEntity(persons, dataEntity);
    }
    else if (isValidatedDepositInfo && dataEntity === 'companies') {
        companies[companies.length - 1].balance = parseInt(moneyValues[1]);

        showInfoOfSelectedEntity(companies, dataEntity)
    } else {
        refreshInfo('.error');
        showError('#deposit-form', 'Credit card must be entered in correct form (xxxx xxxx xxxx xxxx). Your request to deposit is above the minimum limit of USD 1000');
    }    
}

function handleClickOnBtnBuy(event) {
    const dataEntityId = event.target.dataset.id;
    const dataEntity = event.target.dataset.entity;
    
    createInfoAboutCars(dataEntityId, dataEntity, createListOfCarsToBuy);
}

function handleClickOnBtnBuyConfirm(event) {
    const dataOwnerId = parseInt(event.target.getAttribute('data-entity-id'));
    const dataEntity = event.target.dataset.entity;

    showInfoToMakeDeal(dataOwnerId, dataEntity, createInfoAboutSelectedCarToBuy);
}

function handleClickOnBtnBuyAcceptPurchase(event) {   
    const dataOwnerId = parseInt(event.target.getAttribute('data-owner-id'));
    const dataCarId = parseInt(event.target.getAttribute('data-car-id'));
    const dataEntity = event.target.dataset.entity;

    const selectedCarIndex = getIndexOfSelectedEntity(cars, dataCarId);
    const selectedPersonIndex = getIndexOfSelectedEntity(persons, dataOwnerId);
    const selectedCompanyIndex = getIndexOfSelectedEntity(companies, dataOwnerId);

    let ownerWhoGonnaBuyCar, entityBalance;

    if (dataEntity === 'persons') {
        ownerWhoGonnaBuyCar = persons[selectedPersonIndex];
        entityBalance = persons[selectedPersonIndex].balance;
    }

    if (dataEntity === 'companies') {
        ownerWhoGonnaBuyCar = companies[selectedCompanyIndex];
        entityBalance = companies[selectedCompanyIndex].balance;
    }

    const carToBeBought = cars[selectedCarIndex];

    const carPrice = cars[selectedCarIndex].price; 

    let balanceAfterBuyingCar = changeBalanceOfEntityAfterBuyingCar(entityBalance, carPrice);    

    let isCheckedAavailableCash = checkAvailableCash(balanceAfterBuyingCar);

    refreshInfo('.purchase-congratulation', '.purchase-failure');

    const purchaseInformation = document.querySelector('.purchase-info');

    if (isCheckedAavailableCash) {
        ownerWhoGonnaBuyCar.balance = balanceAfterBuyingCar;
        ownerWhoGonnaBuyCar.cars.push(carToBeBought);
        
        playSound('car-bought');       

        const purchaseCongratulation = createNotificationWhenDealMade(ownerWhoGonnaBuyCar.name, cars[selectedCarIndex].name, event.target, 'purchase-congratulation', handleClickOnBtnBuyAcceptPurchase);

        purchaseInformation.append(purchaseCongratulation);
        
        localStorage.setItem('persons', JSON.stringify(persons));
        localStorage.setItem('companies', JSON.stringify(companies));

        dealInfoDisappearance(purchaseInformation, '.purchase-info', 4000, 4500);      
    } else {
        playSound('bad-luck');
        createNotificationAboutPurchaseFailure(ownerWhoGonnaBuyCar.name, ownerWhoGonnaBuyCar.balance, event.target);
    }
}

function handleClickOnBtnSaleAccept(event) {   
    const dataOwnerId = parseInt(event.target.getAttribute('data-owner-id'));
    const dataCarId = parseInt(event.target.getAttribute('data-car-id'));
    const dataEntity = event.target.dataset.entity;
    
    const selectedPersonIndex = getIndexOfSelectedEntity(persons, dataOwnerId);
    const selectedCompanyIndex = getIndexOfSelectedEntity(companies, dataOwnerId);

    let ownerWhoGonnaSellCar, entityBalance;

    if (dataEntity === 'persons') {
        ownerWhoGonnaSellCar = persons[selectedPersonIndex];
        entityBalance = persons[selectedPersonIndex].balance;
    }

    if (dataEntity === 'companies') {
        ownerWhoGonnaSellCar = companies[selectedCompanyIndex];
        entityBalance = companies[selectedCompanyIndex].balance;
    }

    const selectedCarIndex = getIndexOfSelectedEntity(ownerWhoGonnaSellCar.cars, dataCarId);
    
    const carPrice = ownerWhoGonnaSellCar.cars[selectedCarIndex].price; 

    let balanceAfterCarSold = changeBalanceOfEntityAfterCarSold(entityBalance, carPrice);  

    refreshInfo('.sale-congratulation');

    const saleInformation = document.querySelector('.sale-info');

    const saleCongratulation = createNotificationWhenDealMade(ownerWhoGonnaSellCar.name, ownerWhoGonnaSellCar.cars[selectedCarIndex].name, event.target, 'sale-congratulation', handleClickOnBtnSaleAccept);

    saleInformation.append(saleCongratulation);
    
    ownerWhoGonnaSellCar.balance = balanceAfterCarSold;
    ownerWhoGonnaSellCar.cars.splice(selectedCarIndex, 1);
        
    playSound('cash-came');    
        
    localStorage.setItem('persons', JSON.stringify(persons));
    localStorage.setItem('companies', JSON.stringify(companies));
    
    dealInfoDisappearance(saleInformation, '.sale-info', 4000, 4500);    
}

function handleClickOnBtnSale(event) {
    const dataEntityId = event.target.dataset.id;
    const dataEntity = event.target.dataset.entity;
    
    createInfoAboutCars(dataEntityId, dataEntity, createListOfCarsToSell);   
}

function handleClickOnBtnSaleConfirm(event) {
    const dataOwnerId = parseInt(event.target.getAttribute('data-entity-id'));
    const dataEntity = event.target.dataset.entity;

    showInfoToMakeDeal(dataOwnerId, dataEntity, createInfoAboutSelectedCarToSell); 
}

function handleClickOnBtnDealCancel() {
    playSound('engine-sound-2');

    const wrapperForInformations = document.querySelector('.wrapper-info');

    wrapperForInformations.style.transform = 'translateX(-5555px)';

    setTimeout(refreshInfo, 500, '.wrapper-info');
}

function handleClickOnBtnDeclinePurchase() {
    declineDeal('.purchase-info');
}

function handleClickOnBtnSaleDecline() {    
    declineDeal('.sale-info');
}

function handleClickOnCarOption(event) {
    const carOptions = document.querySelectorAll('.car-option');

    playSound('select-car-2');

    carOptions.forEach((car) => {
        car.removeAttribute('selected');
    });

    event.target.setAttribute('selected', 'selected');  
}