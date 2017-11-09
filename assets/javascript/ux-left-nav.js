(function leftNavUX() {
  var $wrapper = $('.tocify-wrapper');

  if ($wrapper.length !== 0) {
    var $selectedItemList = $('.tocify-level-2.tocify-focus', $wrapper);

    if ($selectedItemList.length === 0) {
      $selectedItemList = $('.tocify-focus', $wrapper);
    }
    var $selectedItem = $selectedItemList.get($selectedItemList.length-1)

    if ($selectedItem.offsetTop + 120 > $wrapper.height()) {
      $wrapper.scrollTop(Math.ceil($selectedItem.offsetTop - $wrapper.height() / 2));
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
