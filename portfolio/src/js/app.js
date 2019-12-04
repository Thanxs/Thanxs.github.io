function createSlides(amount) {        
    for (let i = 0; i < amount; i++) {
        let slide = document.createElement('img');
        slide.classList.add('slide');
        slide.src = `./images/slides/${i+1}.jpg`;
        slideBox.append(slide);
    }
}

function getWidthOfSlideBox(amount) {
    return parseInt(window.getComputedStyle(slideBox).width) * amount;
}

function changeTranslateValueBack(slideWidth) {    
    return function() {
        translateValue += slideWidth;
        return translateValue;
    };
}

function changeTranslateValueForward(slideWidth) {    
    return function() {
        translateValue -= slideWidth;
        return translateValue;
    };
}

function handleClickOnBtnPrev() {
    clearTimeout(timer);
    let slideBoxWidth = getWidthOfSlideBox(SLIDES_AMOUNT);    
    
    let translateBack = changeTranslateValueBack(SLIDE_WIDTH);
    slideBox.style.transform = `translateX(${translateBack()}px)`;
    
    if (translateValue > 0) {
        slideBox.style.transform = `translateX(${SLIDE_WIDTH - slideBoxWidth}px)`;
        translateValue =  SLIDE_WIDTH - slideBoxWidth;
    }
}

function handleClickOnBtnNext() {
    clearTimeout(timer);
    autoSlider();
    let slideBoxWidth = getWidthOfSlideBox(SLIDES_AMOUNT);
    let translateForward = changeTranslateValueForward(SLIDE_WIDTH);
    slideBox.style.transform = `translateX(${translateForward()}px)`;

    if (translateValue < -(slideBoxWidth - SLIDE_WIDTH)) {
        slideBox.style.transform = `translateX(0px)`;
        translateValue = 0;
    }
}

function autoSlider() {
    timer = setTimeout(()=> {
        let slideBoxWidth = getWidthOfSlideBox(SLIDES_AMOUNT);
        let translateForward = changeTranslateValueForward(SLIDE_WIDTH);
        slideBox.style.transform = `translateX(${translateForward()}px)`;
        
        if (translateValue < -(slideBoxWidth - SLIDE_WIDTH)) {
            slideBox.style.transform = `translateX(0px)`;
            translateValue = 0;
        }
        autoSlider();
    }, 1000);
}

const slideBox = document.querySelector('.about__slider');

const SLIDES_AMOUNT = 26,
      SLIDE_WIDTH = 400;

let translateValue = 0,
    timer;

createSlides(SLIDES_AMOUNT);
autoSlider();
