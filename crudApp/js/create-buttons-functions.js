'use strict';

function createBtnAdd(dataEntity) {
    refreshInfo('.btn-add');

    const entities = document.querySelector('.entities');

    const btnAdd = document.createElement('button');

    btnAdd.classList.add('btn');
    btnAdd.classList.add('btn-secondary');
    btnAdd.classList.add('btn-add');

    btnAdd.setAttribute('data-entity', dataEntity);

    btnAdd.style.transform = 'translateX(-5555px)';
    
    setTimeout(()=> {
        btnAdd.style.transform = 'translateX(0)';
    }, 0);
    
    if (dataEntity === 'persons') {
        btnAdd.textContent = 'Add new person';
    } else if (dataEntity === 'companies') {
        btnAdd.textContent = 'Add new company';
    } else if (dataEntity === 'cars') {
        btnAdd.textContent = 'Add new car';
    }

    entities.after(btnAdd);    
}

function createBtnConfirm(id, dataEntity) {
    const info = document.querySelector('.info');

    const btnConfirm = document.createElement('button');

    btnConfirm.classList.add('btn');
    btnConfirm.classList.add('btn-success');
    btnConfirm.classList.add('confirm');

    btnConfirm.setAttribute('data-id', id);
    btnConfirm.setAttribute('data-entity', dataEntity);

    btnConfirm.textContent = 'Confirm';

    info.append(btnConfirm);
}

function createBtnConfirmAddingNewEntity(dataEntity) {    
    const info = document.querySelector('.info');

    const btnConfirmAddingNewEntity = document.createElement('button');

    btnConfirmAddingNewEntity.classList.add('btn');
    btnConfirmAddingNewEntity.classList.add('btn-secondary');
    btnConfirmAddingNewEntity.classList.add('confirm-adding');    
    
    btnConfirmAddingNewEntity.setAttribute('data-entity', dataEntity);
    
    btnConfirmAddingNewEntity.textContent = 'Add';
    
    info.append(btnConfirmAddingNewEntity);

    setEventListenerOnBtn();
}

function createBtnRequestDepositMoney(dataEntity) {
    const info = document.querySelector('.info');

    const btnRequestDepositMoney = document.createElement('button');

    btnRequestDepositMoney.classList.add('btn');
    btnRequestDepositMoney.classList.add('btn-outline-success');
    btnRequestDepositMoney.classList.add('btn-deposit');

    btnRequestDepositMoney.textContent = 'Deposit Money';

    btnRequestDepositMoney.setAttribute('data-entity', dataEntity);

    info.append(btnRequestDepositMoney);
}

function createButtonsToMakeDealsWithCars(entityId, dataEntity) {
    const formInsideEntityInformation = document.forms.formInsideEntityInformation;

    const blockOfDealsWithCars = document.createElement('div');
    blockOfDealsWithCars.classList.add('block-btns-deals');

    blockOfDealsWithCars.innerHTML = `  <button type="button" class="btn btn-outline-warning btn-buy" data-id="${entityId}" data-entity="${dataEntity}">buy car</button>
                                        <button type="button" class="btn btn-outline-info btn-sale" data-id="${entityId}" data-entity="${dataEntity}">sell car</button>`;

    formInsideEntityInformation.append(blockOfDealsWithCars);

    setEventListenerOnBtn();
}

function createBtnConfirmBuyCar(dataEntityId, dataEntity) {
    const formInsideInfoOfCars = document.querySelector('.cars-form');

    const btnBuyCarConfirmation = document.createElement('button');

    btnBuyCarConfirmation.setAttribute('type', 'button');
    
    btnBuyCarConfirmation.classList.add('btn');
    btnBuyCarConfirmation.classList.add('btn-outline-warning');
    btnBuyCarConfirmation.classList.add('btn-buy-confirm');

    btnBuyCarConfirmation.textContent = 'buy car';

    btnBuyCarConfirmation.setAttribute('data-entity-id', dataEntityId);
    btnBuyCarConfirmation.setAttribute('data-entity', dataEntity);
    
    formInsideInfoOfCars.append(btnBuyCarConfirmation);
    
    setEventListenerOnBtn();        
}

function createBtnConfirmSaleCar(dataEntityId, dataEntity) {
    const selectCars = document.querySelector('.select-for-deal');
    
    const btnSaleCarConfirmation = document.createElement('button');
    
    btnSaleCarConfirmation.setAttribute('type', 'button');
    btnSaleCarConfirmation.classList.add('btn-outline-info');
    btnSaleCarConfirmation.classList.add('btn');
    btnSaleCarConfirmation.classList.add('btn-sale-confirm');
    btnSaleCarConfirmation.textContent = 'sell car';

    btnSaleCarConfirmation.setAttribute('data-entity-id', dataEntityId);
    btnSaleCarConfirmation.setAttribute('data-entity', dataEntity);
    
    selectCars.after(btnSaleCarConfirmation);

    setEventListenerOnBtn(); 
}