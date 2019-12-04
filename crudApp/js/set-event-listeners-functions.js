'use strict';

function setEventListenerOnBtn() {
    let btn = document.querySelectorAll('.btn');

    for (let i = 0; i < btn.length; i++) {
        if (btn[i].classList.contains('view')) {
            btn[i].addEventListener('click', handleClickOnBtnView);
        }
        
        if (btn[i].classList.contains('edit')) {
            btn[i].addEventListener('click', handleClickOnBtnEdit);
        }

        if (btn[i].classList.contains('confirm')) {
            btn[i].addEventListener('click', handleClickOnBtnConfirm);
        }

        if (btn[i].classList.contains('remove')) {
            btn[i].addEventListener('click', handleClickOnBtnRemove);
        }

        if (btn[i].classList.contains('btn-add')) {
            btn[i].addEventListener('click', handleClickOnBtnAdd);
        }

        if (btn[i].classList.contains('confirm-adding')) {
            btn[i].addEventListener('click', handleClickOnBtnConfirmAdding);
        }

        if (btn[i].classList.contains('btn-deposit')) {
            btn[i].addEventListener('click', handleClickOnBtnRequestDeposit);
        }

        if (btn[i].classList.contains('btn-make-deposit')) {
            btn[i].addEventListener('click', handleClickOnBtnMakeDeposit);
        }

        if (btn[i].classList.contains('btn-buy')) {
            btn[i].addEventListener('click', handleClickOnBtnBuy);
        }

        if (btn[i].classList.contains('btn-buy-confirm')) {
            btn[i].addEventListener('click', handleClickOnBtnBuyConfirm);
        }

        if (btn[i].classList.contains('btn-buy-accept')) {
            btn[i].addEventListener('click', handleClickOnBtnBuyAcceptPurchase);
        }

        if (btn[i].classList.contains('btn-buy-decline')) {
            btn[i].addEventListener('click', handleClickOnBtnDeclinePurchase);
        } 

        if (btn[i].classList.contains('btn-sale')) {
            btn[i].addEventListener('click', handleClickOnBtnSale);
        }

        if (btn[i].classList.contains('btn-deal-cancel')) {
            btn[i].addEventListener('click', handleClickOnBtnDealCancel);
        }

        if (btn[i].classList.contains('btn-sale-confirm')) {
            btn[i].addEventListener('click', handleClickOnBtnSaleConfirm);
        }        

        if (btn[i].classList.contains('btn-sale-accept')) {
            btn[i].addEventListener('click', handleClickOnBtnSaleAccept);
        }

        if (btn[i].classList.contains('btn-sale-decline')) {
            btn[i].addEventListener('click', handleClickOnBtnSaleDecline);
        }              
    }
}

function setEventListenerOnOptions() {
    const carOptions = document.querySelectorAll('.car-option');

    carOptions.forEach((car) => {
        car.addEventListener('click', handleClickOnCarOption);
    });   
}