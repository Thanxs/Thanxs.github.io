$(document).ready(function() {
    $('[data-tooltip="tooltip"]').tooltip(); 
    $('#text').keyup(handleKeyUpOnInput);
    $('.btn__two').click(handleClickOnBtnTwo);
    $('#myBirthday').text(moment('08/01/1990').format('D MMMM YYYY'));    
    $('.generate').click(handleClickOnBtnGenerate);  
});

function handleKeyUpOnInput() {
    let value = $('#text').val();
    $('.edit-text').text(value);
}

function handleClickOnBtnTwo() {
    $('.alert').toggle(200);
}

function handleClickOnBtnGenerate() {    
    value = $('#guestDate').val();
    $('.guest-edit-text').text(moment(value).format('D MMMM YYYY'));
}