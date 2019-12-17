'use strict';

function Owner() {

  this.setCar = function (arr) {
    this.cars = [...arr];
  };

  this.addCar = function (car) {
    this.cars.push(car);
  };

  this.setBalance = function(balance) {
    this.balance = balance;
  };

  this.getBalance = function() {
    return this.balance;
  };
  
  this.setOwnerId = function(id) {
    this.id = id;
  };
}