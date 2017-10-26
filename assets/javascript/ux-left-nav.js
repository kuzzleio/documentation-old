(function leftNavUX() {
  var $wrapper = $('.tocify-wrapper');

  if ($wrapper.length !== 0) {
    var $selectedItem = $('.tocify-level-2.tocify-focus', $wrapper);

    if ($selectedItem.length === 0) {
      $selectedItem = $('.tocify-focus', $wrapper);
    }

    if ($selectedItem.get(0).offsetTop + 120 > $wrapper.height()) {
      $wrapper.scrollTop(Math.ceil($selectedItem.get(0).offsetTop - $wrapper.height() / 2));
    }
  }

  $('nav .btn-hamburger').on('click', function (event) {
    event.preventDefault();
    $('.tocify-wrapper').toggleClass('open');
  })

  $('.floating-toggle').on('click', function (event) {
    event.preventDefault();
    $('.tocify-wrapper').toggleClass('open');
  })

  $('.main-content').on('click', function(event) {
    $('.tocify-wrapper').removeClass('open');
  })
})();
