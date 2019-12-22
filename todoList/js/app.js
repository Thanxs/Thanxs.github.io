let todoData;

$('.btn-show-all').click(handleClickOnBtnShowAll);
$('.btn-show-open').click(handleClickOnBtnShowOpen);
$('.btn-show-inprogress').click(handleClickOnBtnShowInProgress);
$('.btn-show-done').click(handleClickOnBtnShowDone);

sendRequest('GET', 'js/data.json');