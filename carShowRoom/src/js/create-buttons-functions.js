'use strict';

function createBtnAdd(dataEntity) {
    refreshInfo('.btn-add');    

    const btnAdd = document.createElement('button');
    $(btnAdd).addClass('btn').addClass('btn-secondary').addClass('btn-add')
    .attr('data-entity', dataEntity)
    .addClass('translated')
    
    setTimeout(()=> {
        $(btnAdd).removeClass('translated');
    }, 0);
    
    if (dataEntity === 'persons') {
        $(btnAdd).text('Add new person');
    } else if (dataEntity === 'companies') {
        $(btnAdd).text('Add new company');
    } else if (dataEntity === 'cars') {
        $(btnAdd).text('Add new car');
    }

    $('.entities').after(btnAdd);    
}

function createBtnConfirm(id, dataEntity) {
    $(document.createElement('button'))
    .addClass('btn').addClass('btn-success').addClass('confirm')
    .attr('data-id', id).attr('data-entity', dataEntity)
    .text('Confirm')
    .appendTo('.info');
}

function createBtnConfirmAddingNewEntity(dataEntity) {
    $(document.createElement('button'))
    .addClass('btn').addClass('btn-secondary').addClass('confirm-adding')
    .attr('data-entity', dataEntity)
    .text('Add')
    .appendTo('.info');

    setEventListenerOnBtn();
}

function createBtnRequestDepositMoney(dataEntity) {
    $(document.createElement('button'))
    .addClass('btn').addClass('btn-outline-success').addClass('btn-deposit')
    .attr('data-entity', dataEntity)
    .text('Deposit Money')
    .appendTo('.info');
}

function createButtonsToMakeDealsWithCars(entityId, dataEntity) {    
    $(document.createElement('div'))
    .addClass('block-btns-deals')
    .html(`  <button type="button" class="btn btn-outline-warning btn-buy" data-id="${entityId}" data-entity="${dataEntity}">buy car</button>
            <button type="button" class="btn btn-outline-info btn-sale" data-id="${entityId}" data-entity="${dataEntity}">sell car</button>`)
    .appendTo('.entity-form');

    setEventListenerOnBtn();
}

function createBtnConfirmBuyCar(dataEntityId, dataEntity) {
    $(document.createElement('button'))
    .attr('type', 'button').attr('data-entity-id', dataEntityId).attr('data-entity', dataEntity)
    .addClass('btn').addClass('btn-outline-warning').addClass('btn-buy-confirm')
    .text('buy car')
    .appendTo('.cars-form');
    
    setEventListenerOnBtn();        
}

function createBtnConfirmSaleCar(dataEntityId, dataEntity) {
    const btnSaleCarConfirmation = document.createElement('button');
    $(btnSaleCarConfirmation)
    .attr('type', 'button').attr('data-entity-id', dataEntityId).attr('data-entity', dataEntity)
    .addClass('btn-outline-info').addClass('btn').addClass('btn-sale-confirm')
    .text('sell car');       
    
    $('.select-for-deal').after($(btnSaleCarConfirmation));

    setEventListenerOnBtn(); 
}