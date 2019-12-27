// createSlides(16);
// $('.carousel__inner').slick({
//     infinite: true,
//     speed: 500,
//     fade: true,
//     cssEase: 'linear',
//     autoplay: true,
//     autoplaySpeed: 1000,
//     arrows: false,
// });

showProjects(projects);
activateHamburger();

 //Smooth scroll and page up
 $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('.page-up').fadeIn();
    } else {
      $('.page-up').fadeOut();
    }        
  });

  $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });

  showContacts();