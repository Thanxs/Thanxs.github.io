'use strict';

function setEventListenerOnBtn() {
    let btn = $('.btn');

    for (let i = 0; i < btn.length; i++) {
        if ($(btn[i]).hasClass('view')) {
            $(btn[i]).click(handleClickOnBtnView);
        }
        
        if ($(btn[i]).hasClass('edit')) {
            $(btn[i]).click(handleClickOnBtnEdit);
        }

        if ($(btn[i]).hasClass('confirm')) {
            $(btn[i]).click(handleClickOnBtnConfirm);
        }

        if ($(btn[i]).hasClass('remove')) {
            $(btn[i]).click(handleClickOnBtnRemove);
        }

        if ($(btn[i]).hasClass('btn-add')) {
            $(btn[i]).click(handleClickOnBtnAdd);
        }

        if ($(btn[i]).hasClass('confirm-adding')) {
            $(btn[i]).click(handleClickOnBtnConfirmAdding);
        }

        if ($(btn[i]).hasClass('btn-deposit')) {
            $(btn[i]).click(handleClickOnBtnRequestDeposit);
        }

        if ($(btn[i]).hasClass('btn-make-deposit')) {
            $(btn[i]).click(handleClickOnBtnMakeDeposit);
        }

        if ($(btn[i]).hasClass('btn-buy')) {
            $(btn[i]).click(handleClickOnBtnBuy);
        }

        if ($(btn[i]).hasClass('btn-buy-confirm')) {
            $(btn[i]).click(handleClickOnBtnBuyConfirm);
        }

        if ($(btn[i]).hasClass('btn-buy-accept')) {
            $(btn[i]).click(handleClickOnBtnBuyAcceptPurchase);
        }

        if ($(btn[i]).hasClass('btn-buy-decline')) {
            $(btn[i]).click(handleClickOnBtnDeclinePurchase);
        } 

        if ($(btn[i]).hasClass('btn-sale')) {
            $(btn[i]).click(handleClickOnBtnSale);
        }

        if ($(btn[i]).hasClass('btn-deal-cancel')) {
            $(btn[i]).click(handleClickOnBtnDealCancel);
        }

        if ($(btn[i]).hasClass('btn-sale-confirm')) {
            $(btn[i]).click(handleClickOnBtnSaleConfirm);
        }        

        if ($(btn[i]).hasClass('btn-sale-accept')) {
            $(btn[i]).click(handleClickOnBtnSaleAccept);
        }

        if ($(btn[i]).hasClass('btn-sale-decline')) {
            $(btn[i]).click(handleClickOnBtnSaleDecline);
        }              
    }
}

function setEventListenerOnOptions() {   
    $('.car-option').click(handleClickOnCarOption);   
}