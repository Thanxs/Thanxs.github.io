"use strict";

function timeOut(message) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(message);
            chatTyping.innerHTML = '';
        }, 3500)
    })
}

function makeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomMessageOfGreetings() {
    const messages = [
        'Hello!',
        'Hello! How can I help you?',
        'Hi!',
        'Hi! Nice to see you.',
        'Hello! My name is Alex! Nice to see you in my chat.',
        'Hello! Thanks for visiting my chat.',
    ];
    const lastIndex = messages.length - 1;
    const randomMessage = messages[makeRandom(0, lastIndex)];
    return timeOut(randomMessage);
}

async function chat(flag) {
    const message = await randomMessageOfGreetings();
    const botMessage = document.createElement('div');

    const randomResponsesToRussianText = [
        `Sorry, my friend, I don't speak Russian(`,
        `Unfortunatelly, I don't understand Russian(`,
        `Try talking to me in English)`
    ];

    botMessage.classList.add('chat__bot-message');

    if (flag) {
        botMessage.innerHTML = `<div>
                                    <div class="chat__time">${moment().format('hh : mm')}</div>
                                    <div>${randomResponsesToRussianText[makeRandom(0, randomResponsesToRussianText.length-1)]}</div>
                                </div>`;
        playSound('get-message');
    } else {
        botMessage.innerHTML = `<div>
                                    <div class="chat__time">${moment().format('hh : mm')}</div>
                                    <div>${message}</div>
                                </div>`;
        playSound('get-message');
    }

    if (isOneResponse) {
        chatHistory.append(botMessage);
    }

    chatHistory.scrollTop = chatHistory.scrollHeight;

    setTimeout(() => {
        if (!$(chatInput).is(":focus")){
            openModal(wrapper);
        }
    }, makeRandom(15000, 25000));
}

function sendUserMessage() {
    playSound('send-message');
    isOneResponse = true;
    if (chatInput.value !== '') {
        setTimeout(() => {
            chatTyping.innerHTML = 'Alex typing...';
        }, 1000);

        const userMessage = document.createElement('div');
        userMessage.classList.add('chat__user-message');
        userMessage.innerHTML= `<div>
                                    <div class="chat__time">${moment().format('hh : mm')}</div>
                                    <div>${chatInput.value}</div>                                    
                                </div>`;

        let arrayOfSymbols = chatInput.value.split('');
        let isRussianText = checkRussianSymbols(arrayOfSymbols);
        chatInput.value = ``;
        chatHistory.append(userMessage);

        chatHistory.scrollTop = chatHistory.scrollHeight;

        chat(isRussianText).then(() => isOneResponse = false);
        chatTyping.innerHTML = '';
    }
}

function checkRussianSymbols(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].charCodeAt() >= 1040 && arr[i].charCodeAt() <= 1105) {
            return true;
        }
    }
}

function openModal(wrapper) {
    $(wrapper).append(`<div class="modal fade chat__modal" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <li class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Since, there are no more questions, bye!)</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>                          
                          <div class="modal-footer">
                            <button type="button" class="btn btn-dark chat__start" data-dismiss="modal">Start again</button>
                          </div>
                        </div>
                      </div>
                    </div>`);
    $('#modal').modal('show');
}

function clearHistory() {
    chatHistory.innerHTML = ``;
}

function leaveChat() {
    chatWindow.classList.add('chat__disappear');
    const chatTitle = document.querySelector('.chat__title');
    chatTitle.innerHTML = `See you next time=)`;
}

function playSound(name) {
    const sound = new Audio();
    sound.src = `./sounds/${name}.mp3`;
    sound.autoplay = true;
}