$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    
  });

function createSlides(amount) {        
    for (let i = 0; i < amount; i++) {
        let slide = document.createElement('img');
        $(slide).addClass('slide');
        slide.src = `./images/slides/${i+1}.jpg`;
        $('.carousel__inner').append(slide);
    }
}

createSlides(24);