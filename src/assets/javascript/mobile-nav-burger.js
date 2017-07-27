(function mobileNavBuger() {
  var $body = $('body');

  $('.mobile-nav-burger').on('click', function() {
    $body.toggleClass('nav-burger-open');
  });
})();
