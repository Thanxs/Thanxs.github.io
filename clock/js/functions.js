'use strict';

function createTimeDigits() {
    let watchItems = document.querySelectorAll('.watch__item');

    watchItems.forEach((item) => {
        let img = document.createElement('img');
        img.classList.add('digit');
        item.append(img);
    });
}

function getWatchItems() {
    return document.querySelectorAll('.watch__item img');
}

function getTime() {
    let date = new Date();

    let secondsValue = date.getSeconds().toString();
    if (secondsValue.length === 1) {
        secondsValue = '0' + secondsValue;
    }
    let minutesValue = date.getMinutes().toString();
    if (minutesValue.length === 1) {
        minutesValue = '0' + minutesValue;
    }
    let hoursValue = date.getHours().toString();
    if (hoursValue.length === 1) {
        hoursValue = '0' + hoursValue;
    }
    
    return {
        seconds: secondsValue,
        minutes: minutesValue,
        hours: hoursValue,
   };
}

function showTime() {
    const time = getTime();

    watchItems[0].src = `./img/${time.hours[0]}.png`;
    watchItems[1].src = `./img/${time.hours[1]}.png`;

    watchItems[2].src = `./img/${time.minutes[0]}.png`;
    watchItems[3].src = `./img/${time.minutes[1]}.png`;

    watchItems[4].src = `./img/${time.seconds[0]}.png`;
    watchItems[5].src = `./img/${time.seconds[1]}.png`;
}

function changeTime() {
    const time = getTime();    

    watchItems[5].src = `./img/${time.seconds[1]}.png`;
    console.log(`1 second passed`);    
    if (time.seconds[1] === '0') {
        watchItems[4].src = `./img/${time.seconds[0]}.png`;
        console.log(`10 seconds passed`);
        if (time.seconds === '00') {
            watchItems[3].src = `./img/${time.minutes[1]}.png`;
            console.log(`1 minute passed`);
            if (time.minutes[1] === '0') {
                watchItems[2].src = `./img/${time.minutes[0]}.png`;
                console.log(`10 minutes passed`);
                if (time.minutes === '00') {
                    watchItems[1].src = `./img/${time.hours[1]}.png`;
                    console.log(`1 hour passed`);
                    if (time.hours[1] === '0') {
                        watchItems[0].src = `./img/${time.hours[0]}.png`;                        
                    }
                }
            }
        }    
    }
    setTimeout(changeTime, 1000);       
}


