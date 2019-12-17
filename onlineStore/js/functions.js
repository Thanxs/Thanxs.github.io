"use strict";

function showCategories(categories) {
  const categoriesList = document.querySelector('.categories__list');

  categories.forEach((category) => {
    let categoryRow = document.createElement('li');
    categoryRow.textContent = category.name;
    categoryRow.classList.add('categories__item');
    categoryRow.setAttribute('data-category', category.key);

    categoryRow.addEventListener('click', handleClickOnCategory);

    categoriesList.append(categoryRow);
  });
}

function showProductsTitle() {
  const productsTitle = document.querySelector('.products__title');
  productsTitle.classList.add('active');
}

function showProductsByCategory(categoryKey) {
  refreshInfo('.products__list');
  
  showProductsTitle();

  const products = productsData[categoryKey];

  const productsBlock = document.getElementById('products');

  const productsList = document.createElement('ul');
  productsList.classList.add('products__list');
  productsBlock.append(productsList);
 
  products.forEach((product)=> {
    const productRow = document.createElement('li');
    productRow.textContent = product.name;
    productRow.classList.add('products__item');
    productRow.setAttribute('data-product-id', product.id);
    productRow.setAttribute('data-category', categoryKey);

    productRow.addEventListener('click', handleClickOnProduct);

    productsList.append(productRow);
  });
  refreshInfo('.product__info');
}

function showProductInfo(selectedProduct, categoryKey, productId) {
  refreshInfo('.product__info');

  const product = document.getElementById('product');
  const productInfo = document.createElement('div');
  productInfo.classList.add('product__info');
  product.append(productInfo);

  const productName = document.createElement('div');
  productName.textContent = selectedProduct.name;
  productName.classList.add('product__title');
  productInfo.append(productName);

  const productPrice = document.createElement('div');
  productPrice.textContent = `Price: ${selectedProduct.price}$`;
  productPrice.classList.add('product__price');
  productInfo.append(productPrice);

  const productDescription = document.createElement('div');
  productDescription.textContent = selectedProduct.description;
  productDescription.classList.add('product__description');
  productInfo.append(productDescription);

  const amountLabelElement = document.createElement('label');
  amountLabelElement.setAttribute('for', 'amount');
  amountLabelElement.textContent = `Select amount of products`;
  productInfo.append(amountLabelElement);

  const amountInputElement = document.createElement('input');
  amountInputElement.setAttribute('type', 'number');
  amountInputElement.setAttribute('id', 'amount');
  amountInputElement.setAttribute('value', 1);
  amountInputElement.setAttribute('min', 1);
  productInfo.append(amountInputElement);

  amountInputElement.addEventListener('change', handleChangeOfAmountInputElement);

  const buyInputElement = document.createElement('input');
  buyInputElement.setAttribute('id', 'buy');
  buyInputElement.classList.add('btn');
  buyInputElement.classList.add('btn-primary');
  buyInputElement.setAttribute('type', 'button');
  buyInputElement.setAttribute('value', 'buy');
  buyInputElement.setAttribute('data-category', categoryKey);
  buyInputElement.setAttribute('data-product-id', productId);
  buyInputElement.setAttribute('data-product-amount', 1);
  buyInputElement.setAttribute('data-product-price', selectedProduct.price);
  
  buyInputElement.addEventListener('click', handleClickOnBuyBtn);

  productInfo.append(buyInputElement);
}

function handleClickOnCategory(event) {  
  const selectedCategoryKey = event.target.dataset.category; 
  
  refreshInfo('.order');
  showProductsByCategory(selectedCategoryKey);
  hideForm();
}

function handleClickOnProduct (event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  const categoryKey = event.target.dataset.category;  
  
  let selectedProduct = getProductByCategoryAndId(categoryKey, productId);
  
  refreshInfo('.order');
  showProductInfo(selectedProduct, categoryKey, productId);
  hideForm();
}

function getProductByCategoryAndId(categoryKey, productId) {
  return productsData[categoryKey].find((product)=> {
    return productId === product.id;
  });
}

function handleChangeOfAmountInputElement(event) {
  let amountValue = event.target.value;
  
  refreshInfo('.order');
  const amountInputElement = document.getElementById('buy');
  amountInputElement.setAttribute('data-product-amount', amountValue); 
}

