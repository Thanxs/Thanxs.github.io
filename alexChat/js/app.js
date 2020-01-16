const wrapper = document.getElementById('wrapper');
const chatWindow = document.querySelector('.chat');
const chatHistory = document.querySelector('.chat__history');
const chatButton = document.querySelector('.chat-btn');
const chatInput = document.querySelector('.chat-input');
const chatTyping = document.querySelector('.chat__typing');
const chatClearBtn = document.querySelector('.chat__clear');
const chatLeaveBtn = document.querySelector('.chat__leave');
let isOneResponse = false;

$(chatHistory).niceScroll();
chatClearBtn.addEventListener('click', clearHistory);
chatLeaveBtn.addEventListener('click', leaveChat);
chatButton.addEventListener('click', sendUserMessage);

