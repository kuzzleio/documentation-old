(function navDropdown() {
  $('.dropdown-btn')
    .on('click', function (event) {
      if ($(window).width() > 637) {
        event.stopPropagation();
        
        if ($(event.target).hasClass('nav-item')) {
          event.preventDefault();  
        }
        
        $(event.target)
          .parent()
          .toggleClass('open');
        }
      });
  $(window)
    .on('click', function () {
      $('.dropdown-btn')
        .removeClass('open');
    });
})();