function handleClickOnBuyBtn(event) {
  refreshInfo('.order');
  const categoryKey = event.target.dataset.category;
  const productId = event.target.getAttribute('data-product-id');
  const productAmountValue = parseInt(event.target.getAttribute('data-product-amount'));
  const productPrice = parseInt(event.target.getAttribute('data-product-price'));

  validateAmountOfProducts(productAmountValue);

  const acceptElement = document.getElementById('accept');

  acceptElement.setAttribute('data-category', categoryKey);
  acceptElement.setAttribute('data-product-id', productId);
  acceptElement.setAttribute('data-product-amount', productAmountValue);
  acceptElement.setAttribute('data-product-price', productPrice);

  acceptElement.addEventListener('click', validateProductData);
}

function refreshInfo(selector) {
  if (document.querySelector(selector)) {
    document.querySelector(selector).remove();
  }
}


function validateAmountOfProducts(amountValue) {
  if  (isNaN(amountValue) || amountValue < 1) {
    refreshInfo('.error');
    const errorAboutAmount = document.createElement('div');
    errorAboutAmount.classList.add('error');
    errorAboutAmount.textContent = 'Please, select a proper amount of products!';
    document.getElementById('buy').after(errorAboutAmount); 
  } else {
    refreshInfo('.error');    
    showForm();
  }
}

function validateProductData(event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  const categoryKey = event.target.dataset.category;
  const productAmount = event.target.getAttribute('data-product-amount');
  const productPrice = event.target.getAttribute('data-product-price');
  const selectedProduct = getProductByCategoryAndId(categoryKey, productId);

  const labelForTextarea = document.getElementById('labelForTextarea');

  if (controlInputName.value && controlSelectCity.value && controlInputDepartment.value && controlSelectPayment.value) {
    refreshInfo('.error');
    showOrderInfo(selectedProduct, productAmount);
    const price = calculatePrice(productPrice, productAmount);
    showFinalPrice(price);
    hideForm();   
  } else {
    refreshInfo('.error');
    let error = document.createElement('div');
    error.classList.add('error');
    error.textContent = `Please, fill out all these fields!`;
    labelForTextarea.before(error);
  }  
}

function hideForm() {
  const myForm = document.forms.myForm;
  myForm.firstElementChild.classList.add('hidden');
  myForm.firstElementChild.classList.remove('active');
}

function showForm() {
  const myForm = document.forms.myForm;
  myForm.firstElementChild.classList.add('active');
  myForm.firstElementChild.classList.remove('hidden');
}

function showOrderInfo(selectedProduct, productAmount) {  
  refreshInfo('.order');
  
  const myForm = document.forms.myForm;
  const order = document.createElement('div');
  order.classList.add('order');
  myForm.after(order);

  const controlInputName = document.getElementById('controlInputName');
  const controlSelectCity = document.getElementById('controlSelectCity');
  const controlInputDepartment = document.getElementById('controlInputDepartment');
  const controlSelectPayment = document.getElementById('controlSelectPayment');

  const customerRow = document.createElement('div');
  customerRow.textContent = `Customer: ${controlInputName.value}`;
  order.append(customerRow);

  const cityRow = document.createElement('div');
  cityRow.textContent = `City: ${controlSelectCity.value}`;
  order.append(cityRow);

  const departmentRow = document.createElement('div');
  departmentRow.textContent = `"Nova Poshta" department: ${controlInputDepartment.value}`;
  order.append(departmentRow);

  const paymentRow = document.createElement('div');
  paymentRow.textContent = `You will pay ${controlSelectPayment.value}`;
  order.append(paymentRow);

  const orderNameRow = document.createElement('div');
  orderNameRow.textContent = `Your order is: ${selectedProduct.name}`;
  order.append(orderNameRow);

  const amountOfProductsRow = document.createElement('div');
  amountOfProductsRow.textContent = `Amount of items: ${productAmount}`;
  order.append(amountOfProductsRow);
}

function calculatePrice(priceOne, amount) {
  const DISCOUNT_AMOUNT = 10000;
  const DISCOUNT_VALUE = 0.2;
  let isDiscountEnabled = false;
  let result = priceOne * amount;
  let priceWithDicscount = result;

  if (result > DISCOUNT_AMOUNT) {
    priceWithDicscount = result * (1 - DISCOUNT_VALUE);
    isDiscountEnabled = true;
  }
  return {
    price: result,
    priceWithDicscount: priceWithDicscount,
    isDiscountEnabled: isDiscountEnabled
  };
}

function showFinalPrice(information) {
  const order = document.querySelector('.order');
  const priceRow = document.createElement('div');
  priceRow.textContent = `Price: ${information.price}$`;
  if (information.isDiscountEnabled) {
    priceRow.innerHTML = `Price: ${information.price}$<br>
     You have a discount 20%!<br>
     Your final price is ${information.priceWithDicscount}$`;
  }  
  order.append(priceRow);
}