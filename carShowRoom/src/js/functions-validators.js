'use strict';

function validateFormOfPerson(editedValues) {  
    const name = /^[A-Z][a-z]{1,20}\s[A-Z][a-z]{1,20}|[A-Z][a-z]{1,20}$/;
    const age = /^([0-9]|[1-9]\d|1\d{2})$/;
    const profession =/^[\w*\s-]+$/;

    if (name.test(editedValues[0]) &&
        age.test(editedValues[1]) &&
        profession.test(editedValues[2])) {
            
            return true;
        }

        return false;    
}

function validateFormOfCompany(editedValues) {
    const companyName = /^[\w*\s-]+$/;
    const address = /^[a-zA-Z0-9,\.\s]+$/;

    if (companyName.test(editedValues[0]) &&
        address.test(editedValues[1])) {

            return true;
        }

        return false;    
}

function validateFormOfCar(editedValues) {
    const name = /^[^\s].{1,50}$/;
    const year = /^19[7-9]\d|20[0-1]\d$/;
    const color = /^[a-zA-Z]+[-]?[a-zA-z]+$/;
    const price = /^\d{1,6}$/;

    if (name.test(editedValues[0]) &&
        year.test(editedValues[1]) &&
        color.test(editedValues[2]) &&
        price.test(editedValues[3])) {
                        
            return true;
        }

        return false;  
}

function validateFormOfDeposit(moneyValues) {
    const creditCardNumber = /^(\d{4}\s\d{4}\s\d{4}\s\d{4})$/;
    const balance = /^[1-9]\d{3,6}$/;

    if (creditCardNumber.test(moneyValues[0]) &&
        balance.test(moneyValues[1])) {
                        
        return true;
        }

        return false;  
}